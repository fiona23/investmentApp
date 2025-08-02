import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { formatCurrency, formatPercentage } from '../utils/formatting';
import {
  useInvestmentSummary,
  useInvestments,
  useHasInvestments,
} from '../services/investmentService';
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

  // React Query hooks
  const {
    data: investmentSummary,
    isLoading: isLoadingSummary,
    error: summaryError,
    refetch: refetchSummary,
  } = useInvestmentSummary();

  const {
    data: investments,
    isLoading: isLoadingInvestments,
    error: investmentsError,
    refetch: refetchInvestments,
  } = useInvestments();

  const { hasInvestments, isLoading: isLoadingHasInvestments } =
    useHasInvestments();

  const handleViewHistory = () => {
    // Navigate to investment history screen
    // navigation.navigate('InvestmentHistory');
  };

  const handleBrowseFunds = () => {
    navigation.navigate('Main', { screen: 'Fund' });
  };

  const handleNewInvestment = () => {
    navigation.navigate('Main', { screen: 'Fund' });
  };

  // Loading states
  if (isLoadingSummary || isLoadingInvestments || isLoadingHasInvestments) {
    return (
      <View style={styles.container}>
        <LoadingState
          message="Loading your investments..."
          variant="fullscreen"
        />
      </View>
    );
  }

  // Error states
  if (summaryError || investmentsError) {
    return (
      <View style={styles.container}>
        <ErrorState
          title="Failed to load investments"
          message="We couldn't load your investment data. Please check your connection and try again."
          onRetry={() => {
            refetchSummary();
            refetchInvestments();
          }}
          variant="fullscreen"
        />
      </View>
    );
  }

  // Empty state - no investments yet
  if (!hasInvestments) {
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
              Welcome to your investment journey
            </Text>
          </View>

          {/* Empty State */}
          <EmptyState
            title="Start your investment journey"
            message="You haven't made any investments yet. Start building your portfolio by making your first investment."
            actionLabel="Browse Funds"
            onAction={handleBrowseFunds}
            variant="card"
          />
        </ScrollView>
      </View>
    );
  }

  // Main content - user has investments
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
                {formatCurrency(investmentSummary?.totalInvested || 0)}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text variant="bodyMedium">Investments:</Text>
              <Text variant="bodyLarge" style={styles.summaryValue}>
                {investmentSummary?.investmentCount || 0}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text variant="bodyMedium">This Year:</Text>
              <Text variant="bodyLarge" style={styles.summaryValue}>
                {formatCurrency(investmentSummary?.currentYearTotal || 0)}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text variant="bodyMedium">ISA Remaining:</Text>
              <Text variant="bodyLarge" style={styles.summaryValue}>
                {formatCurrency(investmentSummary?.remainingISALimit || 0)}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text variant="bodyMedium">Avg Return:</Text>
              <Text variant="bodyLarge" style={styles.summaryValue}>
                {formatPercentage(investmentSummary?.averageReturn || 0)}
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Recent Investments */}
        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Recent Investments
          </Text>

          {investments?.map(investment => (
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
