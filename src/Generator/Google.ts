import {Event} from '../Event';
import {StringHelper} from '../Utils/StringHelper';
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
			dates:
				StringHelper.clearPunctuation(event.getStartDateAsString()) +
				'/' +
				StringHelper.clearPunctuation(event.getEndDateAsString()),
			details: event.description,
			location: event.locationName,
			add: event.hasAttendees() ? this.convertAttendeesToString(event.attendees) : undefined
		};
	}
}
