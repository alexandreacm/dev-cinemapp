import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
  memo
} from 'react';
import {
  Animated,
  TouchableOpacity,
  TextInput as NativeTextInput
} from 'react-native';
import Reanimated, { interpolate } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

import Tooltip from '@/components/Tooltip';

import colors from '@/theme/colors';
import { runTiming, handlePixels } from '@/helpers/functions/utils';

const { Value, useCode, set, Clock } = Reanimated;

const TextInput = ({
  width,
  testID,
  marginTop,
  marginBottom,
  marginRight,
  marginLeft,
  paddingTop,
  paddingBottom,
  paddingRight,
  paddingLeft,
  value,
  onChangeText,
  label,
  editable,
  errorMessage,
  secureTextEntry,
  autoCompleteType,
  keyboardType,
  onSubmitEditing,
  hasError,
  autoCapitalize,
  forwardRef,
  returnKeyType,
  autoFocus
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [animation] = useState(new Animated.Value(value === '' ? 0 : 1));
  const [showPassword, setShowPassword] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const inputClock = useRef(new Clock()).current;
  const focusNode = useRef(new Value(0)).current;
  const tooltipClock = useRef(new Clock()).current;
  const inputRef = useRef(null);
  const tooltipNode = useRef(new Value(0)).current;
  const inputNode = useRef(new Value(0)).current;

  const tooltipAnimatedStyle = useMemo(
    () => ({
      opacity: interpolate(tooltipNode, {
        inputRange: [0.4, 1],
        outputRange: [0, 1]
      }),
      transform: [
        {
          scale: interpolate(tooltipNode, {
            inputRange: [0, 1],
            outputRange: [0.8, 1]
          })
        },
        {
          translateY: interpolate(tooltipNode, {
            inputRange: [0, 1],
            outputRange: [30, 0]
          })
        },
        {
          translateX: interpolate(tooltipNode, {
            inputRange: [0, 1],
            outputRange: [10, 0]
          })
        }
      ]
    }),
    [tooltipNode]
  );

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isFocused || value !== '' ? 1 : 0,
      duration: 200,
      useNativeDriver: false
    }).start();
  }, [animation, isFocused, value]);

  const handleTooltipState = useCallback(() => {
    if (!isTooltipOpen) inputRef.current.blur();
    setIsTooltipOpen(prev => (!hasError ? false : !prev));
  }, [isTooltipOpen, hasError]);

  useCode(
    () => [
      set(inputNode, runTiming(inputClock, inputNode, value ? 1 : focusNode))
    ],
    [value]
  );

  useCode(
    () => [
      set(
        tooltipNode,
        runTiming(tooltipClock, tooltipNode, isTooltipOpen ? 1 : 0)
      )
    ],
    [isTooltipOpen]
  );

  const handleFocus = () => setIsFocused(true);

  const handleBlur = () => setIsFocused(false);

  const handleShowPassword = () => setShowPassword(!showPassword);

  return (
    <Container
      borderColor={hasError ? colors.INPUT_DANGER : colors.DEFAULT_TEXT}
      width={width}
      marginTop={marginTop}
      marginBottom={marginBottom}
      marginRight={marginRight}
      marginLeft={marginLeft}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
      paddingRight={paddingRight}
      paddingLeft={paddingLeft}
    >
      <Label
        backgroundColor={colors.COLOR_GRAY}
        color={colors.DEFAULT_TEXT}
        style={{
          top: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [16, -9]
          }),
          fontSize: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [16, 12]
          }),
          lineHeight: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [24, 16]
          }),
          letterSpacing: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0.15, 0.4]
          })
        }}
      >
        {label}
      </Label>
      <InsideTextInput
        testID={testID}
        value={value}
        autoFocus={autoFocus}
        returnKeyType={returnKeyType}
        autoCapitalize={autoCapitalize}
        onSubmitEditing={onSubmitEditing}
        autoCompleteType={autoCompleteType}
        keyboardType={keyboardType}
        ref={forwardRef || inputRef}
        editable={editable}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry && !showPassword}
        blurOnSubmit
      />
      <RightIcon>
        {secureTextEntry ? (
          <TouchableOpacity onPress={handleShowPassword}>
            <Icon
              name={!showPassword ? 'eye-off' : 'eye'}
              size={20}
              color={colors.SECONDARY}
            />
          </TouchableOpacity>
        ) : (
          hasError &&
          errorMessage && (
            <TouchableOpacity onPress={hasError && handleTooltipState}>
              <Icon name='alert-circle' size={20} color={colors.INPUT_DANGER} />
            </TouchableOpacity>
          )
        )}
      </RightIcon>
      {hasError && (
        <Tooltip style={tooltipAnimatedStyle} message={errorMessage || ''} />
      )}
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  padding-left: 16px;
  padding-right: 16px;
  border-color: ${({ borderColor }) => borderColor || colors.DEFAULT_TEXT};
  border-radius: 8px;
  border-width: 1px;
  height: 56px;
  justify-content: space-between;
  width: ${({ width }) => handlePixels(width)};
  margin-top: ${({ marginTop }) => handlePixels(marginTop)};
  margin-bottom: ${({ marginBottom }) => handlePixels(marginBottom)};
  margin-left: ${({ marginLeft }) => handlePixels(marginLeft)};
  margin-right: ${({ marginRight }) => handlePixels(marginRight)};
  padding-top: ${({ paddingTop }) => handlePixels(paddingTop)};
  padding-bottom: ${({ paddingBottom }) => handlePixels(paddingBottom)};
  padding-left: ${({ paddingLeft }) => handlePixels(paddingLeft)};
  padding-right: ${({ paddingRight }) => handlePixels(paddingRight)};
`;

const RightIcon = styled.View`
  justify-content: center;
`;

const Label = styled(Animated.Text)`
  position: absolute;
  left: 16px;
  padding-left: 4px;
  padding-right: 4px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
`;

const InsideTextInput = styled.TextInput`
  font-size: 16px;
  color: ${colors.DEFAULT_TEXT};
  width: 90%;
`;

TextInput.defaultProps = {
  value: '',
  onChangeText: () => {},
  width: 'auto',
  marginTop: 0,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 16,
  paddingRight: 16,
  autoCompleteType: 'off',
  keyboardType: 'default',
  editable: true,
  onSubmitEditing: undefined,
  hasError: undefined,
  autoCapitalize: 'none',
  forwardRef: undefined,
  returnKeyType: 'done',
  autoFocus: false,
  errorMessage: undefined,
  secureTextEntry: false,
  testID: undefined
};

TextInput.propTypes = {
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  label: PropTypes.string.isRequired,
  editable: PropTypes.bool,
  errorMessage: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  paddingTop: PropTypes.number,
  paddingBottom: PropTypes.number,
  paddingLeft: PropTypes.number,
  paddingRight: PropTypes.number,
  autoCompleteType: PropTypes.string,
  keyboardType: PropTypes.string,
  onSubmitEditing: PropTypes.func,
  hasError: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  forwardRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(NativeTextInput) })
  ]),
  returnKeyType: PropTypes.string,
  autoFocus: PropTypes.bool,
  testID: PropTypes.string
};

export default memo(TextInput);
