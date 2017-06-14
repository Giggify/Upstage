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
      .query({
        q: query,
        Authorization: "Basic "+btoa(username + ":" + password)
      })
      .end((err, res) => {
        if (err) {
          console.log("things broke.");
        } else {
          dispatch(receiveEvents(res.body))
        }
      })
  }
}
