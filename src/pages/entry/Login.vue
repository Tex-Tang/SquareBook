<template>
  <div class="pt-8">
    <h2>欢迎回来！</h2>
    <div class="grey--text mb-8 text--darken-1">
      卖书？<router-link class="btn-link" tag="a" to="/register">现在注册吧</router-link>
    </div>
    <v-alert type="error" v-if="errors.length">
      <p v-for="error in errors" class="my-0">{{ error }}</p>
    </v-alert>
    <button class="social-btn facebook rounded" @click="loginWithFacebook">
      <span class="mdi mdi-facebook text-h4"></span>
      Sign in with Facebook
    </button>
    <button class="social-btn google rounded" @click="loginWithGoogle">
      <span></span>
      Sign in with Google
    </button>
    <v-divider class="my-6" data-content="或用邮箱登入"></v-divider>
    <validation-observer
      ref="observer"
      v-slot="{ invalid, handleSubmit }"
    >
      <form @submit.prevent="handleSubmit(login)">
        <validation-provider
          name="邮箱"
          v-slot="{ errors }"
          rules="required|email">
          <v-text-field
            label="邮箱"
            placeholder="yourname@gmail.com"
            v-model="user.email"
            :error-messages="errors"
          ></v-text-field>
        </validation-provider>
        <validation-provider
          name="密码"
          v-slot="{ errors }"
          :rules="{
            required: true,
            regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
          }">
          <v-text-field
            label="密码"
            type="password"
            placeholder="输入密码"
            v-model="user.password"
            :error-messages="errors"
          ></v-text-field>
        </validation-provider>
        <div class="text-right">
          <v-btn type="submit" :loading="loading" depressed color="primary">登入</v-btn>
        </div>
      </form>
    </validation-observer>
  </div>
</template>

<script>
export default{
  data: () => ({
    user: {
      email: "test@gmail.com",
      password: "Test1234"
    },
    errors: [],
    loading: false,
  }),
  methods: {
    login () {
      this.errors = []
      this.loading = true
      this.$store.dispatch('user/login', this.user).then(({ success, message }) => {
        if (!success) {
          this.errors.push(message)
        } else {
          this.$router.push("/")
        }
        this.loading = false
      })
    },
    loginWithGoogle () {
      this.errors = []
      this.$store.dispatch('user/loginWithGoogle').then(({ success, message }) => {
        if (!success) {
          this.errors.push(message)
        } else {
          this.$router.push("/")
        }
      })
    },
    loginWithFacebook () {
      this.errors = []
      this.$store.dispatch('user/loginWithFacebook').then(({ success, message }) => {
        if (!success) {
          this.errors.push(message)
        } else {
          this.$router.push("/")
        }
      })
    }
  }
}
</script>
