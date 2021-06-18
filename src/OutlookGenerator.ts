import { DateHelper } from './DateHelper';
import {Generator} from './Generator';

export interface OutlookEvent {
  subject: string;
  startdt: string;
  enddt: string;
  allday?: boolean;
  body?: string;
  location?: string;
  online?: boolean;
  to: string[];
  cc: string[];
}

export class OutlookGenerator extends Generator {
  private urlBase = 'https://outlook.live.com/calendar/0/deeplink/compose';
  private urlQueryParts: Record<string, string> = {
    path: '/calendar/action/compose',
    rru: 'addevent'
  }

  public createLink(): string {
    let link = this.urlBase +
    '?' + this.convertRecordToQueryString(this.urlQueryParts) +
    '&' + this.convertRecordToQueryString(this.convertEventToOutlookFormat())
    

    return link;
  }

  private convertEventToOutlookFormat(): Record<string, string> {
    const event: Record<string, string> = {
      subject: this.event.title
    }

    if (this.event.endDate == null) {
      const endDate = DateHelper.cloneDate(this.event.startDate);
      endDate.setDate(this.event.startDate.getDate() + 1);

      event.startdt = DateHelper.formatDateToYyyyMmDd(this.event.startDate);
      event.enddt = DateHelper.formatDateToYyyyMmDd(endDate);
      event.allday = 'true';
    } else {
      event.startdt = DateHelper.formatDateToYyyyMmDdTHhMmSsWithOffset(this.event.startDate);
      event.enddt = DateHelper.formatDateToYyyyMmDdTHhMmSsWithOffset(this.event.endDate);
    }

    if (this.event.description != null) {
      event.body = this.event.description;
    }

    if (this.event.location != null) {
      event.location = this.event.location;
    }

    event.to = 'Barin Britva <barinbritva@outlook.com>';
    event.online = 'true';
    event.busy = 'away';
    // free, 
    // event.private = 'true'

    return event;
  }
}
