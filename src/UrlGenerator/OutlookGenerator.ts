import {QueryObject, UrlGenerator} from './UrlGenerator';
import {Event} from '../Event';

export interface OutlookQuery extends QueryObject {
  path: string;
  rru: string;
  subject: string;
  startdt: string;
  enddt: string;
  allday?: string;
  body?: string;
  location?: string;
  online?: string;
  to?: string;
  cc?: string;
}

export class OutlookGenerator extends UrlGenerator<OutlookQuery> {
  protected urlBase = 'https://outlook.live.com/calendar/0/deeplink/compose';

  protected convertEventToQueryObject(event: Event): OutlookQuery {
    const query: OutlookQuery = {
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
