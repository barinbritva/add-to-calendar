export abstract class DateHelper {
  public static formatDateToYyyyMmDd(date: Date): string {
    const dateYear = date.getFullYear();
    const dateMonth = date.getMonth() + 1;
    const dateDate = date.getDate();

    return `${dateYear}-${DateHelper.addZero(dateMonth)}-${DateHelper.addZero(dateDate)}`;
  }

  public static formatDateToYyyyMmDdTHhMmSsWithOffset(date: Date): string {
    const dateYear = date.getFullYear();
    const dateMonth = date.getMonth() + 1;
    const dateDate = date.getDate();

    // todo refactor
    // todo offset
    return '' + dateYear + '-' + DateHelper.addZero(dateMonth) + '-' + DateHelper.addZero(dateDate) +
     'T' + DateHelper.addZero(date.getHours()) + ':' + DateHelper.addZero(date.getMinutes()) + ':' + DateHelper.addZero(date.getSeconds());
  }
  

  public static cloneDate(date: Date): Date {
    return new Date(date.getTime());
  }

  private static addZero(value: number): string {
    return value > 9 ? String(value) : '0' + value;
  }
} 
