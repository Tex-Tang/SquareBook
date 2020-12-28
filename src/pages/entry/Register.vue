<template>
  <div class="pt-8">
    <h2>欢迎来到方书！</h2>
    <div class="grey--text mb-8 text--darken-1">
      已有帐户？<router-link class="btn-link" tag="a" to="/login">登入</router-link>
    </div>
    <v-tabs v-model="tab">
      <v-tab>邮箱登入</v-tab>
      <v-tab>社交账户</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <validation-observer
          ref="observer"
          v-slot="{ invalid, handleSubmit }"
        >
          <form @submit.prevent="handleSubmit(register)" class="mt-4">
            <validation-provider
              name="名字"
              v-slot="{ errors }"
              rules="required">
              <v-text-field
                label="名字"
                placeholder="显示姓名"
                v-model="user.name"
                :loading="loading"
                :error-messages="errors"
              ></v-text-field>
            </validation-provider>
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
            <div class="grey--text text-caption mb-2">
              密码需至少8个字符，包括一个大字母，一个小字母，一个号码。
            </div>
            <validation-provider
              name="密码"
              v-slot="{ errors }"
              :rules="{
                required: true,
                regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                confirmed: 'confirmation'
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
              name="确认密码"
              v-slot="{ errors }"
              rules="required"
              vid="confirmation">
              <v-text-field
                label="确认密码"
                type="password"
                placeholder="再次输入密码"
                v-model="user.password_confirmation"
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
                label="我已同意《用户协议》"
                v-model="user.agreement"
                :loading="loading"
                :error-messages="errors"
              ></v-checkbox>
            </validation-provider>
            <div class="text-right">
              <v-btn type="submit" :loading="loading" depressed color="primary">注册</v-btn>
            </div>
          </form>
        </validation-observer>
      </v-tab-item>
      <v-tab-item>
        <div class="mt-4">
          <a href="/oauth/google" class="social-btn facebook rounded">
            <span class="mdi mdi-facebook text-h4"></span>
            Sign in with Facebook
          </a>
          <a  href="/oauth/facebook" class="social-btn google rounded">
            <span></span>
            Sign in with Google
          </a>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
export default{
  data: () => ({
    user: {
      name: "Test",
      email: "test@gmail.com",
      agreement: true,
      password: "Test1234",
      password_confirmation: "Test1234",
    },
    tab: 1,
    errors: [],
    loading: false
  }),
  methods: {
    register () {
      this.errors = []
      if (this.user.agreement === false) {
        this.errors.push('请同意用户隐私协议。')
        return;
      }
      this.loading = true
      this.$store.dispatch('user/register', this.user).then(({ result, data }) => {
        if (!result) {
          if (data.email && data.email[0] === 'The email has already been taken.') {
            this.$store.dispatch('alert', {
              type: 'error',
              message: '邮箱已注册。',
            })
          }
        } else {
          this.$router.push("/login")
        }
        this.loading = false
      })
    }
  }
}
</script>