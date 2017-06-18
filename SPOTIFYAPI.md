| Task          | Method        | Auth required |
| ------------- |:-------------:|---------------|
| Get Artist Info | GET| yes, our API key |
| Get several artists|  GET  |yes, our API key  |
| Get an Artist’s Top Tracks |  GET   |yes, our API key  |
| Get a User’s Profile|  GET   |yes, our API key  |
| Create a playlist|  POST   |yes, user's token |
| Add track to playlist|  POST   |yes, user's token |


# Requests

## Get an Artist
GET https://api.spotify.com/v1/artists/{id}
*Auth is required*
* id - The Spotify ID for the artist.

Example data
```json
{
  "external_urls" : {
    "spotify" : "https://open.spotify.com/artist/0OdUWJ0sBjDrqHygGUXeCF"
  },
  "followers" : {
    "href" : null,
    "total" : 306565
  },
  "genres" : [ "indie folk", "indie pop" ],
  "href" : "https://api.spotify.com/v1/artists/0OdUWJ0sBjDrqHygGUXeCF",
  "id" : "0OdUWJ0sBjDrqHygGUXeCF",
  "images" : [ {
    "height" : 816,
    "url" : "https://i.scdn.co/image/eb266625dab075341e8c4378a177a27370f91903",
    "width" : 1000
  }, {
    "height" : 522,
    "url" : "https://i.scdn.co/image/2f91c3cace3c5a6a48f3d0e2fd21364d4911b332",
    "width" : 640
  }, {
    "height" : 163,
    "url" : "https://i.scdn.co/image/2efc93d7ee88435116093274980f04ebceb7b527",
    "width" : 200
  }, {
    "height" : 52,
    "url" : "https://i.scdn.co/image/4f25297750dfa4051195c36809a9049f6b841a23",
    "width" : 64
  } ],
  "name" : "Band of Horses",
  "popularity" : 59,
  "type" : "artist",
  "uri" : "spotify:artist:0OdUWJ0sBjDrqHygGUXeCF"
}
```

# Get several artists
GET https://api.spotify.com/v1/artists
*Auth is required*
* ids  *Required*. A comma-separated list of the Spotify IDs for the artists. Maximum: 50 IDs.

Example data
```json
{
  "artists" : [ {
    "external_urls" : {
      "spotify" : "https://open.spotify.com/artist/0oSGxfWSnnOXhD2fKuz2Gy"
    },
    "followers" : {
      "href" : null,
      "total" : 633494
    },
    "genres" : [ "art rock", "glam rock", "permanent wave" ],
    "href" : "https://api.spotify.com/v1/artists/0oSGxfWSnnOXhD2fKuz2Gy",
    "id" : "0oSGxfWSnnOXhD2fKuz2Gy",
    "images" : [ {
      "height" : 1000,
      "url" : "https://i.scdn.co/image/32bd9707b42a2c081482ec9cd3ffa8879f659f95",
      "width" : 1000
    }, {
      "height" : 640,
      "url" : "https://i.scdn.co/image/865f24753e5e4f40a383bf24a9cdda598a4559a8",
      "width" : 640
    }, {
      "height" : 200,
      "url" : "https://i.scdn.co/image/7ddd6fa5cf78aee2f2e8b347616151393022b7d9",
      "width" : 200
    }, {
      "height" : 64,
      "url" : "https://i.scdn.co/image/c8dc28c191432862afce298216458a6f00bbfbd8",
      "width" : 64
    } ],
    "name" : "David Bowie",
    "popularity" : 77,
    "type" : "artist",
    "uri" : "spotify:artist:0oSGxfWSnnOXhD2fKuz2Gy"
  }, {
    "external_urls" : {
      "spotify" : "https://open.spotify.com/artist/3dBVyJ7JuOMt4GE9607Qin"
    },
    "followers" : {
      "href" : null,
      "total" : 52338
    },
    "genres" : [ "glam rock", "protopunk" ],
    "href" : "https://api.spotify.com/v1/artists/3dBVyJ7JuOMt4GE9607Qin",
    "id" : "3dBVyJ7JuOMt4GE9607Qin",
    "images" : [ {
      "height" : 1300,
      "url" : "https://i.scdn.co/image/5515a710c94ccd4edd8b9a0587778ed5e3f997da",
      "width" : 1000
    }, {
      "height" : 832,
      "url" : "https://i.scdn.co/image/c990e667b4ca8240c73b0db06e6d76a3b27ce929",
      "width" : 640
    }, {
      "height" : 260,
      "url" : "https://i.scdn.co/image/de2fa1d11c59e63143117d44ec9990b9e40451a2",
      "width" : 200
    }, {
      "height" : 83,
      "url" : "https://i.scdn.co/image/b39638735adb4a4a54621293b99ab65c546f605e",
      "width" : 64
    } ],
    "name" : "T. Rex",
    "popularity" : 58,
    "type" : "artist",
    "uri" : "spotify:artist:3dBVyJ7JuOMt4GE9607Qin"
  } ]
}
```


