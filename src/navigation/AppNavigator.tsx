import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import TabNavigation from './TabNavigation';
import FundSelectionScreen from '../screens/FundSelectionScreen';
import InvestmentAmountScreen from '../screens/InvestmentAmountScreen';
import InvestmentSummaryScreen from '../screens/InvestmentSummaryScreen';
import FundDetailsScreen from '../screens/FundDetailsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Main" component={TabNavigation} />
        <Stack.Screen name="FundSelection" component={FundSelectionScreen} />
        <Stack.Screen
          name="InvestmentAmount"
          component={InvestmentAmountScreen}
        />
        <Stack.Screen
          name="InvestmentSummary"
          component={InvestmentSummaryScreen}
        />
        <Stack.Screen name="FundDetails" component={FundDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
