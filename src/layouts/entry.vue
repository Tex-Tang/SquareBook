<template>
  <v-app id="entry-layout">
    <div class="entry-form rounded">
      <logo class="logo"></logo>
      <router-view></router-view>
    </div>
  </v-app>
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
    if (localStorage.getItem("expectToSignIn")) {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
#entry-layout .v-application--wrap{
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%);
}

@media screen and (max-height: 693px) {
  #entry-layout{
    height: auto;
  }
}

.entry-form{
  width: 370px;
  margin: 1rem;
  padding: 2.5rem 2rem;
  background-color: white;
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
.v-divider{
  text-align: center;
}
.v-divider::after{
  background-color: white;
  color: rgba(0,0,0,.32);
  display: inline-block;
  content: attr(data-content);
  font-size: .8rem;
  padding: .2rem .4rem;
  transform: translateY(-1rem);
}
</style>
