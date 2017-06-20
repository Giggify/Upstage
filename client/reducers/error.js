function error (state = "", action) {
  switch (action.type) {
    case 'THROW_ERROR':
      return action.message
    case 'CLEAR_ERROR':
      return ""
    default:
      return state
  }
}

export default error
