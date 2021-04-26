/* eslint-disable camelcase */
import React, { memo, useCallback } from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import PropTypes from 'prop-types';

import colors from '@/theme/colors';
import spacings from '@/theme/spacings';

import CardMovies from '@/components/Card';

const List = ({ items, isLoading }) => {
  const { navigate } = useNavigation();

  const onHandleNavigate = useCallback(
    id => {
      navigate('DetailMovie', { id });
    },
    [navigate]
  );

  const renderItem = ({ item: { Title, Year, imdbID, Poster } }) => (
    <StyledCardMovie
      key={imdbID}
      Title={Title}
      Poster={Poster}
      Year={Year}
      onPress={() => onHandleNavigate(imdbID)}
      favorite
    />
  );

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
