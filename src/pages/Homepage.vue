<template>
  <div class="homepage">
    <div class="image-wrapper">
      <div class="caption px-8">
        <div class="text-h4 font-weight-bold">
          <logo width="32px" color="white" class="mb-n1" />
          方书
        </div>
        <div class="text-body-1 mt-4">
          我觉得，当书本给我讲到闻所未闻，见所未见的人物、感情、思想和态度时，似乎是每一本书都在我面前打开了一扇窗户，让我看到一个不可思议的新世界。——高尔基
        </div>
      </div>
      <v-img height="400" src="/images/background.jpg" gradient="135deg, rgba(0,0,0, .2) 0%, rgb(0,0,0, .3) 20%" class="rounded-lg"></v-img>
    </div>
    <v-tabs v-model="tab" centered class="mt-4">
      <v-tab to="books">书籍</v-tab>
      <v-tab to="text-books">课本</v-tab>
      <v-tab to="notes">笔记</v-tab>
    </v-tabs>
    <v-fade-transition>
      <div class="mt-8">
        <router-view></router-view>
      </div>
    </v-fade-transition>
  </div>
</template>

<script>
import logo from '../components/Logo'

export default {
  data: () => ({
    tab: 0,
  }),
  components: {
    logo
  }
}
</script>

<style lang="scss">
.image-wrapper{
  position: relative;
  display: flex;
  align-items: center;
  .caption{
    position: absolute;
    z-index: 1;
    color: white;
    max-width: 550px;
  }
}
</style>