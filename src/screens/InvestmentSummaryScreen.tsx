import React from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../types/navigation';
import InvestmentSummary from '../components/InvestmentSummary';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import { useFunds } from '../services/investmentService';
import { useInvestmentStore } from '../store/investmentStore';
import { formatCurrency } from '../utils/formatting';

type InvestmentSummaryScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'InvestmentSummary'
>;
type InvestmentSummaryScreenRouteProp = RouteProp<
  RootStackParamList,
  'InvestmentSummary'
>;

const InvestmentSummaryScreen = () => {
  const navigation = useNavigation<InvestmentSummaryScreenNavigationProp>();
  const route = useRoute<InvestmentSummaryScreenRouteProp>();
  const insets = useSafeAreaInsets();
  const { fundId, amount } = route.params;

  // React Query hooks
  const { data: funds } = useFunds();
  const { addInvestment, isLoading, error, investmentSummary } =
    useInvestmentStore();

  // Get fund name
  const fund = funds?.find(f => f.id === fundId);
  const fundName = fund?.name || 'Unknown Fund';

  const handleConfirmInvestment = async () => {
    try {
      const investmentData = {
        fundId,
        fundName,
        amount,
        date: new Date(),
        status: 'pending' as const,
      };

      await addInvestment(investmentData);

      // Show success feedback
      Alert.alert(
        'Investment Successful!',
        `Your investment of ${formatCurrency(amount)} in ${fundName} has been confirmed.`,
        [
          {
            text: 'View Account',
            onPress: () => {
              // Navigate to account screen
              navigation.navigate('Main', { screen: 'Account' });
            },
          },
        ]
      );
    } catch (error) {
      console.error('Failed to create investment:', error);
      Alert.alert(
        'Investment Failed',
        'There was an error processing your investment. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.navigate('Main');
  };

  // Loading state during investment creation
  if (isLoading) {
    return (
      <View style={styles.container}>
        <LoadingState
          message="Creating your investment..."
          variant="fullscreen"
        />
      </View>
    );
  }

  // Error state for investment creation
  if (error) {
    return (
      <View style={styles.container}>
        <ErrorState
          title="Failed to create investment"
          message={error}
          onRetry={handleConfirmInvestment}
          variant="fullscreen"
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header with Back Button */}
      <View style={[styles.headerContainer]}>
        <IconButton
          icon="chevron-left"
          size={32}
          onPress={handleBack}
          style={styles.headerBackButton}
          iconColor="#007AFF"
        />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingBottom: insets.bottom + 16 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text variant="headlineLarge" style={styles.title}>
            Confirm Investment
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            Review your investment details
          </Text>
        </View>
        <InvestmentSummary
          fundId={fundId}
          amount={amount}
          isaRemaining={investmentSummary.remainingISALimit}
        />

        {/* Action Buttons */}
        <View style={styles.actions}>
          <Button
            mode="contained"
            onPress={handleConfirmInvestment}
            style={styles.confirmButton}
            disabled={isLoading}
          >
            Confirm Investment
          </Button>

          <Button
            mode="outlined"
            onPress={handleBack}
            style={styles.actionButton}
            disabled={isLoading}
          >
            Back
          </Button>

          <Button
            mode="text"
            onPress={handleCancel}
            style={styles.actionButton}
            disabled={isLoading}
          >
            Cancel
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
  header: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    color: '#666',
    marginBottom: 12,
  },
  actions: {
    gap: 12,
    marginTop: 24,
  },
  confirmButton: {
    marginBottom: 8,
  },
  actionButton: {
    marginBottom: 8,
  },
});

export default InvestmentSummaryScreen;
