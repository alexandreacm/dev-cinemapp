import { all, call, put, takeEvery } from 'redux-saga/effects';

import api from '@/services/api';
// eslint-disable-next-line import/no-unresolved
import { API_KEY } from '@env';

import {
  LOADING_MOVIES,
  LOADING_MOVIES_SUCCESS,
  LOADING_MOVIES_FAILURE,
  DETAILS_MOVIE,
  DETAILS_MOVIE_SUCCESS,
  DETAILS_MOVIE_FAILURE
} from '@/store/slices/movieSlice';

export function* loadingMovies({ payload: { title } }) {
  try {
    const response = yield call(api.get, `/?apikey=${API_KEY}&s=${title}`);
    let moviesData = [];

    const {
      data: { Error }
    } = response;

    if (!Error) {
      const {
        data: { Search }
      } = response;

      moviesData = Search;
    }

    yield put(
      LOADING_MOVIES_SUCCESS({
        moviesData
      })
    );
  } catch (error) {
    yield put(
      LOADING_MOVIES_FAILURE({
        hasError: true,
        errorMessage: error.response
          ? error.response.data.message
          : 'Não conseguimos carregar os dados dos filmes',
        status: error.response ? error.response.status : 400
      })
    );
  }
}

export function* detailsMovie({ payload: { id } }) {
  try {
    const { data } = yield call(api.get, `/?apikey=${API_KEY}&i=${id}`);
    const movieDetailsData = data;

    yield put(
      DETAILS_MOVIE_SUCCESS({
        movieDetailsData
      })
    );
  } catch (error) {
    yield put(
      DETAILS_MOVIE_FAILURE({
        hasError: true,
        errorMessage: error.response
          ? error.response.data.message
          : 'Não foi possivel carregar os detalhes do filmes',
        status: error.response ? error.response.status : 400
      })
    );
  }
}

export default function* watcher() {
  yield all([takeEvery(LOADING_MOVIES, loadingMovies)]);
  yield all([takeEvery(DETAILS_MOVIE, detailsMovie)]);
}
