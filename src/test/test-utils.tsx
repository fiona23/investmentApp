import React from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import theme from '../utils/theme';

// Create a custom render function with navigation providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer>{children}</NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything
export * from '@testing-library/react-native';

// Override render method
export { customRender as render };
