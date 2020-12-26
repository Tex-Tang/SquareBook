<template>
  <div class="pt-8">
    <h2>欢迎来到方书！</h2>
    <div class="grey--text mb-8 text--darken-1">
      已有帐户？<router-link class="btn-link" tag="a" to="/login">登入</router-link>
    </div>
    <v-alert type="error" v-if="errors.length">
      <p v-for="error in errors" class="my-0">{{ error }}</p>
    </v-alert>
    <div class="social-btn facebook rounded">
      <span class="mdi mdi-facebook text-h4"></span>
      Sign in with Facebook
    </div>
    <div class="social-btn google rounded">
      <span></span>
      Sign in with Google
    </div>
    <v-divider class="my-6" data-content="或用邮箱注册"></v-divider>
    <validation-observer
      ref="observer"
      v-slot="{ invalid, handleSubmit }"
    >
      <form @submit.prevent="handleSubmit(register)">
        <validation-provider
          name="名字"
          v-slot="{ errors }"
          rules="required">
          <v-text-field
            label="名字"
            placeholder="显示姓名"
            v-model="user.name"
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
            v-model="user.passwordConfirmation"
            :error-messages="errors"
          ></v-text-field>
        </validation-provider>
        <div class="text-right">
          <v-btn type="submit" :loading="loading" depressed color="primary">注册</v-btn>
        </div>
      </form>
    </validation-observer>
  </div>
</template>

<script>
export default{
  data: () => ({
    user: {
      name: "Test",
      email: "test@gmail.com",
      password: "Test1234",
      passwordConfirmation: "Test1234",
    },
    errors: [],
    loading: false
  }),
  methods: {
    register () {
      this.errors = []
      this.loading = true
      this.$store.dispatch('user/register', this.user).then(({ success, message }) => {
        if (!success) {
          this.errors.push(message)
        } else {
          this.$router.push("/")
        }
        this.loading = false
      })
    }
  }
}
</script>