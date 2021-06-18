/*
&path=%2Fcalendar%2Faction%2Fcompose
&rru=addevent


body=Learn%20all%20about%20the%20rules%20of%20the%20Motorway%20and%20how%20to%20access%20the%20fast%20lane.%0A%0Ahttps%3A%2F%2Fen.wikipedia.org%2Fwiki%2FGridlock_%28Doctor_Who%29
&enddt=2022-01-12T20%3A00%3A00%2B00%3A00
&location=New%20Earth

&startdt=2022-01-12T18%3A00%3A00%2B00%3A00
&subject=Welcome%20to%20the%20Motorway
*/

export class Event {
  public description?: string;
  public location?: string;

  constructor(public title: string, public startDate: Date, public endDate?: Date) {}
}
