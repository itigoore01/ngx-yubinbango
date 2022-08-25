import { elementHasValue } from './element-has-value';

describe('elementHasValue', () => {
  it('returns true', () => {
    expect(elementHasValue(document.createElement('input'))).toBe(true);
  });

  it('returns true', () => {
    expect(elementHasValue(document.createElement('div'))).toBe(false);
  });
});
