import React, { CSSProperties, FC, KeyboardEvent, useCallback } from 'react';

import cs from 'classnames';

import styles from './ProgressBar.module.scss';

interface ProgressBarProps {
  percentage: number;
  onSelect?: (value: number) => void;
}

const SEGMENTS = [25, 50, 75, 100] as const;
const SEGMENT_WIDTH = 25;

export const ProgressBar: FC<ProgressBarProps> = ({ percentage, onSelect }) => {
  const calculateLocalProgress = useCallback(
    (segmentValue: number): number => {
      return Math.max(
        0,
        Math.min(
          100,
          ((percentage - (segmentValue - SEGMENT_WIDTH)) / SEGMENT_WIDTH) * 100
        )
      );
    },
    [percentage]
  );

  const getSegmentStyle = useCallback((progress: number): CSSProperties => {
    return { '--progress': `${progress}%` } as CSSProperties;
  }, []);

  const getSegmentClassName = useCallback(
    (isFullyFilled: boolean): string => {
      return cs(styles.segment, {
        [styles.filledFull]: isFullyFilled,
        [styles.clickable]: Boolean(onSelect)
      });
    },
    [onSelect]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>, value: number) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onSelect?.(value);
      }
    },
    [onSelect]
  );

  return (
    <div
      className={styles.bar}
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {SEGMENTS.map((value) => {
        const localProgress = calculateLocalProgress(value);
        const isFullyFilled = localProgress === 100;
        const style = getSegmentStyle(localProgress);
        const segmentClassName = getSegmentClassName(isFullyFilled);

        return (
          <div
            key={value}
            className={segmentClassName}
            style={style}
            aria-label={`${value}%`}
            onClick={() => onSelect?.(value)}
            onKeyDown={(e) => handleKeyDown(e, value)}
            role="button"
            tabIndex={onSelect ? 0 : -1}
          >
            <span className={styles.textBack}>{value}%</span>
            <span className={styles.textFront}>{value}%</span>
          </div>
        );
      })}
    </div>
  );
};
