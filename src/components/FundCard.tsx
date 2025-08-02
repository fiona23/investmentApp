import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text, Chip, IconButton } from 'react-native-paper';
import { Fund } from '../types/fund';
import {
  formatCurrency,
  formatPercentage,
  formatRiskLevel,
} from '../utils/formatting';

interface FundCardProps {
  fund: Fund;
  isSelected?: boolean;
  onSelect?: (fund: Fund) => void;
  onPress?: () => void;
  showDetails?: boolean;
}

const FundCard: React.FC<FundCardProps> = ({
  fund,
  isSelected = false,
  onSelect,
  onPress,
  showDetails = true,
}) => {
  const handlePress = () => {
    if (onSelect) {
      onSelect(fund);
    } else if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <Card
        style={[styles.card, isSelected && styles.selectedCard]}
        mode="outlined"
      >
        <Card.Content style={styles.content}>
          {/* Header with fund name and selection indicator */}
          <View style={styles.header}>
            <Text variant="titleMedium" style={styles.fundName}>
              {fund.name}
            </Text>
            {isSelected && (
              <IconButton
                icon="check-circle"
                size={20}
                iconColor="#2196F3"
                testID="check-circle"
              />
            )}
          </View>

          {/* Risk level chip */}
          <View style={styles.riskContainer}>
            <Chip
              mode="outlined"
              textStyle={styles.riskText}
              style={styles.riskChip}
            >
              {formatRiskLevel(fund.riskLevel)}
            </Chip>
          </View>

          {showDetails && (
            <>
              {/* Description */}
              <Text variant="bodyMedium" style={styles.description}>
                {fund.description}
              </Text>

              {/* Performance and category */}
              <View style={styles.detailsRow}>
                <View style={styles.detailItem}>
                  <Text variant="labelSmall" style={styles.detailLabel}>
                    Annual Return
                  </Text>
                  <Text variant="bodyMedium" style={styles.detailValue}>
                    {formatPercentage(fund.performance)}
                  </Text>
                </View>
                <View style={styles.detailItem}>
                  <Text variant="labelSmall" style={styles.detailLabel}>
                    Category
                  </Text>
                  <Text variant="bodyMedium" style={styles.detailValue}>
                    {fund.category}
                  </Text>
                </View>
              </View>

              {/* Investment limits */}
              <View style={styles.detailsRow}>
                <View style={styles.detailItem}>
                  <Text variant="labelSmall" style={styles.detailLabel}>
                    Min Investment
                  </Text>
                  <Text variant="bodyMedium" style={styles.detailValue}>
                    {formatCurrency(fund.minInvestment)}
                  </Text>
                </View>
                <View style={styles.detailItem}>
                  <Text variant="labelSmall" style={styles.detailLabel}>
                    Max Investment
                  </Text>
                  <Text variant="bodyMedium" style={styles.detailValue}>
                    {formatCurrency(fund.maxInvestment)}
                  </Text>
                </View>
              </View>
            </>
          )}
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 2,
  },
  selectedCard: {
    borderColor: '#2196F3',
    borderWidth: 2,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  fundName: {
    flex: 1,
    fontWeight: '600',
  },
  riskContainer: {
    marginBottom: 12,
  },
  riskChip: {
    alignSelf: 'flex-start',
  },
  riskText: {
    fontSize: 12,
  },
  description: {
    marginBottom: 16,
    color: '#666',
    lineHeight: 20,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    color: '#666',
    marginBottom: 4,
  },
  detailValue: {
    fontWeight: '500',
  },
});

export default FundCard;
