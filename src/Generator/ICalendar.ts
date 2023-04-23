import {Event} from '../Event';
import {DateHelper} from '../Utils/DateHelper';
import {StringHelper} from '../Utils/StringHelper';
import {Generator} from './Generator';

export interface DataPiece {
	key: string;
	value: string | undefined;
}

export type Method = 'PUBLISH' | 'REQUEST' | 'REPLY' | 'ADD' | 'CANCEL';

const publish: Method = 'PUBLISH';
const request: Method = 'REQUEST';
const reply: Method = 'REPLY';
const add: Method = 'ADD';
const cancel: Method = 'CANCEL';

export const Methods = {
	Publish: publish,
	Request: request,
	Reply: reply,
	Add: add,
	Cancel: cancel
};

export interface InvitationMeta {
	contentLanguage: string;
	method: Method;
}

export class ICalendar implements Generator {
	private invitationMeta: InvitationMeta = {
		contentLanguage: 'EN',
		method: Methods.Publish
	};

	public configure(invitationMeta: Partial<InvitationMeta>): this {
		this.invitationMeta = {...this.invitationMeta, ...invitationMeta};
		return this;
	}

	public createLink(event: Event): string {
		const eventData = this.convertEventToData(event);

		return `data:text/calendar;charset=utf8,${this.dataPiecesToContent(eventData, true)}`;
	}

	public createFile(event: Event): string {
		const eventData = this.convertEventToData(event);

		return this.dataPiecesToContent(eventData);
	}

	private convertEventToData(event: Event): DataPiece[] {
		const data = [
			{
				key: 'BEGIN',
				value: 'VCALENDAR'
			},
			{
				key: 'VERSION',
				value: '2.0'
			},
			{
				key: 'PRODID',
				value: '-//barinbritva//add-to-calendar//' + this.invitationMeta.contentLanguage
			},
			{
				key: 'CALSCALE',
				value: 'GREGORIAN'
			},
			{
				key: 'METHOD',
				value: this.invitationMeta.method
			},
			{
				key: 'BEGIN',
				value: 'VEVENT'
			},
			{
				key: 'UID',
				value: event.uid
			},
			{
				key: 'DTSTAMP',
				value: StringHelper.clearPunctuation(DateHelper.dateToDateTimeString(new Date()))
			},
			{
				key: 'DTSTART',
				value: StringHelper.clearPunctuation(event.getStartDateAsString())
			},
			{
				key: 'DTEND',
				value: StringHelper.clearPunctuation(event.getEndDateAsString())
			},
			{
				key: 'SUMMARY',
				value: this.escapeSpecialChars(event.title)
			},
			{
				key: 'DESCRIPTION',
				value: this.escapeSpecialChars(event.description)
			}
		];

		if (event.location != null) {
			data.push({
				key: 'LOCATION',
				value: this.escapeSpecialChars(event.locationName)
			});

			if (event.locationCoordinates != null) {
				event.locationCoordinates;
				data.push({
					key: 'GEO',
					value: this.escapeSpecialChars(
						`${event.locationCoordinates.latitude};${event.locationCoordinates.longitude}`
					)
				});
			}
		}

		if (event.hasAttendees()) {
			event.attendees.forEach((attendee, index) => {
				const attendeeType = index === 0 ? 'ORGANIZER' : 'ATTENDEE';
				let attendeeEmail: string;
				let attendeeName: string;
				if (typeof attendee === 'string') {
					attendeeEmail = attendee;
					attendeeName = attendee;
				} else {
					attendeeEmail = attendee[0];
					attendeeName = attendee[1] ?? attendee[0];
				}

				data.push({
					key: `${attendeeType};CN="${attendeeName}"`,
					value: this.escapeSpecialChars('mailto:' + attendeeEmail)
				});
			});
		}

		data.push(
			{
				key: 'END',
				value: 'VEVENT'
			},
			{
				key: 'END',
				value: 'VCALENDAR'
			}
		);

		return data;
	}

	private escapeSpecialChars(text?: string): string | undefined {
		if (text == null) {
			return text;
		}

		return text
			.replace(/,/gm, ',')
			.replace(/;/gm, ';')
			.replace(/\n/gm, '\\n')
			.replace(/(\\n)[\s\t]+/gm, '\\n');
	}

	private dataPiecesToContent(data: DataPiece[], encode = false): string {
		let fileParts: string[] = [];

		for (const key in data) {
			const dataItem = data[key];

			if (dataItem.value == null) {
				continue;
			}

			fileParts.push(
				`${encode ? encodeURIComponent(dataItem.key) : dataItem.key}` +
					':' +
					`${encode ? encodeURIComponent(dataItem.value) : dataItem.value}`
			);
		}

		return fileParts.join('\n');
	}
}
