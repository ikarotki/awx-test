import { formatWithPrecision, getPrecisionFromStep } from './precision';

describe('precision utils', () => {
  describe('getPrecisionFromStep', () => {
    it('should return 0 for whole numbers', () => {
      expect(getPrecisionFromStep(100)).toBe(0);
    });

    it('should return correct precision for decimals', () => {
      expect(getPrecisionFromStep(0.01)).toBe(2);
      expect(getPrecisionFromStep(0.000001)).toBe(6);
      expect(getPrecisionFromStep(1e-8)).toBe(8);
    });
  });

  describe('formatWithPrecision', () => {
    it('should round number to given precision', () => {
      expect(formatWithPrecision(123.456789, 2)).toBe(123.46);
      expect(formatWithPrecision(0.123456, 4)).toBe(0.1235);
    });

    it('should handle zero precision', () => {
      expect(formatWithPrecision(99.99, 0)).toBe(100);
    });
  });
});
