import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Chip } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { formatCurrency } from '../utils/formatting';
import { useFunds } from '../services/investmentService';
import { colors, spacing, borderRadius, shadows } from '../utils/theme';

interface InvestmentSummaryProps {
  fundId: string;
  amount: number;
  isaRemaining: number;
}

const InvestmentSummary: React.FC<InvestmentSummaryProps> = ({
  fundId,
  amount,
  isaRemaining,
}) => {
  // Get fund data from React Query
  const { data: funds, isLoading, error } = useFunds();

  // Find fund data
  const fund = funds?.find(f => f.id === fundId);

  if (isLoading) {
    return (
      <Card style={styles.card} mode="outlined">
        <Card.Content>
          <Text variant="titleLarge" style={styles.loadingTitle}>
            Loading fund details...
          </Text>
        </Card.Content>
      </Card>
    );
  }

  if (error || !fund) {
    return (
      <Card style={styles.card} mode="outlined">
        <Card.Content>
          <Text variant="titleLarge" style={styles.errorTitle}>
            Fund not found
          </Text>
        </Card.Content>
      </Card>
    );
  }

  const warnings = amount > 20000 ? ['Amount exceeds ISA annual limit'] : [];
  const isOverLimit = amount > isaRemaining;

  // Debug logging
  console.log('Investment Summary Debug:', {
    amount,
    isaRemaining,
    isOverLimit,
    difference: amount - isaRemaining,
  });

  return (
    <Card style={styles.card} mode="elevated" elevation={2}>
      <Card.Content>
        <View style={styles.header}>
          <View style={styles.headerIconContainer}>
            <Ionicons
              name="calculator-outline"
              size={20}
              color={colors.neutral[50]}
            />
          </View>
          <Text variant="titleLarge" style={styles.title}>
            Investment Summary
          </Text>
        </View>

        {/* Fund Details */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons
              name="business-outline"
              size={20}
              color={colors.neutral[600]}
            />
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Fund Details
            </Text>
          </View>
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Ionicons
                name="document-text-outline"
                size={16}
                color={colors.neutral[500]}
              />
              <Text variant="bodyMedium" style={styles.detailLabel}>
                Fund Name
              </Text>
            </View>
            <Text variant="bodyLarge" style={styles.detailValue}>
              {fund.name}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Ionicons
                name="grid-outline"
                size={16}
                color={colors.neutral[500]}
              />
              <Text variant="bodyMedium" style={styles.detailLabel}>
                Category
              </Text>
            </View>
            <Text variant="bodyLarge" style={styles.detailValue}>
              {fund.category}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Ionicons
                name="shield-outline"
                size={16}
                color={colors.neutral[500]}
              />
              <Text variant="bodyMedium" style={styles.detailLabel}>
                Risk Level
              </Text>
            </View>
            <Chip
              mode="flat"
              style={[
                styles.riskChip,
                { backgroundColor: colors.warning[200] },
              ]}
              compact
            >
              {fund.riskLevel}
            </Chip>
          </View>
        </View>

        {/* Investment Details */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons
              name="cash-outline"
              size={20}
              color={colors.neutral[600]}
            />
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Investment Details
            </Text>
          </View>
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Ionicons
                name="wallet-outline"
                size={16}
                color={colors.neutral[500]}
              />
              <Text variant="bodyMedium" style={styles.detailLabel}>
                Amount
              </Text>
            </View>
            <Text variant="bodyLarge" style={styles.detailValue}>
              {formatCurrency(amount)}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Ionicons
                name="shield-checkmark-outline"
                size={16}
                color={colors.neutral[500]}
              />
              <Text variant="bodyMedium" style={styles.detailLabel}>
                ISA Annual Limit
              </Text>
            </View>
            <Text variant="bodyLarge" style={styles.detailValue}>
              {formatCurrency(isaRemaining)}
            </Text>
          </View>
        </View>

        {/* Warnings */}
        {warnings.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons
                name="warning-outline"
                size={20}
                color={colors.warning[600]}
              />
              <Text variant="titleMedium" style={styles.warningTitle}>
                Warnings
              </Text>
            </View>
            {warnings.map((warning, index) => (
              <View key={index} style={styles.warningItem}>
                <Ionicons
                  name="alert-circle-outline"
                  size={16}
                  color={colors.warning[600]}
                />
                <Text variant="bodySmall" style={styles.warningText}>
                  {warning}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Over Limit Notice */}
        {isOverLimit && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons
                name="close-circle-outline"
                size={20}
                color={colors.error[600]}
              />
              <Text variant="titleMedium" style={styles.overLimitTitle}>
                Over ISA Limit
              </Text>
            </View>
            <View style={styles.overLimitContent}>
              <Ionicons
                name="information-circle-outline"
                size={16}
                color={colors.error[600]}
              />
              <Text variant="bodySmall" style={styles.overLimitText}>
                This investment will exceed your ISA annual limit. Any amount
                over the limit will be invested outside of your ISA wrapper.
              </Text>
            </View>
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surface.primary,
    ...shadows.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  headerIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary[600],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
    ...shadows.sm,
  },
  title: {
    fontWeight: '700',
    marginLeft: spacing.sm,
    color: colors.neutral[900],
  },
  errorTitle: {
    color: colors.error[600],
    textAlign: 'center',
  },
  loadingTitle: {
    textAlign: 'center',
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontWeight: '600',
    marginLeft: spacing.sm,
    color: colors.neutral[900],
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailLabel: {
    marginLeft: spacing.xs,
    color: colors.neutral[600],
    fontWeight: '500',
  },
  detailValue: {
    fontWeight: '700',
    color: colors.primary[600],
  },
  riskChip: {
    borderRadius: borderRadius.round,
  },
  warningTitle: {
    fontWeight: '600',
    marginLeft: spacing.sm,
    color: colors.warning[600],
  },
  warningItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  warningText: {
    color: colors.warning[600],
    marginLeft: spacing.xs,
    lineHeight: 18,
    flex: 1,
  },
  overLimitTitle: {
    fontWeight: '600',
    marginLeft: spacing.sm,
    color: colors.error[600],
  },
  overLimitContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  overLimitText: {
    color: colors.error[600],
    lineHeight: 18,
    marginLeft: spacing.xs,
    flex: 1,
  },
});

export default InvestmentSummary;
