<template>
  <div class="product-page">
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
              type="heading,article@2,button"
            ></v-skeleton-loader>
        </v-col>
        <v-col cols="12">
          <v-skeleton-loader
            type="table"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row class="py-4" v-if="item.uuid">
        <v-col :md="6" :lg="5" cols="12">
          <v-responsive :aspect-ratio="1" v-if="item.images_with_size && item.images_with_size[400]">
            <div class="swiper-container gallery-top">
              <div class="swiper-wrapper">
                <div class="swiper-slide"
                  v-for="(image,ind) in item.images_with_size[400]" :key="ind"
                  :style="{'background-image': 'url(' + image + ')' }"></div>
              </div>
              <!-- Add Arrows -->
              <div class="swiper-button-next swiper-button-white"></div>
              <div class="swiper-button-prev swiper-button-white"></div>
            </div>
          </v-responsive>
          <v-responsive :aspect-ratio="4/1" v-if="item.images_with_size && item.images_with_size[200]">
            <div class="swiper-container gallery-thumbs" v-if="item.images_with_size && item.images_with_size[200]">
              <div class="swiper-wrapper">
                <div class="swiper-slide" 
                  v-for="(image,ind) in item.images_with_size[200]" :key="ind"
                  :style="{'background-image': 'url(' + image + ')' }"></div>
              </div>
            </div>
          </v-responsive>
        </v-col>
        <v-col :md="6" :lg="7" cols="12">
          <div class="text-h4 font-weight-bold">{{ item.name }}</div>
          <div class="text-h6 mt-2">来自 {{ item.created_by }}</div>
          <div class="body-1 mt-4">
            {{ item.description }}
          </div>
          <div class="mt-2">
            <div class="body-1 grey--text">面交地区</div>
            <v-chip
              v-for="place in item.hand_delivery"
              :key="place"
              class="mt-2 mr-2"
              label
            >{{ placesMap()[place] }}</v-chip>
            <div class="body-1 mt-2" v-if="!item.hand_delivery.length">无法面交</div>
          </div>
          <div class="mt-2">
            <div class="body-1 grey--text">邮寄地区</div>
            <v-chip
              v-for="place in item.post_delivery"
              :key="place"
              class="mt-2 mr-2"
              label
            >{{ placesMap()[place] }}</v-chip>
            <div class="body-1 mt-2" v-if="!item.post_delivery.length">无法提供邮寄服务</div>
          </div>
          <div class="mt-3">
            <div class="body-1 grey--text mb-1">联系卖家</div>
            <div class="flex">
              <div @click="contact('whatsapp', item.uuid)" v-if="item.contact.whatsapp" class="text-decoration-none cursor-pointer mr-2">
                <v-icon class="text-h4 grey--text text--darken-3 black--text">mdi-whatsapp</v-icon>
              </div>
              <div @click="contact('facebook', item.uuid)" v-if="item.contact.facebook" class="text-decoration-none cursor-pointer mr-2">
                <v-icon class="text-h4 grey--text text--darken-3 black--text">mdi-facebook</v-icon>
              </div>
              <div @click="contact('instagram', item.uuid)" v-if="item.contact.instagram" class="text-decoration-none cursor-pointer">
                <v-icon class="text-h4 grey--text text--darken-3 black--text">mdi-instagram</v-icon>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';
import { mapState } from 'vuex';
import { levels } from '../../../enum/levels.enum'
import { conditions } from '../../../enum/text-book.enum'
import { getContact } from '../../../api/item';

export default {
  data: () => ({
    item: {},
    galleryThumbs: null,
    galleryTop: null,
    levels,
    ...mapState({
      placesMap: state => state.aggregates.placesMap
    })
  }),
  mounted () {
    this.$store.dispatch('items/getById', this.$route.params.uuid).then((res) => {
      if (res.result) {
        this.item = res.data
        this.$nextTick(() => {
          this.galleryThumbs = new Swiper('.gallery-thumbs', {
            spaceBetween: 10,
            slidesPerView: 4,
            freeMode: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            observeParents: true,
            observer: true,
            observeSlideChildren: true,
          });
          this.galleryTop = new Swiper('.gallery-top', {
            spaceBetween: 10,
            observeParents: true,
            observeSlideChildren: true,
            observer: true,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            thumbs: {
              swiper: this.galleryThumbs
            }
          });
        })
      }
    })
  },
  methods: {
    contact (method, uuid) {
      getContact(method, uuid).then(({ data }) => {
        if (data.result) {
          var win = window.open(data.data, '_blank');
          win.focus();
        }
      })
    }
  }
}
</script>

<style>
.gallery-top{
  height: 100%;
  width: 100%;
}
.swiper-slide {
  background-size: cover;
  background-position: center;
}

.gallery-thumbs {
  height: 100%;
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
