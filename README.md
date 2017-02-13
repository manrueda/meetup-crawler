# Meetup Crawler

This is a crawler that search all the next events of all the events under a set of categories and the location.

## API

This module exports a simple function that recieve a `options` object and return a `Promise` with an array of events.

### `options` object

* key: API key.
* category: Comma separeted list of categories to search for.
* country: Country code to search for (ex: ar).
* lon: Longitude to center the radius of search.
* lat: Latitude to center the radius of search.
* radius: Radius on miles to search.

### Returned `event` object

* id: Unique meetup event ID
* name: Event name
* total_capacity: Event people capacity
* time: Date and time of the event
* attendees: Number of confirmed attendees
* waitinglist: Number of people waiting in the list
* location: Venue information
  * name: Venue name
  * address: Venue address
  * city: City of the Venue
  * country: Country of the Venue
* link: Link to the event
* description: Description of the event
* visibility: Visibility of the event
* meetup:
  * name: Meetup that host this event
  * link: Link the the meetup that host this event
