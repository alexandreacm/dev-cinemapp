import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components/native';

import {
  useRoute,
  useIsFocused,
  useNavigation
} from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import colors from '@/theme/colors';
import Header from '@/components/Header';
import CardDetailMovie from '@/components/CardDetailMovie';

import { DETAILS_MOVIE } from '@/store/slices/movieSlice';

const DetailsMovieScreen = () => {
  const isFocused = useIsFocused();
  const { goBack } = useNavigation();
  const dispatch = useDispatch();

  const { isLoading, movieDetailsData, errorMessage } = useSelector(
    ({ movies }) => movies
  );
  const {
    params: { id }
  } = useRoute();

  const handleGoBack = () => goBack();

  const contentDetailComic = useMemo(() => {
    if (isLoading)
      return <StyledActivityIndicator color={colors.PRIMARY} size='large' />;

    return (
      <CardDetailMovie
        key={movieDetailsData?.imdbID}
        poster={movieDetailsData?.Poster}
        title={movieDetailsData?.Title}
        description={
          movieDetailsData?.Writer ? movieDetailsData?.Writer : 'Sem descrição'
        }
        imdbRating={movieDetailsData?.imdbRating}
        year={movieDetailsData?.Year}
        runTime={movieDetailsData?.Runtime}
        actors={movieDetailsData?.Actors}
      />
    );
  }, [isLoading, movieDetailsData]);

  useEffect(() => {
    dispatch(DETAILS_MOVIE({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Header
        showBackButton
        leftIcon
        onBackPress={handleGoBack}
        backgroundColor={colors.PRIMARY}
        backButtonColor={colors.COLOR_WHITE}
        isFocuse={isFocused}
      />
      {errorMessage && (
        <StyledViewLabel>
          <StyledLabel>{errorMessage}</StyledLabel>
        </StyledViewLabel>
      )}
      <StyledScrollView showsVerticalScrollIndicator={false}>
        <StyledContainerDefault>{contentDetailComic}</StyledContainerDefault>
      </StyledScrollView>
    </>
  );
};

const StyledContainerDefault = styled.View`
  flex: 1;
  background-color: ${colors.COLOR_WHITE};
  margin-left: 6px;
  margin-right: 6px;
  margin-top: 10px;
`;

const StyledLabel = styled.Text`
  width: 100%;
  font-weight: 400;
  font-size: 14px;
  margin-bottom: 8px;
  color: ${colors.PRIMARY};
`;

const StyledViewLabel = styled.View`
  width: 100%;
  padding: 10px;
  align-items: center;
  background-color: ${colors.DANGER};
`;

const StyledScrollView = styled.ScrollView`
  flex: 1;
  background: ${colors.COLOR_WHITE};
`;

const StyledActivityIndicator = styled.ActivityIndicator`
  height: 100px;
  margin-top: 32px;
  margin-bottom: 32px;
`;

export default DetailsMovieScreen;
