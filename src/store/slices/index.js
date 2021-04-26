import { combineReducers } from '@reduxjs/toolkit';

import movies, { movieState } from './movieSlice';

export const globalState = {
  movies: movieState
};

export default combineReducers({ movies });
