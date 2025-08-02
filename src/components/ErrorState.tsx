import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  variant?: 'fullscreen' | 'inline' | 'card';
  showRetry?: boolean;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'We encountered an error while loading your data. Please try again.',
  onRetry,
  variant = 'inline',
  showRetry = true,
}) => {
  const containerStyle = [
    styles.container,
    variant === 'fullscreen' && styles.fullscreen,
    variant === 'card' && styles.card,
  ];

  return (
    <View style={containerStyle}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="alert-circle-outline" size={48} color="#FF3B30" />
        </View>

        <Text variant="titleLarge" style={styles.title}>
          {title}
        </Text>

        <Text variant="bodyMedium" style={styles.message}>
          {message}
        </Text>

        {showRetry && onRetry && (
          <Button
            mode="contained"
            onPress={onRetry}
            style={styles.retryButton}
            icon="refresh"
          >
            Try Again
          </Button>
        )}
      </View>
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
    padding: 24,
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
  content: {
    alignItems: 'center',
    maxWidth: 300,
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  message: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 24,
    lineHeight: 20,
  },
  retryButton: {
    marginTop: 8,
  },
});

export default ErrorState;
