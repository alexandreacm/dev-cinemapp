import React, { memo, useEffect, useState, useRef } from 'react';

import styled from 'styled-components';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_KEY } from '@/helpers/constants/storageKeys';

import Lottie from 'lottie-react-native';

import TextInput from '@/components/TextInput';
import Label from '@/components/Label';

import colors from '@/theme/colors';
import fontSizes from '@/theme/fonts';
import spacings from '@/theme/spacings';

import { StyledContainer as StyledMainContainer } from '@/helpers/commomStyles';

import List from './List';

import noMovies from '../../assets/animations/empty-list.json';

const HomeMoviesScreen = () => {
  const [titleFilm, setTitleFilm] = useState('');

  const [moviesData, setMoviesData] = useState([]);
  const [hasError, setHasError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const passwordRef = useRef(null);

  const handleTitleSubmit = () => passwordRef.current?.focus();

  const loadingFavoritesMovies = async () => {
    try {
      setIsLoading(true);

      const movies = await AsyncStorage.getItem(USER_KEY);
      if (movies) {
        setMoviesData(JSON.parse(movies));
      }

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setHasError(true);
      setErrorMessage(err);
    }
  };

  useEffect(() => {
    (async () => {
      await loadingFavoritesMovies();
    })();
  }, []);

  const renderEmptyList = () => (
    <StyledEmptyListContainer>
      <StyledLottie source={noMovies} autoPlay loop />
      <Label
        textAlign='center'
        fontWeight={500}
        fontSize={18}
        marginTop={-spacings.EXTRA_LARGE}
      >
        Nenhum filme encontrado
      </Label>
    </StyledEmptyListContainer>
  );

  return (
    <StyledMainContainer backgroundColor='#f3f3f3'>
      <Label
        fontWeight={500}
        fontSize={fontSizes.REGULAR_MEDIUM}
        color={colors.COLOR_TEXT_BLUE}
        marginTop={10}
      >
        Cinema App Favoritos
      </Label>

      <Label
        fontWeight={400}
        fontSize={fontSizes.SMALL}
        color={colors.COLOR_TEXT_TRANSACTION}
        marginBottom={26}
      >
        Bem-vindo ao mundo espetacular do cinema
      </Label>

      <TextInput
        onSubmitEditing={handleTitleSubmit}
        width='100%'
        label='Nome filme'
        value={titleFilm}
        onChangeText={setTitleFilm}
        marginBottom={8}
        hasError={hasError}
      />

      {errorMessage && (
        <StyledViewError>
          <Label
            textAlign='left'
            fontWeight={400}
            fontSize={12}
            color={colors.DANGER}
          >
            {errorMessage}
          </Label>
        </StyledViewError>
      )}
      {moviesData.length || isLoading ? (
        <List items={moviesData} isLoading={isLoading} />
      ) : (
        renderEmptyList()
      )}
    </StyledMainContainer>
  );
};

const StyledViewError = styled.View`
  width: 100%;
  padding: 10px;
  align-items: center;
  background-color: ${colors.WHITE};
`;

const StyledEmptyListContainer = styled.View`
  width: 100%;
  height: 300px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const StyledLottie = styled(Lottie)`
  height: 250px;
  width: 250px;
  align-self: center;
  margin-top: -32px;
`;

export default memo(HomeMoviesScreen);
