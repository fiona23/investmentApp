import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../types/navigation';
import { useInvestmentStore } from '../store/investmentStore';
import { formatCurrency, formatDate } from '../utils/formatting';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';

type AccountScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Main'
>;

const AccountScreen = () => {
  const navigation = useNavigation<AccountScreenNavigationProp>();
  const insets = useSafeAreaInsets();
  const {
    investmentSummary,
    investments,
    isLoading,
    error,
    loadInvestmentSummary,
    loadInvestments,
  } = useInvestmentStore();

  useEffect(() => {
    loadInvestmentSummary();
    loadInvestments();
  }, [loadInvestmentSummary, loadInvestments]);

  const handleBrowseFunds = () => {
    navigation.navigate('Main', { screen: 'Fund' });
  };

  const handleViewTransactions = () => {
    navigation.navigate('TransactionHistory');
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <LoadingState message="Loading your account..." variant="fullscreen" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <ErrorState
          title="Failed to load account"
          message={error}
          onRetry={() => {
            loadInvestmentSummary();
            loadInvestments();
          }}
          variant="fullscreen"
        />
      </View>
    );
  }

  // Show empty state if no investments
  if (investmentSummary.investmentCount === 0) {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.contentContainer,
            { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 16 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text variant="headlineLarge" style={styles.title}>
              Your Account
            </Text>
            <Text variant="bodyLarge" style={styles.subtitle}>
              Track your investment portfolio
            </Text>
          </View>

          <EmptyState
            title="No investments yet"
            message="Start your investment journey by exploring our range of funds"
            actionLabel="Browse Funds"
            onAction={handleBrowseFunds}
          />
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 16 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text variant="headlineLarge" style={styles.title}>
            Your Account
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            Track your investment portfolio
          </Text>
        </View>

        {/* Investment Summary */}
        <Card style={styles.summaryCard} mode="outlined">
          <Card.Content>
            <Text variant="titleLarge" style={styles.summaryTitle}>
              Investment Summary
            </Text>
            <View style={styles.summaryRow}>
              <Text variant="bodyMedium">Total Invested:</Text>
              <Text variant="bodyLarge" style={styles.summaryValue}>
                {formatCurrency(investmentSummary.totalInvested)}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text variant="bodyMedium">Number of Investments:</Text>
              <Text variant="bodyLarge" style={styles.summaryValue}>
                {investmentSummary.investmentCount}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text variant="bodyMedium">This Year's Total:</Text>
              <Text variant="bodyLarge" style={styles.summaryValue}>
                {formatCurrency(investmentSummary.currentYearTotal)}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text variant="bodyMedium">ISA Remaining:</Text>
              <Text variant="bodyLarge" style={styles.summaryValue}>
                {formatCurrency(investmentSummary.remainingISALimit)}
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Recent Transactions */}
        <Card style={styles.transactionsCard} mode="outlined">
          <Card.Content>
            <View style={styles.transactionsHeader}>
              <Text variant="titleLarge" style={styles.transactionsTitle}>
                Recent Transactions
              </Text>
              <Button
                mode="text"
                onPress={handleViewTransactions}
                style={styles.viewAllButton}
              >
                View All
              </Button>
            </View>
            {investments.slice(0, 3).map(investment => (
              <View key={investment.id} style={styles.transactionItem}>
                <View style={styles.transactionInfo}>
                  <Text variant="bodyMedium" style={styles.fundName}>
                    {investment.fundName}
                  </Text>
                  <Text variant="bodySmall" style={styles.transactionDate}>
                    {formatDate(investment.createdAt)}
                  </Text>
                </View>
                <View style={styles.transactionAmount}>
                  <Text variant="bodyLarge" style={styles.amount}>
                    {formatCurrency(investment.amount)}
                  </Text>
                  <Text variant="bodySmall" style={styles.status}>
                    {investment.status}
                  </Text>
                </View>
              </View>
            ))}
          </Card.Content>
        </Card>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <Button
            mode="contained"
            onPress={handleBrowseFunds}
            style={styles.actionButton}
          >
            Browse Funds
          </Button>
          <Button
            mode="outlined"
            onPress={handleViewTransactions}
            style={styles.actionButton}
          >
            View Transaction History
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
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
  transactionsCard: {
    marginBottom: 24,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  transactionsTitle: {
    fontWeight: '600',
  },
  viewAllButton: {
    paddingVertical: 0,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  transactionInfo: {
    flex: 1,
  },
  fundName: {
    fontWeight: '500',
    marginBottom: 4,
  },
  transactionDate: {
    color: '#666',
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  amount: {
    fontWeight: '600',
    color: '#2196F3',
  },
  status: {
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
