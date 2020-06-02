/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import { connect } from "react-redux";
import { FlatList, View, Text, Dimensions, StyleSheet } from "react-native";
import MovieListItem from "./MovieListItem";
import {styles} from './FavoriteListStyles';

class FavoriteList extends Component {
  renderItem({item}) {
    return <MovieListItem movie={item} />;
  }

  render() {
    const favorite = this.props.moviesLists.favorite;
    if (favorite.length === 0) {
      return (
        <View style={styles.containerStyle}>
          <Text style={styles.labelStyle}>You Favorite List Is Empty.</Text>
        </View>
      );
    }
    return (
      <View style={styles.flatStyle}>
        <FlatList
          data={favorite}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={(i) => i}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    moviesLists: state.moviesLists,
  };
};

export default connect(mapStateToProps)(FavoriteList);
