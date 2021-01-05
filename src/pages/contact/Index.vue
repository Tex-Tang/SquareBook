<template>
  <div style="max-width: 400px" class="mx-auto">
      <h2>联系方式</h2>
      <validation-observer
        ref="observer"
        v-slot="{ handleSubmit }"
      >
        <form class="mt-4" @submit.prevent="handleSubmit(submit)">
          <validation-provider
            v-slot="{ errors }"
            name="电话号码"
            :rules="{
              regex: /^(\+?6?01)[0-46-9]-*[0-9]{7,8}$/
            }">
            <v-text-field
              v-model="contact.whatsapp"
              :error-messages="errors"
              placeholder="0123456789"
              label="Whatsapp"
              outlined
              dense
              height="50"
            ></v-text-field>
          </validation-provider>
          <v-text-field
            v-model="contact.facebook"
            placeholder="https://www.facebook.com/squarebook2020"
            label="Facebook 链接"
            outlined
            dense
            height="50"
          ></v-text-field>
          <v-text-field
            v-model="contact.instagram"
            placeholder="Instagram link"
            label="Instagram 链接"
            outlined
            dense
            height="50"
          ></v-text-field>
          <h2 class="mb-4">个人资料</h2>
          <validation-provider
            v-slot="{ errors }"
            name="名字"
            rules="required">
            <v-text-field
              v-model="profile.name"
              :error-messages="errors"
              label="名字"
              placeholder="名字"
              outlined
              dense
              height="50"
            ></v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="邮箱"
            rules="required|email">
            <v-text-field
              v-model="profile.email"
              :error-messages="errors"
              label="邮箱"
              placeholder="邮箱"
              outlined
              dense
              height="50"
            ></v-text-field>
          </validation-provider>
          <div class="text-right">
            <v-btn type="submit" depressed color="primary">提交</v-btn>
          </div>
        </form>
      </validation-observer>
  </div>
</template>

<script>
import { getProfile, updateProfile } from '../../api/auth'
export default {
  data: () => ({
    contact: {
      instagram: "",
      facebook: "",
      whatsapp: "",
    },
    profile: {
      name: "",
      email: ""
    }
  }),
  mounted () {
    this.profile.name = this.$store.state.user.user.name
    this.profile.email = this.$store.state.user.user.email
    for (let key in this.$store.state.user.user.properties) {
      this.contact[key] = this.$store.state.user.user.properties[key]
    }
  },
  methods: {
    submit () {
      this.$store.dispatch('loading', true)
      updateProfile({
        name: this.profile.name,
        email: this.profile.email,
        contact: this.contact
      }).then((res) => {
        if (res.data.result) {
          this.$store.dispatch('alert', {
            type: 'success',
            message: '修改成功',
          })
          this.$router.push("/")
          getProfile().then(({ data }) => {
            if (data.result === true) {
              this.$store.commit('user/set', data.data)
            }
            this.$store.dispatch('loading', false)
          })
        } else {
          this.$store.dispatch('alert', {
            type: 'error',
            message: '发生错误',
          })
          this.$store.dispatch('loading', false)
        }
      })
    }
  },
  watch: {
    '$store.state.user.user': {
      handler (user) {
        this.profile.name = user.name
        this.profile.email = user.email
        for (let key in user.properties) {
          this.contact[key] = user.properties[key]
        }
      },
      deep: true
    }
  }
}
</script>

<style style="scss">

</style>