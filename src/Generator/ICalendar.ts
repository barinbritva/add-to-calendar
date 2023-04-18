import {Event} from '../Event';
import {StringHelper} from '../Utils/StringHelper';
import {Generator} from './Generator';

export interface DataPiece {
	key: string;
	value: string | undefined;
}

export class ICalendar implements Generator {
	public createLink(event: Event): string {
		const eventData = this.convertEventToData(event);

		return `data:text/calendar;charset=utf8,${this.dataPiecesToContent(eventData, true)}`;
	}

	public createFile(event: Event): string {
		const eventData = this.convertEventToData(event);

		return this.dataPiecesToContent(eventData);
	}

	private convertEventToData(event: Event): DataPiece[] {
		return [
			{
				key: 'BEGIN',
				value: 'VCALENDAR'
			},
			{
				key: 'VERSION',
				value: '2.0'
			},
			{
				key: 'BEGIN',
				value: 'VEVENT'
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
			},
			{
				key: 'LOCATION',
				value: this.escapeSpecialChars(event.location)
			},
			{
				key: 'END',
				value: 'VEVENT'
			},
			{
				key: 'END',
				value: 'VCALENDAR'
			}
		];
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
				`${dataItem.key}:${encode ? encodeURIComponent(dataItem.value) : dataItem.value}`
			);
		}

		return fileParts.join('\n');
	}
}
