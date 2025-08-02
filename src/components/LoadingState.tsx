import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { colors, spacing, borderRadius, shadows } from '../utils/theme';

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
      {variant === 'fullscreen' && (
        <View style={styles.loadingContent}>
          <ActivityIndicator
            size={size}
            color={colors.primary[600]}
            style={styles.spinner}
          />
        </View>
      )}
      {variant !== 'fullscreen' && (
        <ActivityIndicator size={size} color={colors.primary[600]} />
      )}
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
    padding: spacing.lg,
  },
  fullscreen: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  loadingContent: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  spinner: {
    marginBottom: spacing.md,
  },
  card: {
    padding: spacing.xl,
    backgroundColor: colors.surface.primary,
    borderRadius: borderRadius.lg,
    margin: spacing.md,
    ...shadows.md,
  },
  message: {
    marginTop: spacing.sm,
    color: colors.neutral[600],
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default LoadingState;
