/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
    MOVIES_LIST_FETCH,
    MOVIE_UPDATE,
} from "./types";

const API = 'https://api.themoviedb.org/3/movie/popular?api_key=5c473e0ac1e9d78f1bd6f7e967c95f24&language=en-US&page=1';

export const MoviesListFetch = () => {
    return (dispatch) => {
        return fetch(API)
        .then(response => response.json())
        .then(data =>  {
            dispatch({ type: MOVIES_LIST_FETCH, payload: data.results });
        });
    };
};

export const MovieUpdate = (movie) =>(dispatch)=> {
    
    dispatch({ type: MOVIE_UPDATE, payload: movie });
};