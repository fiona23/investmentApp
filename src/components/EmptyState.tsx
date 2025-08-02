import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

interface EmptyStateProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  variant?: 'fullscreen' | 'inline' | 'card';
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No investments yet',
  message = 'Start building your investment portfolio by making your first investment.',
  actionLabel = 'Start Investing',
  onAction,
  variant = 'inline',
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
          <Ionicons name="trending-up-outline" size={64} color="#007AFF" />
        </View>

        <Text variant="headlineSmall" style={styles.title}>
          {title}
        </Text>

        <Text variant="bodyMedium" style={styles.message}>
          {message}
        </Text>

        {onAction && (
          <Button
            mode="contained"
            onPress={onAction}
            style={styles.actionButton}
            icon="plus"
          >
            {actionLabel}
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
    padding: 32,
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
    maxWidth: 280,
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
    color: '#1a1a1a',
  },
  message: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 32,
    lineHeight: 20,
  },
  actionButton: {
    paddingHorizontal: 24,
  },
});

export default EmptyState;
