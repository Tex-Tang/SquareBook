<template>
  <div class="homepage">
    <v-row>
      <v-col cols="12" class="pt-0">
        <div class="search-wrapper mb-8">
          <div class="py-8">
          <v-card elevation="0" class="search-box rounded-lg">
            <v-card-text class="pa-0 pa-sm-6">
              <div class="title black--text text-md-h5 mb-2 font-weight-bold">书籍</div>
              <div class="subtitle mb-4 grey--text font-weight-light text--darken-1">
                自我投资，用的是自己的时间和金钱，而时间和金钱都是非常宝贵的东西，所以只有把学到东西转化成自己的经验与投资，才算学有所成。
              </div>

              <!-- Name -->
              <v-text-field
                v-model="search.name"
                dense
                height="45px"
                outlined
                hide-details
                label="搜寻"
                placeholder="搜寻关键字，更快找到书"
              ></v-text-field>

              <!-- Hand delivery -->
              <div class="mt-2">
                <div class="subtitle">面交地点</div>
                <v-chip
                  class="mt-2 mr-1"
                  label
                  close
                  v-for="place_id in search.hand_delivery"
                  :key="'hand-delivery-' + place_id"
                  @click:close="remove(search.hand_delivery, place_id)"
                >
                  {{ placesMap()[place_id] }}
                </v-chip>
                
                <v-dialog
                  scrollable
                  v-model="dialog.hand_delivery"
                  max-width="350px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-chip
                      class="mt-2" 
                      label 
                      v-bind="attrs"
                      v-on="on">
                      + 添加
                    </v-chip>
                  </template>
                  <v-card>
                    <v-card-title class="pa-4 pb-2">选择面交地点</v-card-title>
                    <v-card-text class="pa-4 py-0">
                      <v-checkbox
                        v-for="place in activePlaces.hand_delivery"
                        v-model="search.hand_delivery"
                        :key="place.place_id"
                        :value="place.place_id"
                        :label="placesMap()[place.place_id]"
                        hide-details
                        class="mt-1"
                        dense
                      >
                        <template v-slot:append>
                          <v-chip color="primary" class="px-2" label small>
                            {{ place.total }}
                          </v-chip>
                        </template>
                      </v-checkbox>
                    </v-card-text>
                    <v-card-actions class="pa-4">
                      <v-btn 
                        depressed
                        block
                        color="primary"
                        @click="dialog.hand_delivery = false">
                        更新
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>

              <!-- Post delivery -->
              <div class="mt-2">
                <div class="subtitle">邮寄地点</div>
                <v-chip
                  class="mt-2 mr-1"
                  label
                  close
                  v-for="place_id in search.post_delivery"
                  :key="'hand-delivery-' + place_id"
                  @click:close="remove(search.post_delivery, place_id)"
                >
                  {{ placesMap()[place_id] }}
                </v-chip>
                
                <v-dialog
                  scrollable
                  v-model="dialog.post_delivery"
                  max-width="350px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-chip
                      class="mt-2" 
                      label 
                      v-bind="attrs"
                      v-on="on">
                      + 添加
                    </v-chip>
                  </template>
                  <v-card>
                    <v-card-title class="pa-4 pb-2">选择面交地点</v-card-title>
                    <v-card-text class="pa-4 py-0">
                      <v-checkbox
                        v-for="place in activePlaces.post_delivery"
                        v-model="search.post_delivery"
                        :key="place.place_id"
                        :value="place.place_id"
                        :label="placesMap()[place.place_id]"
                        hide-details
                        class="mt-1"
                        dense
                      >
                        <template v-slot:append>
                          <v-chip color="primary" class="px-2" label small>
                            {{ place.total }}
                          </v-chip>
                        </template>
                      </v-checkbox>
                    </v-card-text>
                    <v-card-actions class="pa-4">
                      <v-btn 
                        depressed
                        block
                        color="primary"
                        @click="dialog.post_delivery = false">
                        更新
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>

              <!-- Search button -->
              <div class="mt-4">
                <v-btn @click="refresh" depressed block color="primary">
                  <v-icon class="mr-2" small>mdi-magnify</v-icon>
                  搜寻
                </v-btn>
              </div>
            </v-card-text>
          </v-card>

          </div>
          <div class="image-wrapper d-none d-sm-block">
            <div class="image rounded-lg"></div>
          </div>
        </div>
      </v-col>

      <!-- Skeleton loader -->
      <v-col v-if="loading()" class="pt-0" cols="12" :sm="6" :md="4" :lg="3" v-for="n in 12" :key="n">
        <v-skeleton-loader
          type="image, article, actions"
        ></v-skeleton-loader>
      </v-col>

      <!-- Not found -->
      <v-col v-if="!items().length && !loading()">
        <not-found/>
      </v-col>
      
      <!-- Items page -->
      <v-col v-if="items().length" class="pt-0" cols="12" :sm="6" :md="3" v-for="(item, index) in items()" :key="'item-'+index">
        <router-link tag="div" class="cursor-pointer mb-2" :to="{ name: 'note-single', params: { uuid: item.uuid }}">
          <v-card elevation="0" class="mb-8">
            <v-img class="rounded-lg" :src="item.images[0].path" :aspect-ratio="4/3"></v-img>
            <div class="chips">
              <v-chip outlined label small class="ml-2 mt-2" v-if="item.hand_delivery.length">
                可面交
              </v-chip>
              <v-chip outlined label small class="ml-2 mt-2" v-if="item.post_delivery.length">
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
          </v-card>
        </router-link>
      </v-col>

      <!-- Pagination -->
      <v-col cols="12">
        <v-pagination
          v-model="search.page"
          :length="pagination().lastPage"
          :total-visible="7"
        ></v-pagination>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { debounce } from 'lodash'
import { getItems } from '../../../api/item'
import { getActivePlaces, getActiveProperties } from '../../../api/aggregate'

import NotFound from '../../../components/NotFound'

export default {
  components: {
    NotFound
  },
  data: () => ({
    data: [],
    search: {
      page: 1,
      name: "",
      category: 'book',
      hand_delivery: [],
      post_delivery: [],
    },
    dialog: {
      hand_delivery: false,
      post_delivery: false,
    },
    activePlaces: [],
    ...mapState({
      loading: state => state.loading,
      items: state => state.items.items,
      pagination: state => state.items.pagination,
      placesMap: state => state.aggregates.placesMap,
    })
  }),
  mounted () {
    this.$store.dispatch('loading', true)
    getActivePlaces().then(({ data }) => {
      this.activePlaces = data
      this.refresh();
    })
  },
  methods: {
    refresh () {
      this.data = []
      this.$store.dispatch('loading', true)
      this.$store.dispatch('items/getAll', this.search).then(({ data }) => {
        this.$store.dispatch('loading', false)
      })
    },
    remove(obj, id) {
      obj.splice(obj.find(({place_id}) => place_id == id),1)
    }
  },
  watch: {
  }
}
</script>

<style lang="scss" scoped>
.search-wrapper{
  position: relative;
  .search-box{
    z-index: 1;
    @media screen and (min-width: 600px) {
      box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.2) !important;
      max-width: 350px;
    }
  }
}
.image-wrapper{
  position: absolute;
  top: 0;
  right: 0;
  width: 80%;
  height: 100%;
  .image{
    background-image: url('/images/background2.jpg');
    height: 100%;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
}
</style>
