<template>
  <div class="my-2">
    <v-btn depressed color="primary" :to="{ name: 'choose-category' }">
      + 添加
    </v-btn>
    <v-row>
      <v-col cols="12" :sm="6" v-for="item in items().data" :key="item.id">
        <v-card elevation="0" class="bordered rounded">
          <div class="pa-4">
            <v-row no-gutters>
              <v-col cols="4">
                <v-img aspect-ratio="1" :src="item.images[0].path"></v-img>
              </v-col>
              <v-col cols="8">
                <div class="pl-4">
                  <div class="title">{{ item.title }}</div>
                  <div class="headline primary--text">RM {{ item.price }}</div>
                  <div class="subtitle grey--text description">{{ item.description }}aaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa</div>
                  <div class="d-flex mt-2">
                    <v-btn :to="{ 
                      name: 'post-edit', 
                      params: { 
                        category: item.category, 
                        uuid: item.uuid 
                      }
                    }" color="primary" depressed>编辑</v-btn>
                    <v-btn class="ml-2" @click="deleteItem(item)" color="error" depressed>删除</v-btn>
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import { ItemStatus } from '../../enum/item-status.enum'
import ImageUpload from '../../utils/ImageUpload'
import { mapActions, mapState } from 'vuex'

export default {
  data: () => ({
    unsubscribe: null,
    ...mapState({
      items: state => state.posted.items
    }),
  }),
  mounted () {
    this.$store.dispatch('loading', true)
    this.$store.dispatch('posted/getAll').then((res) => {
      this.$store.dispatch('loading', false)
    })
  },
  methods: {
    deleteItem (item) {
      this.$store.dispatch('loading', true)
      this.$store.dispatch('posted/delete', item).then(res => {
        console.log(res)
        this.$store.dispatch('loading', false)
      })
    }
  },
}
</script>
