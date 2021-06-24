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

  public getStartDateAsString(): string {
    return this.getDateAsString(this.startDate);
  }

  public getEndDateAsString(): string {
    if (this.endDate == null) {
      const startDate = this.startDate;
      let endDate: Date;

      endDate = DateHelper.cloneDate(startDate);
      endDate.setDate(startDate.getDate() + 1);

      return this.getDateAsString(endDate);
    }

    return this.getDateAsString(this.endDate);
  }

  private getDateAsString(date: Date): string {
    if (this.isAllDayEvent()) {
      return DateHelper.dateToDateString(date);
    }

    return DateHelper.dateToDateTimeString(date);
  }
}
