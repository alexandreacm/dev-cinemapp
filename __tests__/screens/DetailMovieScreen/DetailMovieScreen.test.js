import 'react-native';
import React from 'react';
import {
  matchSnapshotWithTheme,
  renderWithTheme
} from '@/helpers/functions/testing';

import DetailMovieScreen from '@/screens/DetailMovieScreen';

describe('tests in DetailMovieScreen Screen', () => {
  test('matches snapshot', () => {
    matchSnapshotWithTheme(<DetailMovieScreen />);
  });

  test('renders correctly', () => {
    renderWithTheme(<DetailMovieScreen />);
  });
});
