import { register, login, logout, updateProfile } from '../api/auth'

export default {
  namespaced: true,
  state: () => ({
    user: {
      name: "",
      email: "",
      status: null,
      avatar: null,
      properties: null
    }
  }),
  getters: {
    isLoggedIn: (state) => state.user.name && state.user.email && state.user.status
  },
  mutations: {
    set(state, data) {
      state.user.name = data.name
      state.user.email = data.email
      state.user.avatar = data.avatar
      state.user.status = data.status
      state.user.properties = data.properties
    },
    reset(state) {
      state.user.name = state.user.email = ""
      state.user.status = state.user.avatar = null
    }
  },
  actions: {
    register(context, data) {
      return new Promise((resolve) => {
        register(data).then(({ data }) => {
          resolve(data)
        }).catch((err) => {
          resolve({ result: false, data: err.response.data.errors })
        })
      })
    },
    login({ commit }, data) {
      return new Promise((resolve) => {
        login(data).then(({ data }) => {
          if (data.result) {
            commit('set', data.data)
            resolve(data)
          } else {
            resolve(data)
          }
        }).catch((err) => {
          resolve({ result: false, data: err.response.data.errors })
        })
      })
    },
    updateProfie({ commit }, data) {
      return new Promise((resolve) => {
        updateProfile(data).then(({ data }) => {
          if (data.result) {
            commit('set', data.data)
            resolve(data)
          } else {
            resolve(data)
          }
        }).catch((err) => {
          resolve({ result: false, data: err.response.data.errors })
        })
      })
    },
    logout({ commit }, data) {
      return new Promise((resolve) => {
        logout().then(({ data }) => {
          resolve(true)
          commit('reset')
        }).catch((err) => {
          resolve(false)
        })
      })
    }
  }
}