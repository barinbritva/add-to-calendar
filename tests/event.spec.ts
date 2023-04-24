import {describe, expect, it} from 'vitest';
import sinon from 'sinon';
import {Event} from '../src';

describe('class Event', () => {
	it('should throw dates error', () => {
		expect(() => {
			new Event(
				'Meet with friends',
				new Date(Date.UTC(2021, 5, 18, 15, 0)),
				new Date(Date.UTC(2021, 5, 18, 15, 0))
			);
		}).toThrow(
			'End date must be greater than start date. Passed: start date - 2021-06-18T15:00:00.000Z, end date - 2021-06-18T15:00:00.000Z.'
		);

		expect(() => {
			new Event(
				'Meet with friends',
				new Date(Date.UTC(2021, 5, 18, 15, 5)),
				new Date(Date.UTC(2021, 5, 18, 15, 0))
			);
		}).toThrow(
			'End date must be greater than start date. Passed: start date - 2021-06-18T15:05:00.000Z, end date - 2021-06-18T15:00:00.000Z.'
		);
	});

	it('should do base features', () => {
		const random = sinon.stub(Math, 'random').returns(0.9750872033575881);
		const event = new Event('Meet with friends', new Date(Date.UTC(2021, 5, 18, 15, 0)));
		random.restore();

		expect(event.title).toEqual('Meet with friends');
		expect(event.description).toEqual(undefined);
		expect(event.location).toEqual(undefined);
		expect(event.startDate.toISOString()).toEqual('2021-06-18T15:00:00.000Z');
		expect(event.endDate.toISOString()).toEqual('2021-06-19T15:00:00.000Z');
		expect(event.getStartDateAsString()).toEqual('2021-06-18');
		expect(event.getEndDateAsString()).toEqual('2021-06-19');
		expect(event.isAllDayEvent()).toEqual(true);
		expect(event.hasAttendees()).toEqual(false);
		expect(event.attendees.length).toEqual(0);
		expect(event.attendees).toEqual([]);
		expect(event.uid).toEqual('barinbritva--add-to-calendar--9750872033575881');

		event.changeTitle('Meet with friends and family');
		expect(event.title).toEqual('Meet with friends and family');

		event.changeDescription("Let's get together and grab some coffee!");
		expect(event.description).toEqual("Let's get together and grab some coffee!");

		event.changeLocation('Blue Bottle Coffee, 300 S Broadway, Los Angeles');
		expect(event.location).toEqual('Blue Bottle Coffee, 300 S Broadway, Los Angeles');

		event.addAttendees(['jane@example.com', 'Jane'], ['fred@example.com'], 'joe@example.com');
		expect(event.hasAttendees()).toEqual(true);
		expect(event.attendees.length).toEqual(3);
		expect(event.attendees).toEqual([
			['jane@example.com', 'Jane'],
			['fred@example.com'],
			'joe@example.com'
		]);

		event.clearAttendees();
		expect(event.hasAttendees()).toEqual(false);
		expect(event.attendees.length).toEqual(0);
		expect(event.attendees).toEqual([]);

		event.changeUid('changed-uid');
		expect(event.uid).toBe('changed-uid');
	});

	it('should reschedule start date', () => {
		const event = new Event('Meet with friends', new Date(Date.UTC(2021, 5, 18, 15, 0)));
		event.reschedule(new Date(Date.UTC(2021, 5, 19, 15, 0)));

		expect(event.startDate.toISOString()).toEqual('2021-06-19T15:00:00.000Z');
		expect(event.endDate.toISOString()).toEqual('2021-06-20T15:00:00.000Z');
		expect(event.getStartDateAsString()).toEqual('2021-06-19');
		expect(event.getEndDateAsString()).toEqual('2021-06-20');
		expect(event.isAllDayEvent()).toEqual(true);
	});

	it('should set end date', () => {
		const event = new Event('Meet with friends', new Date(Date.UTC(2021, 5, 18, 15, 0)));
		event.reschedule(event.startDate, new Date(Date.UTC(2021, 5, 18, 17, 0)));

		expect(event.startDate.toISOString()).toEqual('2021-06-18T15:00:00.000Z');
		expect(event.endDate.toISOString()).toEqual('2021-06-18T17:00:00.000Z');
		expect(event.getStartDateAsString()).toEqual('2021-06-18T15:00:00Z');
		expect(event.getEndDateAsString()).toEqual('2021-06-18T17:00:00Z');
		expect(event.isAllDayEvent()).toEqual(false);
	});

	it('should reschedule end date', () => {
		const event = new Event(
			'Meet with friends',
			new Date(Date.UTC(2021, 5, 18, 15, 0)),
			new Date(Date.UTC(2021, 5, 18, 17, 0))
		);
		event.reschedule(event.startDate, new Date(Date.UTC(2021, 5, 18, 17, 30)));

		expect(event.startDate.toISOString()).toEqual('2021-06-18T15:00:00.000Z');
		expect(event.endDate.toISOString()).toEqual('2021-06-18T17:30:00.000Z');
		expect(event.getStartDateAsString()).toEqual('2021-06-18T15:00:00Z');
		expect(event.getEndDateAsString()).toEqual('2021-06-18T17:30:00Z');
	});

	it('should reschedule end date through duration change', () => {
		const event = new Event(
			'Meet with friends',
			new Date(Date.UTC(2021, 5, 18, 15, 0)),
			new Date(Date.UTC(2021, 5, 18, 17, 0))
		);
		event.reschedule(event.startDate, 150);

		expect(event.startDate.toISOString()).toEqual('2021-06-18T15:00:00.000Z');
		expect(event.endDate.toISOString()).toEqual('2021-06-18T17:30:00.000Z');
		expect(event.getStartDateAsString()).toEqual('2021-06-18T15:00:00Z');
		expect(event.getEndDateAsString()).toEqual('2021-06-18T17:30:00Z');
	});

	it('should reschedule start date w/ keeping duration', () => {
		const event = new Event('Meet with friends', new Date(Date.UTC(2021, 5, 18, 15, 0)), 150);
		event.reschedule(new Date(Date.UTC(2021, 5, 19, 17, 20)));

		expect(event.startDate.toISOString()).toEqual('2021-06-19T17:20:00.000Z');
		expect(event.endDate.toISOString()).toEqual('2021-06-19T19:50:00.000Z');
		expect(event.getStartDateAsString()).toEqual('2021-06-19T17:20:00Z');
		expect(event.getEndDateAsString()).toEqual('2021-06-19T19:50:00Z');
	});

	it('should unset end date', () => {
		const event = new Event(
			'Meet with friends',
			new Date(Date.UTC(2021, 5, 18, 15, 0)),
			new Date(Date.UTC(2021, 5, 18, 17, 0))
		);
		event.reschedule(event.startDate, null);

		expect(event.startDate.toISOString()).toEqual('2021-06-18T15:00:00.000Z');
		expect(event.endDate.toISOString()).toEqual('2021-06-19T15:00:00.000Z');
		expect(event.getStartDateAsString()).toEqual('2021-06-18');
		expect(event.getEndDateAsString()).toEqual('2021-06-19');
		expect(event.isAllDayEvent()).toEqual(true);
	});

	it('should set custom uid during constructing', () => {
		const random = sinon.stub(Math, 'random').returns(0.9750872033575881);
		const event = new Event(
			'Meet with friends',
			new Date(Date.UTC(2021, 5, 18, 15, 0)),
			undefined,
			undefined,
			undefined,
			[],
			'constructor-provided-uid'
		);
		random.restore();

		expect(event.uid).toBe('constructor-provided-uid');
	});
});
