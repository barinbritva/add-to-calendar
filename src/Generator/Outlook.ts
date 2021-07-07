import {Event} from '../Event';
import {QueryObject, UrlGenerator} from './UrlGenerator';

interface QueryParameters extends QueryObject {
  path: string;
  rru: string;
  subject: string;
  startdt: string;
  enddt: string;
  allday?: string;
  body?: string;
  location?: string;
  online?: 'true' | 'false';
  to?: string;
  cc?: string;
}

export class Outlook extends UrlGenerator {
  protected urlBase = 'https://outlook.live.com/calendar/0/deeplink/compose';

  protected convertEventToQueryObject(event: Event): QueryParameters {
    return {
      path: '/calendar/action/compose',
      rru: 'addevent',
      subject: event.title,
      startdt: event.getStartDateAsString(),
      enddt: event.getEndDateAsString(),
      body: event.description,
      location: event.location,
      allday: event.isAllDayEvent()
        ? String(event.isAllDayEvent())
        : undefined,
      to: event.hasAttendees()
         ? this.convertAttendeesToString(event.attendees)
         : undefined
    }
  }
}
