import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useFunds } from '../services/investmentService';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import FundCard from '../components/FundCard';

type FundScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Main'
>;

const FundScreen = () => {
  const navigation = useNavigation<FundScreenNavigationProp>();
  const insets = useSafeAreaInsets();

  // React Query hooks
  const { data: funds, isLoading, error, refetch } = useFunds();

  const handleFundPress = (fundId: string) => {
    navigation.navigate('FundDetails', { fundId });
  };

  // Loading state
  if (isLoading) {
    return (
      <View style={styles.container}>
        <LoadingState
          message="Loading available funds..."
          variant="fullscreen"
        />
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={styles.container}>
        <ErrorState
          title="Failed to load funds"
          message="We couldn't load the available funds. Please check your connection and try again."
          onRetry={refetch}
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
        {/* Header */}
        <View style={styles.header}>
          <Text variant="headlineLarge" style={styles.title}>
            Available Funds
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            Choose from our range of investment funds
          </Text>
        </View>

        {/* Funds List */}
        <View style={styles.fundsList}>
          {funds && funds.length > 0 ? (
            funds.map(fund => (
              <FundCard
                key={fund.id}
                fund={fund}
                onPress={() => handleFundPress(fund.id)}
              />
            ))
          ) : (
            <Text variant="bodyMedium" style={styles.noFundsText}>
              No funds available at the moment.
            </Text>
          )}
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
  fundsList: {
    gap: 12,
  },
  noFundsText: {
    textAlign: 'center',
    paddingVertical: 20,
    color: '#888',
  },
});

export default FundScreen;
