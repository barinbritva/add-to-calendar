export class Event {
  constructor(
    public title: string,
    public startDate: Date,
    public endDate?: Date,
    public description?: string,
    public location?: string
  ) {}
}
