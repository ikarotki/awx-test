export const getPrecisionFromStep = (step: number): number => {
  const stepStr = step.toString();

  if (stepStr.includes('e-')) {
    const [, exp] = stepStr.split('e-');
    return parseInt(exp, 10);
  }

  const decimalIndex = stepStr.indexOf('.');
  if (decimalIndex === -1) return 0;

  return stepStr.length - decimalIndex - 1;
};

export const formatWithPrecision = (
  value: number,
  precision: number
): number => {
  const factor = Math.pow(10, precision);
  return Math.round(value * factor) / factor;
};
