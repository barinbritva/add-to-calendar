import {Event} from '../src';

export function createBaseEvent() {
	return new Event(
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
}
