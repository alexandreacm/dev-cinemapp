/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  moviesData: [],
  movieDetailsData: {},
  isLoading: false,
  errorMessage: null,
  status: null,
  hasError: false
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    LOADING_MOVIES: state => ({ ...state, isLoading: true }),
    LOADING_MOVIES_SUCCESS: (state, { payload: { moviesData } }) => ({
      ...state,
      moviesData,
      isLoading: false,
      hasError: false,
      errorMessage: null,
      status: null
    }),
    LOADING_MOVIES_FAILURE: (state, { payload: { errorMessage, status } }) => ({
      ...state,
      errorMessage,
      status,
      hasError: true,
      isLoading: false
    }),
    DETAILS_MOVIE: state => ({ ...state, isLoading: true }),
    DETAILS_MOVIE_SUCCESS: (state, { payload: { movieDetailsData } }) => ({
      ...state,
      movieDetailsData,
      isLoading: false,
      hasError: false,
      errorMessage: null,
      status: null
    }),
    DETAILS_MOVIE_FAILURE: (state, { payload: { errorMessage, status } }) => ({
      ...state,
      errorMessage,
      status,
      hasError: true,
      isLoading: false
    })
  }
});

const { actions, reducer } = movieSlice;

export const movieState = initialState;

export const {
  LOADING_MOVIES,
  LOADING_MOVIES_SUCCESS,
  LOADING_MOVIES_FAILURE,
  DETAILS_MOVIE,
  DETAILS_MOVIE_SUCCESS,
  DETAILS_MOVIE_FAILURE
} = actions;
export default reducer;
