import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import AccountScreen from '../screens/AccountScreen';
import FundScreen from '../screens/FundScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FundSelectionScreen from '../screens/FundSelectionScreen';
import InvestmentAmountScreen from '../screens/InvestmentAmountScreen';
import InvestmentSummaryScreen from '../screens/InvestmentSummaryScreen';
import { RootStackParamList, TabParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#E5E5EA',
          paddingBottom: 8,
          paddingTop: 8,
          height: 88,
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? 'wallet' : 'wallet-outline'}
              size={24}
              color={color}
            />
          ),
          tabBarLabel: 'Account',
        }}
      />
      <Tab.Screen
        name="Funds"
        component={FundScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? 'trending-up' : 'trending-up-outline'}
              size={24}
              color={color}
            />
          ),
          tabBarLabel: 'Funds',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={24}
              color={color}
            />
          ),
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen
          name="FundSelection"
          component={FundSelectionScreen}
          options={{
            headerShown: true,
            title: 'Select Fund',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name="InvestmentAmount"
          component={InvestmentAmountScreen}
          options={{
            headerShown: true,
            title: 'Investment Amount',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name="InvestmentSummary"
          component={InvestmentSummaryScreen}
          options={{
            headerShown: true,
            title: 'Confirm Investment',
            headerBackTitle: 'Back',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
