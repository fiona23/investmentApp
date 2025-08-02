import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Divider, Chip } from 'react-native-paper';
import { Fund } from '../types/fund';
import {
  formatCurrency,
  formatPercentage,
  formatRiskLevel,
} from '../utils/formatting';
import { APP_CONSTANTS } from '../utils/constants';

interface InvestmentSummaryProps {
  fund: Fund;
  amount: number;
  warnings?: string[];
}

const InvestmentSummary: React.FC<InvestmentSummaryProps> = ({
  fund,
  amount,
  warnings = [],
}) => {
  const isOverLimit = amount > APP_CONSTANTS.ISA_ANNUAL_LIMIT;

  return (
    <View style={styles.container}>
      <Card style={styles.card} mode="outlined">
        <Card.Content>
          <Text variant="titleLarge" style={styles.title}>
            Investment Summary
          </Text>

          <Divider style={styles.divider} />

          {/* Fund Information */}
          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Fund Details
            </Text>
            <View style={styles.fundInfo}>
              <Text variant="bodyLarge" style={styles.fundName}>
                {fund.name}
              </Text>
              <Chip mode="outlined" style={styles.riskChip}>
                {formatRiskLevel(fund.riskLevel)}
              </Chip>
            </View>
            <Text variant="bodyMedium" style={styles.description}>
              {fund.description}
            </Text>
          </View>

          <Divider style={styles.divider} />

          {/* Investment Details */}
          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Investment Details
            </Text>
            <View style={styles.detailsRow}>
              <Text variant="bodyMedium">Amount:</Text>
              <Text variant="bodyLarge" style={styles.amount}>
                {formatCurrency(amount)}
              </Text>
            </View>
            <View style={styles.detailsRow}>
              <Text variant="bodyMedium">Fund Category:</Text>
              <Text variant="bodyMedium">{fund.category}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text variant="bodyMedium">Annual Return:</Text>
              <Text variant="bodyMedium">
                {formatPercentage(fund.performance)}
              </Text>
            </View>
          </View>

          <Divider style={styles.divider} />

          {/* ISA Information */}
          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              ISA Information
            </Text>
            <View style={styles.detailsRow}>
              <Text variant="bodyMedium">Annual Limit:</Text>
              <Text variant="bodyMedium">
                {formatCurrency(APP_CONSTANTS.ISA_ANNUAL_LIMIT)}
              </Text>
            </View>
            <View style={styles.detailsRow}>
              <Text variant="bodyMedium">Remaining:</Text>
              <Text variant="bodyMedium">
                {formatCurrency(APP_CONSTANTS.ISA_ANNUAL_LIMIT - amount)}
              </Text>
            </View>
          </View>

          {/* Warnings */}
          {warnings.length > 0 && (
            <>
              <Divider style={styles.divider} />
              <View style={styles.section}>
                <Text variant="titleMedium" style={styles.warningTitle}>
                  Warnings
                </Text>
                {warnings.map((warning, index) => (
                  <Text key={index} variant="bodyMedium" style={styles.warning}>
                    • {warning}
                  </Text>
                ))}
              </View>
            </>
          )}

          {/* Over Limit Warning */}
          {isOverLimit && (
            <>
              <Divider style={styles.divider} />
              <View style={styles.section}>
                <Text variant="titleMedium" style={styles.warningTitle}>
                  Important Notice
                </Text>
                <Text variant="bodyMedium" style={styles.warning}>
                  This investment exceeds the ISA annual limit of{' '}
                  {formatCurrency(APP_CONSTANTS.ISA_ANNUAL_LIMIT)}. Any amount
                  over this limit will not receive ISA tax benefits.
                </Text>
              </View>
            </>
          )}
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    elevation: 2,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '600',
  },
  divider: {
    marginVertical: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 12,
    fontWeight: '600',
  },
  fundInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  fundName: {
    flex: 1,
    fontWeight: '500',
  },
  riskChip: {
    marginLeft: 8,
  },
  description: {
    color: '#666',
    lineHeight: 20,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  amount: {
    fontWeight: '600',
    color: '#2196F3',
  },
  warningTitle: {
    marginBottom: 8,
    color: '#FF9800',
    fontWeight: '600',
  },
  warning: {
    color: '#FF9800',
    marginBottom: 4,
  },
});

export default InvestmentSummary;
