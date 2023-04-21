# 📅 Add to Calendar

[![Dependencies counter](https://img.shields.io/badge/dependencies-none-green?style=flat-square)](https://github.com/barinbritva/add-to-calendar/blob/master/package.json)
[![License](https://img.shields.io/npm/l/micromatch?style=flat-square)](https://github.com/barinbritva/add-to-calendar/blob/master/LICENSE)

Create event links to add them to a calendar.

Supported services: `Outlook`, `Office365`, `Google` and `Yahoo`. You are also able to use `ICalendar` to create downloadable links to `ics` files.

## 🚀 Getting started

Install package:
```bash
npm install --save @barinbritva/add-to-calendar
```

Import entities:
```typescript
import {Event, Outlook, Google, MultiGenerator} from '@barinbritva/add-to-calendar'
```

Create an event:
```typescript
const event = new Event(
  'Meet with friends',
  new Date(2021, 5, 18, 15, 0),
  new Date(2021, 5, 18, 17, 0),
  'It\'s Bill\'s birthday today!',
  'Blue Bottle Coffee, 300 S Broadway, Los Angeles'
)
```

Create link by link:
```typescript
const outlookLink = new Outlook().createLink(event)
const googleLink = new Google().createLink(event)

console.log(outlookLink, googleLink)
```

Create a bunch of links:
```typescript
// Create generators you are going to use
// Key names doesn't matter, it's up to you
const generators = {
  outlook: new Outlook(),
  office365: new Office365(),
  google: new Google(),
  yahoo: new Yahoo(),
  ics: new ICalendar()
}

const multiGenerator = new MultiGenerator(generators)

// Object of keys/values - key => link
const linksObject = multiGenerator.createLinks(event)
// Array (tuple) of pairs key/link - [key, link][]
const array = multiGenerator.createLinks(event, true)
```

Create an `ics` attachment:

Method `createLink` is designed to create links for anchors:
```typescript
const icsLink = new ICalendar().createLink(event)
return <a href=`${icsLink}`>Download ics file</a>
```

To create attachable `ics` files, use `createFile` method:
```typescript
const icsFile = new ICalendar().createFile(event)
// letter is a pseudo variable, read a doc of library you are using to send emails
letter.attach(Buffer.from(icsFile))
```

## 💡 Guides

### Working with Event

Read [Event API](https://barinbritva.github.io/add-to-calendar/classes/Event.html) to learn how to create, reschedule an event and manage its attendees.

### Working with time zones

The best practice to avoid troubles with time zones is to create all dates in UTC time zone. `add-to-calendar` will convert date\time to UTC anyway and calendar services convert them to user local machine time zone.

#### Server

If a server works in UTC time zone, create dates as usual:

```typescript
new Date(2021, 5, 18, 15, 0)
```

If a server is not set to UTC time zone, use `Date.UTC` method. Before doing that, calculate date\time relatively to UTC:

```typescript
// if a server is in GMT+3 time zone,
// add 3 hours to desired date\time
// new Date(2021, 5, 18, 15, 0) -> new Date(2021, 5, 18, 15 + 3, 0)
new Date(Date.UTC(2021, 5, 18, 18, 0))
```

To calculate date\time in UTC automatically use a library for working with time zones, like [date-fns-tz](https://github.com/marnusw/date-fns-tz), or use the following approach:

```typescript
const date = new Date(2021, 5, 18, 15, 0)
new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000)
```

Tips:
- To check if a server is set up to UTC time zone run `new Date().getTimezoneOffset()`. If the result is `0`, everything is set up. If no, configure a server.
- To force `node.js` use UTC time zone without setting up server time, add `TZ=UTC` environment variable during an app launch, for example: `TZ=UTC node index.js`.

#### Client

On a client side, it's an option to use `Date` as usual:

```typescript
new Date(2021, 5, 18, 15, 0)
```

But calendar services use time zone not from user local machine, but from user settings at the service.

For example, if a user is in GMT+3 time zone and uses Google Calendar, which is set up in GMT+3 time zone, everything will be OK. But if Google Calendar is set up in GMT+5, the date\time will be shifted by 2 hours.

To avoid this pitfall, use technics from the section about server side.

## 🔙 Feedback
Your feedback is really important for the project. Please, use contacts from [my profile](https://github.com/barinbritva) to send your questions, suggestions, help requests and others. Also, feel free to use [issues](https://github.com/barinbritva/add-to-calendar/issues) section to report bugs and problems.

## 🌟 Credits

* Special thanks for information about calendar APIs to [add-event-to-calendar-docs](https://github.com/InteractionDesignFoundation/add-event-to-calendar-docs) repo.
* The project is bootstrapped using [init-typescript-app](https://github.com/barinbritva/init-typescript-app).

---

MIT, see [LICENSE](https://github.com/barinbritva/add-to-calendar/blob/master/LICENSE) for the details.
