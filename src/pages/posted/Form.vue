<template>
  <v-container class="posted-form">
    <v-row>
      <v-col cols="12" :md="4">
        <div class="pa-3 pa-md-0">
          <v-row class="white rounded bordered photos pa-2 px-md-2 py-md-2">
            <v-col cols="12">
              <div class="title mb-2">照片</div>
              <div class="subtitle">照片可以让卖家对你的产品有更直观的感受。</div>
            </v-col>
            <v-col cols="6" :sm="4" :md="12" :lg="6" v-if="canUpload">
              <label class="upload-file-btn rounded" for="image">
                <div class="upload-caption">
                  <span class="mdi mdi-upload"></span>
                  <span class="text-caption text-sm-body-1">上传图片</span>
                </div>
                <input
                  extensions="gif,jpg,jpeg,png,webp"
                  accept="image/png,image/gif,image/jpeg,image/webp"
                  type="file"
                  @change="fileChange"
                  hidden
                  id="image">
              </label>
            </v-col>
            <v-col cols="6" :sm="4" :md="12" :lg="6" v-for="(image, ind) in item.images" :key="'old-image' + ind">
              <div class="relative uploaded-photo">
                <v-img
                  :loading="loading"
                  :aspect-ratio="1"
                  :src="image.path ? image.path : image.thumb"
                ></v-img>
                <div class="action-wrapper">
                  <div class="remove-photo-icon" @click="item.images.splice(ind, 1)">
                    <span class="mdi mdi-close text-h4 red--text"></span>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col cols="12" :md="8">
        <validation-observer
          ref="observer"
          v-slot="{ handleSubmit }"
        >
          <form @submit.prevent="handleSubmit(submit)" class="white rounded bordered pa-4 px-md-6 py-md-2">
            <v-row>
              <v-col cols="12">
                <div class="title mb-2">聊聊你想卖的东西</div>
                <div class="subtitle">简单描述一下你的品项，质量，原因，让买家更感兴趣。</div>
              </v-col>
              <!-- Title -->
              <v-col cols="12" :sm="8">
                <validation-provider v-slot="{ errors }" name="标题" rules="required|min:5|max:20">
                  <v-text-field
                    v-model="item.name"
                    :counter="20"
                    label="标题"
                    placeholder="取个吸引人的标题吧！"
                    outlined
                    autocomplete="off"
                    :loading="loading"
                    :error-messages="errors"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <!-- Price -->
              <v-col cols="12" :sm="4">
                <validation-provider
                  v-slot="{ errors }"
                  name="价格"
                  rules="required|max_value:10000|min_value:0"
                >
                  <v-text-field
                    v-model="item.price"
                    type="number"
                    step="0.05"
                    prefix="RM"
                    label="价格"
                    max="10000"
                    min="0"
                    outlined
                    placeholder="0.00"
                    autocomplete="off"
                    :loading="loading"
                    :hide-details="!errors.length"
                    :error-messages="errors"
                    @change="(value) => item.price = parseFloat(value).toFixed(2)"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <!-- Description -->
              <v-col cols="12">
                <validation-provider v-slot="{ errors }" name="描述" rules="required">
                  <v-textarea
                    v-model="item.description"
                    label="描述"
                    placeholder="让买家对你的东西有更好的认识"
                    outlined
                    autocomplete="off"
                    :loading="loading"
                    :hide-details="!errors.length"
                    :error-messages="errors"
                  ></v-textarea>
                </validation-provider>
              </v-col>
              <!-- Trade -->
              <v-col cols="12" class="pb-0">
                <div class="title">交易方式</div>
              </v-col>
              <!-- Hand delivery -->
              <v-col cols="12">
                <div class="subtitle mb-1">面交地点</div>
                <div class="my-2">
                  <v-chip
                    v-for="(place, ind) in item.hand_delivery"
                    :key="ind" class="mr-2 mb-2" close
                    label color="primary"
                    @click:close="item.hand_delivery.splice(ind, 1)"
                  >
                    {{ placesMap()[place] }}
                  </v-chip>
                </div>
                <v-btn color="primary" @click="$refs.handDialog.show = true" depressed>添加面交地点</v-btn>
                <place-selection-dialog 
                  v-model="item.hand_delivery"
                  ref="handDialog">
                </place-selection-dialog>
              </v-col>
              <!-- Post delivery -->
              <v-col cols="12">
                <div class="subtitle mb-1">邮寄地点</div>
                <div class="my-2">
                  <v-chip
                    v-for="(place, ind) in item.post_delivery"
                    :key="ind" class="mr-2 mb-2" close label
                    @click:close="item.post_delivery.splice(ind, 1)"
                  >
                    {{ placesMap()[place] }}
                  </v-chip>
                </div>
                <v-btn color="primary" @click="$refs.postDialog.show = true" depressed>添加邮寄地点</v-btn>
                <place-selection-dialog 
                  v-model="item.post_delivery"
                  ref="postDialog">
                </place-selection-dialog>
              </v-col>
            </v-row>
            <component 
              v-if="item.category"
              :is="item.category + '-properties'"
              ref="propertiesForm"
              v-model="item.properties"
              :loading="loading">
            </component>
            <!-- Submit btn -->

            <component 
              v-if="item.category"
              :is="item.category + '-content'"
              ref="contentForm"
              v-model="item.content"
              :loading="loading">
            </component>
            <v-row>
              <v-col cols="12" class="text-right">
                <v-btn :loading="loading" type="submit" color="primary" depressed>提交</v-btn>
              </v-col>
            </v-row>
          </form>
        </validation-observer>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { cloneDeep } from 'lodash'
