import React, { FC, useState } from 'react';

import { formatWithPrecision, getPrecisionFromStep } from 'utils/precision';

import { AmountBlock } from 'components/AmountBlock/AmountBlock';
import { ProgressBar } from 'components/ProgressBar/ProgressBar';

import styles from './CurrencyInputBlock.module.scss';

interface Props {
  value: string;
  onChange: (value: string, isValid: boolean) => void;
  onCalculated: (value: string) => void;
  currency: string;
  min: number;
  max: number;
  step: number;
  isSource: boolean;
  price: [string, string];
}

const safePercentage = (value: number, min: number, max: number): number => {
  if (value < min) return 0;
  if (value > max) return 100;
  return Math.round(((value - min) / (max - min)) * 10000) / 100;
};

export const CurrencyInputBlock: FC<Props> = ({
  value,
  onChange,
  onCalculated,
  currency,
  min,
  max,
  step,
  isSource,
  price
}) => {
  const [error, setError] = useState<string | null>(null);

  const validateValue = (
    val: string
  ): { isValid: boolean; error: string | null } => {
    if (val === '') {
      return { isValid: false, error: 'значение не может быть пустым' };
    }

    const num = Number(val);
    if (num < min) {
      return {
        isValid: false,
        error: `значение не может быть меньше чем ${min}`
      };
    }

    if (num > max) {
      return {
        isValid: false,
        error: `значение не может быть больше чем ${max}`
      };
    }

    return { isValid: true, error: null };
  };

  const calculateValue = (val: string): string => {
    const precision = getPrecisionFromStep(step);
    const numeric = Number(val);
    const [priceDirect, priceReverse] = price.map(Number);

    const result = isSource
      ? formatWithPrecision(numeric * priceDirect, precision)
      : formatWithPrecision(Math.round(numeric * priceReverse), 0);

    return result.toString();
  };

  const handleChange = (val: string) => {
    const validation = validateValue(val);
    setError(validation.error);
    onChange(val, validation.isValid);

    if (validation.isValid) {
      onCalculated(calculateValue(val));
    }
  };

  const handleProgressClick = (percent: number) => {
    const range = max - min;
    const rawValue = min + (range * percent) / 100;
    const precision = getPrecisionFromStep(step);
    const rounded = formatWithPrecision(rawValue, precision);

    handleChange(rounded.toString());
  };

  return (
    <div className={styles.block}>
      <AmountBlock
        value={value}
        onChange={handleChange}
        currency={currency}
        min={min}
        max={max}
        step={step}
        error={error}
      />
      <ProgressBar
        percentage={safePercentage(Number(value), min, max)}
        onSelect={handleProgressClick}
      />
    </div>
  );
};
