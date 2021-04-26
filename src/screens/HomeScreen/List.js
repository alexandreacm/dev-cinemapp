/* eslint-disable camelcase */
import React, { memo, useCallback, useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_KEY } from '@/helpers/constants/storageKeys';

import PropTypes from 'prop-types';

import colors from '@/theme/colors';
import spacings from '@/theme/spacings';

import CardMovies from '@/components/Card';

const List = ({ items, isLoading }) => {
  const { navigate } = useNavigation();
  const [moviesStorage, setMoviesStorage] = useState([]);

  const onHandleNavigate = useCallback(
    id => {
      navigate('DetailMovie', { id });
    },
    [navigate]
  );

  const loadingFavoritesMovies = async () => {
    try {
      const movies = await AsyncStorage.getItem(USER_KEY);
      setMoviesStorage(JSON.parse(movies));
    } catch (err) {
      Alert.alert(err);
    }
  };

  const handleFavorite = async (Title, Year, imdbID, Poster) => {
    try {
      let movies = [];
      const movie = {
        imdbID,
        Title,
        Year,
        Poster
      };

      movies = JSON.parse(await AsyncStorage.getItem(USER_KEY));

      if (movies === null) {
        movies = [];
      }

      if (movies.length > 0) {
        const findMovie = movies.find(item => {
          return item.imdbID === imdbID;
        });

        if (typeof findMovie !== 'undefined') {
          movies.splice(findMovie, 1);
        } else {
          movies.push(movie);
        }
      } else {
        movies.push(movie);
      }

      await AsyncStorage.setItem(USER_KEY, JSON.stringify(movies));
      await loadingFavoritesMovies();
    } catch (err) {
      Alert.Alert(err);
    }
  };

  const checkFavorite = useCallback(
    imdbID => {
      let movies = [];

      if (moviesStorage) {
        movies = moviesStorage.filter(
          itemFilter => imdbID === itemFilter.imdbID
        );
      }
      return movies.length;
    },
    [moviesStorage]
  );

  const renderItem = ({ item: { Title, Year, imdbID, Poster } }) => (
    <StyledCardMovie
      key={imdbID}
      Title={Title}
      Poster={Poster}
      Year={Year}
      onPress={() => onHandleNavigate(imdbID)}
      onPressStar={() => handleFavorite(Title, Year, imdbID, Poster)}
      favorite={checkFavorite(imdbID)}
    />
  );

  useEffect(() => {
    (async () => {
      await loadingFavoritesMovies();
    })();
  }, []);

  return (
    <StyledContainer>
      {isLoading ? (
        <StyledActivityIndicator size='large' color={colors.PRIMARY} />
      ) : (
        <StyledFlatList
          data={items}
          key={item => item.imdbID}
          keyExtractor={item => item.imdbID}
          renderItem={renderItem}
        />
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
  background-color: ${colors.COLOR_GRAY};
  margin-top: 15px;
`;

const StyledActivityIndicator = styled.ActivityIndicator`
  height: 100px;
  margin-top: 32px;
  margin-bottom: 32px;
`;

const StyledFlatList = styled.FlatList.attrs({
  contentContainerStyle: {
    paddingVertical: spacings.EXTRA_SMALL
  }
})``;

const StyledCardMovie = styled(CardMovies)`
  padding: 10px;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

List.defaultProps = {
  items: [],
  isLoading: false
};

List.propTypes = {
  isLoading: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string,
      Year: PropTypes.string,
      imdbID: PropTypes.string,
      Type: PropTypes.string,
      Poster: PropTypes.string
    })
  )
};

export default memo(List);