import UECBook from '../../components/forms/UECBook'
import PlaceSelectionDialog from '../../components/forms/PlacesSelectionDialog'

export default {
  components: {
    'uec-book-properties': () => import('../../components/forms/uecbook/properties'),
    'uec-book-content': () => import('../../components/forms/uecbook/content'),
    PlaceSelectionDialog
  },
  data: () => ({
    loading: false,
    images: [],
    uuid: "",
    item: {
      name: "",
      price: "0.00",
      category: "",
      description: "",
      hand_delivery: [],
      post_delivery: [],
      properties: {},
      content: [],
      images: []
    },
    trade: {
      post: {
        search: "",
        status: false,
        dialog: false,
      },
      hand: {
        search: "",
        status: false,
        dialog: true,
      }
    },
    ...mapState({
      placesMap: state => state.aggregates.placesMap
    })
  }),
  mounted () {
    if (this.$route.params.uuid) {
      this.$store.dispatch('loading', true)
      this.$store.dispatch('posted/getById', this.$route.params.uuid).then(({ result, data }) => {
        if (result) { 
          this.item = cloneDeep(data)
          this.uuid = this.$route.params.uuid
        } else {
          this.$router.push({ name: 'posted' })
        }
        this.$nextTick(() => {
          this.$store.dispatch('loading', false)
        })
      })
    }
    this.item.category = this.$route.params.category
  },
  methods: {
    fileChange (e) {
      let file = e.target.files[0]
      if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(file.name) || /\.(php5?|html?|jsx?)$/i.test(file.name)) {
        this.imageErrors.push('请上传图片')
      }
      let thumb = URL.createObjectURL(file)
      if (thumb && file.type.substr(0, 6) === 'image/') {
        this.item.images.push({
          thumb,
          file,
        })
      }
      e.target.files = null // Reset
    },
    submit () {
      let messages = []
      if (!this.item.images && this.images.length === 0) {
        messages.push('请上传至少一张照片。')
      }

      if (this.item.images && this.item.images.length === 0 && this.images.length === 0) {
        messages.push('请上传至少一张照片。')
      }

      if (this.item.hand_delivery.length === 0 && this.item.post_delivery.length === 0) {
        messages.push('请上传至少选择一个交易地点。')
      }

      const validateProperties = this.$refs.propertiesForm.validate()
      const validateContent    = this.$refs.contentForm.validate()

      if (!validateProperties.success) {
        messages = messages.concat(validateProperties.data)
      }

      if (!validateContent.success) {
        messages = messages.concat(validateContent.data)
      }

      if (messages.length !== 0) {
        this.$store.dispatch('alert', {
          type: "error",
          message: messages.join("\n"),
        })
        return;
      }

      this.$store.dispatch('loading', true)
      if (!this.uuid) {
        this.$store.dispatch('posted/create', this.item).then(data => {
          if (data.result === true) {
            this.$store.dispatch('alert', {
              type: "success",
              message: "成功创建物品，预祝早日找到新主人。"
            })
            this.$router.push({ name: 'posted' })
          }
          this.$store.dispatch('loading', false)
        })
      } else {
        this.$store.dispatch('posted/update', this.item).then(data => {
          if (data.result === true) {
            this.$store.dispatch('alert', {
              type: "success",
              message: "成功编辑物品，预祝早日找到新主人。"
            })
            this.$router.push({ name: 'posted' })
          }
          this.$store.dispatch('loading', false)
        })
      }

    }
  },
  computed: {
    canUpload () {
      return this.images.length + (this.item.images ? this.item.images.length : 0) < 5
    }
  }
}
</script>

<style lang="scss">
.photos {
  //@media screen and (min-width: 960px){
  //  position: sticky;
  //  top: 100px;
  //}
}
.upload-file-btn{
  display: block;
  width: 100%;
  padding-bottom: 100%;
  border: solid .05rem rgba($color: #000000, $alpha: .12);
  position: relative;
  cursor: pointer;
  .upload-caption{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: rgba($color: #000000, $alpha: .48);
    span{
      font-size: 3rem;
    }
  }
  &:hover{
    background: rgba($color: #000000, $alpha: .03);
  }
}
.uploaded-photo{
  &:hover {
    .action-wrapper {
      width: 100%;
      opacity: 1;
    }
  }
  .action-wrapper{
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    overflow: hidden;
    opacity: 0;
    transition: opacity 400ms;
    background: rgba($color: #000000, $alpha: .12);
    .remove-photo-icon{
      position: absolute;
      right: 0;
      top: 0;
      padding: .4rem;
      cursor: pointer;
    }
  }
}
</style>
