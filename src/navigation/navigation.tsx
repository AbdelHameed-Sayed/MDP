import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BootSplash from 'react-native-bootsplash';

import AddIncomeExpenseTransaction from '@screens/addIncomeExpenseTransaction/addIncomeExpenseTransaction';
import FinancialReport from '@screens/financialReport/financialReport';
import preFinancialReport from '@screens/preFinancialReport/preFinancialReport';
import Transactions from '@screens/transactions/transactions';
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
        initialRouteName={screenNames.Transactions}
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.white,
          },
        }}>
        <Stack.Screen
          name={screenNames.Transactions}
          component={Transactions}
        />
        <Stack.Screen
          name={screenNames.AddIncomeExpenseTransaction}
          component={AddIncomeExpenseTransaction}
        />
        <Stack.Screen
          name={screenNames.PreFinancialReport}
          component={preFinancialReport}
        />
        <Stack.Screen
          name={screenNames.FinancialReport}
          component={FinancialReport}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
