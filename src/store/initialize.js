import { getCategories, getAllPlaces } from '../api/aggregate'
import { getProfile } from '../api/auth'
import router from '../router'

export default (store) => {
  store.dispatch('loading', true)
  getCategories().then(({ data }) => {
    let categories = data;
    getAllPlaces().then(({ data }) => {
      let places = data.map((place) => {
        place.disabled = true // Make parent not selectable
        return place
      });
      store.commit('aggregates/set', {
        places, categories
      })
      getProfile().then(({ data }) => {
        if (data.result === false) {
          store.commit('user/reset')
        }
        if (data.result === true) {
          store.commit('user/set', data.data)
          if (router.currentRoute.name === 'login' || router.currentRoute.name === 'register') {
            router.push(router.currentRoute.query.url)
          }
        }
        store.dispatch('loading', false)
      })
    })
  })
}