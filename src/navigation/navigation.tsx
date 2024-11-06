import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BootSplash from 'react-native-bootsplash';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';

import Home from '@screens/home';
import {colors} from '@utils/colors';

import {screenNames} from './screenNames';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer
      onReady={() => {
        BootSplash.hide({fade: true});
      }}>
      <Stack.Navigator
        initialRouteName={screenNames.Home}
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.white,
            paddingHorizontal: moderateScale(20),
            paddingBottom: moderateVerticalScale(20),
          },
        }}>
        <Stack.Screen name={screenNames.Home} component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
