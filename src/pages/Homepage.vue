<template>
  <div class="homepage">
    <!-- 
    <v-row>
      <v-col cols="3">
        <form class="pa-4 white bordered">
          <div class="subtitle mb-2">搜寻</div>
          <v-text-field
            placeholder="搜寻关键字..."
            outlined
            dense
          ></v-text-field>
          <div class="subtitle mb-2">面交地点</div>
          <v-checkbox
            v-for="(count, place) in categories.hand_delivery"
            :label="places()[place] + ` (${count})`"
            v-if="count > 0"
            dense
            class="mt-0"
            hide-details
          ></v-checkbox>
          <div class="subtitle mt-4 mb-2">邮寄地点</div>
          <v-checkbox
            v-for="(count, place) in categories.post_delivery"
            :label="places()[place] + ` (${count})`"
            v-if="count > 0"
            dense
            class="mt-0"
            hide-details
          ></v-checkbox>
        </form>
      </v-col>
      <v-col cols="9">
        <v-row>
          <v-col cols="4" v-for="item in items" :key="item.id" class="py-0">
            <router-link tag="div" class="cursor-pointer" :to="`/item/${item.category}/${item.id}`">
              <v-card elevation="0" class="bordered">
                <v-img
                  aspect-ratio="1"
                  :src="item.images[0][400]"
                ></v-img>

                <v-card-title>{{item.title}}</v-card-title>
                <v-card-text class="description pb-0">
                  {{ item.description }}
                </v-card-text>
                <v-card-text>
                  <v-chip 
                    v-for="(place, ind) in item.hand_delivery" 
                    :key="item.id + 'hand-delivery-' + ind" 
                    class="mb-2 mr-2" label
                    color="primary">
                    {{ places()[place] }}
                  </v-chip>

                  <v-chip 
                    v-for="(place, ind) in item.post_delivery" 
                    :key="item.id + 'post-delivery-' + ind" 
                    class="mb-2 mr-2" label>
                    {{ places()[place] }}
                  </v-chip>
                </v-card-text>
              </v-card>
            </router-link>
          </v-col>
        </v-row>
      </v-col>
    </v-row> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { db } from '../api/firebase'
import imageHelper  from '../utils/ImageUpload'
import { filter } from 'lodash'

export default {
  data: () => ({
    search: {
      text: "",
      hand_delivery: []
    },
    items: [],
    categories: {},
    ...mapState({
      places: state => state.aggregates.placesMap
    }),
    page: 0,
    helper: new imageHelper(),
  }),
}
</script>
