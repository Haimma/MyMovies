/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
  MOVIES_LIST_FETCH,
  MOVIE_UPDATE,
} from "../actions/types";

const INITIAL_STATE = {
  all: [],
  favorite: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MOVIES_LIST_FETCH:
      return { ...state, all: action.payload };
    case MOVIE_UPDATE:
      let tempFavourites = state.favorite;
      let movie = action.payload;
      let isExist = tempFavourites.find(
        (c) => c.id === movie.id
      );
      if (isExist) {
        tempFavourites = tempFavourites.filter((c) => c.id !== movie.id);
      } else {
        tempFavourites.push(movie);
        tempFavourites = tempFavourites.sort((a, b) => {
          var x = a.title.toLowerCase();
          var y = b.title.toLowerCase();
          if (x < y) {return -1;}
          if (x > y) {return 1;}
          return 0;
        });
      }

      return { ...state, favorite: [...tempFavourites] };

    default:
      return state;
  }
};
