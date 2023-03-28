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
		return {
			v: '60',
			title: event.title,
			st: StringHelper.clearPunctuation(event.getStartDateAsString()),
			et: StringHelper.clearPunctuation(event.getEndDateAsString()),
			desc: event.description,
			in_loc: event.location,
			inv_list: event.hasAttendees() ? this.convertAttendeesToString(event.attendees) : undefined
		};
	}
}
