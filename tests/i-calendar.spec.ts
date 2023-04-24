import {describe, expect, it, beforeAll, afterAll} from 'vitest';
import sinon from 'sinon';
import {Event, ICalendar} from '../src';
import {Methods} from '../src/Generator/ICalendar';

const random = sinon.stub(Math, 'random');

describe('class ICalendar method createFile', () => {
	beforeAll(() => {
		random.returns(0.9750872033575881);
	});

	afterAll(() => {
		random.restore();
	});

	it('should generate correct file for an email attachment', () => {
		const iCalendar = new ICalendar().configure({
			contentLanguage: 'EN-US',
			method: Methods.Request
		});
		const event = new Event(
			'Meet with friends',
			new Date(Date.UTC(2021, 5, 18, 15, 0)),
			new Date(Date.UTC(2021, 5, 18, 17, 0)),
			"Let's grab some coffee!",
			[
				'Blue Bottle Coffee, 300 S Broadway, Los Angeles',
				{latitude: 34.0391997, longitude: -118.2327653}
			],
			[['jane@example.com', 'Jane'], ['fred@example.com'], 'joe@example.com'],
			'unique-id'
		);

		const clock = sinon.useFakeTimers(new Date(Date.UTC(2021, 5, 17, 6, 36, 30)));
		const fileContent = iCalendar.createFile(event);
		clock.restore();

		expect(fileContent).toBe(
			'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//barinbritva//add-to-calendar//EN-US\nCALSCALE:GREGORIAN\nMETHOD:REQUEST\nBEGIN:VEVENT\nUID:unique-id\nDTSTAMP:20210617T063630Z\nDTSTART:20210618T150000Z\nDTEND:20210618T170000Z\nSUMMARY:Meet with friends\nDESCRIPTION:Let\'s grab some coffee!\nLOCATION:Blue Bottle Coffee, 300 S Broadway, Los Angeles\nGEO:34.0391997;-118.2327653\nORGANIZER;CN="Jane":mailto:jane@example.com\nATTENDEE;CN="fred@example.com":mailto:fred@example.com\nATTENDEE;CN="joe@example.com":mailto:joe@example.com\nEND:VEVENT\nEND:VCALENDAR'
		);
	});
});
