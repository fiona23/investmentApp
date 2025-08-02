import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text, Chip } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Fund } from '../types/fund';
import {
  formatCurrency,
  formatPercentage,
  formatRiskLevel,
} from '../utils/formatting';
import { colors, spacing, borderRadius, shadows } from '../utils/theme';

interface FundCardProps {
  fund: Fund;
  isSelected?: boolean;
  onSelect?: (fund: Fund) => void;
  onPress?: () => void;
  showDetails?: boolean;
}

const FundCard: React.FC<FundCardProps> = ({
  fund,
  isSelected = false,
  onSelect,
  onPress,
  showDetails = true,
}) => {
  // Safety check for undefined fund
  if (!fund) {
    return null;
  }

  const handlePress = () => {
    if (onSelect) {
      onSelect(fund);
    } else if (onPress) {
      onPress();
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel?.toLowerCase()) {
      case 'low':
        return colors.success[600];
      case 'medium':
        return colors.warning[600];
      case 'high':
        return colors.error[600];
      default:
        return colors.neutral[500];
    }
  };

  const getPerformanceColor = (performance: number) => {
    return performance >= 0 ? colors.success[700] : colors.error[700];
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <Card
        style={[styles.card, isSelected && styles.selectedCard]}
        mode="elevated"
        elevation={isSelected ? 4 : 2}
      >
        <Card.Content style={styles.content}>
          {/* Header with fund name and selection indicator */}
          <View style={styles.header}>
            <View style={styles.fundInfo}>
              <Text variant="titleMedium" style={styles.fundName}>
                {fund.name}
              </Text>
              <Text variant="bodySmall" style={styles.category}>
                {fund.category || 'Investment Fund'}
              </Text>
            </View>
            {isSelected && (
              <View style={styles.selectedIndicator}>
                <Ionicons
                  name="checkmark-circle"
                  size={24}
                  color={colors.primary[600]}
                />
              </View>
            )}
          </View>

          {/* Risk level chip */}
          <View style={styles.riskContainer}>
            <Chip
              mode="flat"
              textStyle={styles.riskText}
              style={[
                styles.riskChip,
                { backgroundColor: getRiskColor(fund.riskLevel) + '20' },
              ]}
              compact
            >
              {fund.riskLevel ? formatRiskLevel(fund.riskLevel) : 'N/A'}
            </Chip>
          </View>

          {showDetails && (
            <>
              {/* Description */}
              <Text variant="bodyMedium" style={styles.description}>
                {fund.description || 'No description available.'}
              </Text>

              {/* Performance and category */}
              <View style={styles.detailsRow}>
                <View style={styles.detailItem}>
                  <Text variant="labelSmall" style={styles.detailLabel}>
                    1 Year Return
                  </Text>
                  <Text
                    variant="bodyMedium"
                    style={[
                      styles.detailValue,
                      {
                        color: getPerformanceColor(
                          fund.performance?.oneYear || 0
                        ),
                      },
                    ]}
                  >
                    {fund.performance?.oneYear
                      ? formatPercentage(fund.performance.oneYear)
                      : 'N/A'}
                  </Text>
                </View>
                <View style={styles.detailItem}>
                  <Text variant="labelSmall" style={styles.detailLabel}>
                    Fund Size
                  </Text>
                  <Text variant="bodyMedium" style={styles.detailValue}>
                    {fund.fundSize ? formatCurrency(fund.fundSize) : 'N/A'}
                  </Text>
                </View>
              </View>

              {/* Min investment */}
              <View style={styles.minInvestmentContainer}>
                <Ionicons
                  name="cash-outline"
                  size={16}
                  color={colors.neutral[500]}
                  style={styles.minInvestmentIcon}
                />
                <Text variant="bodySmall" style={styles.minInvestmentText}>
                  Min investment:{' '}
                  {fund.minInvestment
                    ? formatCurrency(fund.minInvestment)
                    : 'N/A'}
                </Text>
              </View>
            </>
          )}
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: spacing.sm,
    marginHorizontal: spacing.md,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surface.primary,
    ...shadows.md,
  },
  selectedCard: {
    borderColor: colors.primary[600],
    borderWidth: 2,
  },
  content: {
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  fundInfo: {
    flex: 1,
  },
  fundName: {
    fontWeight: '700',
    color: colors.neutral[800],
    marginBottom: 2,
  },

  category: {
    color: colors.neutral[600],
    fontWeight: '500',
  },
  selectedIndicator: {
    marginLeft: spacing.sm,
  },
  riskContainer: {
    marginBottom: spacing.md,
  },
  riskChip: {
    alignSelf: 'flex-start',
    borderRadius: borderRadius.round,
  },
  riskText: {
    fontSize: 12,
    fontWeight: '600',
  },
  description: {
    marginBottom: spacing.md,
    color: colors.neutral[700],
    lineHeight: 20,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    color: colors.neutral[600],
    marginBottom: 4,
    fontWeight: '500',
  },
  detailValue: {
    fontWeight: '700',
    fontSize: 16,
  },
  minInvestmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
  },
  minInvestmentText: {
    color: colors.neutral[700],
    fontWeight: '500',
  },
  minInvestmentIcon: {
    marginRight: 6,
  },
});

export default FundCard;
