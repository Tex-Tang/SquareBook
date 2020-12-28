<template>
  <v-app>
    <v-app-bar app flat class="white" height="68px">
      <v-container class="fill-height py-1 px-0 px-sm-3">
        <router-link to="/" tag="div" class="d-flex cursor-pointer">
          <logo style="width: 30px" />
          <span class="text-h6 font-weight-medium ml-3 primary--text font-bold">方书</span>
        </router-link>
        <v-spacer></v-spacer>
        <v-btn v-if="!isLoggedIn()" class="mr-2" depressed :to="{ name: 'register' }">注册</v-btn>
        <v-btn v-if="!isLoggedIn()" color="primary" depressed :to="{ name: 'login' }">登入</v-btn>
        <v-menu v-if="isLoggedIn()" left offset-y rounded content-class="profile-btn elevation-0" max-width="200">
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
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="title" style="line-height: 1.2">
                  {{ user().name }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ user().email }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
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
            <v-list-item @click="logout">
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-content>登出</v-list-item-content>
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
  </v-app>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Logo from '../components/Logo.vue'

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
    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn'
    }),
    ...mapState({
      user: state => state.user.user
    }),   
  }),
  methods: {
    logout () {
      this.$store.dispatch('user/logout').then((res) => {
        if (res) {
          this.$store.dispatch('alert', {
            type: 'success',
            message: '成功登出！'
          })
          if (this.$router.currentRoute.name !== 'homepage') {
            this.$router.push('/')
          }
        } else {
          this.$store.dispatch('alert', {
            type: 'error',
            message: '登出失败！'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
.v-app-bar > div{
  border-bottom: solid .05rem rgba($color: #000000, $alpha: .08);
}
.profile-btn{
  border: solid .05rem #EEEEEE;
}
</style>