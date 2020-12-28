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
    create ({ state }, item) {
      return new Promise((resolve) => {
        addItem(item).then(({ data }) => {
          if (data.result === true) {
            commit('set', [data.data, ...state.items])
          }
          resolve(data)
        })
      }).catch((err) => {
        resolve({ result: false, data: err.response.data })
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
        if (state.items.data) {
         const found = state.items.data.find((item) => item.uuid == uuid)
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
          if (data.result === true) {
            const items = cloneDeep(state.items)
            if (items.data) {
              items.data[items.data.findIndex(({id}) => id === item.id)] = data.data
              commit('set', items)
            }
          }
          resolve(data)
        })
      }).catch((err) => {
        resolve({ result: false, data: err.response.data })
      })
    },
    async delete ({ commit }, item) {
      return new Promise((resolve) => {
        deleteItem(id).then(({ data }) => {
          if (data.result === true) {
            const items = cloneDeep(state.items)
            items.data.splice(items.data.findIndex(({id}) => id === item.id), 1)
            commit('set', items)
          }
          resolve(data)
        })
      }).catch((err) => {
        resolve({ result: false, data: err.response.data })
      })
    },
  }
}