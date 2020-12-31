<template>
  <div class="pt-8">
    <h2>欢迎回来！</h2>
    <div class="grey--text mb-8 text--darken-1">
      卖书？<router-link class="btn-link" tag="a" to="/register">现在注册吧</router-link>
    </div>
    <div class="mt-4">
      <a href="/oauth/facebook" class="social-btn facebook rounded">
        <span class="mdi mdi-facebook text-h4"></span>
        Sign in with Facebook
      </a>
      <a href="/oauth/google" class="social-btn google rounded">
        <span></span>
        Sign in with Google
      </a>
    </div>
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
            :loading="loading"
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
            :loading="loading"
            :error-messages="errors"
          ></v-text-field>
        </validation-provider>
        <validation-provider
          name="用户协议"
          v-slot="{ errors }"
          rules="required"
        >
          <v-checkbox
            label="记得我"
            v-model="user.remember"
            :loading="loading"
            :error-messages="errors"
          ></v-checkbox>
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
      password: "Test1234",
      remember: false
    },
    errors: [],
    loading: false,
  }),
  methods: {
    login () {
      this.loading = true
      this.$store.dispatch('user/login', this.user)
      .then(({ result, data }) => {
        if (result) {
          this.$router.push('/')
        } else {
          this.$store.dispatch('alert', {
            type: 'error',
            message: '密码或邮箱错误！'
          })
        }
        this.loading = false
      })
    },
  }
}
</script>
