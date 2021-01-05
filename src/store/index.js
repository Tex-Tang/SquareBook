import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import user from './user'
import sold from './sold'
import items from './items'
import posted from './posted'
import aggregates from './aggregates'

import InitializeStore from './initialize'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    snackbar: {
      show: false,
      type: "",
      timeout: 1000,
      message: ""
    },
    loading: false
  },
  mutations: {
  },
  actions: {
    alert({ state }, { type, message, timeout = 3000 }) {
      state.snackbar.type = type
      state.snackbar.timeout = timeout
      state.snackbar.message = message
      state.snackbar.show = true
    },
    loading ({ state }, loading) {
      state.loading = loading
    }
  },
  modules: {
    user,
    sold,
    items,
    posted,
    aggregates,
  }
})

InitializeStore(store)

export default store;
