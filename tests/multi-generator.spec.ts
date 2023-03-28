import {describe, expect, it} from 'vitest';
import {Event, Google, ICalendar, MultiGenerator, Office365, Outlook, Yahoo} from '../src';

describe('class MultiGenerator method createLinks', () => {
	const event = new Event(
		'Meet with friends',
		new Date(Date.UTC(2021, 5, 18, 15, 0)),
		new Date(Date.UTC(2021, 5, 18, 17, 0)),
		"Let's grab some coffee!",
		'Blue Bottle Coffee, 300 S Broadway, Los Angeles',
		[
			['jane@example.com', 'Jane'],
			['fred@example.com', 'Fred']
		]
	);
	const generators = {
		outlook: new Outlook(),
		office365: new Office365(),
		google: new Google(),
		yahoo: new Yahoo(),
		ics: new ICalendar()
	};
	const multiGenerator = new MultiGenerator(generators);

	it('should generate correct links for each provider', () => {
		const links = multiGenerator.createLinks(event);

		expect(links.outlook).toEqual(
			"https://outlook.live.com/calendar/0/deeplink/compose?path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&subject=Meet%20with%20friends&startdt=2021-06-18T15%3A00%3A00Z&enddt=2021-06-18T17%3A00%3A00Z&body=Let's%20grab%20some%20coffee!&location=Blue%20Bottle%20Coffee%2C%20300%20S%20Broadway%2C%20Los%20Angeles&to=Jane%3Cjane%40example.com%3E%2CFred%3Cfred%40example.com%3E"
		);
		expect(links.office365).toEqual(
			"https://outlook.office.com/calendar/0/deeplink/compose?path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&subject=Meet%20with%20friends&startdt=2021-06-18T15%3A00%3A00Z&enddt=2021-06-18T17%3A00%3A00Z&body=Let's%20grab%20some%20coffee!&location=Blue%20Bottle%20Coffee%2C%20300%20S%20Broadway%2C%20Los%20Angeles&to=Jane%3Cjane%40example.com%3E%2CFred%3Cfred%40example.com%3E"
		);
		expect(links.google).toEqual(
			"https://calendar.google.com/calendar/render?action=TEMPLATE&text=Meet%20with%20friends&dates=20210618T150000Z%2F20210618T170000Z&details=Let's%20grab%20some%20coffee!&location=Blue%20Bottle%20Coffee%2C%20300%20S%20Broadway%2C%20Los%20Angeles&add=Jane%3Cjane%40example.com%3E%2CFred%3Cfred%40example.com%3E"
		);
		expect(links.yahoo).toEqual(
			"https://calendar.yahoo.com/?v=60&title=Meet%20with%20friends&st=20210618T150000Z&et=20210618T170000Z&desc=Let's%20grab%20some%20coffee!&in_loc=Blue%20Bottle%20Coffee%2C%20300%20S%20Broadway%2C%20Los%20Angeles&inv_list=Jane%3Cjane%40example.com%3E%2CFred%3Cfred%40example.com%3E"
		);
		expect(links.ics).toEqual(`data:text/calendar;charset=utf8,BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:2021-06-18T15%3A00%3A00Z
DTEND:2021-06-18T17%3A00%3A00Z
SUMMARY:Meet%20with%20friends
DESCRIPTION:Let's%20grab%20some%20coffee!
LOCATION:Blue%20Bottle%20Coffee%2C%20300%20S%20Broadway%2C%20Los%20Angeles
END:VEVENT
END:VCALENDAR`);
	});
});
