import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import posted from './posted'
import aggregates from './aggregates'

Vue.use(Vuex)

export default new Vuex.Store({
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
