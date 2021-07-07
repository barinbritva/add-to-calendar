import {QueryObject, UrlGenerator} from './UrlGenerator';
import {Event} from '../Event';

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
    const query: QueryParameters = {
      path: '/calendar/action/compose',
      rru: 'addevent',
      subject: event.title,
      startdt: event.getStartDateAsString(),
      enddt: event.getEndDateAsString(),
      body: event.description,
      location: event.location
    }

    if (event.isAllDayEvent()) {
      query.allday = String(event.isAllDayEvent());
    }

    return query;
  }
}
