import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import {
  Text,
  Button,
  HelperText,
  ActivityIndicator,
} from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { Fund } from '../types/fund';
import AmountInput from '../components/AmountInput';
import { FUND_DATA } from '../utils/constants';

type InvestmentAmountScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'InvestmentAmount'
>;
type InvestmentAmountScreenRouteProp = RouteProp<
  RootStackParamList,
  'InvestmentAmount'
>;

const InvestmentAmountScreen: React.FC = () => {
  const navigation = useNavigation<InvestmentAmountScreenNavigationProp>();
  const route = useRoute<InvestmentAmountScreenRouteProp>();
  const { fundId } = route.params;

  const [fund, setFund] = useState<Fund | null>(null);
  const [amount, setAmount] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleAmountChange = (newAmount: number) => {
    setAmount(newAmount);
  };

  const handleValidationChange = (
    valid: boolean,
    validationErrors: string[]
  ) => {
    setIsValid(valid);
    setErrors(validationErrors);
  };

  const handleContinue = () => {
    if (!isValid) {
      Alert.alert('Invalid Amount', 'Please enter a valid investment amount.');
      return;
    }

    if (!fund) {
      Alert.alert('Error', 'Fund information not available.');
      return;
    }

    navigation.navigate('InvestmentSummary', {
      fundId: fund.id,
      amount: amount,
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

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Investment Amount
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          How much would you like to invest in {fund.name}?
        </Text>
      </View>

      {/* Fund Summary */}
      <View style={styles.fundSummary}>
        <Text variant="titleMedium" style={styles.fundName}>
          {fund.name}
        </Text>
        <Text variant="bodyMedium" style={styles.fundDescription}>
          {fund.description}
        </Text>
        <View style={styles.fundDetails}>
          <Text variant="bodySmall">Risk Level: {fund.riskLevel}</Text>
          <Text variant="bodySmall">Category: {fund.category}</Text>
          <Text variant="bodySmall">Annual Return: {fund.performance}%</Text>
        </View>
      </View>

      {/* Amount Input */}
      <AmountInput
        fund={fund}
        value={amount}
        onChange={handleAmountChange}
        onValidationChange={handleValidationChange}
      />

      {/* Error Display */}
      {errors.length > 0 && (
        <View style={styles.errorContainer}>
          {errors.map((error, index) => (
            <HelperText key={index} type="error" visible={true}>
              {error}
            </HelperText>
          ))}
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.actions}>
        <Button mode="outlined" onPress={handleBack} style={styles.backButton}>
          Back
        </Button>
        <Button
          mode="contained"
          onPress={handleContinue}
          disabled={!isValid}
          style={styles.continueButton}
        >
          Continue
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
  fundSummary: {
    margin: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
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
    padding: 16,
    gap: 12,
  },
  backButton: {
    flex: 1,
  },
  continueButton: {
    flex: 1,
  },
});

export default InvestmentAmountScreen;
