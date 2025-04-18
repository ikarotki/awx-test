import React, { FC } from 'react';
import { AmountBlock } from 'components/AmountBlock/AmountBlock';
import { ProgressBar } from 'components/ProgressBar/ProgressBar';
import styles from './CurrencyInputBlock.module.scss';

interface Props {
  value: number;
  onChange: (value: number) => void;
  currency: string;
  percentage: number;
}

export const CurrencyInputBlock: FC<Props> = ({ value, onChange, currency, percentage }) => {
  return (
    <div className={styles.block}>
      <AmountBlock value={value} onChange={onChange} currency={currency} />
      <ProgressBar percentage={percentage} />
    </div>
  );
};
