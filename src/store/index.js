import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import user from './user'
import posted from './posted'
import aggregates from './aggregates'

import { getCategories, getAllPlaces, getActivePlaces } from '../api/aggregate'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    snackbar: {
      show: false,
      type: "",
      timeout: 1000,
      messages: ""
    },
    loading: false
  },
  mutations: {
  },
  actions: {
    alert({ state }, { type, messages, timeout = 3000 }) {
      state.snackbar.type = type
      state.snackbar.timeout = timeout
      state.snackbar.messages = messages
      state.snackbar.show = true
    },
    loading ({ state }, loading) {
      state.loading = loading
    }
  },
  modules: {
    user,
    posted,
    aggregates,
  }
})
/*
store.dispatch('loading', true)
getCategories().then(({ data }) => {
  let categories = data;
  getAllPlaces().then(({ data }) => {
    let places = data;
    getActivePlaces().then(({ data }) => {
      let activePlaces = data
      store.commit('aggregates/set', {
        places, categories, activePlaces
      })
      store.dispatch('loading', false)
    })
  })
})
*/

export default store;
