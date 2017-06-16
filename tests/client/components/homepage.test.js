import test from 'ava'
import React from 'react'
import {mount, render} from 'enzyme'
import * as sinon from 'sinon'
import {Provider} from 'react-redux'

import '../helpers/setup-dom'
import SearchBar from '../../../client/components/SearchBar'
import store from '../../../client/store'

const page= <Provider store={store}><SearchBar /></Provider>

test('search bar renders', t => {
  const wrapperMount = mount(page)
  t.is(wrapperMount.find('.search-bar').exists(), true)
})

test('search bar search button renders search results', t => {
  sinon.stub(store,"dispatch")
  const wrapperMount = mount(page)
  wrapperMount.find('.search-bar').simulate('change',{target:{value:"test"}})
  wrapperMount.find('#search-button').simulate('click')
  t.is(store.dispatch.called,true)
})
