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

  const List = {
    Item: ({ title, description, left, right, onPress, ...props }) =>
      React.createElement(
        TouchableOpacity,
        {
          style: { padding: 16, flexDirection: 'row', alignItems: 'center' },
          onPress,
          ...props,
        },
        left && left({}),
        React.createElement(View, { style: { flex: 1, marginLeft: 16 } }, [
          React.createElement(
            RNText,
            { key: 'title', style: { fontWeight: '500' } },
            title
          ),
          description &&
            React.createElement(
              RNText,
              { key: 'desc', style: { color: '#666' } },
              description
            ),
        ]),
        right && right({})
      ),
    Icon: ({ icon, ...props }) =>
      React.createElement(RNText, { ...props }, icon),
  };

  const Avatar = {
    Text: ({ size, label, ...props }) =>
      React.createElement(
        View,
        {
          style: {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: '#2196F3',
            justifyContent: 'center',
            alignItems: 'center',
          },
          ...props,
        },
        React.createElement(
          RNText,
          { style: { color: 'white', fontWeight: '600' } },
          label
        )
      ),
  };

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
    List,
    Avatar,
  };
});

// Mock @tanstack/react-query
jest.mock('@tanstack/react-query', () => {
  const React = require('react');
  const { View } = require('react-native');

  const QueryClient = function () {
    return {
      invalidateQueries: jest.fn(),
      setQueryData: jest.fn(),
    };
  };

  const QueryClientProvider = ({ children }) =>
    React.createElement(View, { testID: 'query-client-provider' }, children);

  const useQuery = jest.fn(() => ({
    data: null,
    isLoading: false,
    error: null,
    refetch: jest.fn(),
  }));

  const useMutation = jest.fn(() => ({
    mutate: jest.fn(),
    mutateAsync: jest.fn(),
    isPending: false,
    isError: false,
    error: null,
  }));

  const useQueryClient = jest.fn(() => ({
    invalidateQueries: jest.fn(),
    setQueryData: jest.fn(),
  }));

  return {
    QueryClient,
    QueryClientProvider,
    useQuery,
    useMutation,
    useQueryClient,
  };
});

// Mock @expo/vector-icons
jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { Text: RNText } = require('react-native');

  const Ionicons = ({ name, ...props }) =>
    React.createElement(RNText, { ...props }, name);

  return {
    Ionicons,
  };
});
