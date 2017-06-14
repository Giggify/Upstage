var express = require('express')
var request = require('superagent')

const router = express.Router()

// Set necessary parts of the credentials on the constructor
require('dotenv').config()

var SpotifyWebApi = require('spotify-web-api-node');
//
var spotifyApi = new SpotifyWebApi({
  clientId : process.env.SPOTIFY_ID,
  clientSecret : process.env.SPOTIFY_SECRET
});

// Get an access token and 'save' it using a setter
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    spotifyApi.setAccessToken(data.body['access_token']);

    // Runs a search on a str. 
    //Need to filter and get an EXACT match in data.body.artists[i].name
    // And return ID
    // spotifyApi.searchArtists('Oasis')
    //   .then(function(data) {
    //     console.log('Search artists by "Oasis"', data.body.artists);
    //   }, function(err) {
    //     console.error(err);
    //   });

    // Returns multiple artits?
    // Do we need this?
      // Get multiple artists
  // spotifyApi.getArtists(['2hazSY4Ef3aB9ATXW7F5w3', '6J6yx1t3nwIDyPXk5xa7O8'])
  //   .then(function(data) {
  //     console.log('Artists information', data.body);
  //   }, function(err) {
  //     console.error(err);
  //   });

  // Returns top 10 tracks by an artist
  spotifyApi.getArtistTopTracks('0oSGxfWSnnOXhD2fKuz2Gy', 'NZ')
  .then(function(data) {
    console.log(data.body);
    }, function(err) {
    console.log('Something went wrong!', err);
  });

  }) // Ends clientCredentialsGrant
