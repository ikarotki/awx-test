import { useRef } from 'react';

import { ExchangeResponse, postExchangeCalc } from 'services/apiService';

export const useExchangeDebounced = (delay = 1000) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const calculate = (
    params: { inAmount: string | null; outAmount: string | null },
    onResult: (res: ExchangeResponse) => void
  ) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      try {
        const res = await postExchangeCalc(params);

        onResult(res);
      } catch (e) {
        console.error('[Exchange] ❌ API error:', e);
      }
    }, delay);
  };

  return { calculate };
};
