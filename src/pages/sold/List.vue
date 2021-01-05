<template>
  <div class="my-2">
    <v-row>
      <v-col cols="12" class="py-0 mb-4">
        <div class="title text-h5">我卖出的</div>
      </v-col>
      <v-col v-if="items().length" class="pt-0" cols="12" :sm="6" :md="3" v-for="(item, index) in items()" :key="'item-'+index">
        <v-card elevation="0" class="mb-8">
          <v-img class="rounded-lg" :src="item.images[0].path" :aspect-ratio="4/3"></v-img>          
          <v-card-text class="pa-0 text-body-1 pt-1">{{item.name}}</v-card-text>
          <v-card-text class="pa-0 text-body-1 py-1 font-weight-bold black--text">RM{{item.price}}</v-card-text>
          <v-card-text class="pa-0">
            <div class="description">
              {{ item.description }}
            </div>
          </v-card-text>
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
      items: state => state.sold.items
    }),
  }),
  mounted () {
    this.$store.dispatch('loading', true)
    this.$store.dispatch('sold/getAll').then((res) => {
      this.$store.dispatch('loading', false)
    })
  },
}
</script>