# Get an Artist’s Top Tracks
GET https://api.spotify.com/v1/artists/{id}/top-tracks
*Auth is required*
* id - The Spotify ID for the artist.
* country - Required. The country: an ISO 3166-1 alpha-2 country code.

Example data
```json
curl -X GET "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE" -H "Authorization: Bearer {your access token}"

{
  "tracks": [ {
    "album" : {
      "album_type" : "album",
      "artists" : [ {
        "external_urls" : {
          "spotify" : "https://open.spotify.com/artist/43ZHCT0cAZBISjO8DG9PnE"
        },
        "href" : "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE",
        "id" : "43ZHCT0cAZBISjO8DG9PnE",
        "name" : "Elvis Presley",
        "type" : "artist",
        "uri" : "spotify:artist:43ZHCT0cAZBISjO8DG9PnE"
      } ],
      "available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TR", "TW", "US", "UY" ],
      "external_urls" : {
        "spotify" : "https://open.spotify.com/album/7xe8VI48TxUpU1IIo0RfGi"
      },
      "href" : "https://api.spotify.com/v1/albums/7xe8VI48TxUpU1IIo0RfGi",
      "id" : "7xe8VI48TxUpU1IIo0RfGi",
      "images" : [ {
        "height" : 640,
        "url" : "https://i.scdn.co/image/4295b5ff74d4f944367144acbe616b6f62d20b17",
        "width" : 640
      }, {
        "height" : 300,
        "url" : "https://i.scdn.co/image/203104e5843248c700b078f391d4bc759c5d7f47",
        "width" : 300
      }, {
        "height" : 64,
        "url" : "https://i.scdn.co/image/0c0a172373b0211c590b241270d05b70889075a1",
        "width" : 64
      } ],
      "name" : "Blue Hawaii",
      "type" : "album",
      "uri" : "spotify:album:7xe8VI48TxUpU1IIo0RfGi"
    },
    "artists" : [ {
      "external_urls" : {
        "spotify" : "https://open.spotify.com/artist/43ZHCT0cAZBISjO8DG9PnE"
      },
      "href" : "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE",
      "id" : "43ZHCT0cAZBISjO8DG9PnE",
      "name" : "Elvis Presley",
      "type" : "artist",
      "uri" : "spotify:artist:43ZHCT0cAZBISjO8DG9PnE"
    } ],
    "available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TR", "TW", "US", "UY" ],
    "disc_number" : 1,
    "duration_ms" : 179773,
    "explicit" : false,
    "external_ids" : {
      "isrc" : "USRC16101350"
    },
    "external_urls" : {
      "spotify" : "https://open.spotify.com/track/44AyOl4qVkzS48vBsbNXaC"
    },
    "href" : "https://api.spotify.com/v1/tracks/44AyOl4qVkzS48vBsbNXaC",
    "id" : "44AyOl4qVkzS48vBsbNXaC",
    "name" : "Can't Help Falling in Love",
    "popularity" : 70,
    "preview_url" : "https://p.scdn.co/mp3-preview/26e409b39a2da6dc18fab61020c90be2938dc0e9",
    "track_number" : 5,
    "type" : "track",
    "uri" : "spotify:track:44AyOl4qVkzS48vBsbNXaC"
  }, {
...
  } ]
}
```


# Get a User’s Profile
GET https://api.spotify.com/v1/users/{user_id}
*Auth is required*
* user_id - The user's Spotify user ID.

