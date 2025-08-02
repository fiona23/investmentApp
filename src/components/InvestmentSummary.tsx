import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Chip } from 'react-native-paper';
import { formatCurrency } from '../utils/formatting';
import { useFunds } from '../services/investmentService';

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

  return (
    <Card style={styles.card} mode="outlined">
      <Card.Content>
        <Text variant="titleLarge" style={styles.title}>
          Investment Summary
        </Text>

        {/* Fund Details */}
        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Fund Details
          </Text>
          <View style={styles.detailRow}>
            <Text variant="bodyMedium">Fund Name:</Text>
            <Text variant="bodyLarge" style={styles.detailValue}>
              {fund.name}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text variant="bodyMedium">Category:</Text>
            <Text variant="bodyLarge" style={styles.detailValue}>
              {fund.category}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text variant="bodyMedium">Risk Level:</Text>
            <Chip mode="outlined" style={styles.riskChip}>
              {fund.riskLevel}
            </Chip>
          </View>
        </View>

        {/* Investment Details */}
        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Investment Details
          </Text>
          <View style={styles.detailRow}>
            <Text variant="bodyMedium">Amount:</Text>
            <Text variant="bodyLarge" style={styles.detailValue}>
              {formatCurrency(amount)}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text variant="bodyMedium">ISA Annual Limit:</Text>
            <Text variant="bodyLarge" style={styles.detailValue}>
              {formatCurrency(isaRemaining)}
            </Text>
          </View>
        </View>

        {/* Warnings */}
        {warnings.length > 0 && (
          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.warningTitle}>
              Warnings
            </Text>
            {warnings.map((warning, index) => (
              <Text key={index} variant="bodySmall" style={styles.warningText}>
                • {warning}
              </Text>
            ))}
          </View>
        )}

        {/* Over Limit Notice */}
        {isOverLimit && (
          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.overLimitTitle}>
              Over ISA Limit
            </Text>
            <Text variant="bodySmall" style={styles.overLimitText}>
              This investment will exceed your ISA annual limit. Any amount over
              the limit will be invested outside of your ISA wrapper.
            </Text>
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  title: {
    fontWeight: '600',
    marginBottom: 20,
  },
  errorTitle: {
    color: '#f44336',
    textAlign: 'center',
  },
  loadingTitle: {
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailValue: {
    fontWeight: '500',
    color: '#2196F3',
  },
  riskChip: {
    backgroundColor: '#f0f0f0',
  },
  warningTitle: {
    fontWeight: '600',
    marginBottom: 8,
    color: '#ff9800',
  },
  warningText: {
    color: '#ff9800',
    marginBottom: 4,
  },
  overLimitTitle: {
    fontWeight: '600',
    marginBottom: 8,
    color: '#f44336',
  },
  overLimitText: {
    color: '#f44336',
    lineHeight: 18,
  },
});

export default InvestmentSummary;
