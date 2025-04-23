import { act, renderHook } from '@testing-library/react';

import { postExchangeCalc } from 'services/apiService';

import { useExchangeDebounced } from './useExchangeDebounced';

jest.mock('services/apiService', () => ({
  postExchangeCalc: jest.fn()
}));

const mockResponse = {
  outAmount: '117.12',
  isStraight: true,
  counter: 0,
  price: ['0.011712', '85.34']
};

describe('useExchangeDebounced', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should debounce API call and return response', async () => {
    (postExchangeCalc as jest.Mock).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useExchangeDebounced(1000));
    const callback = jest.fn();

    act(() => {
      result.current.calculate(
        { inAmount: '10000', outAmount: null },
        callback
      );
    });

    expect(postExchangeCalc).not.toHaveBeenCalled();

    await act(async () => {
      jest.runAllTimers();
    });

    expect(postExchangeCalc).toHaveBeenCalledWith({
      inAmount: '10000',
      outAmount: null
    });
    expect(callback).toHaveBeenCalledWith(mockResponse);
  });

  it('should debounce multiple calls and only call the last one', async () => {
    (postExchangeCalc as jest.Mock).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useExchangeDebounced(1000));
    const callback = jest.fn();

    act(() => {
      result.current.calculate(
        { inAmount: '10000', outAmount: null },
        callback
      );
      result.current.calculate(
        { inAmount: '20000', outAmount: null },
        callback
      );
      result.current.calculate(
        { inAmount: '30000', outAmount: null },
        callback
      );
    });

    await act(async () => {
      jest.runAllTimers();
    });

    expect(postExchangeCalc).toHaveBeenCalledTimes(1);
    expect(postExchangeCalc).toHaveBeenCalledWith({
      inAmount: '30000',
      outAmount: null
    });
    expect(callback).toHaveBeenCalledWith(mockResponse);
  });
});
