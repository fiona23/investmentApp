import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import QueryProvider from './src/providers/QueryProvider';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <QueryProvider>
      <SafeAreaProvider>
        <PaperProvider>
          <AppNavigator />
          <StatusBar style="auto" />
        </PaperProvider>
      </SafeAreaProvider>
    </QueryProvider>
  );
}
