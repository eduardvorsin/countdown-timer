import formatTime from './helpers';

describe('formatTime tests', () => {
  it('should return an error if a non-numeric value is passed', () => {
    expect.assertions(1);
    expect(() => {
      formatTime('abc');
    }).toThrow('The passed value must be of numeric type');
  });

  it('should return "00:00:00:05" seconds if a value of 5000 is passed', () => {
    expect.assertions(1);
    expect(formatTime(5000)).toBe('00:00:00:05');
  });

  it('should return "00:00:01:05" seconds if a value of 65000 is passed', () => {
    expect.assertions(1);
    expect(formatTime(65000)).toBe('00:00:01:05');
  });

  it('should return "00:01:00:05" seconds if a value of 3605000 is passed', () => {
    expect.assertions(1);
    expect(formatTime(3605000)).toBe('00:01:00:05');
  });

  it('should return "01:00:00:05" seconds if a value of 86405000 is passed', () => {
    expect.assertions(1);
    expect(formatTime(86405000)).toBe('01:00:00:05');
  });
});
