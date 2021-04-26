import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TopTab from '@/routes/TopTab';
import DetailMovieScreen from '@/screens/DetailMovieScreen';

const { Navigator, Screen } = createStackNavigator();

const HomeStack = () => {
  return (
    <>
      <Navigator initialRouteName='Home' headerMode>
        <Screen name='Home' component={TopTab} />
        <Screen name='DetailMovie' component={DetailMovieScreen} />
      </Navigator>
    </>
  );
};

export default HomeStack;
