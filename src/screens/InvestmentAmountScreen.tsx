import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Text,
  Button,
  ActivityIndicator,
  Card,
  IconButton,
} from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../types/navigation';
import { Fund } from '../types/fund';
import AmountInput from '../components/AmountInput';
import { validateInvestmentAmount } from '../utils/validation';
import { formatPercentage, formatCurrency } from '../utils/formatting';
import { useInvestmentStore } from '../store/investmentStore';
import { colors } from '../utils/theme';

type InvestmentAmountScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'InvestmentAmount'
>;
type InvestmentAmountScreenRouteProp = RouteProp<
  RootStackParamList,
  'InvestmentAmount'
>;

const InvestmentAmountScreen = () => {
  const navigation = useNavigation<InvestmentAmountScreenNavigationProp>();
  const route = useRoute<InvestmentAmountScreenRouteProp>();
  const insets = useSafeAreaInsets();
  const { fundId } = route.params;

  const [fund, setFund] = useState<Fund | null>(null);
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Use Zustand store for investment summary
  const { investmentSummary } = useInvestmentStore();

  useEffect(() => {
    loadFund();
  }, [fundId]);

  const loadFund = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      // Mock fund data - in real app this would come from API
      const mockFund: Fund = {
        id: fundId,
        name: 'Cushon Equities Fund',
        category: 'Equities',
        riskLevel: 'Medium',
        fundSize: 1500000000,
        minInvestment: 100,
        description:
          'A diversified portfolio of global equities designed for long-term growth.',
        performance: {
          oneYear: 8.5,
          threeYear: 12.3,
          fiveYear: 15.7,
          sinceInception: 18.2,
        },
        portfolio: {
          ukEquities: 40,
          globalEquities: 35,
          bonds: 15,
          cash: 10,
        },
      };

      setFund(mockFund);
      setIsLoading(false);
    }, 500);
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);
    setAmountError('');

    const numericValue = parseFloat(value) || 0;
    if (numericValue > 0 && fund) {
      const validation = validateInvestmentAmount(numericValue, fund);
      if (!validation.isValid) {
        setAmountError(validation.errors[0]);
      }
    }
  };

  const handleContinue = () => {
    if (!amount || parseFloat(amount) === 0) {
      setAmountError('Please enter a valid amount');
      return;
    }

    if (amountError) {
      return;
    }

    if (!fund) {
      Alert.alert('Error', 'Fund information not available.');
      return;
    }

    navigation.navigate('InvestmentSummary', {
      fundId: fund.id,
      amount: parseFloat(amount),
    });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading fund details...</Text>
      </View>
    );
  }

  if (!fund) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Fund not found</Text>
        <Button onPress={handleBack}>Go Back</Button>
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
          style={styles.headerBackButton}
          iconColor={colors.primary[600]}
        />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          {
            paddingBottom: insets.bottom + 16,
          },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text variant="headlineLarge" style={styles.title}>
            Investment Amount
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            How much would you like to invest in {fund.name}?
          </Text>
        </View>

        {/* ISA Allowance Progress */}
        <Card style={styles.allowanceCard} mode="outlined">
          <Card.Content>
            <Text variant="titleMedium" style={styles.allowanceTitle}>
              ISA Allowance
            </Text>
            <View style={styles.allowanceRow}>
              <Text variant="bodyMedium">Used this year:</Text>
              <Text variant="bodyMedium" style={styles.allowanceValue}>
                {formatCurrency(investmentSummary.currentYearTotal)}
              </Text>
            </View>
            <View style={styles.allowanceRow}>
              <Text variant="bodyMedium">Remaining:</Text>
              <Text variant="bodyMedium" style={styles.allowanceValue}>
                {formatCurrency(remainingAllowance)}
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View style={styles.progressBarBackground}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: `${allowanceProgress * 100}%` },
                  ]}
                />
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Fund Summary */}
        <Card style={styles.fundSummary} mode="outlined">
          <Card.Content>
            <Text variant="titleMedium" style={styles.fundName}>
              {fund.name}
            </Text>
            <Text variant="bodyMedium" style={styles.fundDescription}>
              {fund.description}
            </Text>
            <View style={styles.fundDetails}>
              <Text variant="bodySmall">Risk Level: {fund.riskLevel}</Text>
              <Text variant="bodySmall">Category: {fund.category}</Text>
              <Text variant="bodySmall">
                1 Year Return: {formatPercentage(fund.performance.oneYear)}
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Amount Input */}
        <AmountInput
          value={amount}
          onChangeText={handleAmountChange}
          error={amountError}
          maxAmount={remainingAllowance}
          fund={fund}
        />

        {/* Action Buttons */}
        <View style={styles.actions}>
          <Button
            mode="outlined"
            onPress={handleBack}
            style={styles.actionBackButton}
          >
            Back
          </Button>
          <Button
            mode="contained"
            onPress={handleContinue}
            disabled={!amount || parseFloat(amount) === 0 || !!amountError}
            style={styles.continueButton}
          >
            Continue
          </Button>
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
    paddingBottom: 32,
    paddingHorizontal: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 16,
    color: '#666',
  },
  errorContainer: {
    padding: 16,
    alignItems: 'center',
  },
  errorText: {
    color: '#f44336',
    marginBottom: 16,
  },
  header: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    color: '#666',
    marginBottom: 12,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
    paddingBottom: 0,
  },
  headerBackButton: {
    marginRight: 0,
    marginVertical: -6,
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
  progressBarBackground: {
    height: '100%',
    backgroundColor: colors.neutral[200],
    borderRadius: 4,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary[600],
    borderRadius: 4,
  },
  fundSummary: {
    marginBottom: 12,
  },
  fundName: {
    fontWeight: '600',
    marginBottom: 8,
  },
  fundDescription: {
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  fundDetails: {
    gap: 4,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  actionBackButton: {
    flex: 1,
  },
  continueButton: {
    flex: 1,
  },
});

export default InvestmentAmountScreen;
