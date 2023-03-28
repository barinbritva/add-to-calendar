import {describe, expect, it} from 'vitest';
import {Event} from '../src';

describe('class Event', () => {
	it('should contain base data', () => {
		const event = new Event('Meet with friends', new Date(Date.UTC(2021, 5, 18, 15, 0)));

		expect(event.title).toEqual('Meet with friends');
		expect(event.startDate.toISOString()).toEqual('2021-06-18T15:00:00.000Z');
	});
});
