//'/api/v1/spotify/search/lorde' returns
export const spotifyArtistSearch = [
  {
    "external_urls": {
      "spotify": "https://open.spotify.com/artist/163tK9Wjr9P9DmM0AVK7lm"
    },
    "followers": {
      "href": null,
      "total": 2219228
    },
    "genres": [
      "dance pop",
      "metropopolis",
      "pop"
    ],
    "href": "https://api.spotify.com/v1/artists/163tK9Wjr9P9DmM0AVK7lm",
    "id": "163tK9Wjr9P9DmM0AVK7lm",
    "images": [
      {
        "height": 640,
        "url": "https://i.scdn.co/image/d25fc756cd04c8b3ea196b7c07c6d057685cc405",
        "width": 640
      },
      {
        "height": 320,
        "url": "https://i.scdn.co/image/ca2e7772dcdfd03401cdd0c66aeee1bea8ea3904",
        "width": 320
      },
      {
        "height": 160,
        "url": "https://i.scdn.co/image/2f22ea3ea1597887d86441a030204dac49a74a81",
        "width": 160
      }
    ],
    "name": "Lorde",
    "popularity": 85,
    "type": "artist",
    "uri": "spotify:artist:163tK9Wjr9P9DmM0AVK7lm"
  }
]

//'/api/v1/metros/city/wellington' returns
export const locations = [
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
  }
]
//'/api/v1/events/31433' returns
export const events = {
  "events": [
    {
      "gig": "daniel madill at Darkroom (July 31, 2014)",
      "city": "Christchurch, New Zealand",
      "lat": -43.5366182,
      "long": 172.6479735,
      "artists": [
        "daniel madill"
      ],
      "date": "2014-07-31",
      "time": "NA",
      "concertUrl": "http://www.songkick.com/concerts/21034068-daniel-madill-at-darkroom?utm_source=45652&utm_medium=partner",
      "artistUrl": [
        "http://www.songkick.com/artists/6957924-daniel-madill?utm_source=45652&utm_medium=partner"
      ],
      "venue": "Darkroom",
      "venueUrl": "http://www.songkick.com/venues/1534773-darkroom?utm_source=45652&utm_medium=partner"
    },
    {
      "gig": "The Wedding Present at Blue Smoke (July 7, 2017)",
      "city": "Christchurch, New Zealand",
      "lat": -43.5568143,
      "long": 172.680258,
      "artists": [
        "The Wedding Present"
      ],
      "date": "2017-07-07",
      "time": "NA",
      "concertUrl": "http://www.songkick.com/concerts/29835484-wedding-present-at-blue-smoke?utm_source=45652&utm_medium=partner",
      "artistUrl": [
        "http://www.songkick.com/artists/2117-wedding-present?utm_source=45652&utm_medium=partner"
      ],
      "venue": "Blue Smoke",
      "venueUrl": "http://www.songkick.com/venues/3238774-blue-smoke?utm_source=45652&utm_medium=partner"
    }
  ]
,
  "artists": [
      "daniel madill",
      "The Wedding Present"
  ]
}
