import { formatDateInSydney, parseDateString } from './utils';

describe('parseDateString', () => {
  it('should parse a valid date string', () => {
    const dateStr = '17th May 2025';
    const result = parseDateString(dateStr);
    expect(result).toBeInstanceOf(Date);
    expect(result.getFullYear()).toBe(2025);
    expect(result.getMonth()).toBe(4); // May is 4 (0-based)
    expect(result.getDate()).toBe(17);
  });
  it('should support date with day name out front', () => {
    const dateStr = 'Thu 14th Mar 2024';
    const result = parseDateString(dateStr);
    expect(result).toBeInstanceOf(Date);
    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(2); // March is 2 (0-based)
    expect(result.getDate()).toBe(14);
  });

  it('should interpret date as local time and export a valid ISO8601 date string in UTC', () => {
    const dateStr = '17th May 2025';
    const result = parseDateString(dateStr);
    expect(result.toISOString()).toMatchInlineSnapshot(`"2025-05-17T00:00:00.000Z"`)
  });
  it('should interpret date and time as Sydney local time and export a valid ISO8601 date string in UTC', () => {
    const dateStr = '18th May 2025 21:45';
    const result = parseDateString(dateStr);
    expect(result.toISOString()).toMatchInlineSnapshot(`"2025-05-18T11:45:00.000Z"`)
    expect(result.toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })).toMatchInlineSnapshot(`"18/05/2025, 9:45:00 pm"`)
  });

  it('should throw error for invalid date format', () => {
    const invalidFormats = [
      'Invalid Date',
      'Th 7th Mar 2024',
      'FHB 7th Mar 2024',
    ];

    invalidFormats.forEach(dateStr => {
      console.log(`Testing invalid date format: ${dateStr}`);
      expect(() => parseDateString(dateStr)).toThrow();
    });
  });

  it('should throw error for invalid date values', () => {
    const invalidDates = [
      'Thu 32nd Mar 2024', // Invalid day
      'Thu 7th InvalidMonth 2024', // Invalid month
    ];

    invalidDates.forEach(dateStr => {
      expect(() => parseDateString(dateStr)).toThrow();
    });
  });
});

describe('formatDateInSydney', () => {
  it('should format date with time', () => {
    /*
     '18th May 2025 21:45' = "2025-05-18T11:45:00.000Z" = "18/05/2025, 9:45:00 pm"
     */
    const date = new Date('2025-05-18T11:45:00.000Z');
    const result = formatDateInSydney({ date, showTime: true });
    expect(result).toBe('2025-05-18 21:45');
  });
  it('should format date without time', () => {
    /*
     '18th May 2025 21:45' = "2025-05-18T11:45:00.000Z" = "18/05/2025, 9:45:00 pm"
     */
    const date = new Date('2025-05-18T11:45:00.000Z');
    const result = formatDateInSydney({ date, showTime: false });
    expect(result).toBe('2025-05-18');
  });
});
