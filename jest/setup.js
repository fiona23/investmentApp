// Include this line for mocking react-native-gesture-handler
import 'react-native-gesture-handler/jestSetup';

// Include this section for mocking react-native-reanimated
import { setUpTests } from 'react-native-reanimated';

setUpTests();

// Mock react-native-screens
jest.mock('react-native-screens', () => {
  const RNScreens = jest.requireActual('react-native-screens');
  return {
    ...RNScreens,
    Screen: require('react-native').View,
  };
});

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const { View } = require('react-native');

  const SafeAreaProvider = ({ children }) =>
    React.createElement(View, null, children);
  const SafeAreaView = ({ children, style }) =>
    React.createElement(View, { style }, children);
  const useSafeAreaInsets = () => ({ top: 0, right: 0, bottom: 0, left: 0 });

  return {
    SafeAreaProvider,
    SafeAreaView,
    useSafeAreaInsets,
  };
});

// Mock react-native-paper
jest.mock('react-native-paper', () => {
  const React = require('react');
  const { View } = require('react-native');

  const PaperProvider = ({ children }) =>
    React.createElement(View, null, children);
  const Text = ({ children, style }) =>
    React.createElement(View, { style }, children);
  const Button = ({ children, onPress, style }) =>
    React.createElement(View, { style, onPress }, children);

  return {
    PaperProvider,
    Text,
    Button,
    // Add other components as needed
  };
});
