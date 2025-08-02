import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import QueryProvider from './src/providers/QueryProvider';
import AppNavigator from './src/navigation/AppNavigator';
import theme from './src/utils/theme';

export default function App() {
  return (
    <QueryProvider>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <AppNavigator />
          <StatusBar style="dark" backgroundColor={theme.colors.background} />
        </PaperProvider>
      </SafeAreaProvider>
    </QueryProvider>
  );
}
