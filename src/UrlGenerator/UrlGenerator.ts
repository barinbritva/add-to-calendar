import { Attendee } from '../Attendee';
import {Event} from '../Event';
import {Generator} from '../Generator';

export type QueryObject = Record<string, string | undefined>;

export abstract class UrlGenerator implements Generator {
  protected abstract urlBase: string;
  protected abstract convertEventToQueryObject(event: Event): QueryObject;

  public createLink(event: Event): string {
    return this.urlBase + '?' + this.convertQueryObjectToQuery(this.convertEventToQueryObject(event));
  }

  protected convertAttendeesToString(attendees: Attendee[]): string {
    return attendees.map((attendee) => {
      if (typeof attendee === 'string') {
        return attendee;
      } else {
        return attendee[1] == null ? attendee[0] : `${attendee[1]}<${attendee[0]}>`;
      }
    })
    .join(',');
  }

  private convertQueryObjectToQuery(data: QueryObject): string {
    let queryParts: string[] = [];

    for (const key in data) {
      const value = data[key];

      if (value == null) {
        continue;
      }

      queryParts.push(`${key}=${encodeURIComponent(value)}`);
    }

    return queryParts.join('&');
  }
}
