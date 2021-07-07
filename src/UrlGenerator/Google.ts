import {Event} from '../Event';
import {QueryObject, UrlGenerator} from './UrlGenerator';

interface QueryParameters extends QueryObject {
  action: string;
  text: string;
  dates: string;
  details?: string;
  location?: string;
  crm?: 'AVAILABLE' | 'BUSY' | 'BLOCKING';
  trp?: 'true' | 'false';
  add?: string;
  recur?: string;
}

export class Google extends UrlGenerator {
  protected urlBase = 'https://calendar.google.com/calendar/render';

  protected convertEventToQueryObject(event: Event): QueryParameters {
    return {
      action: 'TEMPLATE',
      text: event.title,
      dates: `${event.getStartDateAsString(true)}/${event.getEndDateAsString(true)}`,
      details: event.description,
      location: event.location
    }
  }
}
