const got = require('got')

module.exports = function (options) {
  // options.key => API key
  // options.category => Comma separeted list of categories to search for
  // options.country => Country code to search for (ex: ar)
  // options.lon => Longitude to center the radius of search
  // options.lat => Latitude to center the radius of search
  // options.radius => Radius on miles to search
  return getMeetups(options)
    .then(meetups => meetups.map(meetup => getEvents(meetup.urlname)))
    .then(eventsProms => Promise.all(eventsProms))
    .then(eventsLists => eventsLists.reduce((output, events) => output.concat(events), []))
}

function getEvents (meetupID) {
  return got(`https://api.meetup.com/${meetupID}/events`)
    .then(res => JSON.parse(res.body))
    .then(meetups => meetups.map(mapEventToCommonOutput))
}

function mapEventToCommonOutput (event) {
  return {
    id: event.id,
    name: event.name,
    total_capacity: event.rsvp_limit,
    time: new Date(event.time),
    attendees: event.yes_rsvp_count,
    waitinglist: event.waitinglist_count,
    location: event.venue ? {
      name: event.venue.name,
      address: event.venue.address_1,
      city: event.venue.city,
      country: event.venue.country
    } : null,
    link: event.link,
    description: event.description,
    visibility: event.visibility,
    meetup: {
      name: event.group.name,
      link: `https://www.meetup.com/${event.group.urlname}`
    }
  }
}

function getMeetups (options) {
  return got(`https://api.meetup.com/find/groups`, {
    query: {
      category: options.category,
      sign: true,
      key: options.key,
      country: options.country,
      lon: options.lon,
      lat: options.lat,
      radius: options.radius
    }
  }).then(res => JSON.parse(res.body))
}
