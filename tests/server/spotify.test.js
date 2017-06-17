import test from 'ava'

const spotify = require('../../server/lib/spotify')

test.skip('faking passing test', t=>{
  t.pass()
})

test('getArtistId returns an ArtistID', function(t) {
    var expected = '08td7MxkoHQkXnWAYD8d6Q'
    return spotify.getArtistId('Tania Bowra')
        .then(function (result) {
            var actual = result
            t.is(actual, expected)
        })
})
