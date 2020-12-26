import { db } from '../api/firebase'
import firebase from 'firebase/app'
import ImageUpload from '../utils/ImageUpload'
import { ItemStatus } from '../enum/item-status.enum'
import { difference, differenceWith, forEach, intersectionWith, isEqual } from 'lodash'

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
    async create ({ rootState }, { item, images }) {
      try {
        // Add doc
        const user = rootState.user.user
        item.status = ItemStatus.Active
        item.createdAt = firebase.firestore.FieldValue.serverTimestamp()
        item.createdBy = { uid: user.uid, name: user.name }
        const doc = await db.collection('items').add(item)

        // Upload images
        const imageUploadHelper = new ImageUpload()
        const dir = `items/${user.uid}/${doc.id}`
        item.images = []
        for (let image of images) {
          let uploadResult = await imageUploadHelper.upload(image.file, dir)
          if (uploadResult.success) {
            item.images.push(uploadResult.data)
          }
        }
        await db.collection('items').doc(doc.id).set(item)

        await dispatch('syncAggregates', item)

        return { success: true, data: item }
      } catch (error) {
        return { success: false, data: error}
      }
    },
    async getById ({ state, commit }, id) {
      try {
        const found = state.items.find((item) => item.id == id)
        if (found) {
          commit('setSelected', found)
          return { success: true, data: found }
        }

        const doc = await firebase.firestore().collection('items').doc(id).get()
        if (doc.exists) {
          const data = doc.data()
          const imageHelper = new ImageUpload()
          data.images = await imageHelper.getPublicUrl(data.images)
          commit('setSelected', { id: doc.id, ...data })
          return { success: true, data: { id: doc.id, ...data } }
        }
        return { success: false, data: "NOT FOUND!" }
      } catch (error) {
        return { success: false, data: error}
      }
    },
    async edit ({ rootState, dispatch, state }, { item, images }) {
      try {
        const user = rootState.user.user
        item.updatedAt = firebase.firestore.FieldValue.serverTimestamp()
        item.updatedBy = { uid: user.uid, name: user.name }
        const imageUploadHelper = new ImageUpload()
        
        // Delete Images
        let imagesToDelete = differenceWith(
          state.selectedItem.images, // Original
          item.images, // Edited by user
          isEqual
        )
        
        for (let imageToDelete of imageUploadHelper.getFullPath(imagesToDelete)) {
          await imageUploadHelper.delete(imageToDelete)
        }

        // Upload Images
        item.images = imageUploadHelper.getFullPath(item.images)
        const dir = `items/${user.uid}/${item.id}`
        for (let image of images) {
          let uploadResult = await imageUploadHelper.upload(image.file, dir)
          if (uploadResult.success) {
            item.images.push(uploadResult.data)
          }
        }
        await db.collection('items').doc(item.id).set(item)

        await dispatch('syncAggregates', item)

        return { success: true, data: item }
      } catch (error) {
        return { success: false, data: error }
      }
    },
    async delete ({ dispatch }, item) {
      try {
        const imageUploadHelper = new ImageUpload()
        for (let imageToDelete of imageUploadHelper.getFullPath(item.images)) {
          await imageUploadHelper.delete(imageToDelete)
        }
        await db.collection('items').doc(item.id).delete()

        commit('setSelected', item)
        await dispatch('syncAggregates')
        commit('setSelected', {})
        return { success: true, data: item }
      } catch (error) {
        return { success: false, data: error }
      }
    },
    async syncAggregates({ state }, item = null) {
      // Set aggregates
      try {
        let aggregatesDoc = await db.collection('aggregates').doc('categories').get()
        let aggregates = aggregatesDoc.data()
        let category = aggregates[state.selectedItem.category]
  
        if (state.selectedItem) {
          for (let method of ['hand_delivery', 'post_delivery']) {
            let places = state.selectedItem[method]
            for (let place of places) {
              if (!!category[method][place]) {
                category[method][place]--
                if (category[method][place] <= 0) {
                  category[method][place] = 0
                } 
              }
            }
          }
        }
  
        if (item) {
          for (let method of ['hand_delivery', 'post_delivery']) {
            let places = item[method]
            for (let place of places) {
              if (category[method][place]) category[method][place]++
              else category[method][place] = 1
            }
          }
        }
  
        await db.collection('aggregates').doc('categories').set(aggregates)
        return { success: true, data: item }
      } catch (error) {
        return { success: false, data: error }
      }

    }
  }
}