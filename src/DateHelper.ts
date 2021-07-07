export abstract class DateHelper {
  public static dateToDateString(date: Date, separator = '-'): string {
    const year = date.getFullYear();
    const month = DateHelper.addLeadingZeroIfNeeded(date.getMonth() + 1);
    const day = DateHelper.addLeadingZeroIfNeeded(date.getDate());

    return `${year}${separator}${month}${separator}${day}`;
  }

  public static dateToDateTimeString(
    date: Date,
    dateSeparator = '-',
    timeSeparator = ':'
  ): string {
    const year = date.getUTCFullYear();
    const month = DateHelper.addLeadingZeroIfNeeded(date.getUTCMonth() + 1);
    const day = DateHelper.addLeadingZeroIfNeeded(date.getUTCDate());
    const hours = DateHelper.addLeadingZeroIfNeeded(date.getUTCHours());
    const minutes = DateHelper.addLeadingZeroIfNeeded(date.getUTCMinutes());
    const seconds = DateHelper.addLeadingZeroIfNeeded(date.getUTCSeconds());

    return `${year}${dateSeparator}${month}${dateSeparator}${day}` +
     `T${hours}${timeSeparator}${minutes}${timeSeparator}${seconds}Z`
  }
  

  public static cloneDate(date: Date): Date {
    return new Date(date.getTime());
  }

  private static addLeadingZeroIfNeeded(value: number): string {
    return value > 9 ? String(value) : '0' + value;
  }
} 
