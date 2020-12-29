<template>
  <div class="uec-book-single">
    <v-row class="py-4" v-if="!item.uuid">
      <v-col cols="12" :md="6" :lg="4">
        <div class="md:pb-0 pb-6 w-full" style="height: 450px">
          <v-skeleton-loader
            type="image@2"
          ></v-skeleton-loader>
        </div>
      </v-col>
      <v-col cols="12" :md="6" :lg="8">
          <v-skeleton-loader
            type="heading, article@2,button"
          ></v-skeleton-loader>
      </v-col>
      <v-col cols="12">
        <v-skeleton-loader
          type="table"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    
    <v-row class="py-4">
      <v-col :md="6" :lg="4" cols="12">
        <div class="pb-6 w-full" style="height: 450px">
          <div class="swiper-container gallery-top">
            <div class="swiper-wrapper">
              <div class="swiper-slide"
                v-if="item.uuid" 
                v-for="(image,ind) in item.images" :key="ind"
                :style="{'background-image': 'url(/images/' + image + ')' }"></div>
            </div>
            <!-- Add Arrows -->
            <div class="swiper-button-next swiper-button-white"></div>
            <div class="swiper-button-prev swiper-button-white"></div>
          </div>
          <div class="swiper-container gallery-thumbs">
            <div class="swiper-wrapper">
              <div class="swiper-slide" 
                v-if="item.uuid"
                v-for="(image,ind) in item.images" :key="ind"
                :style="{'background-image': 'url(/images/' + image + ')' }"></div>
            </div>
          </div>
        </div>
      </v-col>
      <v-col :md="6" :lg="8" cols="12">
        <h2>{{ item.name }}</h2>
        <h1 class="text-primary my-1">RM {{ item.price }}</h1>
        <div class="py-1">{{ item.description }}</div>
        <div class="delivery-method mt-4">
          <div class="grey--text text--darken-2 text-sm font-weight-light mb-2">交易方式</div>
          <template v-if="item.hand_delivery && item.hand_delivery.length">
            <div class="font-weight-medium grey--text text--darken-3"><span class="mdi mdi-truck-delivery"></span> 可面交</div>
            <div class="d-flex py-1 pb-2">
              <v-chip-group>
                <v-chip v-for="area in item.hand_delivery" :key="area.id" color="primary">
                  {{ area.area.name }}
                </v-chip>
              </v-chip-group>
            </div>
          </template>
          <template v-if="item.post_delivery && item.post_delivery.length">
            <div class="font-weight-medium grey--text text--darken-3"><span class="mdi mdi-truck-delivery"></span> 可邮寄</div>
            <div class="d-flex py-1 pb-2">
              <v-chip-group>
                <v-chip v-for="area in item.post_delivery" :key="area.id">
                  {{ area.area.name }}
                </v-chip>
              </v-chip-group>
            </div>
          </template>
        </div>
        <v-btn depressed color="primary" @click="socialDialog = true" class="contact-btn">联络卖家</v-btn>
      </v-col>
      <v-col cols="12">
        <div class="border mt-4 grey lighten-5 rounded-sm pa-4">
          <h3 class="mb-2">书单</h3>
          <v-data-table
            :headers="headers"
            :items="item.content"
            hide-default-footer
            class="grey lighten-5"
          ></v-data-table>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

export default {
  data: () => ({
    book: {
      title: "初中全套课本",
      price: 120.00,
      remark: "附送统考实用printed练习题",
      tradeMethods: {
        postDelivery: {
          active: true,
          areas: ['东马']
        },
        handDelivery: {
          active: true,
          areas: ['吉隆坡中华独立中学', 'Puchong']
        }
      },
      list: [
        { title: '初中华文上册', publishedYear: 2019, quantity: 1 },
        { title: '初中华文下册', publishedYear: 2019, quantity: 1 },
      ],
      images: [
        'https://picsum.photos/200/300',
        'https://picsum.photos/300/300',
        'https://picsum.photos/400/300',
        'https://picsum.photos/500/300',
        'https://picsum.photos/600/300',
        'https://picsum.photos/700/300',
      ]
    },
    item: {},
    headers: [
      { text: "书名", value: "name" },
      { text: "年份", value: "year" },
      { text: "出版商", value: "publisher" },
      { text: "数量", value: "quantity" },
      { text: "书况", value: "condition" },
    ],
    socialDialog: false,
  }),
  mounted() {
    this.$store.dispatch('items/getById', this.$route.params.uuid).then((res) => {
      if (res.result) {
        this.item = res.data
      }
    })
  }
}
</script>

<style>
.gallery-top{
  height: 80%;
  width: 100%;
}
.swiper-slide {
  background-size: cover;
  background-position: center;
}

.gallery-thumbs {
  height: 20%;
  padding-top: .4rem;
  box-sizing: border-box;
}

.gallery-thumbs .swiper-slide {
  width: 20%;
  height: 100%;
  opacity: 0.4;
}

.gallery-thumbs .swiper-slide-thumb-active {
  opacity: 1;
}

.contact-btn{
  width: 18rem;
}

@media screen and (max-width: 600px) {
  .contact-btn{
    width: 100%;
  }
}
</style>
