import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import request from 'superagent'

import reducers from './reducers'
import App from './components/App'
import store from './store.js'

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app')
  )
})
request.get('/test').then((res) => console.log(res.text))
