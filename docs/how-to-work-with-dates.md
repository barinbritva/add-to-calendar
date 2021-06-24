



## How to create dates with correct timezone

All dates are passed to `Event` will convert to UTC timezone. It's really important to understand how to create global events or events for specific user.

### All day events

If you want to create all day event, use only year, month and date just create date without any tricks. This will always work as expected for all the environments - Node server, CLI and browser:

```typescript
new Date(2021, 5, 21)
```

### Dates with concrete time

When you create date with specific time, depending on context, you should use either UTC timezone for global events or user's timezone for his local event.

#### Node server

Ensure your webserver set up in +00:00 timezone (UTC/GMT):

```typescript
console.log(new Date().getTimezoneOffset())
// must return 0
```

If so you can create dates as usual:

```typescript
new Date(2021, 5, 21)
```

_During local development you can make using UTC timezone instead of you local machine timezone by passing env variable:_

```bash
TZ=UTC node index.js
```

You are also able create UTC dates independently on your server/local machine timezone via next approach:

```typescript
new Date(Date.UTC(2021, 0, 1, 0, 0, 0, 0));
```

If you would like to create not global event, but user specific one, and don not want to convert timezone manually you can use this approach:

```typescript
new Date(Date.parse('2021-01-01T00:00:00.000+02:15'));
```

#### CLI and browser

Both CLI and browser are clients. That's why you can use your local timezone if you create an event for current user, just like usual:

```typescript
new Date(2021, 0, 1, 0, 0, 0, 0);
```

You can also use technics from [Node server](#node-server) section if you obtain dates from server or create an event for different timezone by other reasons.
