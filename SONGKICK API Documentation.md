
# Songkick API Documentation

## Metro Locations API

Metro locations must first be acquired in order to determine what location id is used to find nearby gigs for the user.

As the Songkick API provides

Metro locations can be found by three different search methods:

##### By City Name:

/city/{cityName}

##### By Latitude/Longitude:

/latlong/{lat,long}


##### By IP Address:

/ip/{userIp}

## Metro - Event Search API

When queried with a specific metroArea ID (usually a 5-6 digit integer) as given by the Songkick Locations API which will be used to autopopulate the Upstage search bar.

The api route for this information is http://localhost:3000/api/v1/events/{metroArea ID}.

The data is returned as follows from a GET request to http://localhost:3000/api/v1/events/31455 (with 31455 being the metroArea ID for Wellington, New Zealand):

{
  "events": [
    {
      "gig": "The Lucid Effect with April Fish and Nicole Andrews at MOON (June 15, 2017)",
      "city": "Wellington, New Zealand",
      "lat": -41.311933,
      "long": 174.7792403,
      "artists": [
        "The Lucid Effect",
        "April Fish",
        "Nicole Andrews"
      ]
    }...
  ],
  "artists": [
    "The Lucid Effect",
    "Claude Hay",
    "Sam Haven",
    "Ben Ottewell",
    "Turner Knows",
    "Nation (NZ)",
    "Hiboux",
    "Hiboux",
}
