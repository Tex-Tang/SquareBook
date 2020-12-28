<template>
  <v-app id="app">
    <router-view/>
    <v-snackbar
      v-model="snackbar().show"
      :timeout="snackbar().timeout"
      top
      right
      transition="scroll-x-transition"
      :color="snackbar().type"
      rounded
      outlined
      text
      class="pa-2"
      content-class="pa-4"
    >
      <div class="d-flex align-center" v-if="snackbar().type === 'error'">
        <v-icon color="error">mdi-alert-circle</v-icon>
        <span class="subtitle ml-2 font-weight-semibold">发生错误</span>
      </div>
      <div class="d-flex align-center" v-if="snackbar().type === 'success'">
        <v-icon color="success">mdi-check-circle</v-icon>
        <span class="subtitle ml-2 font-weight-semibold">成功</span>
      </div>
      <div class="d-flex align-center" v-if="snackbar().type === 'warning'">
        <v-icon color="warning">mdi-alert</v-icon>
        <span class="subtitle ml-2 font-weight-semibold">温馨提醒</span>
      </div>
      <pre class="error-messages mt-2 text-left">{{ snackbar().message }}</pre>
      <template v-slot:action="{ attrs }">
        <v-btn
          :color="snackbar().type"
          text
          v-bind="attrs"
          @click="snackbar().show = false"
        >
          关闭
        </v-btn>
      </template>
    </v-snackbar>
    <v-fade-transition>
      <div class="loading-wrapper" v-if="loading()">
        <div class="loading-overlay"></div>
        <div class="loading">
          <logo/>
          <div class="primary--text font-weight-semibold">努力加载中...</div>
        </div>
      </div>
    </v-fade-transition>
  </v-app>
</template>

<script>
import Logo from './components/Logo.vue'
import { mapState } from 'vuex'

export default {
  components: {
    Logo
  },
  data: () => ({
    ...mapState(['snackbar', 'loading'])
  }),
}
</script>

<style lang="scss">
@media (min-width: 1904px){
  #app .container {
    max-width: 1200px;
  }
}

#app .v-snack__wrapper{
  margin: 8px;
  @media screen and (max-width: 400px) {
    width: 100% !important;
    min-width: auto;
  }
}

@keyframes bounce {
  from,
  20%,
  53%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translate3d(0, 0, 0);
  }

  40%,
  43% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -30px, 0) scaleY(1.1);
  }

  70% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -15px, 0) scaleY(1.05);
  }

  80% {
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translate3d(0, 0, 0) scaleY(0.95);
  }

  90% {
    transform: translate3d(0, -4px, 0) scaleY(1.02);
  }
}
.loading-wrapper{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  .loading{
    text-align: center;
    z-index: 1000;
  }
  .loading svg{
    width: 65px;
    width: 7vh;
    animation-name: bounce;
    transform-origin: center;
    animation-duration: 1s;
    animation-iteration-count: infinite;
  }
  .loading-overlay{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background-image: linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%);
  }
}
</style>