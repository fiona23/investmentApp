import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import InvestmentSummary from '../components/InvestmentSummary';
import { useCreateInvestment } from '../services/investmentService';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

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

  // React Query mutation for creating investment
  const createInvestmentMutation = useCreateInvestment();

  const handleConfirmInvestment = async () => {
    try {
      const investmentData = {
        fundId,
        fundName: 'Cushon Equities Fund', // This would come from fund data
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
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 16 },
        ]}
        showsVerticalScrollIndicator={false}
      >
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
