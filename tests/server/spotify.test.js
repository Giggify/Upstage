import test from 'ava'

const spotify = require('../../server/lib/spotify')

test('filters artist to return correct artist', t => {
  let filteredArtist = spotify.filterArtists([{name: 'Oasis'}, {name: 'Oasiscasc'}], 'Oasis')
  t.is(filteredArtist[0].name, 'Oasis')
})

test('tracks are filtered', t => {
  let filteredTracks = spotify.filterTracks([{name: 'blah', id: 1}, {name: 'two', id: 2}])
  t.is(filteredTracks.length, 2)
  t.is(filteredTracks[0].id, 1)
})
