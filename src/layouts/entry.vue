<template>
  <div id="entry-layout">
    <v-row no-gutters>
      <v-col cols="12" :md="6" :lg="5" :xl="4">
        <div class="entry-form">
          <router-link to="/">
            <logo style="width: 70px"/>
          </router-link>
          <router-view></router-view>
        </div>
      </v-col>
      <v-col class="hidden-sm-and-down" cols="12" :md="6" :lg="7" :xl="8">
        <div class="entry-image">
          <img src="/images/book.svg">
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Vue from 'vue'
import Logo from '@/components/Logo.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Logo
  },
  mounted() {
    if (this.$store.getters['user/isLoggedIn']) {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
.entry-image{
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%);
  img{
    width: 50%;
  }
}

.entry-form{
  background-color: white;
  padding: 6rem;
  @media screen and (max-width: 500px) {
    padding: 2rem;
  }
  .logo{
    width: 5rem;
    height: 5rem;
  }
  .social-btn{
    display: flex;
    width: 100%;
    align-items: center;
    padding: .25rem 1rem;
    margin-bottom: .5rem;
    text-decoration: none;
    span{
      margin-right: 1rem;
    }
    &.facebook{
      background: #1877F2;
      color: white;
    }
    &.google{
      border: solid .05rem #EEEEEE;
      padding: .5rem 1rem;
      color: rgba($color: #000000, $alpha: .8);
      span{
        background-image: url("/images/google.png");
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        width: 34.25px;
        height: 30px;
      }
    }
  }
}
</style>
