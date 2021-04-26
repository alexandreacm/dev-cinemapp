import React, { memo } from 'react';
import { ViewPropTypes } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

import colors from '@/theme/colors';

const CardDetailMovie = ({
  poster,
  onPress,
  title,
  description,
  style,
  imdbRating,
  year,
  runTime,
  actors
}) => {
  return (
    <StyledContainer style={style} onPress={onPress}>
      <StyledContainerCharacters>
        <StyledPoster source={{ uri: poster }} resizeMode='cover' />
        <StyledContent>
          <StyledName>{title}</StyledName>
          <StyledText>Rating: {imdbRating}</StyledText>
          <StyledText>Ano: {year}</StyledText>
          <StyledText>Tempo de filme: {runTime}</StyledText>
          <StyledTextActors>Atores: {actors}</StyledTextActors>
        </StyledContent>
      </StyledContainerCharacters>
      <StyledSummery>
        <StyledSummeryText>Summary</StyledSummeryText>
      </StyledSummery>
      <StyledDescription>{description}</StyledDescription>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  padding: 8px;
  border-radius: 8px;
  margin-bottom: 10px;
  elevation: 10;
  box-shadow: 0px 1px 25px ${colors.CARD_BACKGROUND_SHADOW};
  background-color: ${colors.COLOR_WHITE};
`;

const StyledContainerCharacters = styled.View`
  width: 100%;
  flex-direction: row;
  padding: 8px;
  justify-content: space-between;
`;

const StyledContent = styled.View`
  flex: 1;
  justify-content: flex-start;
  background-color: ${colors.COLOR_WHITE};
`;

const StyledName = styled.Text`
  font-size: 16px;
  text-align: left;
  font-weight: bold;
  margin-bottom: 6px;
`;

const StyledSummery = styled.View`
  width: 100%;
  background-color: #f3f3f3;
  padding: 5px;
  margin-top: 10px;
  margin-bottom: 8px;
`;

const StyledSummeryText = styled.Text`
  font-size: 16px;
  text-align: left;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
`;

const StyledDescription = styled.Text`
  font-size: 16px;
  text-align: left;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
`;

const StyledText = styled.Text`
  font-size: 14px;
  text-align: left;
  font-style: normal;
  font-weight: normal;
  color: ${colors.DEFAULT_TEXT};
`;

const StyledPoster = styled.Image`
  width: 100px;
  height: 150px;
  margin-right: 10px;
  border-radius: 10px;
`;

const StyledTextActors = styled.Text`
  font-size: 14px;
  text-align: left;
  font-style: normal;
  font-weight: normal;
  color: ${colors.DEFAULT_TEXT};
  margin-top: 10px;
`;

CardDetailMovie.defaultProps = {
  style: {},
  description: '',
  onPress: () => {},
  poster: ''
};

CardDetailMovie.propTypes = {
  poster: PropTypes.string,
  style: ViewPropTypes.style,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  onPress: PropTypes.func,
  imdbRating: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  runTime: PropTypes.string.isRequired,
  actors: PropTypes.string.isRequired
};

export default memo(CardDetailMovie);
