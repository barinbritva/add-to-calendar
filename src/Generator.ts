import {Event} from './Event';

export abstract class Generator {
  constructor (protected event: Event) {}

  protected convertRecordToQueryString(data: Record<string, string>): string {
    const keys = Object.keys(data);
    const queryParams = keys.map((key) => {
      return `${key}=${encodeURIComponent(data[key])}`;
    });

    return queryParams.join('&');
  }

  public abstract createLink(): string;
}
