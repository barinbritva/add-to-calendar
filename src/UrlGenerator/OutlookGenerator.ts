import { DateHelper } from '../DateHelper';
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
      startdt: '',
      enddt: ''
    }

    if (event.endDate == null) {
      const endDate = DateHelper.cloneDate(event.startDate);
      endDate.setDate(event.startDate.getDate() + 1);

      query.startdt = DateHelper.dateToDateString(event.startDate);
      query.enddt = DateHelper.dateToDateString(endDate);
      query.allday = 'true';
    } else {
      query.startdt = DateHelper.dateToDateTimeWithOffset(event.startDate);
      query.enddt = DateHelper.dateToDateTimeWithOffset(event.endDate);
    }

    if (event.description != null) {
      query.body = event.description;
    }

    if (event.location != null) {
      query.location = event.location;
    }

    query.to = 'Barin Britva <barinbritva@outlook.com>';
    query.online = 'true';

    return query;
  }
}
