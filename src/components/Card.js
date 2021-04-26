import React, { memo } from 'react';
import { ViewPropTypes } from 'react-native';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '@/theme/colors';

import Label from '@/components/Label';

import { SourcePropType } from '@/helpers/constants/propTypes';

const Card = ({
  Title,
  Year,
  Poster,
  onPress,
  style,
  onPressStar,
  favorite
}) => {
  return (
    <StyledContainer style={style}>
      <StyledTouchable>
        <StyledImage source={{ uri: Poster || '' }} resizeMode='cover' />
        <StyledContent>
          <StyledRow>
            <StyledContenticon>
              <StyledBadgeLinearGradient colors={colors.GRADIENT_BADGE} />
              <StyledName numberOfLines={1} testID='Title'>
                {Title}
              </StyledName>
            </StyledContenticon>
            <StyledTouchableStar onPress={onPressStar}>
              <Icon
                name={favorite ? 'star' : 'star-border'}
                size={35}
                color={colors.PRIMARY}
              />
            </StyledTouchableStar>
          </StyledRow>
          <StyledRow marginTop={-10}>
            <StyledYear testID='Year'>
              <StyledTitle testID='labelId'>Ano: </StyledTitle>
              {Year}
            </StyledYear>
          </StyledRow>
        </StyledContent>
      </StyledTouchable>
      <StyledTouchableDetail onPress={onPress}>
        <Label color={colors.COLOR_WHITE}>Detalhes do filme</Label>
      </StyledTouchableDetail>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  border-radius: 8px;
  elevation: 10;
  box-shadow: 0px 1px 25px ${colors.CARD_BACKGROUND_SHADOW};
  background-color: ${colors.COLOR_WHITE};
`;

const StyledTouchable = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const StyledContent = styled.View`
  flex: 1;
  justify-content: flex-start;
`;

const StyledRow = styled.View`
  flex-direction: row;
  justify-content: ${({ justifyContent }) => justifyContent || 'flex-start'};
  align-items: ${({ aligItems }) => aligItems || 'center'};
  margin-top: ${({ marginTop }) => marginTop || 0}px;
  margin-bottom: ${({ marginBottom }) => marginBottom || 0}px;
`;

const StyledImage = styled.Image`
  width: 80px;
  height: 100px;
  margin-right: 10px;
  border-radius: 10px;
`;

const StyledTitle = styled.Text`
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  color: ${colors.PRIMARY};
`;

const StyledName = styled.Text`
  width: 170px;
  font-family: Poppins;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  color: ${colors.PRIMARY};
`;

const StyledYear = styled.Text`
  width: 100%;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  color: ${colors.DARK_TEXT};
`;

const StyledBadgeLinearGradient = styled(LinearGradient)`
  width: 12px;
  height: 12px;
  border-radius: 100px;
  margin-right: 8px;
`;

const StyledTouchableStar = styled.TouchableOpacity`
  width: 50%;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const StyledTouchableDetail = styled.TouchableOpacity`
  width: 100%;
  height: 40px;
  margin-top: 15px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.COLOR_BUTTON};
`;

const StyledContenticon = styled.View`
  width: 50%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

Card.defaultProps = {
  style: {},
  onPress: () => {},
  onPressStar: () => {}
};

Card.propTypes = {
  Poster: SourcePropType.isRequired,
  style: ViewPropTypes.style,
  Title: PropTypes.string.isRequired,
  Year: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  onPressStar: PropTypes.func,
  favorite: PropTypes.bool.isRequired
};

export default memo(Card);
