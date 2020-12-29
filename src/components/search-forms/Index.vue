<template>
  <div class="search-form">
    <v-card elevation="0" class="bordered rounded">
      <v-card-title class="h6">搜寻</v-card-title>
      <v-card-subtitle>搜寻关键字，更快找到书</v-card-subtitle>
      <v-card-text>
        <v-text-field
          v-model="search.name"
          dense
          outlined
          hide-details
        ></v-text-field>
      </v-card-text>
      <v-card-actions class="px-4 pb-4 pt-0">
        <v-btn color="primary" depressed>搜寻关键字</v-btn>
        <v-btn @click="reset()" depressed>重置</v-btn>
      </v-card-actions>
    </v-card>
    <div class="mt-4">
      <div class="subtitle grey--text font-weight-semibold">面交地点</div>
      <v-checkbox
        v-for="place in activePlaces.hand_delivery"
        :label="placesMap()[place.place_id]"
        :value="place.place_id"
        v-model="search.hand_delivery"
        hide-details
        class="mt-1"
        dense
        :key="place.place_id"
      >
        <template v-slot:append>
          <v-chip color="primary" class="px-2" label small>{{ place.total }}</v-chip>
        </template>
      </v-checkbox>
    </div>
    <div class="mt-4">
      <div class="subtitle grey--text font-weight-semibold">邮寄地点</div>
      <v-checkbox
        v-for="place in activePlaces.post_delivery"
        :label="placesMap()[place.place_id]"
        :value="place.place_id"
        v-model="search.post_delivery"
        hide-details
        class="mt-1"
        dense
        :key="place.place_id"
      >
        <template v-slot:append>
          <v-chip color="primary" class="px-2" label small>{{ place.total }}</v-chip>
        </template>
      </v-checkbox>
    </div>
    <component
      v-if="category"
      v-model="search.properties"
      :is="search.category"
    ></component>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getActivePlaces } from '../../api/aggregate'

export default {
  components: {
    'uec-book': () => import('./UecBook')
  },
  props: {
    value: Object,
    category: String
  },
  data: () => ({
    search: {
      name: "",
      hand_delivery: [],
      post_delivery: [],
      category: "",
      page: 1,
      properties: {}
    },
    activePlaces: [],
    categories: {},
    ...mapState({
      categories: state => state.aggregates.aggregates.categories,
      placesMap: state => state.aggregates.placesMap,
    }),
  }),
  mounted () {
    this.search.category = this.category
     this.$store.dispatch('loading', true)
    getActivePlaces().then(({ data }) => {
      this.activePlaces = data
       this.$store.dispatch('loading', false)
    })
  },
  methods: {
    reset () {
      this.search = {
        name: "",
        hand_delivery: [],
        post_delivery: [],
        category: "",
        page: 1,
        properties: {}
      }
    }
  },
  watch: {
    search: {
      handler (val) {
        this.$emit('input', val)
      },
      deep: true
    }
  }
}
</script>
