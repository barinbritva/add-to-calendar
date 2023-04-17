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

const multiGenerator = new MultiGenerator(generators);

// Object of keys/values - key => link
const linksObject = multiGenerator.createLinks(event)
// Array (tuple) of pairs key/link - [key, link][]
const array = multiGenerator.createLinks(event, true)
```

Create an `ics` attachment:

`createLink` method creates a link to use it with anchors:
```typescript
const icsLink = new ICalendar().createLink(event)
return <a href=`${icsLink}`>Download ics file</a>
```

But if you need to attach an `ics` file, use `createFile` method:
```typescript
const icsFile = new ICalendar().createFile(event)
// letter is a pseudo variable, read a doc of library you are using to send emails
letter.attach(Buffer.from(icsFile));
```

## 🐛 Wellknown issues

* __Yahoo does not work properly with UTC timezone__. Currently looking if there are any workarounds.

## 💡 Guides

* [`Event` API](https://barinbritva.github.io/add-to-calendar/classes/event.html). Read how to create and manage events.
* `Date` creation. Avoiding troubles with time zones. _(Coming soon)_

## 🔙 Feedback
Your feedback is really important for the project. Please, use contacts from [my profile](https://github.com/barinbritva) to send your questions, suggestions, help requests and others. Also, feel free to use [issues](https://github.com/barinbritva/add-to-calendar/issues) section to report bugs and problems.

## 🌟 Credits

* Special thanks for information about calendar APIs to [add-event-to-calendar-docs](https://github.com/InteractionDesignFoundation/add-event-to-calendar-docs) repo.
* The project is bootstrapped using [init-typescript-app](https://github.com/barinbritva/init-typescript-app).

---

MIT, see [LICENSE](https://github.com/barinbritva/add-to-calendar/blob/master/LICENSE) for the details.
