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
