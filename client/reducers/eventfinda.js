function eventfinda (state = [], action) {
  switch (action.type) {
    case 'RECEIVE_EVENTS':
      return [...action.eventfinda]
    default:
      return state
  }
}

export default eventfinda
