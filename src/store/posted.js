import { cloneDeep } from 'lodash'
import { addItem, deleteItem, getItemById, getItems, updateItem } from '../api/posted'

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
    create ({ state, commit }, item) {
      return new Promise((resolve) => {
        addItem(item).then(({ data }) => {
          resolve(data)
        }).catch((err) => {
          resolve({ result: false, data: err.response.data })
        })
      })
    },
    getAll ({ commit }) {
      return new Promise((resolve) => {
        getItems().then(({ data }) => {
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
          if (data.result) {
            resolve(data)
          }
        }).catch((err) => {
          resolve({ result: false, data: err.response.data })
        })
      })
    },
    update ({ state , commit }, item) {
      return new Promise((resolve) => {
        updateItem(item).then(({ data }) => {
          resolve(data)
        }).catch((err) => {
          resolve({ result: false, data: err.response.data })
        })
      })
    },
    async delete ({ commit, state }, item) {
      return new Promise((resolve) => {
        deleteItem(item.uuid).then(({ data }) => {
          if (data.result === true) {
            const items = cloneDeep(state.items)
            items.splice(items.findIndex(({uuid}) => uuid === item.uuid), 1)
            commit('set', items)
          }
          resolve(data)
        }).catch((err) => {
          resolve({ result: false, data: err.response.data })
        })
      })
    },
  }
}