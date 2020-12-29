import { getItemById, getItems } from '../api/item'

export default {
  namespaced: true,
  state: () => ({
    items: [],
    selectedItem: {}
  }),
  mutations: {
    set(state, data) {
      state.items = data
    },
    setSelected(state, data) {
      state.selectedItem = data
    }
  },
  actions: {
    getAll ({ commit }, search) {
      return new Promise((resolve) => {
        getItems(search).then(({ data }) => {
          if (data.result) {
            commit('set', data.data)
            resolve(data)
          }
        }).catch((err) => {
          resolve({ result: false, data: err.response.data })
        })
      })
    },
    getById ({ state, commit }, uuid) {
      return new Promise((resolve) => {
        if (state.items.length) {
         const found = state.items.find((item) => item.uuid == uuid)
          if (found) {
            commit('setSelected', found)
            return resolve({ result: true, data: found })
          } 
        }

        getItemById(uuid).then(({ data }) => {
          console.log(data)
          if (data.result) {
            resolve(data)
          }
        }).catch((err) => {
          resolve({ result: false, data: err.response.data })
        })
      })
    },
  }
}