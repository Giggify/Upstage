
# Songkick API Documentation

## Metro Locations API - Determine User Location ID  

Metro locations must first be acquired in order to determine what location id is used to find nearby gigs for the user.

As the Songkick API provides

Metro locations can be found by three different search methods:

##### By City Name:

http://localhost:3000/api/v1/metros/city/{cityName}

Finds location ID based on input of the city name. Where multiple instances of the city name exist it will return all matching location IDs.

##### By Latitude/Longitude:

http://localhost:3000/api/v1/metros/latlong/{lat,long}

Finds a location ID based on input of latitude and longitude in the format:
integer,integer


##### By IP Address:

http://localhost:3000/api/v1/metros/ip/{userIp}

Finds location ID based on user IP address. For user experience, this is the best method as it doesn't require much effort from the user. However, IP addresses are not
always accurate in indicating location.


### Data Shape of Metro Locations

Queries to the Metro routes will return all matching locations.  

```json

[
  {
    "id": 19511,
    "name": "Fort Lauderdale",
    "state": "FL",
    "country": "US"
  },
  {
    "id": 26774,
    "name": "Adelaide",
    "state": "SA",
    "country": "Australia"
  },
  {
    "id": 16021,
    "name": "Wichita",
    "state": "KS",
    "country": "US"
  },
  {
    "id": 27376,
    "name": "Moncton",
    "state": "NB",
    "country": "Canada"
  },
  {
    "id": 27378,
    "name": "Nanaimo",
    "state": "BC",
    "country": "Canada"
  },
  {
    "id": 31455,
    "name": "Wellington",
    "state": " ",
    "country": "New Zealand"
  }
  ]
  ```




## Event Search API - Find Nearby Events

When queried with a specific metroArea ID (usually a 5-6 digit integer) as given by the Songkick Locations API which will be used to autopopulate the Upstage search bar.

The api route for this information is http://localhost:3000/api/v1/events/{metroAreaID}.

The data is returned as follows from a GET request to http://localhost:3000/api/v1/events/31455 (with 31455 being the metroArea ID for Wellington, New Zealand):


```json
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
    },
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
  ]
}

```
