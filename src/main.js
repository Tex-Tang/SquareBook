import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './plugins/vee-validate'
import { db } from './api/firebase'
import './scss/style.scss'
//import "./enum/initialize.enum"

Vue.config.productionTip = false
Vue.prototype.$db = db

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
