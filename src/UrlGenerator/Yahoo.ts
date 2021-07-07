import {Event} from '../Event';
import {StringHelper} from '../Utils/StringHelper';
import {QueryObject, UrlGenerator} from './UrlGenerator';

interface QueryParameters extends QueryObject {
  v: string;
  title: string;
  st: string;
  et?: string;
  dur?: string;
  desc?: string;
  in_loc?: string;
  inv_list?: string;
  rpat?: string;
  rend?: string;
}

export class Yahoo extends UrlGenerator {
  protected urlBase = 'https://calendar.yahoo.com/';

  protected convertEventToQueryObject(event: Event): QueryParameters {
    const query: QueryParameters = {
      v: '60',
      title: event.title,
      st: StringHelper.clearPunctuation(event.getStartDateAsString()).replace('Z', '+0300'),
      dur: '0004',
      desc: event.description,
      in_loc: event.location,
    }

    // if (!event.isAllDayEvent()) {
    //   query.et = StringHelper.clearPunctuation(event.getEndDateAsString());
    // }

    return query;
  }
}
