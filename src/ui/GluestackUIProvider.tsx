import React from 'react';
import { GluestackUIProvider as Provider } from '@gluestack-ui/themed';

interface GluestackUIProviderProps {
  children: React.ReactNode;
}

const GluestackUIProvider = ({ children }: GluestackUIProviderProps) => {
  return <Provider>{children}</Provider>;
};

export default GluestackUIProvider;
