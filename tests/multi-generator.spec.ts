import {describe, expect, it} from 'vitest';
import {Event, Google, ICalendar, MultiGenerator, Office365, Outlook, Yahoo} from '../src';

describe('class MultiGenerator method createLinks', () => {
	const generators = {
		outlook: new Outlook(),
		office365: new Office365(),
		google: new Google(),
		yahoo: new Yahoo(),
		ics: new ICalendar()
	};
	const multiGenerator = new MultiGenerator(generators);

	it('should generate correct links for each provider w/ minimum info', () => {
		const event = new Event('Meet with friends', new Date(Date.UTC(2021, 5, 18, 15, 0)));
		const linksObject = multiGenerator.createLinks(event);
		const linksArray = multiGenerator.createLinks(event, true);

		const outlookLink =
			'https://outlook.live.com/calendar/0/deeplink/compose?path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&subject=Meet%20with%20friends&startdt=2021-06-18&enddt=2021-06-19&allday=true';
		const office365Link =
			'https://outlook.office.com/calendar/0/deeplink/compose?path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&subject=Meet%20with%20friends&startdt=2021-06-18&enddt=2021-06-19&allday=true';
		const googleLink =
			'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Meet%20with%20friends&dates=20210618%2F20210619';
		const yahooLink =
			'https://calendar.yahoo.com/?v=60&title=Meet%20with%20friends&st=20210618&et=20210619';
		const icsData =
			'data:text/calendar;charset=utf8,BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:2021-06-18\nDTEND:2021-06-19\nSUMMARY:Meet%20with%20friends\nEND:VEVENT\nEND:VCALENDAR';

		expect(linksObject.outlook).toEqual(outlookLink);
		expect(linksObject.office365).toEqual(office365Link);
		expect(linksObject.google).toEqual(googleLink);
		expect(linksObject.yahoo).toEqual(yahooLink);
		expect(linksObject.ics).toEqual(icsData);

		expect(linksArray).toEqual([
			['outlook', outlookLink],
			['office365', office365Link],
			['google', googleLink],
			['yahoo', yahooLink],
			['ics', icsData]
		]);
	});

	it('should generate correct links for each provider w/ maximum info', () => {
		const event = new Event(
			'Meet with friends',
			new Date(Date.UTC(2021, 5, 18, 15, 0)),
			new Date(Date.UTC(2021, 5, 18, 17, 0)),
			"Let's grab some coffee!",
			'Blue Bottle Coffee, 300 S Broadway, Los Angeles',
			[['jane@example.com', 'Jane'], ['fred@example.com'], 'joe@example.com']
		);
		const linksObject = multiGenerator.createLinks(event);
		const linksArray = multiGenerator.createLinks(event, true);

		const outlookLink =
			"https://outlook.live.com/calendar/0/deeplink/compose?path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&subject=Meet%20with%20friends&startdt=2021-06-18T15%3A00%3A00Z&enddt=2021-06-18T17%3A00%3A00Z&body=Let's%20grab%20some%20coffee!&location=Blue%20Bottle%20Coffee%2C%20300%20S%20Broadway%2C%20Los%20Angeles&to=Jane%3Cjane%40example.com%3E%2Cfred%40example.com%2Cjoe%40example.com";
		const office365Link =
			"https://outlook.office.com/calendar/0/deeplink/compose?path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&subject=Meet%20with%20friends&startdt=2021-06-18T15%3A00%3A00Z&enddt=2021-06-18T17%3A00%3A00Z&body=Let's%20grab%20some%20coffee!&location=Blue%20Bottle%20Coffee%2C%20300%20S%20Broadway%2C%20Los%20Angeles&to=Jane%3Cjane%40example.com%3E%2Cfred%40example.com%2Cjoe%40example.com";
		const googleLink =
			"https://calendar.google.com/calendar/render?action=TEMPLATE&text=Meet%20with%20friends&dates=20210618T150000Z%2F20210618T170000Z&details=Let's%20grab%20some%20coffee!&location=Blue%20Bottle%20Coffee%2C%20300%20S%20Broadway%2C%20Los%20Angeles&add=Jane%3Cjane%40example.com%3E%2Cfred%40example.com%2Cjoe%40example.com";
		const yahooLink =
			"https://calendar.yahoo.com/?v=60&title=Meet%20with%20friends&st=20210618T150000Z&et=20210618T170000Z&desc=Let's%20grab%20some%20coffee!&in_loc=Blue%20Bottle%20Coffee%2C%20300%20S%20Broadway%2C%20Los%20Angeles&inv_list=Jane%3Cjane%40example.com%3E%2Cfred%40example.com%2Cjoe%40example.com";
		const icsData =
			"data:text/calendar;charset=utf8,BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:2021-06-18T15%3A00%3A00Z\nDTEND:2021-06-18T17%3A00%3A00Z\nSUMMARY:Meet%20with%20friends\nDESCRIPTION:Let's%20grab%20some%20coffee!\nLOCATION:Blue%20Bottle%20Coffee%2C%20300%20S%20Broadway%2C%20Los%20Angeles\nEND:VEVENT\nEND:VCALENDAR";

		expect(linksObject.outlook).toEqual(outlookLink);
		expect(linksObject.office365).toEqual(office365Link);
		expect(linksObject.google).toEqual(googleLink);
		expect(linksObject.yahoo).toEqual(yahooLink);
		expect(linksObject.ics).toEqual(icsData);

		expect(linksArray).toEqual([
			['outlook', outlookLink],
			['office365', office365Link],
			['google', googleLink],
			['yahoo', yahooLink],
			['ics', icsData]
		]);
	});
});
