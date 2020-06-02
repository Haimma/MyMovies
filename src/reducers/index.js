/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { combineReducers } from 'redux';

import MoviesReducers from './MoviesReducers';

export default combineReducers({
    moviesLists: MoviesReducers,
});