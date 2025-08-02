import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type FundScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Main'
>;

const FundScreen = () => {
  const navigation = useNavigation<FundScreenNavigationProp>();
  const insets = useSafeAreaInsets();

  const handleBrowseFunds = () => {
    navigation.navigate('FundSelection');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text variant="headlineLarge" style={styles.title}>
            Investment Funds
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            Choose from our range of investment options
          </Text>
        </View>

        <View style={styles.content}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Ready to Invest?
          </Text>
          <Text variant="bodyMedium" style={styles.description}>
            Start building your investment portfolio with our range of funds
          </Text>

          <Button
            mode="contained"
            onPress={handleBrowseFunds}
            style={styles.browseButton}
          >
            Browse All Funds
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    color: '#666',
  },
  content: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 24,
    lineHeight: 20,
  },
  browseButton: {
    paddingHorizontal: 32,
  },
});

export default FundScreen;
