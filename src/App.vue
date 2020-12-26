<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import firebase from 'firebase/app'

export default {
  beforeCreate() {
    this.$store.dispatch('loading', true)
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$db.collection('users').doc(user.uid).get().then((doc) => {
          if (doc.exists) {
            this.$store.commit('user/set', { uid: user.uid, ...doc.data() })
          }
        })
      } else {
        this.$store.commit('user/reset')
      }
      this.$store.dispatch('loading', false)
    });
    firebase.firestore()
    .collection('aggregates')
    .doc('general')
    .onSnapshot(doc => {
      this.$store.commit('aggregates/setGeneral', doc.data())
    })
  }
}
</script>

<style lang="scss">
@media (min-width: 1904px){
  #app .container {
    max-width: 1200px;
  }
}
</style>