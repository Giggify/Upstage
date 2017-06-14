import request from 'superagent'

const receiveEvents = (events) => {
  return {
    type: 'RECEIVE_EVENTS',
    eventfinda: events.map(event => event)
  }
}

function getEvents (query) {
  var username = 'gigify'
  var password = '77trwcqy4835'
  return (dispatch) => {
    request
      .get('http://api.eventfinda.co.nz/v2/events.json')
      // .set(unescape(encodeURIComponent(username + ":" + password))))
      .set("Authorization", "Basic "+btoa(username + ":" + password)
      .query({
        q: query,
      // })
      .end((err, res) => {
        if (err) {
          console.log("things broke.");
        } else {
          console.log(res.body);
          // dispatch(receiveEvents(res.body))
        }
      })
  }
}
