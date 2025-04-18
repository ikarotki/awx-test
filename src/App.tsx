import React, { useState } from 'react';
import { Card } from './components/Card/Card';
import { CurrencyInputBlock } from './components/CurrencyInputBlock/CurrencyInputBlock';

function App() {
  const [rub, setRub] = useState(10000);
  const [usdt, setUsdt] = useState(100);

  return (
    <div className="app">
      <Card>
        <CurrencyInputBlock value={rub} onChange={setRub} currency="RUB" percentage={13} />
        <CurrencyInputBlock value={usdt} onChange={setUsdt} currency="USDT" percentage={65} />
      </Card>
    </div>
  );
}

export default App;