import React, { FC, CSSProperties } from 'react';
import styles from './ProgressBar.module.scss';
import cs from 'classnames';

interface ProgressBarProps {
  percentage: number;
}

const SEGMENTS = [25, 50, 75, 100];

export const ProgressBar: FC<ProgressBarProps> = ({ percentage }) => {
  return (
    <div className={styles.bar}>
      {SEGMENTS.map((value) => {
        const localProgress = Math.max(0, Math.min(100, ((percentage - (value - 25)) / 25) * 100));
        const isFullyFilled = localProgress === 100;

        const style: CSSProperties = {
          '--progress': `${localProgress}%`,
        } as CSSProperties;

        const segmentClassName = cs(styles.segment, {
          [styles.filledFull]: isFullyFilled,
        });

        return (
          <div
            key={value}
            className={segmentClassName}
            style={style}
            aria-label={`${value}%`}
          >
            <span className={styles.textBack}>{value}%</span>
            <span className={styles.textFront}>{value}%</span>
          </div>
        );
      })}
    </div>
  );
};