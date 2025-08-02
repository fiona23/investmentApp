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
  const { View, Text: RNText, TouchableOpacity } = require('react-native');

  // Create a simple mock for PaperProvider that doesn't try to access internal properties
  const PaperProvider = ({ children }) => {
    return React.createElement(View, { testID: 'paper-provider' }, children);
  };
  const Text = ({ children, style, ...props }) =>
    React.createElement(RNText, { style, ...props }, children);
  const Button = ({ children, onPress, style, disabled, ...props }) =>
    React.createElement(
      TouchableOpacity,
      {
        style,
        onPress: disabled ? undefined : onPress,
        disabled,
        ...props,
      },
      children
    );

  const Card = ({ children, style, ...props }) =>
    React.createElement(View, { style, ...props }, children);

  Card.Content = ({ children, style, ...props }) =>
    React.createElement(View, { style, ...props }, children);

  const Chip = ({ children, textStyle, style, onPress, ...props }) =>
    React.createElement(
      TouchableOpacity,
      {
        style,
        onPress,
        ...props,
      },
      React.createElement(RNText, { style: textStyle }, children)
    );

  const IconButton = ({ icon, style, onPress, testID, ...props }) =>
    React.createElement(
      TouchableOpacity,
      {
        style,
        onPress,
        testID,
        ...props,
      },
      React.createElement(RNText, null, icon)
    );

  const TextInput = ({
    value,
    onChangeText,
    style,
    left,
    right,
    placeholder,
    disabled,
    keyboardType,
    ...props
  }) => {
    const inputElement = React.createElement(RNText, {
      value,
      onChangeText,
      style,
      placeholder,
      disabled,
      keyboardType,
      ...props,
    });

    return React.createElement(View, { style }, left, inputElement, right);
  };

  TextInput.Affix = ({ text, style, ...props }) =>
    React.createElement(RNText, { style, ...props }, text);

  const HelperText = ({ children, visible, style, ...props }) =>
    visible ? React.createElement(RNText, { style, ...props }, children) : null;

  const Divider = ({ style, ...props }) =>
    React.createElement(View, { style, ...props });

  const Searchbar = ({ placeholder, onChangeText, style, ...props }) =>
    React.createElement(
      TouchableOpacity,
      {
        style,
        onPress: () => onChangeText && onChangeText(''),
        ...props,
      },
      React.createElement(RNText, null, placeholder)
    );

  const ActivityIndicator = ({ ...props }) =>
    React.createElement(View, { ...props }, 'Loading...');

  return {
    PaperProvider,
    Text,
    Button,
    Card,
    Chip,
    IconButton,
    TextInput,
    HelperText,
    Divider,
    Searchbar,
    ActivityIndicator,
  };
});
