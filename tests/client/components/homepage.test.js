import test from 'ava'
import React from 'react'
import {shallow, mount, render} from 'enzyme'
import * as sinon from 'sinon'
import {Provider} from 'react-redux'

import '../helpers/setup-dom'
import App from '../../../client/components/App'
import store from '../../../client/store'

const app= <Provider store={store}><App /></Provider>

test('search bar renders on homepage', t => {
  const wrapperMount = mount(app)
  t.is(wrapperMount.find('.search-bar').exists(), true)
})

test('search bar search button renders search results', t => {
  sinon.stub(store,"dispatch")
  const wrapperMount = mount(app)
  wrapperMount.find('.search-bar').simulate('change',{target:{value:"wellington"}})
  wrapperMount.find('#search-button').simulate('click')
  t.is(store.dispatch.called,true)
})
