import React, { FC, useRef } from 'react';

import { useAutoWidthInput } from 'hooks/useAutoWidthInput';

import { DECIMAL_INPUT_REGEX } from 'constants/regex';

import styles from './AmountBlock.module.scss';

interface Props {
  value: string;
  onChange: (val: string) => void;
  currency: string;
  min: number;
  max: number;
  step: number;
  error?: string;
}

export const AmountBlock: FC<Props> = ({
  value,
  onChange,
  currency,
  min,
  max,
  step,
  error
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useAutoWidthInput(inputRef, value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    if (DECIMAL_INPUT_REGEX.test(val)) {
      onChange(val);
    }
  };

  return (
    <div className={styles.wrapper}>
      {error && <div className={styles.tooltip}>{error}</div>}
      <input
        ref={inputRef}
        type="number"
        inputMode="decimal"
        step={step}
        min={min}
        max={max}
        value={value || ''}
        onChange={handleChange}
        className={styles.input}
      />
      <span className={styles.currency}>{currency}</span>
    </div>
  );
};
