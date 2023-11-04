# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.3.1] - 2023-11-04

### Changed

- Module system changed from `UMD` to 'ES6' for better compatibility with bundlers
- Inner refactoring of `RSVP` methods

## [1.2.1] - 2022-04-24

### Added

- An `uid` property to `Event` class for proper events rescheduling using `ics` files.
- Attendees list to `ics` file.
- Geo coordinates for location to `ics` file.
- Invitation method option to follow `ics` standards: publish, request, reply, add, cancel.
- Content language option to follow `ics` standards.
- Other `ics` related properties for better compatibility.

## [1.1.1] - 2022-04-18

### Changed

- `Guides` section in README.md.

### Fixed

- Compatibility of date\time format with Outlook Web.

## [1.1.0] - 2022-04-17

### Added

- `createFile` method to `ICalendar` class for creating `ics` attachments.

### Changed

- Update the documentation website.

## [1.0.0] - 2022-04-05

### Added

- Tests and coverage.

### Changed

- Project name changed from `event-link-generator` to `add-to-calendar`.

### Fixed

- Fixed `addAttendees` method.
- Fixed `reschedule` method.

## [0.1.1] - 2021-07-08 [YANKED]

Release can be found by the package old name [`@barinbritva/event-link-generator`](https://www.npmjs.com/package/@barinbritva/event-link-generator).

### Added

- Initial release.

