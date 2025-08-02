import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { TabParamList } from '../types/navigation';
import AccountScreen from '../screens/AccountScreen';
import FundScreen from '../screens/FundScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { colors, shadows } from '../utils/theme';

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface.primary,
          borderTopWidth: 0,
          paddingBottom: 20,
          paddingTop: 12,
          height: 88,
          ...shadows.lg,
        },
        tabBarActiveTintColor: colors.primary[600],
        tabBarInactiveTintColor: colors.neutral[400],
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginBottom: 0,
        },
      }}
    >
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? 'pie-chart' : 'pie-chart-outline'}
              size={26}
              color={color}
            />
          ),
          tabBarLabel: 'Account',
        }}
      />
      <Tab.Screen
        name="Fund"
        component={FundScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? 'analytics' : 'analytics-outline'}
              size={26}
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
              name={focused ? 'person-circle' : 'person-circle-outline'}
              size={26}
              color={color}
            />
          ),
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
