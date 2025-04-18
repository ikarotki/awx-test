import React, { FC, useRef, useEffect } from 'react';
import styles from './AmountBlock.module.scss';

interface Props {
  value: number;
  onChange: (val: number) => void;
  currency: string;
  maxLength?: number;
}

export const AmountBlock: FC<Props> = ({
  value,
  onChange,
  currency,
  maxLength = 10
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const current = el.innerText.trim();
    const expected = value === 0 ? '' : value.toString();

    if (current !== expected) {
      el.innerText = expected;
    }
  }, [value]);

  const handleInput = () => {
    if (!ref.current) return;

    const raw = ref.current.innerText.replace(/\D/g, '');
    const limited = raw.slice(0, maxLength);

    if (raw.length > maxLength) {
      ref.current.innerText = limited;

      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(ref.current);
      range.collapse(false);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }

    onChange(Number(limited || 0));
  };

  const handleBeforeInput = (e: React.FormEvent<HTMLDivElement>) => {
    const inputEvent = e.nativeEvent as InputEvent;
    if (!/^\d*$/.test(inputEvent.data || '')) {
      e.preventDefault();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
    if (allowedKeys.includes(e.key)) return;

    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.editable}
        contentEditable
        suppressContentEditableWarning
        ref={ref}
        onInput={handleInput}
        onBeforeInput={handleBeforeInput}
        onKeyDown={handleKeyDown}
        data-placeholder="0"
      />
      <span className={styles.currency}>{currency}</span>
    </div>
  );
};