import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Alert, ScrollView } from 'react-native';
import { Text, Searchbar, Chip, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../types/navigation';
import { Fund } from '../types/fund';
import FundCard from '../components/FundCard';
import { useFunds } from '../services/investmentService';

type FundSelectionScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'FundSelection'
>;

const FundSelectionScreen: React.FC = () => {
  const navigation = useNavigation<FundSelectionScreenNavigationProp>();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFund, setSelectedFund] = useState<Fund | null>(null);

  // React Query hooks
  const { data: funds } = useFunds();

  const categories = ['All', 'Equities', 'Bonds', 'Property', 'Multi-Asset'];

  const filteredFunds =
    funds?.filter(fund => {
      const matchesSearch =
        fund.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fund.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        !selectedCategory ||
        selectedCategory === 'All' ||
        fund.category === selectedCategory;

      return matchesSearch && matchesCategory;
    }) || [];

  const handleFundSelect = (fund: Fund) => {
    setSelectedFund(fund);
  };

  const handleContinue = () => {
    if (!selectedFund) {
      Alert.alert('No Fund Selected', 'Please select a fund to continue.');
      return;
    }

    navigation.navigate('InvestmentAmount', { fundId: selectedFund.id });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const renderFundItem = ({ item }: { item: Fund }) => (
    <FundCard
      fund={item}
      isSelected={selectedFund?.id === item.id}
      onSelect={handleFundSelect}
    />
  );

  const renderCategoryChip = (category: string) => (
    <Chip
      key={category}
      mode={selectedCategory === category ? 'flat' : 'outlined'}
      selected={selectedCategory === category}
      onPress={() =>
        setSelectedCategory(selectedCategory === category ? null : category)
      }
      style={styles.categoryChip}
    >
      {category}
    </Chip>
  );

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
            Select a Fund
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            Choose from our range of investment options
          </Text>
        </View>

        {/* Search Bar */}
        <Searchbar
          placeholder="Search funds..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />

        {/* Category Filters */}
        <View style={styles.categoryContainer}>
          <Text variant="titleSmall" style={styles.categoryTitle}>
            Filter by Category:
          </Text>
          <View style={styles.categoryChips}>
            {categories.map(renderCategoryChip)}
          </View>
        </View>

        {/* Fund List */}
        <FlatList
          data={filteredFunds}
          renderItem={renderFundItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text variant="bodyLarge" style={styles.emptyText}>
                No funds found matching your criteria
              </Text>
            </View>
          }
        />
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.footer}>
        <Text variant="bodyMedium" style={styles.selectedInfo}>
          {selectedFund ? `Selected: ${selectedFund.name}` : 'No fund selected'}
        </Text>
        <Text
          variant="bodyLarge"
          style={[
            styles.continueButton,
            !selectedFund && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
        >
          Continue
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    color: '#666',
    marginBottom: 8,
  },
  searchBar: {
    margin: 12,
    elevation: 2,
  },
  categoryContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#fff',
  },
  categoryTitle: {
    marginBottom: 12,
    fontWeight: '500',
  },
  categoryChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    marginRight: 8,
    marginBottom: 8,
  },
  listContainer: {
    paddingBottom: 100,
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedInfo: {
    flex: 1,
    color: '#666',
  },
  continueButton: {
    color: '#2196F3',
    fontWeight: '600',
  },
  continueButtonDisabled: {
    color: '#ccc',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 100, // Adjust based on footer height
  },
});

export default FundSelectionScreen;
