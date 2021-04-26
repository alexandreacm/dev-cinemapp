import { all } from 'redux-saga/effects';
import movie from './movieSaga';

export default function* rootSaga() {
  yield all([movie()]);
}
