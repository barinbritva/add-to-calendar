import {Attendee} from './Attendee';
import {DateHelper} from './Utils/DateHelper';

/**
 * Event entity
 * 
 * Contains title, dates of start and end, description, location and attendees.
 */
export class Event {
  private _startDate: Date;
  private _endDate: Date | null = null;
  private duration: number | null = null;
  private _attendees: Attendee[];

  /**
   * @param title - Event title.
   * @param startDate - Event start date and time. For all day events it's enough to pass only date without time.
   * @param endDateOrDuration - Event date end or event duration in minutes. Leave empty for all day events.
   * @param description - Details about the event.
   * @param location - Place of the event. Just any address string.
   * @param attendees - List of people to invite.
   */
  constructor(
    public title: string,
    startDate: Date,
    endDateOrDuration?: Date | number | null,
    public description?: string,
    public location?: string,
    attendees: Attendee[] = []
  ) {
    this._startDate = startDate;
    this.setEndDate(endDateOrDuration);
    this._attendees = attendees;

    this.assertDatesAreCorrect();
  }

  get startDate() {
    return this._startDate;
  }

  get endDate() {
    return this._endDate || this.getNextDayAfterStartDate();
  }

  get attendees() {
    return this._attendees;
  }

  /**
   * Reschedule the event.
   * 
   * ```typescript
   * // manage all day event
   * const event = new Event('Hiking', new Date(2021, 6, 8))
   * event.reschedule(new Date(2021, 6, 8))
   * 
   * // covert general event to all day
   * event.reschedule(new Date(2021, 6, 8), null)
   * 
   * // change start date and time and set duration
   * event.reschedule(new Date(2021, 6, 8, 12, 0), 45)
   * 
   * // change start date and time, but leave the same duration
   * event.reschedule(new Date(2021, 6, 8, 13, 0))
   * 
   * // use end date instead of duration
   * event.reschedule(new Date(2021, 6, 8, 13, 0), new Date(2021, 6, 8, 13, 45))
   * ```
   * 
   * @param startDate - Event start date and/or time.
   * @param endDateOrDuration - Event date end or event duration in minutes. Leave empty for all day events or keep previously set duration.
   * @returns The event. You can chain this method.
   */
  public reschedule(startDate: Date, endDateOrDuration?: Date | number | null): this {
    this._startDate = startDate;
    const end = endDateOrDuration === undefined && this.duration != null
    ? this.duration
    : endDateOrDuration
    
    this.setEndDate(end);
    this.assertDatesAreCorrect();

    return this;
  }

  /**
   * Check if the event is all day long
   * 
   * @returns Event is all day or not.
   */
  public isAllDayEvent(): boolean {
    return this._endDate == null;
  }

  public getStartDateAsString(): string {
    return this.getDateAsString(this.startDate);
  }

  public getEndDateAsString(): string {
    return this.getDateAsString(this.endDate);
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

  private getNextDayAfterStartDate(): Date {
    const startDate = this.startDate;
    const endDate = DateHelper.cloneDate(startDate);
    endDate.setDate(startDate.getDate() + 1);

    return endDate;
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
    if (this._endDate == null) {
      return;
    }

    if (this._endDate <= this.startDate) {
      throw new Error(
        'End date must be greater than start date. ' +
        `Passed: start date - ${this.startDate.toISOString()}, ` +
        `end date - ${this._endDate.toISOString()}.`);
    }
  }

  private getDateAsString(date: Date): string {
    if (this.isAllDayEvent()) {
      return DateHelper.dateToDateString(date);
    }

    return DateHelper.dateToDateTimeString(date);
  }
}
