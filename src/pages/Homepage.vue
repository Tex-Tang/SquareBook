<template>
  <div class="homepage">
    <v-row>
      <v-col cols="12" :md="3" class="d-none d-md-block">
        <search-form category="uec-book" v-model="search" ref="searchForm"/>
      </v-col>
      <v-col cols="12" class="d-md-none">
        <v-btn @click="searchDialog = true" color="primary" depressed>
          <v-icon>mdi-filter</v-icon>
          搜寻
        </v-btn>
      </v-col>
      <v-col cols="12" :md="9">
        <v-row>
          <v-col v-if="loading()" class="pt-0" cols="12" :sm="6" :md="4" v-for="n in 12" :key="n">
            <v-skeleton-loader
              type="image, article, actions"
            ></v-skeleton-loader>
          </v-col>
          <v-col class="pt-0" cols="12" :sm="6" :md="4" v-for="item in items()" :key="item.uuid">
            <router-link tag="div" class="cursor-pointer" :to="{ name: 'item', params: { uuid: item.uuid }}">
              <v-card elevation="2" class="bordered">
                <v-img :src="item.images[0].path" aspect-ratio="1"></v-img>
                <v-card-title>{{item.name}}</v-card-title>
                <v-card-text>
                  <div class="description">
                    {{ item.description }}
                  </div>
                </v-card-text>
              </v-card>
            </router-link>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-dialog v-model="searchDialog" scrollable>
      <v-card class="py-8">
        <v-card-text>
          <search-form category="uec-book" v-model="search" ref="searchForm"></search-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { getItems } from '../api/item'
import { debounce } from 'lodash'
import { mapState } from 'vuex';

export default {
  components: {
    'search-form': () => import('../components/search-forms/Index')
  },
  data: () => ({
    data: [],
    search: {},
    searchDialog: false,
    ...mapState({
      loading: state => state.loading,
      items: state => state.items.items
    })
  }),
  mounted () {
    this.refresh();
  },
  methods: {
    refresh () {
      this.data = []
      this.$store.dispatch('loading', true)
      this.$store.dispatch('items/getAll', this.search).then(({ data }) => {
        this.$store.dispatch('loading', false)
      })
    }
  },
  watch: {
    search: {
      handler (val) {
        this.refresh()
      },
      deep: true,
    }
  }
}
</script>
