import React, { useEffect, useState } from 'react';

import { formatWithPrecision, getPrecisionFromStep } from 'utils/precision';

import { Card } from 'components/Card/Card';
import { CurrencyInputBlock } from 'components/CurrencyInputBlock/CurrencyInputBlock';

import { useExchangeDebounced } from 'hooks/useExchangeDebounced';

import { AMOUNT_CONFIG } from 'constants/amount';

const initialRub = String(AMOUNT_CONFIG.RUB.min);

const App = () => {
  const { calculate } = useExchangeDebounced();

  const [rub, setRub] = useState(initialRub);
  const [usdt, setUsdt] = useState('0');
  const [price, setPrice] = useState<[string, string]>(['1', '1']);
  const [limits, setLimits] = useState({
    min: 0,
    max: 0,
    step: AMOUNT_CONFIG.USDT.step
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    calculate({ inAmount: initialRub, outAmount: null }, (res) => {
      const rawPrice = Number(res.price[0]);
      const precision = getPrecisionFromStep(AMOUNT_CONFIG.USDT.step);
      const formattedPrice = formatWithPrecision(rawPrice, precision);

      const usdtMin = formatWithPrecision(
        formattedPrice * AMOUNT_CONFIG.RUB.min,
        precision
      );
      const usdtMax = formatWithPrecision(
        formattedPrice * AMOUNT_CONFIG.RUB.max,
        precision
      );

      setRub(initialRub);
      setUsdt(formatWithPrecision(Number(res.outAmount), precision).toString());
      setPrice(res.price);
      setLimits({ min: usdtMin, max: usdtMax, step: AMOUNT_CONFIG.USDT.step });
      setLoading(false);
    });
  }, []);

  const handleRubChange = (val: string, isValid: boolean) => {
    setRub(val);

    if (isValid) {
      const priceDirect = Number(price[0]);
      const precision = getPrecisionFromStep(limits.step);
      const calculated = formatWithPrecision(
        Number(val) * priceDirect,
        precision
      );
      setUsdt(calculated.toString());
    }
  };

  const handleUsdtChange = (val: string, isValid: boolean) => {
    setUsdt(val);

    if (isValid) {
      const priceReverse = Number(price[1]);
      const calculated = Math.round(Number(val) * priceReverse).toString();

      setRub(calculated);
    }
  };

  return (
    <div className="app">
      <Card>
        {loading ? (
          <div className="spinner-container">
            <span className="spinner">Loading...</span>
          </div>
        ) : (
          <>
            <CurrencyInputBlock
              value={rub}
              onChange={handleRubChange}
              onCalculated={setUsdt}
              currency="RUB"
              min={AMOUNT_CONFIG.RUB.min}
              max={AMOUNT_CONFIG.RUB.max}
              step={AMOUNT_CONFIG.RUB.step}
              isSource
              price={price}
            />
            <CurrencyInputBlock
              value={usdt}
              onChange={handleUsdtChange}
              onCalculated={setRub}
              currency="USDT"
              min={limits.min}
              max={limits.max}
              step={limits.step}
              isSource={false}
              price={price}
            />
          </>
        )}
      </Card>
    </div>
  );
};

export default App;
