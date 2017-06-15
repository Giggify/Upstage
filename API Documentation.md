
# Songkick API Documentation

## Metro Locations API

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

The data is returned as follows when requesting from http://localhost:3000/api/v1/events/31455 (with 31455 being the metroArea ID for Wellington, New Zealand)

    {
    "event": [{
                "venue": {
                    "metroArea": {
                        "country": {
                            "displayName": "New Zealand"
                        },
                        "displayName": "Wellington",
                        "uri": "<http://www.songkick.com/metro_areas/31455-new-zealand-wellington?utm_source=45652&utm_medium=partner",
                        "id": 31455
                    },
                    "lat": -41.311933,
                    "displayName": "MOON",
                    "uri": "http://www.songkick.com/venues/2743748-moon?utm_source=45652&utm_medium=partner",
                    "lng": 174.7792403,
                    "id": 2743748
                },
                "type": "Concert",
                "status": "ok",
                "start": {
                    "time": "20:00:00",
                    "datetime": "2017-06-15T20:00:00+1200",
                    "date": "2017-06-15"
                },
                "popularity": 0.000003,
                "location": {
                    "city": "Wellington>, New Zealand",
                    "lat": -41.311933,
                    "lng": 174.7792403
                },
                "displayName": "The Lucid Effect with April Fish and Nicole Andrews at MOON (June 15, 2017)",
                "ageRestriction": "R18",
                "uri": "<http://www.songkick.com/concerts/30173904-lucid-effect-at-moon?utm_source=45652&utm_medium=partner",
                "performance": [{
                    "artist": {
                        "displayName": "The> Lucid Effect",
                        "uri": "<http://www.songkick.com/artists/5834924-lucid-effect?utm_source=45652&utm_medium=partner",
                        "id": 5834924,
                        "identifier": []
                    },
                    "displayName": "The> Lucid Effect",
                    "billingIndex": 1,
                    "billing": "headline",
                    "id": 58478004
                }, {
                    "artist": {
                        "displayName": "April Fish",
                        "uri": "<http://www.songkick.com/artists/4532423-april-fish?utm_source=45652&utm_medium=partner",
                        "id": 4532423,
                        "identifier": []
                    },
                    "displayName": "April> Fish",
                    "billingIndex": 2,
                    "billing": "support",
                    "id": 58532674
                }, {
                    "artist": {
                        "displayName": "Nicole Andrews",
                        "uri": "<http://www.songkick.com/artists/6784704-nicole-andrews?utm_source=45652&utm_medium=partner",
                        "id": 6784704,
                        "identifier": []
                    },
                    "displayName": "Nicole> Andrews",
                    "billingIndex": 3,
                    "billing": "support",
                    "id": 58532679
                }],
                "id": 30173904
            }, {
                another event would go here
            }
