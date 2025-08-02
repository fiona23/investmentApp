import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

interface LoadingStateProps {
  message?: string;
  size?: 'small' | 'large';
  variant?: 'fullscreen' | 'inline' | 'card';
}

const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading...',
  size = 'large',
  variant = 'inline',
}) => {
  const containerStyle = [
    styles.container,
    variant === 'fullscreen' && styles.fullscreen,
    variant === 'card' && styles.card,
  ];

  return (
    <View style={containerStyle}>
      <ActivityIndicator size={size} color="#007AFF" />
      {message && (
        <Text variant="bodyMedium" style={styles.message}>
          {message}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  fullscreen: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    padding: 40,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  message: {
    marginTop: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default LoadingState;
