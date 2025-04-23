import { RefObject, useEffect } from 'react';

export const useAutoWidthInput = (
  ref: RefObject<HTMLInputElement>,
  value: string
) => {
  useEffect(() => {
    if (!ref.current) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (ctx) {
      const font = getComputedStyle(ref.current).font;
      ctx.font = font;

      const safeValue = value || '0.00';
      const width = ctx.measureText(safeValue).width;

      ref.current.style.width = `${width + 8}px`;
    }
  }, [value, ref]);
};
