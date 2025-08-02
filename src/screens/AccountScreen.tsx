import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../types/navigation';
import { useInvestmentStore } from '../store/investmentStore';
import { formatCurrency, formatDate, formatStatus } from '../utils/formatting';
import { colors, spacing, borderRadius, shadows } from '../utils/theme';
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

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return colors.secondary[600];
      case 'completed':
        return colors.success[600];
      case 'failed':
        return colors.error[600];
      default:
        return colors.neutral[600];
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <LoadingState message="Loading my account..." variant="fullscreen" />
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
              My Account
            </Text>
            <Text variant="bodyLarge" style={styles.subtitle}>
              Track my investment portfolio
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
            My Account
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            Track my investment portfolio
          </Text>
        </View>

        {/* Investment Summary */}
        <Card style={styles.summaryCard} mode="elevated" elevation={2}>
          <Card.Content>
            <View style={styles.summaryHeader}>
              <Ionicons
                name="trending-up"
                size={24}
                color={colors.primary[600]}
              />
              <Text variant="titleLarge" style={styles.summaryTitle}>
                Investment Summary
              </Text>
            </View>

            <View style={styles.summaryGrid}>
              <View style={styles.summaryItem}>
                <Ionicons
                  name="wallet-outline"
                  size={20}
                  color={colors.neutral[500]}
                />
                <Text variant="bodySmall" style={styles.summaryLabel}>
                  Total Invested
                </Text>
                <Text variant="titleMedium" style={styles.summaryValue}>
                  {formatCurrency(investmentSummary.totalInvested)}
                </Text>
              </View>

              <View style={styles.summaryItem}>
                <Ionicons
                  name="layers-outline"
                  size={20}
                  color={colors.neutral[500]}
                />
                <Text variant="bodySmall" style={styles.summaryLabel}>
                  Investments
                </Text>
                <Text variant="titleMedium" style={styles.summaryValue}>
                  {investmentSummary.investmentCount}
                </Text>
              </View>

              <View style={styles.summaryItem}>
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color={colors.neutral[500]}
                />
                <Text variant="bodySmall" style={styles.summaryLabel}>
                  This Year
                </Text>
                <Text variant="titleMedium" style={styles.summaryValue}>
                  {formatCurrency(investmentSummary.currentYearTotal)}
                </Text>
              </View>

              <View style={styles.summaryItem}>
                <Ionicons
                  name="shield-outline"
                  size={20}
                  color={colors.neutral[500]}
                />
                <Text variant="bodySmall" style={styles.summaryLabel}>
                  ISA Remaining
                </Text>
                <Text variant="titleMedium" style={styles.summaryValue}>
                  {formatCurrency(investmentSummary.remainingISALimit)}
                </Text>
              </View>
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
            {investments
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .slice(0, 3)
              .map(investment => (
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
                    <View
                      style={[
                        styles.statusBadge,
                        {
                          backgroundColor:
                            getStatusColor(investment.status) + '20',
                        },
                      ]}
                    >
                      <View
                        style={[
                          styles.statusDot,
                          {
                            backgroundColor: getStatusColor(investment.status),
                          },
                        ]}
                      />
                      <Text
                        style={[
                          styles.statusText,
                          { color: getStatusColor(investment.status) },
                        ]}
                      >
                        {formatStatus(investment.status)}
                      </Text>
                    </View>
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
    backgroundColor: colors.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: spacing.md,
  },
  header: {
    marginBottom: spacing.xl,
  },

  title: {
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    color: colors.neutral[600],
    fontWeight: '500',
  },
  summaryCard: {
    marginBottom: spacing.xl,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surface.primary,
    ...shadows.md,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  summaryTitle: {
    fontWeight: '700',
    marginLeft: spacing.sm,
    color: colors.neutral[800],
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  summaryItem: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.neutral[100],
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
  },
  summaryLabel: {
    color: colors.neutral[700],
    marginTop: spacing.xs,
    marginBottom: spacing.xs,
    fontWeight: '500',
    textAlign: 'center',
  },
  summaryValue: {
    fontWeight: '700',
    color: colors.primary[600],
    textAlign: 'center',
  },

  transactionsCard: {
    marginBottom: spacing.xl,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surface.primary,
    ...shadows.md,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  transactionsTitle: {
    fontWeight: '700',
    color: colors.neutral[800],
  },
  viewAllButton: {
    paddingVertical: 0,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  transactionInfo: {
    flex: 1,
  },
  fundName: {
    fontWeight: '600',
    marginBottom: spacing.xs,
    color: colors.neutral[800],
  },
  transactionDate: {
    color: colors.neutral[500],
    fontSize: 12,
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  amount: {
    fontWeight: '700',
    color: colors.primary[600],
  },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
  },
  statusDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginRight: 4,
  },
  statusText: {
    textTransform: 'capitalize',
    fontWeight: '600',
    fontSize: 10,
  },
  actions: {
    gap: spacing.sm,
  },
  actionButton: {
    marginBottom: spacing.sm,
    borderRadius: borderRadius.md,
  },
});

export default AccountScreen;
