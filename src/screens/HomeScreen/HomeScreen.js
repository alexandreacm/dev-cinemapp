import React from 'react';
import styled from 'styled-components/native';

import colors from '@/theme/colors';
import HomeMovies from '@/screens/HomeScreen/HomeMovieScreen';

const HomeScreen = () => (
  <StyledContainer>
    <HomeMovies />
  </StyledContainer>
);

const StyledContainer = styled.View`
  flex: 1;
  background-color: ${colors.COLOR_GRAY};
`;

export default HomeScreen;
