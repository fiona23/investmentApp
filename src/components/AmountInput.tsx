import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text, HelperText } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Fund } from '../types/fund';
import { validateInvestmentAmount } from '../utils/validation';
import { formatCurrency } from '../utils/formatting';
import { APP_CONSTANTS } from '../utils/constants';
import { colors, spacing } from '../utils/theme';

interface AmountInputProps {
  value: string;
  onChangeText: (value: string) => void;
  error?: string;
  placeholder?: string;
  maxAmount?: number;
  fund?: Fund;
  disabled?: boolean;
}

const AmountInput: React.FC<AmountInputProps> = ({
  value,
  onChangeText,
  error,
  placeholder = 'Enter amount',
  maxAmount,
  fund,
  disabled = false,
}) => {
  const [localError, setLocalError] = useState<string>('');

  useEffect(() => {
    // Clear local error when external error is provided
    if (error) {
      setLocalError('');
    }
  }, [error]);

  const handleTextChange = (text: string) => {
    // Remove non-numeric characters except decimal point
    const cleanText = text.replace(/[^0-9.]/g, '');

    // Ensure only one decimal point
    const parts = cleanText.split('.');
    const formattedText =
      parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : cleanText;

    onChangeText(formattedText);

    // Real-time validation
    const numericValue = parseFloat(formattedText) || 0;
    if (numericValue > 0 && fund) {
      const validation = validateInvestmentAmount(numericValue, fund);
      if (!validation.isValid) {
        setLocalError(validation.errors[0]);
      } else if (maxAmount && numericValue > maxAmount) {
        setLocalError(`Amount exceeds maximum of ${formatCurrency(maxAmount)}`);
      } else {
        setLocalError('');
      }
    } else {
      setLocalError('');
    }
  };

  const displayError = error || localError;

  return (
    <View style={styles.container}>
      <TextInput
        label="Investment Amount"
        value={value}
        onChangeText={handleTextChange}
        keyboardType="numeric"
        disabled={disabled}
        style={styles.input}
        mode="outlined"
        left={<TextInput.Affix text="£" />}
        error={!!displayError}
        placeholder={placeholder}
        outlineColor={colors.neutral[300]}
        activeOutlineColor={colors.primary[600]}
      />

      {displayError && (
        <HelperText type="error" visible={!!displayError}>
          {displayError}
        </HelperText>
      )}

      <View style={styles.limitInfo}>
        <Ionicons
          name="information-circle-outline"
          size={16}
          color={colors.neutral[500]}
          style={styles.limitIcon}
        />
        <Text variant="bodySmall" style={styles.limitText}>
          {maxAmount
            ? `Max Investment: ${formatCurrency(maxAmount)}`
            : `ISA Annual Limit: ${formatCurrency(APP_CONSTANTS.ISA_ANNUAL_LIMIT)}`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  input: {
    marginBottom: spacing.sm,
  },
  limitInfo: {
    marginTop: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  limitIcon: {
    marginRight: spacing.xs,
  },
  limitText: {
    color: colors.neutral[600],
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default AmountInput;
