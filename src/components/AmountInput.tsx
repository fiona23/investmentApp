import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text, HelperText } from 'react-native-paper';
import { Fund } from '../types/fund';
import { validateInvestmentAmount } from '../utils/validation';
import { formatCurrency } from '../utils/formatting';
import { APP_CONSTANTS } from '../utils/constants';

interface AmountInputProps {
  fund: Fund;
  value: number;
  onChange: (amount: number) => void;
  onValidationChange?: (isValid: boolean, errors: string[]) => void;
  disabled?: boolean;
}

const AmountInput: React.FC<AmountInputProps> = ({
  fund,
  value,
  onChange,
  onValidationChange,
  disabled = false,
}) => {
  const [inputValue, setInputValue] = useState(value.toString());
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  useEffect(() => {
    const validation = validateInvestmentAmount(value, fund);
    setErrors(validation.errors);

    if (onValidationChange) {
      onValidationChange(validation.isValid, validation.errors);
    }
  }, [value, fund]);

  const handleTextChange = (text: string) => {
    // Remove non-numeric characters except decimal point
    const cleanText = text.replace(/[^0-9.]/g, '');

    // Ensure only one decimal point
    const parts = cleanText.split('.');
    const formattedText =
      parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : cleanText;

    setInputValue(formattedText);

    const numericValue = parseFloat(formattedText) || 0;
    onChange(numericValue);
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Investment Amount"
        value={inputValue}
        onChangeText={handleTextChange}
        keyboardType="numeric"
        disabled={disabled}
        style={styles.input}
        mode="outlined"
        left={<TextInput.Affix text="£" />}
        error={errors.length > 0}
        placeholder="0"
      />

      {errors.length > 0 && (
        <HelperText type="error" visible={errors.length > 0}>
          {errors[0]}
        </HelperText>
      )}

      <View style={styles.limitInfo}>
        <Text variant="bodySmall" style={styles.limitText}>
          ISA Annual Limit: {formatCurrency(APP_CONSTANTS.ISA_ANNUAL_LIMIT)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    marginBottom: 8,
  },
  limitInfo: {
    marginTop: 8,
  },
  limitText: {
    color: '#666',
    textAlign: 'center',
  },
});

export default AmountInput;
