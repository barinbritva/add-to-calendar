# Event Link Generator

Create links to add events via `Outlook`, `Google`, `Yahoo` calendars or using `icl` file.

## Creating events

__Create all day event:__

```typescript
const allDayEvent = new Event(
  'Hiking',
  new Date(2021, 5, 18),
  null,
  'Here is the place: https://www.tripadvisor.com/Attraction_Review-g32655-d144152-Reviews-Hollywood_Sign-Los_Angeles_California.html',
  'Hollywood Hills, Los Angeles'
);
```

__Create event with specific date and time:__

```typescript
const event = new Event(
  'Meet with friends',
  new Date(2021, 5, 18, 15, 00),
  new Date(2021, 5, 18, 17, 00),
  '',
  'Blue Bottle Coffee, 300 S Broadway, Los Angeles'
);
```

To reschedule the event just use `reschedule` method with new start and end dates:

```typescript
event.reschedule(new Date(2021, 5, 18, 16, 00), new Date(2021, 5, 18, 18, 00))
```

__Create event with specific date and time using duration:__

```typescript
const event = new Event(
  'Meet with friends',
  new Date(2021, 5, 18, 15, 00),
  2 * 60,
  '',
  'Blue Bottle Coffee, 300 S Broadway, Los Angeles'
);
```

To reschedule the event it's enough to change only start date, end date will be recalculated automatically:

```typescript
event.reschedule(new Date(2021, 5, 18, 16, 00))
```

You are also able to change start date and duration in the same time:

```typescript
event.reschedule(new Date(2021, 5, 18, 16, 00), 3 * 60)
```


## Timezones troubleshooting

Creating correct dates for users in different timezones maybe complicated. It also depends in which environment you use the library - Node server, Node CLI/Browser. To avoid related issues `event-link-generator` converts all dates to `UTC` timezone. It's necessary to consider it when you constructs date objects. If you would like to know how to create correct dates in all possible cases, please, read the manual [How to work with dates]().

## Wellknown issues

Yahoo does not work properly with UTC timezone.


## Credits

The project is bootstrapped using [init-typescript-app](https://github.com/barinbritva/init-typescript-app).

https://www.litmus.com/blog/how-to-create-an-add-to-calendar-link-for-your-emails/

https://github.com/AnandChowdhary/calendar-link

https://github.com/jshor/datebook

https://github.com/InteractionDesignFoundation/add-event-to-calendar-docs


https://ical.marudot.com/
