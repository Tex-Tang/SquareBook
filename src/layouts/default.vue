<template>
  <v-app>
    <v-app-bar app flat class="white">
      <v-container class="fill-height py-1" style="height: auto;">
        <router-link to="/" tag="div" class="d-flex cursor-pointer">
          <logo style="width: 30px" />
          <span class="text-h6 font-weight-medium ml-3 primary--text font-bold">方书</span>
        </router-link>
        <v-spacer></v-spacer>
        <v-menu left offset-y rounded content-class="profile-btn elevation-0">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-on="on" v-bind="attrs">
              <v-avatar
                color="primary"
                size="36"
              >
                <span class="white--text headline">T</span>
              </v-avatar>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item
              v-for="(item, i) in links"
              :key="i"
              :to="item.to"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>{{ item.title }}</v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-container>
    </v-app-bar>
    <v-main class="grey lighten-5">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-fade-transition>
      <div class="loading-wrapper" v-if="loading()">
        <div class="loading-overlay"></div>
        <div class="loading">
          <logo/>
          <div class="primary--text font-weight-semibold">努力加载中...</div>
        </div>
      </div>
    </v-fade-transition>
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
    >
      <div class="d-flex align-center" v-if="snackbar().type === 'error'">
        <v-icon color="error">mdi-alert-circle</v-icon>
        <span class="subtitle ml-2 font-weight-semibold">Error</span>
      </div>
      <div class="d-flex align-center" v-if="snackbar().type === 'success'">
        <v-icon color="success">mdi-check-circle</v-icon>
        <span class="subtitle ml-2 font-weight-semibold">Success</span>
      </div>
      <div class="d-flex align-center" v-if="snackbar().type === 'warning'">
        <v-icon color="warning">mdi-alert</v-icon>
        <span class="subtitle ml-2 font-weight-semibold">Warning</span>
      </div>
      <pre class="error-messages mt-2 text-left">{{ snackbar().messages }}</pre>
      <template v-slot:action="{ attrs }">
        <v-btn
          :color="snackbar().type"
          text
          v-bind="attrs"
          @click="snackbar().show = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import Logo from '../components/Logo.vue'
import Vue from 'vue'
import { mapState } from 'vuex'

export default {
  components: {
    Logo
  },
  data: () => ({
    links: [
      { title: '我发布的', to: { name: 'posted'}, icon: 'mdi-format-list-numbered' },
      { title: '我卖出的', to: { name: 'sold'  }, icon: 'mdi-check-all' },
      { title: '我购买的', to: { name: 'bought'}, icon: 'mdi-briefcase-download' }
    ],
    ...mapState(['snackbar', 'loading'])
  }),
}
</script>

<style lang="scss">
.v-app-bar > div{
  border-bottom: solid .05rem rgba($color: #000000, $alpha: .08);
}
.profile-btn{
  border: solid .05rem #EEEEEE;
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