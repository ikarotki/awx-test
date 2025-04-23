import { API_URL, PAIR_ID, SERIAL } from 'constants/api';

export interface ExchangePayload {
  pairId: number;
  inAmount: string | number | null;
  outAmount: string | number | null;
}

export interface ExchangeResponse {
  inAmount: string;
  outAmount: string;
  isStraight: boolean;
  price: [string, string];
}

export const postExchangeCalc = async (
  payload: Omit<ExchangePayload, 'pairId'>
): Promise<ExchangeResponse> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      serial: SERIAL
    },
    body: JSON.stringify({
      pairId: PAIR_ID,
      ...payload
    })
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
};
