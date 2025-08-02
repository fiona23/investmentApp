import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, shadows } from '../utils/theme';

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
          <Ionicons
            name="pie-chart-outline"
            size={80}
            color={colors.primary[600]}
          />
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
            buttonColor={colors.primary[600]}
            textColor={colors.neutral[50]}
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
    marginBottom: spacing.xl,
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
  actionButton: {
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
  },
});

export default EmptyState;
