<template>
  <div class="not-found-page">
    <div class="text-h4 mb-8">嗷，找不到{{text}}。</div>
    <v-img width="300" src="/images/not_found.svg"></v-img>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "数据"
    }
  }
}
</script>

<style lang="scss">
.not-found-page{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 0;
}
</style>