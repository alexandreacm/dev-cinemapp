import React from 'react';
import { useIsFocused } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/Feather';

import colors from '@/theme/colors';

import Header from '@/components/Header';

import Home from '@/screens/HomeScreen';
import FavoritesMovieScreen from '@/screens/FavoritesMovieScreen';

const TopTab = () => {
  const { isFocused } = useIsFocused();
  const { Navigator, Screen } = createMaterialTopTabNavigator();

  return (
    <>
      <Header
        leftIcon
        backgroundColor={colors.PRIMARY}
        backButtonColor={colors.COLOR_WHITE}
        isFocused={isFocused}
      />
      <Navigator
        screenOptions={{
          indicatorStyle: {
            backgroundColor: colors.SECUNDARY
          }
        }}
      >
        <Screen
          name='Home'
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon
                name='home'
                size={24}
                color={focused ? colors.PRIMARY : colors.GRAY_TEXT_CARD}
              />
            )
          }}
        />
        <Screen
          name='Favorites'
          component={FavoritesMovieScreen}
          options={{
            tabBarLabel: 'Favoritos',
            tabBarIcon: ({ focused }) => (
              <Icon
                name='star'
                size={24}
                color={focused ? colors.PRIMARY : colors.GRAY_TEXT_CARD}
              />
            )
          }}
        />
      </Navigator>
    </>
  );
};

export default TopTab;
