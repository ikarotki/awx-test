import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import { CurrencyInputBlock } from './CurrencyInputBlock';

const setup = (propsOverrides = {}) => {
  const defaultProps = {
    value: '1000',
    onChange: jest.fn(),
    onCalculated: jest.fn(),
    currency: 'RUB',
    min: 1000,
    max: 100000,
    step: 100,
    isSource: true,
    price: ['0.01', '100'] as [string, string]
  };

  const utils = render(
    <CurrencyInputBlock {...defaultProps} {...propsOverrides} />
  );

  return {
    ...utils,
    props: { ...defaultProps, ...propsOverrides }
  };
};

describe('CurrencyInputBlock', () => {
  it('should render input with value', () => {
    setup();
    const input = screen.getByDisplayValue('1000');
    expect(input).toBeInTheDocument();
  });

  it('should call onChange and onCalculated on valid input', () => {
    const onChange = jest.fn();
    const onCalculated = jest.fn();
    setup({ onChange, onCalculated });

    const input = screen.getByDisplayValue('1000');
    fireEvent.change(input, { target: { value: '2000' } });

    expect(onChange).toHaveBeenCalledWith('2000', true);
    expect(onCalculated).toHaveBeenCalled();
  });

  it('should show error for value below min', () => {
    const { getByDisplayValue, getByText } = setup();
    const input = getByDisplayValue('1000');
    fireEvent.change(input, { target: { value: '500' } });

    expect(getByText(/значение не может быть меньше/)).toBeInTheDocument();
  });

  it('should show error for value above max', () => {
    const { getByDisplayValue, getByText } = setup();
    const input = getByDisplayValue('1000');
    fireEvent.change(input, { target: { value: '100001' } });

    expect(getByText(/значение не может быть больше/)).toBeInTheDocument();
  });

  it('should handle progress bar click and update input', () => {
    const onChange = jest.fn();
    const onCalculated = jest.fn();
    const { getByLabelText } = setup({ onChange, onCalculated });

    const segment = getByLabelText('25%');
    fireEvent.click(segment);

    expect(onChange).toHaveBeenCalled();
    expect(onCalculated).toHaveBeenCalled();
  });

  it('should show error if input is empty', () => {
    const { getByDisplayValue, getByText } = setup();
    const input = getByDisplayValue('1000');
    fireEvent.change(input, { target: { value: '' } });

    expect(getByText(/значение не может быть пустым/)).toBeInTheDocument();
  });

  it('should calculate reversed when isSource is false', () => {
    const onCalculated = jest.fn();
    const { getByDisplayValue } = setup({
      isSource: false,
      onCalculated,
      value: '1000'
    });

    const input = getByDisplayValue('1000');
    fireEvent.change(input, { target: { value: '2000' } });

    expect(onCalculated).toHaveBeenCalledWith('200000');
  });

  it('should accept value equal to min', () => {
    const onChange = jest.fn();
    const onCalculated = jest.fn();

    const { rerender } = setup({
      value: '1001',
      onChange,
      onCalculated
    });

    const input = screen.getByDisplayValue('1001');
    fireEvent.change(input, { target: { value: '1000' } });

    rerender(
      <CurrencyInputBlock
        value="1000"
        onChange={onChange}
        onCalculated={onCalculated}
        currency="RUB"
        min={1000}
        max={100000}
        step={100}
        isSource={true}
        price={['0.01', '100']}
      />
    );

    expect(onChange).toHaveBeenCalledWith('1000', true);
    expect(onCalculated).toHaveBeenCalled();
  });

  it('should accept value equal to max', () => {
    const onChange = jest.fn();
    const onCalculated = jest.fn();
    const { getByDisplayValue } = setup({
      value: '99999',
      onChange,
      onCalculated
    });

    const input = getByDisplayValue('99999');
    fireEvent.change(input, { target: { value: '100000' } });

    expect(onChange).toHaveBeenCalledWith('100000', true);
    expect(onCalculated).toHaveBeenCalled();
  });
});
