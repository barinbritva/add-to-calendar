import { DateHelper } from './DateHelper';

// TODO implement builder for setting optional params and chaining
// TODO implement duration instead of endData to make changing startDate affects endDate (for changing timezoines for different users)
// TODO support of attendees
// TODO support of some specific fields like: online, busy, etc

export class Event {
  constructor(
    public title: string,
    public startDate: Date,
    public endDate?: Date,
    public description?: string,
    public location?: string
  ) {}

  public isAllDayEvent(): boolean {
    return this.endDate == null;
  }

  public getStartDateAsString(noSeparators = false): string {
    return this.getDateAsString(this.startDate, noSeparators);
  }

  public getEndDateAsString(noSeparators = false): string {
    let endDate = this.endDate;

    if (endDate == null) {
      const startDate = this.startDate;
      endDate = DateHelper.cloneDate(startDate);
      endDate.setDate(startDate.getDate() + 1);
    }

    return this.getDateAsString(endDate, noSeparators);
  }

  private getDateAsString(date: Date, noSeparators?: boolean): string {
    const separator = noSeparators ? '' : undefined

    if (this.isAllDayEvent()) {
      return DateHelper.dateToDateString(date, separator);
    }

    return DateHelper.dateToDateTimeString(date, separator, separator);
  }
}
