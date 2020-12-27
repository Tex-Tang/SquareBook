export default {
  namespaced: true,
  state: () => ({
    aggregates: {
      categories: [],
      places: [],
      activePlaces: [],
    },
    placesMap: {}
  }),
  mutations: {
    set(state, aggregates) {
      state.aggregates = aggregates
      let placesMap = {}
      aggregates.places.forEach(parent => {
        parent.areas.forEach(place => {
          placesMap[place.id] = place.name
        })
      });
      state.placesMap = placesMap
    }
  },
}