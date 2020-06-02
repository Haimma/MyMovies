/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import { connect } from "react-redux";
import { FlatList, View, Text } from "react-native";
import MovieListItem from "./MovieListItem";
import {styles} from './MovieListStyles';

class MovieList extends Component {

  renderItem(movie) {
    return <MovieListItem movie={movie.item} />;
  }

  render() {
    const movies = this.props.moviesLists.all;
    console.log('movies')
    console.log(movies)
    return (
      <View>
        <FlatList
          data={movies}
          renderItem={this.renderItem}
          keyExtractor={(movie) => movie.id}
          initialNumToRender={5}
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

export default connect(mapStateToProps)(MovieList);