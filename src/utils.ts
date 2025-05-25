import { toZonedTime } from 'date-fns-tz';

/**
 * Formate date (and optionally time) in ISO8601 with the Sydney UTC offset,
 * but with a space instead of a T separator
 * 
 * ie. show as UTC+10 or +11 (Sydney time), not as UTC+0
 *
 * @param date - The date to format.
 * @param showTime - Whether to show the time.
 * @returns The formatted date as a string.
*/
export function formatDateInSydney({ date, showTime }: { date: Date, showTime?: boolean }): string {
  const sydneyDate = toZonedTime(date, 'Australia/Sydney');
  
  // Format date as YYYY-MM-DD
  const year = sydneyDate.getFullYear();
  const month = (sydneyDate.getMonth() + 1).toString().padStart(2, '0');
  const day = sydneyDate.getDate().toString().padStart(2, '0');
  const datePart = `${year}-${month}-${day}`;

  // Format time as HH:mm if showTime is true
  let timePart = '';
  if (showTime) {
    const hours = sydneyDate.getHours().toString().padStart(2, '0');
    const minutes = sydneyDate.getMinutes().toString().padStart(2, '0');
    timePart = ` ${hours}:${minutes}`;
  }

  return `${datePart}${timePart}`;
}

/**
 * Parse date string, in the local sydney time.
 *
 * Note that Sydney is UTC+11 usually, but is in AEDT UTC+11:00 during daylight saving time.
 * AEDT starts on the first Sunday in October and ends on the first Sunday in April.
 *
 * This function will return the date as a JS Date object.
 *
 * @param dateStr - The date string to parse. Supports formats like:
 *   - '18th May 2025 21:45'
 *   - 'Thu 14th Mar 2024'
 * @returns The parsed date as a JS Date object.
 * @throws An error if the date string is invalid.
 */
export function parseDateString(dateStr: string): Date {
  // Split the string into parts
  const parts = dateStr.split(' ');

  // Check if the first part is a day of the week
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hasDayOfWeek = dayNames.includes(parts[0]);

  // Adjust parts array if day of week is present
  const relevantParts = hasDayOfWeek ? parts.slice(1) : parts;

  if (relevantParts.length !== 3 && relevantParts.length !== 4) {
    throw new Error(`Invalid date format: ${dateStr}`);
  }

  // Remove ordinal indicators (st, nd, rd, th)
  const day = relevantParts[0].replace(/(\d+)(st|nd|rd|th)/, '$1');
  const month = relevantParts[1];
  const year = relevantParts[2];

  let hour = 0;
  let minute = 0;
  const timeProvided: boolean = relevantParts.length === 4;

  if (timeProvided) {
    const time = relevantParts[3];
    const timeParts = time.split(':');
    hour = parseInt(timeParts[0]);
    minute = parseInt(timeParts[1]);
  }

  // Convert month name to number (0-11)
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthNum = monthNames.indexOf(month) + 1;
  if (monthNum === 0) {
    throw new Error(`Invalid month name: ${month}`);
  }

  // Create date string in format that JavaScript can parse
  const dateString = `${year}-${monthNum.toString().padStart(2, '0')}-${day.padStart(2, '0')}${timeProvided ? `T${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00` : ''}`;

  // First create a date object in local time
  const localDate = new Date(dateString);

  if (localDate.toString() === 'Invalid Date') {
    console.log({ year, month, day, hour, minute })
    throw new Error(`Unable to parse date string: '${dateStr}'`);
  }

  // Convert to Sydney timezone (Australia/Sydney)
  // This will automatically handle both AEST and AEDT
  const sydneyDate = toZonedTime(localDate, 'Australia/Sydney');

  return sydneyDate;
}