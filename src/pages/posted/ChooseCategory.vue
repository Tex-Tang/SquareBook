<template>
  <div class="choose-category-page">
    <v-row>
      <v-col cols="12" :sm="4" :md="4" :lg="3" v-for="category in categories" :key="category.name">
        <router-link tag="div" :to="{ name: 'post-add', params: { category: category.name } }">
          <v-card elevation="0" class="category" 
            :style="{
              'border-color': category.color,
              'background-color': category.color + '0C'
            }">
            <div :style="{ color: category.color }" class="content">
              <span class="mdi" :class="category.icon"></span>
              <div class="title">{{ category.title }}</div>
            </div>
          </v-card>
        </router-link>
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default{
  data: () => ({
    categories: [
      { title: "独中课本", icon: 'mdi-book-open-page-variant', name: 'uec-book' }
    ],
    colors: [
      "#6B7280", "#EF4444", "#F59E0B", "#10B981", "#3B82F6", "#6366F1", "#8B5CF6", "#EC4899"
    ],
  }),
  mounted () {
    this.categories.forEach(item => {
      this.$set(item, 'color', this.chooseColor())
    })
  },
  methods: {
    chooseColor () {
      const random = Math.floor(Math.random() * this.colors.length);
      return this.colors[random]
    },
  }
}
</script>

<style lang="scss">
.choose-category-page{
  .category{
    cursor: pointer;
    border: solid .05rem rgba($color: #000000, $alpha: 0.12);
    .content{
      padding: .5rem 1rem .8rem 1rem;
      display: flex;
      flex-direction: column;
      .title{
        font-weight: 600;
        font-size: .8rem;
      }
      span{
        font-size: 1.5rem;
      }
    }
  }
}
</style>