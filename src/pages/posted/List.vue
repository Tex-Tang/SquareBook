<template>
  <div class="my-2">
    <v-row>
      <v-col cols="6" class="py-0">
        <div class="title text-h5">我发布的</div>
      </v-col>
      <v-col cols="6" class="py-0 mb-4 text-right">
        <v-btn depressed color="primary" :to="{ name: 'choose-category' }">
          + 发布
        </v-btn>
      </v-col>
      <v-col v-if="items().length" class="pt-0" cols="12" :sm="6" :md="3" v-for="(item, index) in items()" :key="'item-'+index">
        <v-card elevation="0" class="mb-8">
          <v-img class="rounded-lg" :src="item.images[0].path" :aspect-ratio="4/3"></v-img>
          <div class="chips">
            <v-chip outlined label small class="mr-2 mt-2" v-if="item.hand_delivery.length">
              可面交
            </v-chip>
            <v-chip outlined label small class="mr-2 mt-2" v-if="item.post_delivery.length">
              可邮寄
            </v-chip>
          </div>
          
          <v-card-text class="pa-0 text-body-1 pt-1">{{item.name}}</v-card-text>
          <v-card-text class="pa-0 text-body-1 py-1 font-weight-bold black--text">RM{{item.price}}</v-card-text>
          <v-card-text class="pa-0">
            <div class="description">
              {{ item.description }}
            </div>
          </v-card-text>
          <v-card-actions class="pa-0 pt-2">
            <v-btn :to="{ 
              name: 'post-edit', 
              params: { 
                category: item.category, 
                uuid: item.uuid 
              }
            }" color="primary" depressed>编辑</v-btn>
            <v-btn class="ml-2" @click="deleteItem(item)" color="error" depressed>删除</v-btn>
            <v-btn class="ml-2" @click="soldItem(item.uuid)" depressed>已卖出</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { ItemStatus } from '../../enum/item-status.enum'
import { mapActions, mapState } from 'vuex'

export default {
  data: () => ({
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
        this.$store.dispatch('loading', false)
      })
    },
    soldItem (uuid) {
      this.$store.dispatch('loading', true)
      this.$store.dispatch('posted/sold', uuid).then(res => {
        this.$store.dispatch('loading', false)
      })
    }
  },
}
</script>
