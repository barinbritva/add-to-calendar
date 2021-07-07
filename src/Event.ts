import {Attendee} from './Attendee';
import {DateHelper} from './Utils/DateHelper';

export class Event {
  private _endDate?: Date | null;
  private duration?: number | null;

  constructor(
    public title: string,
    private _startDate: Date,
    endDateOrDuration?: Date | number | null,
    public description?: string,
    public location?: string,
    private _attendees: Attendee[] = []
  ) {
    this.setEndDate(endDateOrDuration);
    this.assertDatesAreCorrect();
  }

  get startDate() {
    return this._startDate;
  }

  get endDate() {
    return this._endDate;
  }

  get attendees() {
    return this._attendees;
  }

  public reschedule(startDate: Date, endDateOrDuration?: Date | number | null): this {
    this._startDate = startDate;
    const end = endDateOrDuration === undefined && this.duration != null
    ? this.duration
    : endDateOrDuration
    this.setEndDate(end);
    
    this.assertDatesAreCorrect();

    return this;
  }

  public isAllDayEvent(): boolean {
    return this.endDate == null;
  }

  public getStartDateAsString(): string {
    return this.getDateAsString(this.startDate);
  }

  public getEndDateAsString(): string {
    let endDate = this.endDate;

    if (endDate == null) {
      const startDate = this.startDate;
      endDate = DateHelper.cloneDate(startDate);
      endDate.setDate(startDate.getDate() + 1);
    }

    return this.getDateAsString(endDate);
  }

  public changeTitle(value: string): this {
    this.title = value;
    return this;
  }

  public changeDescription(value: string): this {
    this.description = value;
    return this;
  }

  public changeLocation(value: string): this {
    this.location = value;
    return this;
  }

  public addAttendees(...attendees: Attendee[]): this {
    this._attendees.concat(attendees);
    return this;
  }

  public clearAttendees(): this {
    this._attendees = [];
    return this;
  }

  public hasAttendees(): boolean {
    return this._attendees.length > 0;
  }

  private setEndDate(endDateOrDuration?: Date | number | null) {
    if (endDateOrDuration === undefined) {
      return;
    }

    if (typeof endDateOrDuration === 'number') {
      this.duration = endDateOrDuration;
      this._endDate = new Date(this._startDate.getTime() + this.duration * 60);
    } else {
      this.duration = null;
      this._endDate = endDateOrDuration;
    }
  }

  private assertDatesAreCorrect(): void {
    if (this.endDate == null) {
      return;
    }

    if (this.endDate <= this.startDate) {
      throw new Error(
        'End date must be greater than start date. ' +
        `Passed: start date - ${this.startDate.toISOString()}, ` +
        `end date - ${this.endDate.toISOString()}.`);
    }
  }

  private getDateAsString(date: Date): string {
    if (this.isAllDayEvent()) {
      return DateHelper.dateToDateString(date);
    }

    return DateHelper.dateToDateTimeString(date);
  }
}
