import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, shadows } from '../utils/theme';

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
          <Ionicons
            name="warning-outline"
            size={64}
            color={colors.error[600]}
          />
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
            buttonColor={colors.error[600]}
            textColor={colors.neutral[50]}
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
    padding: spacing.lg,
  },
  fullscreen: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  card: {
    padding: spacing.xl,
    backgroundColor: colors.surface.primary,
    borderRadius: borderRadius.lg,
    margin: spacing.md,
    ...shadows.md,
  },
  content: {
    alignItems: 'center',
    maxWidth: 320,
  },
  iconContainer: {
    marginBottom: spacing.lg,
  },
  title: {
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: spacing.sm,
    color: colors.neutral[900],
  },
  message: {
    textAlign: 'center',
    color: colors.neutral[600],
    marginBottom: spacing.xl,
    lineHeight: 22,
    fontWeight: '500',
  },
  retryButton: {
    marginTop: spacing.sm,
    borderRadius: borderRadius.md,
  },
});

export default ErrorState;
