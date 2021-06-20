import {Event} from '../Event';
import {Generator} from '../Generator';

export type QueryObject = Record<string, string | undefined>;

export abstract class UrlGenerator<Query extends QueryObject> implements Generator {
  protected abstract urlBase: string;
  protected abstract convertEventToQueryObject(event: Event): Query;

  public createLink(event: Event): string {
    return this.urlBase + '?' + this.convertQueryObjectToQuery(this.convertEventToQueryObject(event));
  }

  private convertQueryObjectToQuery(data: Query): string {
    let queryParts: string[] = [];

    for (const key in data) {
      const value = data [key];

      if (value == null) {
        continue;
      }

      queryParts.push(`${key}=${encodeURIComponent(value)}`);
    }

    return queryParts.join('&');
  }
}
