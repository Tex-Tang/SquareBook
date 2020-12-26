export default {
  namespaced: true,
  state: () => ({
    general: {
      places: [],
    },
    placesMap: {}
  }),
  mutations: {
    setGeneral(state, general) {
      state.general = general
      general.places.forEach(item => {
        item.disabled = true
        item.children.forEach(child => {
          state.placesMap[child.id] = child.name
        })
      });
    }
  },
}