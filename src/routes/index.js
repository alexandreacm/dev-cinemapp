import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

import HomeStack from '@/routes/HomeStack';

const Route = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return <HomeStack />;
};

export default Route;
