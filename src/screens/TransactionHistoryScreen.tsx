import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Chip, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../types/navigation';
import { useInvestmentStore } from '../store/investmentStore';
import { formatCurrency, formatDate, formatStatus } from '../utils/formatting';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

type TransactionHistoryScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'TransactionHistory'
>;

const TransactionHistoryScreen = () => {
  const navigation = useNavigation<TransactionHistoryScreenNavigationProp>();
  const insets = useSafeAreaInsets();
  const { investments, isLoading, error, loadInvestments } =
    useInvestmentStore();

  useEffect(() => {
    loadInvestments();
  }, [loadInvestments]);

  const handleBack = () => {
    navigation.goBack();
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <LoadingState message="Loading transactions..." variant="fullscreen" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <ErrorState
          title="Failed to load transactions"
          message={error}
          onRetry={loadInvestments}
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
            Transaction History
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            View all your investment transactions
          </Text>
        </View>

        {/* Transaction List */}
        {investments.length === 0 ? (
          <Card style={styles.emptyCard} mode="outlined">
            <Card.Content>
              <Text variant="titleMedium" style={styles.emptyTitle}>
                No transactions yet
              </Text>
              <Text variant="bodyMedium" style={styles.emptySubtitle}>
                Your investment transactions will appear here once you make your
                first investment.
              </Text>
            </Card.Content>
          </Card>
        ) : (
          investments.map(investment => (
            <Card
              key={investment.id}
              style={styles.transactionCard}
              mode="outlined"
            >
              <Card.Content>
                <View style={styles.transactionHeader}>
                  <Text variant="titleMedium" style={styles.fundName}>
                    {investment.fundName}
                  </Text>
                  <Chip mode="outlined" style={styles.statusChip}>
                    {formatStatus(investment.status)}
                  </Chip>
                </View>

                <View style={styles.transactionDetails}>
                  <View style={styles.detailRow}>
                    <Text variant="bodyMedium">Amount:</Text>
                    <Text variant="bodyLarge" style={styles.amount}>
                      {formatCurrency(investment.amount)}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text variant="bodyMedium">Date:</Text>
                    <Text variant="bodyMedium">
                      {formatDate(investment.createdAt)}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text variant="bodyMedium">Status:</Text>
                    <Text variant="bodyMedium" style={styles.statusText}>
                      {formatStatus(investment.status)}
                    </Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  headerBackButton: {
    marginRight: 0,
    marginVertical: -6,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  subtitle: {
    color: '#666666',
    lineHeight: 20,
  },
  emptyCard: {
    marginBottom: 16,
  },
  emptyTitle: {
    textAlign: 'center',
    marginBottom: 8,
    color: '#666666',
  },
  emptySubtitle: {
    textAlign: 'center',
    color: '#999999',
  },
  transactionCard: {
    marginBottom: 16,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  fundName: {
    flex: 1,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  statusChip: {
    marginLeft: 8,
  },
  transactionDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amount: {
    fontWeight: '600',
    color: '#007AFF',
  },
  statusText: {
    textTransform: 'capitalize',
  },
});

export default TransactionHistoryScreen;
