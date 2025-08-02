import React from 'react';
import { PaperProvider } from 'react-native-paper';

interface PaperUIProviderProps {
  children: React.ReactNode;
}

const PaperUIProvider = ({ children }: PaperUIProviderProps) => {
  return <PaperProvider>{children}</PaperProvider>;
};

export default PaperUIProvider;