Example data
```json
curl -X GET "https://api.spotify.com/v1/users/tuggareutangranser" -H "Authorization: Bearer {your access token}"

{
 "display_name" : "Lilla Namo",
 "external_urls" : {
   "spotify" : "https://open.spotify.com/user/tuggareutangranser"
 },
 "followers" : {
   "href" : null,
   "total" : 4561
 },
 "href" : "https://api.spotify.com/v1/users/tuggareutangranser",
 "id" : "tuggareutangranser",
 "images" : [ {
   "height" : null,
   "url" : "http://profile-images.scdn.co/artists/default/d4f208d4d49c6f3e1363765597d10c4277f5b74f",
   "width" : null
 } ],
 "type" : "user",
 "uri" : "spotify:user:tuggareutangranser"
}
```

# Posts

# Create a Playlist
POST https://api.spotify.com/v1/users/{user_id}/playlists
* user_id - The user's Spotify user ID.

More info here https://developer.spotify.com/web-api/create-playlist/

Header Fields
* Authorization	Required. A valid access token from the Spotify Accounts service: see the Web API Authorization Guide for details. The access token must have been issued on behalf of the user.
* Creating a public playlist for a user requires authorization of the playlist-modify-public scope; creating a private playlist requires the playlist-modify-private scope. See Using Scopes.
* Content-Type	Required. The content type of the request body: application/json

```json
curl -X POST "https://api.spotify.com/v1/users/thelinmichael/playlists" -H "Authorization: Bearer {your access token}" -H "Content-Type: application/json" --data "{\"name\":\"A New Playlist\", \"public\":false}"

{
   "collaborative": false,
   "description": null,
   "external_urls": {
     "spotify": "http://open.spotify.com/user/thelinmichael/playlist/7d2D2S200NyUE5KYs80PwO"
   },
   "followers": {
     "href": null,
     "total": 0
   },
   "href": "https://api.spotify.com/v1/users/thelinmichael/playlists/7d2D2S200NyUE5KYs80PwO",
   "id": "7d2D2S200NyUE5KYs80PwO",
   "images": [ ],
   "name": "A New Playlist",
   "owner": {
     "external_urls": {
       "spotify": "http://open.spotify.com/user/thelinmichael"
     },
     "href": "https://api.spotify.com/v1/users/thelinmichael",
     "id": "thelinmichael",
     "type": "user",
     "uri": "spotify:user:thelinmichael"
   },
   "public": false,
   "snapshot_id": "s0o3TSuYnRLl2jch+oA4OEbKwq/fNxhGBkSPnvhZdmWjNV0q3uCAWuGIhEx8SHIx",
   "tracks": {
     "href": "https://api.spotify.com/v1/users/thelinmichael/playlists/7d2D2S200NyUE5KYs80PwO/tracks",
     "items": [ ],
     "limit": 100,
     "next": null,
     "offset": 0,
     "previous": null,
     "total": 0
   },
 "type": "playlist",
 "uri": "spotify:user:thelinmichael:playlist:7d2D2S200NyUE5KYs80PwO"
}
```

# Add track to Playlist
POST https://api.spotify.com/v1/users/{user_id}/playlists/{playlist_id}/tracks
* user_id - The user's Spotify user ID.
* playlist_id - The Spotify playlist has its own unique ID that will be returned from the Create Playlist post route's response.


More info here https://developer.spotify.com/web-api/add-tracks-to-playlist/

Header Fields
* Authorization	Required. A valid access token from the Spotify Accounts service: see the Web API Authorization Guide for details. The access token must have been issued on behalf of the user.
* Creating a public playlist for a user requires authorization of the playlist-modify-public scope; creating a private playlist requires the playlist-modify-private scope. See Using Scopes.
* Content-Type	Required. The content type of the request body: application/json

The URI of the tracks to be inserted will need to be sent when hitting this Add Track route in the following format:

{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh",
"spotify:track:1301WleyT98MSxVHPZCA6M"]}

Upon successful addition of the track to the playlist, the response will be a snapshot_id of the modified playlist along with a 201 status code.

If there is an error, the header status code is an error code and res body will contain the error object.

If the user is not authorized to edit the track a 403 status code (Forbidden) will be sent.
