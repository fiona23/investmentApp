import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Text,
  Card,
  Button,
  ProgressBar,
  IconButton,
} from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import {
  formatCurrency,
  formatPercentage,
  formatRiskLevel,
} from '../utils/formatting';
import { useFundDetails } from '../services/investmentService';
import { useInvestmentStore } from '../store/investmentStore';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import { colors } from '../utils/theme';

type FundDetailsScreenRouteProp = RouteProp<RootStackParamList, 'FundDetails'>;

type FundDetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'FundDetails'
>;

const FundDetailsScreen = () => {
  const route = useRoute<FundDetailsScreenRouteProp>();
  const navigation = useNavigation<FundDetailsScreenNavigationProp>();
  const insets = useSafeAreaInsets();
  const { fundId } = route.params;

  // React Query hooks
  const {
    data: fund,
    isLoading: isLoadingFund,
    error: fundError,
    refetch: refetchFund,
  } = useFundDetails(fundId);

  // Use Zustand store for investment summary
  const { investmentSummary } = useInvestmentStore();

  const handleSelectFund = () => {
    navigation.navigate('InvestmentAmount', { fundId });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  // Loading state
  if (isLoadingFund) {
    return (
      <View style={styles.container}>
        <LoadingState message="Loading fund details..." variant="fullscreen" />
      </View>
    );
  }

  // Error state
  if (fundError || !fund) {
    return (
      <View style={styles.container}>
        <ErrorState
          title="Failed to load fund"
          message="We couldn't load the fund details. Please try again."
          onRetry={refetchFund}
          variant="fullscreen"
        />
      </View>
    );
  }

  const remainingAllowance = investmentSummary.remainingISALimit;
  const usedAllowance = 20000 - remainingAllowance;
  const allowanceProgress = usedAllowance / 20000;

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingTop: insets.top }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      {/* Header with Back Button */}
      <View style={[styles.headerContainer]}>
        <IconButton
          icon="chevron-left"
          size={32}
          onPress={handleBack}
          style={styles.backButton}
          iconColor={colors.primary[600]}
        />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingBottom: insets.bottom + 16 },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Text variant="headlineLarge" style={styles.title}>
            {fund.name}
          </Text>
          <Text variant="bodyLarge" style={styles.category}>
            {fund.category}
          </Text>

          {/* Top CTA Button */}
          <Button
            mode="contained"
            onPress={handleSelectFund}
            style={styles.selectButton}
            disabled={remainingAllowance <= 0}
          >
            {remainingAllowance > 0 ? 'Select Fund' : 'ISA Allowance Exceeded'}
          </Button>
        </View>

        {/* ISA Allowance Progress */}
        <Card style={styles.allowanceCard} mode="outlined">
          <Card.Content>
            <Text variant="titleMedium" style={styles.allowanceTitle}>
              ISA Allowance
            </Text>
            <View style={styles.allowanceRow}>
              <Text variant="bodyMedium">Used this year:</Text>
              <Text variant="bodyLarge" style={styles.allowanceValue}>
                {formatCurrency(usedAllowance)}
              </Text>
            </View>
            <View style={styles.allowanceRow}>
              <Text variant="bodyMedium">Remaining:</Text>
              <Text variant="bodyLarge" style={styles.allowanceValue}>
                {formatCurrency(remainingAllowance)}
              </Text>
            </View>
            <ProgressBar
              progress={allowanceProgress}
              color={colors.primary[600]}
              style={[
                styles.progressBar,
                { backgroundColor: colors.neutral[200] },
              ]}
            />
          </Card.Content>
        </Card>

        {/* Fund Details */}
        <Card style={styles.detailsCard} mode="outlined">
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Fund Details
            </Text>

            <View style={styles.detailRow}>
              <Text variant="bodyMedium">Risk Level:</Text>
              <Text variant="bodyLarge" style={styles.detailValue}>
                {formatRiskLevel(fund.riskLevel)}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text variant="bodyMedium">Fund Size:</Text>
              <Text variant="bodyLarge" style={styles.detailValue}>
                {formatCurrency(fund.fundSize)}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text variant="bodyMedium">Min Investment:</Text>
              <Text variant="bodyLarge" style={styles.detailValue}>
                {formatCurrency(fund.minInvestment)}
              </Text>
            </View>

            <Text variant="bodyMedium" style={styles.description}>
              {fund.description}
            </Text>
          </Card.Content>
        </Card>

        {/* Performance */}
        <Card style={styles.performanceCard} mode="outlined">
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Performance
            </Text>

            <View style={styles.performanceRow}>
              <Text variant="bodyMedium">1 Year:</Text>
              <Text variant="bodyLarge" style={styles.performanceValue}>
                {formatPercentage(fund.performance.oneYear)}
              </Text>
            </View>

            <View style={styles.performanceRow}>
              <Text variant="bodyMedium">3 Year:</Text>
              <Text variant="bodyLarge" style={styles.performanceValue}>
                {formatPercentage(fund.performance.threeYear)}
              </Text>
            </View>

            <View style={styles.performanceRow}>
              <Text variant="bodyMedium">5 Year:</Text>
              <Text variant="bodyLarge" style={styles.performanceValue}>
                {formatPercentage(fund.performance.fiveYear)}
              </Text>
            </View>

            <View style={styles.performanceRow}>
              <Text variant="bodyMedium">Since Inception:</Text>
              <Text variant="bodyLarge" style={styles.performanceValue}>
                {formatPercentage(fund.performance.sinceInception)}
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Portfolio */}
        <Card style={styles.portfolioCard} mode="outlined">
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Portfolio Allocation
            </Text>

            <View style={styles.portfolioRow}>
              <Text variant="bodyMedium">UK Equities:</Text>
              <Text variant="bodyLarge" style={styles.portfolioValue}>
                {fund.portfolio.ukEquities}%
              </Text>
            </View>

            <View style={styles.portfolioRow}>
              <Text variant="bodyMedium">Global Equities:</Text>
              <Text variant="bodyLarge" style={styles.portfolioValue}>
                {fund.portfolio.globalEquities}%
              </Text>
            </View>

            <View style={styles.portfolioRow}>
              <Text variant="bodyMedium">Bonds:</Text>
              <Text variant="bodyLarge" style={styles.portfolioValue}>
                {fund.portfolio.bonds}%
              </Text>
            </View>

            <View style={styles.portfolioRow}>
              <Text variant="bodyMedium">Cash:</Text>
              <Text variant="bodyLarge" style={styles.portfolioValue}>
                {fund.portfolio.cash}%
              </Text>
            </View>

            {fund.portfolio.property && (
              <View style={styles.portfolioRow}>
                <Text variant="bodyMedium">Property:</Text>
                <Text variant="bodyLarge" style={styles.portfolioValue}>
                  {fund.portfolio.property}%
                </Text>
              </View>
            )}
          </Card.Content>
        </Card>

        {/* Select Fund Button */}
        <View style={styles.actionContainer}>
          <Button
            mode="contained"
            onPress={handleSelectFund}
            style={styles.selectButton}
            disabled={remainingAllowance <= 0}
          >
            {remainingAllowance > 0 ? 'Select Fund' : 'ISA Allowance Exceeded'}
          </Button>
          {remainingAllowance <= 0 && (
            <Text variant="bodySmall" style={styles.allowanceWarning}>
              You have used your full ISA allowance for this tax year.
            </Text>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  backButton: {
    marginRight: 0,
    marginVertical: -6,
  },
  header: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontWeight: '600',
    marginBottom: 4,
  },
  category: {
    color: '#666',
    marginBottom: 12,
  },
  allowanceCard: {
    marginBottom: 12,
  },
  allowanceTitle: {
    fontWeight: '600',
    marginBottom: 16,
  },
  allowanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  allowanceValue: {
    fontWeight: '600',
    color: '#2196F3',
  },
  progressBar: {
    marginTop: 12,
    height: 8,
    borderRadius: 4,
  },
  detailsCard: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailValue: {
    fontWeight: '600',
  },
  description: {
    marginTop: 16,
    lineHeight: 20,
  },
  performanceCard: {
    marginBottom: 12,
  },
  performanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  performanceValue: {
    fontWeight: '600',
    color: '#4CAF50',
  },
  portfolioCard: {
    marginBottom: 12,
  },
  portfolioRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  portfolioValue: {
    fontWeight: '600',
  },
  actionContainer: {
    marginBottom: 16,
  },
  selectButton: {
    marginTop: 8,
    borderRadius: 8,
  },

  allowanceWarning: {
    color: '#FF9800',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default FundDetailsScreen;
