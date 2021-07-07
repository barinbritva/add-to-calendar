# 📅 Event Link Generator

Generate event links to add them to a calendar.

Supported services: `Outlook`, `Office365`, `Google` and `Yahoo`. You are also able to use `ICalendar` to create downloadable links to `ics` files.

## 🚀 Getting started

Install package:
```bash
npm install --save event-link-generator
```

Import entities:
```typescript
import {Event, Outlook, Google, MultiGenerator} from 'event-link-generator'
```

Create an event:
```typescript
const event = new Event(
  'Meet with friends',
  new Date(2021, 5, 18, 15, 00),
  new Date(2021, 5, 18, 17, 00),
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

## 🐛 Wellknown issues

* __Yahoo does not work properly with UTC timezone__. Currently Looking to workarounds.

## 💡 Guides

* __`Event` API__. Creation and managing events.
* __`Date` creation__. Avoiding throubles with time zones.

## 🔙 Feedback
Your feedback is really important for the project. Please, use contacts from my profile to send your questions, suggestions, help requests and others. Also, feel free to use issues section to report bugs and problems.

## 🌟 Credits

* The project is bootstrapped using [init-typescript-app](https://github.com/barinbritva/init-typescript-app).
* Special thanks for information about calendar APIs to [add-event-to-calendar-docs](https://github.com/InteractionDesignFoundation/add-event-to-calendar-docs) repo.

---

MIT, see [LICENSE](https://github.com/barinbritva/event-link-generator/blob/master/LICENSE) for the details.
