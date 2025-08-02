import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Button, ActivityIndicator } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { Fund } from '../types/fund';
import InvestmentSummary from '../components/InvestmentSummary';
import { FUND_DATA } from '../utils/constants';

type InvestmentSummaryScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'InvestmentSummary'
>;
type InvestmentSummaryScreenRouteProp = RouteProp<
  RootStackParamList,
  'InvestmentSummary'
>;

const InvestmentSummaryScreen: React.FC = () => {
  const navigation = useNavigation<InvestmentSummaryScreenNavigationProp>();
  const route = useRoute<InvestmentSummaryScreenRouteProp>();
  const { fundId, amount } = route.params;

  const [fund, setFund] = useState<Fund | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadFund();
  }, [fundId]);

  const loadFund = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const foundFund = FUND_DATA.find(f => f.id === fundId);
      if (foundFund) {
        setFund(foundFund);
      } else {
        Alert.alert('Error', 'Fund not found');
        navigation.goBack();
      }
      setIsLoading(false);
    }, 500);
  };

  const handleConfirm = () => {
    if (!fund) {
      Alert.alert('Error', 'Fund information not available.');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        'Investment Confirmed',
        `Your investment of £${amount.toLocaleString()} in ${fund.name} has been confirmed.`,
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Main'),
          },
        ]
      );
    }, 2000);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleCancel = () => {
    Alert.alert(
      'Cancel Investment',
      'Are you sure you want to cancel this investment?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => navigation.navigate('Main'),
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading investment details...</Text>
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

  const warnings = amount > 20000 ? ['Amount exceeds ISA annual limit'] : [];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Confirm Investment
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Please review your investment details before confirming
        </Text>
      </View>

      {/* Investment Summary */}
      <InvestmentSummary fund={fund} amount={amount} warnings={warnings} />

      {/* Action Buttons */}
      <View style={styles.actions}>
        <Button
          mode="outlined"
          onPress={handleCancel}
          style={styles.cancelButton}
        >
          Cancel
        </Button>
        <Button mode="outlined" onPress={handleBack} style={styles.backButton}>
          Back
        </Button>
        <Button
          mode="contained"
          onPress={handleConfirm}
          loading={isSubmitting}
          disabled={isSubmitting}
          style={styles.confirmButton}
        >
          Confirm Investment
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
    paddingBottom: 32,
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
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
  },
  cancelButton: {
    flex: 1,
  },
  backButton: {
    flex: 1,
  },
  confirmButton: {
    flex: 2,
  },
});

export default InvestmentSummaryScreen;
