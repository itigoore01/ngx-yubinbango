import { normalizePostalCode } from './normalize-postal-code';

describe('normalizePostalCode', () => {
  it('returns normalized postal code', () => {
    expect(normalizePostalCode('111-1111')).toBe('1111111');
    expect(normalizePostalCode('１２３-４５６７')).toBe('1234567');
    expect(normalizePostalCode('１２３ー４５６７')).toBe('1234567');
    expect(normalizePostalCode('１２３－４５６７')).toBe('1234567');
  });
});
