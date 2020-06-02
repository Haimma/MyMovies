/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import { connect } from "react-redux";
import { ScrollView } from "react-native";
import ScrollableTabView, {
  DefaultTabBar,
} from "react-native-scrollable-tab-view-universal";
import {styles} from './MoviesScreenStyles';

import { FavoriteListFetch } from "../actions";

import FavoriteList from "./FavoriteList";
import MoviesList from "./MoviesList";

class MoviesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      isConnected: false,
    };
  }


  render() {
    return (
      <ScrollableTabView
        style={styles.tabStyle}
        renderTabBar={() => (
          <DefaultTabBar backgroundColor="rgba(255, 255, 255, 0.7)" />
        )}
        tabBarPosition="overlayTop"
        initialPage={this.state.index}
        onChangeTab={this.handleChangeScreen}
      >
        <ScrollView tabLabel="Movies List">
          <MoviesList />
        </ScrollView>
        <ScrollView tabLabel="Favorites">
          <FavoriteList />
        </ScrollView>
      </ScrollableTabView>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    moviesLists: state.moviesLists,
  };
};

export default connect(mapStateToProps, {
  FavoriteListFetch,
})(MoviesScreen);
