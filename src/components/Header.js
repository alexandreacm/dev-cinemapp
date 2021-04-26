import React, { memo } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import colors from '@/theme/colors';
import StatusBarColor from '@/config/StatusBarColor';

import icMessageNotification from '@/assets/icons/icMessage.png';
import icBellNotification from '@/assets/icons/icBell.png';
import imgLogo from '@/assets/icons/logo.png';

const HeaderWithTitle = ({
  showBackButton,
  onBackPress,
  slim,
  backgroundColor,
  backButtonColor,
  isFocused,
  leftIcon
}) => {
  return (
    <>
      <StyledSafeArea backgroundColor={backgroundColor} />
      {isFocused && (
        <StatusBarColor backgroundColor={backgroundColor} isPrimaryColorDark />
      )}
      <StyledContainer backgroundColor={backgroundColor} slim={slim}>
        {showBackButton ? (
          <TouchableOpacity onPress={onBackPress}>
            <Icon name='arrow-back' size={26} color={backButtonColor} />
          </TouchableOpacity>
        ) : (
          <Image source={imgLogo} width={32} height={32} />
        )}

        {leftIcon ? (
          <StyledIconContainer>
            <StyledIcon backgroundColor={backButtonColor} testID='left-icon'>
              <Image source={icMessageNotification} />
            </StyledIcon>
            <StyledIcon backgroundColor={backButtonColor} testID='right-icon'>
              <Image source={icBellNotification} />
            </StyledIcon>
          </StyledIconContainer>
        ) : (
          <StyledEmptyIcon />
        )}
      </StyledContainer>
    </>
  );
};

const StyledContainer = styled.View`
  width: 100%;
  height: ${({ slim }) => (slim ? 48 : 56)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 16px 0px 16px;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const StyledSafeArea = styled.SafeAreaView`
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const StyledIconContainer = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
`;

const StyledIcon = styled.TouchableOpacity`
  width: 37px;
  height: 37px;
  justify-content: center;
  align-items: center;
  margin-right: 27px;
`;

const StyledEmptyIcon = styled.View`
  width: 37px;
  height: 37px;
`;

HeaderWithTitle.defaultProps = {
  onBackPress: () => {},
  slim: false,
  showBackButton: false,
  backgroundColor: colors.PRIMARY,
  backButtonColor: '#fff',
  isFocused: true,
  leftIcon: false
};

HeaderWithTitle.propTypes = {
  onBackPress: PropTypes.func,
  slim: PropTypes.bool,
  showBackButton: PropTypes.bool,
  backgroundColor: PropTypes.string,
  backButtonColor: PropTypes.string,
  isFocused: PropTypes.bool,
  leftIcon: PropTypes.bool
};

export default memo(HeaderWithTitle);
