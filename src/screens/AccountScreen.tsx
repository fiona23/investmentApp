import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { formatCurrency, formatPercentage } from '../utils/formatting';

type AccountScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Main'
>;

const AccountScreen = () => {
  const navigation = useNavigation<AccountScreenNavigationProp>();

  // Mock data - in real app this would come from state management
  const mockInvestmentSummary = {
    totalInvested: 25000,
    investmentCount: 3,
    currentYearTotal: 25000,
    remainingISALimit: 0,
    averageReturn: 6.8,
  };

  const mockRecentInvestments = [
    {
      id: '1',
      fundName: 'Cushon Equities Fund',
      amount: 25000,
      date: new Date('2024-01-15'),
      status: 'confirmed' as const,
    },
    {
      id: '2',
      fundName: 'Cushon Bonds Fund',
      amount: 5000,
      date: new Date('2023-12-10'),
      status: 'confirmed' as const,
    },
    {
      id: '3',
      fundName: 'Cushon Property Fund',
      amount: 10000,
      date: new Date('2023-11-20'),
      status: 'confirmed' as const,
    },
  ];

  const handleViewHistory = () => {
    // Navigate to investment history screen
    // navigation.navigate('InvestmentHistory');
  };

  const handleNewInvestment = () => {
    navigation.navigate('FundSelection');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text variant="headlineLarge" style={styles.title}>
          My Account
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Investment Summary
        </Text>
      </View>

      {/* Investment Summary Card */}
      <Card style={styles.summaryCard} mode="outlined">
        <Card.Content>
          <Text variant="titleLarge" style={styles.summaryTitle}>
            Portfolio Overview
          </Text>

          <View style={styles.summaryRow}>
            <Text variant="bodyMedium">Total Invested:</Text>
            <Text variant="bodyLarge" style={styles.summaryValue}>
              {formatCurrency(mockInvestmentSummary.totalInvested)}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text variant="bodyMedium">Investments:</Text>
            <Text variant="bodyLarge" style={styles.summaryValue}>
              {mockInvestmentSummary.investmentCount}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text variant="bodyMedium">This Year:</Text>
            <Text variant="bodyLarge" style={styles.summaryValue}>
              {formatCurrency(mockInvestmentSummary.currentYearTotal)}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text variant="bodyMedium">ISA Remaining:</Text>
            <Text variant="bodyLarge" style={styles.summaryValue}>
              {formatCurrency(mockInvestmentSummary.remainingISALimit)}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text variant="bodyMedium">Avg Return:</Text>
            <Text variant="bodyLarge" style={styles.summaryValue}>
              {formatPercentage(mockInvestmentSummary.averageReturn)}
            </Text>
          </View>
        </Card.Content>
      </Card>

      {/* Recent Investments */}
      <View style={styles.section}>
        <Text variant="titleLarge" style={styles.sectionTitle}>
          Recent Investments
        </Text>

        {mockRecentInvestments.map(investment => (
          <Card
            key={investment.id}
            style={styles.investmentCard}
            mode="outlined"
          >
            <Card.Content>
              <View style={styles.investmentHeader}>
                <Text variant="titleMedium" style={styles.fundName}>
                  {investment.fundName}
                </Text>
                <Text variant="bodyLarge" style={styles.investmentAmount}>
                  {formatCurrency(investment.amount)}
                </Text>
              </View>

              <View style={styles.investmentDetails}>
                <Text variant="bodySmall" style={styles.investmentDate}>
                  {investment.date.toLocaleDateString()}
                </Text>
                <Text variant="bodySmall" style={styles.investmentStatus}>
                  {investment.status}
                </Text>
              </View>
            </Card.Content>
          </Card>
        ))}
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <Button
          mode="contained"
          onPress={handleNewInvestment}
          style={styles.actionButton}
        >
          New Investment
        </Button>

        <Button
          mode="outlined"
          onPress={handleViewHistory}
          style={styles.actionButton}
        >
          View History
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    color: '#666',
  },
  summaryCard: {
    marginBottom: 24,
  },
  summaryTitle: {
    fontWeight: '600',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryValue: {
    fontWeight: '600',
    color: '#2196F3',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: 16,
  },
  investmentCard: {
    marginBottom: 12,
  },
  investmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  fundName: {
    flex: 1,
    fontWeight: '500',
  },
  investmentAmount: {
    fontWeight: '600',
    color: '#2196F3',
  },
  investmentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  investmentDate: {
    color: '#666',
  },
  investmentStatus: {
    color: '#4CAF50',
    textTransform: 'capitalize',
  },
  actions: {
    gap: 12,
  },
  actionButton: {
    marginBottom: 8,
  },
});

export default AccountScreen;
