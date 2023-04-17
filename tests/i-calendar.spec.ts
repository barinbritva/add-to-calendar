import {describe, expect, it} from 'vitest';
import {Event, ICalendar} from '../src';

describe('class ICalendar method createFile', () => {
	it('should generate correct file for an email attachment', () => {
		const event = new Event(
			'Meet with friends',
			new Date(Date.UTC(2021, 5, 18, 15, 0)),
			new Date(Date.UTC(2021, 5, 18, 17, 0)),
			"Let's grab some coffee!",
			'Blue Bottle Coffee, 300 S Broadway, Los Angeles',
			[['jane@example.com', 'Jane'], ['fred@example.com'], 'joe@example.com']
		);
		const iCalendar = new ICalendar();
		const fileContent = iCalendar.createFile(event);

		expect(fileContent).toBe(
			"BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:2021-06-18T15:00:00Z\nDTEND:2021-06-18T17:00:00Z\nSUMMARY:Meet with friends\nDESCRIPTION:Let's grab some coffee!\nLOCATION:Blue Bottle Coffee, 300 S Broadway, Los Angeles\nEND:VEVENT\nEND:VCALENDAR"
		);
	});
});
