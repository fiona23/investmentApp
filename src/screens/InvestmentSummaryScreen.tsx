import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../types/navigation';
import InvestmentSummary from '../components/InvestmentSummary';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import { useCreateInvestment, useFunds } from '../services/investmentService';

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
  const createInvestmentMutation = useCreateInvestment();
  const { data: funds } = useFunds();

  // Get fund name
  const fund = funds?.find(f => f.id === fundId);
  const fundName = fund?.name || 'Unknown Fund';

  const handleConfirmInvestment = async () => {
    try {
      const investmentData = {
        fundId,
        fundName,
        amount,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await createInvestmentMutation.mutateAsync(investmentData);

      // Navigate back to account screen on success
      navigation.navigate('Main');
    } catch (error) {
      // Error is handled by the mutation
      console.error('Failed to create investment:', error);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.navigate('Main');
  };

  // Loading state during investment creation
  if (createInvestmentMutation.isPending) {
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
  if (createInvestmentMutation.isError) {
    return (
      <View style={styles.container}>
        <ErrorState
          title="Failed to create investment"
          message="We couldn't process your investment. Please try again or contact support if the problem persists."
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
          isaRemaining={0} // This would come from API
        />

        {/* Action Buttons */}
        <View style={styles.actions}>
          <Button
            mode="contained"
            onPress={handleConfirmInvestment}
            style={styles.confirmButton}
            disabled={createInvestmentMutation.isPending}
          >
            Confirm Investment
          </Button>

          <Button
            mode="outlined"
            onPress={handleBack}
            style={styles.actionButton}
            disabled={createInvestmentMutation.isPending}
          >
            Back
          </Button>

          <Button
            mode="text"
            onPress={handleCancel}
            style={styles.actionButton}
            disabled={createInvestmentMutation.isPending}
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
