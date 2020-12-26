<template>
  <v-row>
    <v-col cols="12">
      <div class="title">简单资讯</div>
    </v-col>
    <v-col cols="12" :md="7">
      <validation-provider
        v-slot="{ errors }"
        name="就读学校"
        rules="required"
      >
        <v-select
          v-model.number="properties.school"
          outlined
          label="就读学校"
          placeholder="选择就读学校"
          item-value="id"
          item-text="name"
          :items="schools()"
          :hide-details="!errors.length"
          :error-messages="errors"
          :loading="loading"
        ></v-select>
      </validation-provider>
    </v-col>
    <v-col cols="12" :md="5">
      <validation-provider
        v-slot="{ errors }"
        name="年级"
        rules="required"
      >
        <v-select
          v-model="properties.levels"
          :items="levels"
          item-text="title"
          item-value="value"
          label="年级 / 考试"
          outlined
          :loading="loading"
          :hide-details="!errors.length"
          :error-messages="errors"
          multiple
        ></v-select>
      </validation-provider>
    </v-col>

    <!-- Book list -->
    <v-col cols="12">
      <h2 class="title">书单</h2>
    </v-col>
    <template v-for="(book, ind) in properties.content">
      <v-col cols="12" class="py-0 my-0 d-flex justify-space-between">
        <div class="grey--text">第 {{ind + 1}} 本书</div>
        <div class="red--text cursor-pointer" @click="properties.content.splice(ind, 1)">删除</div>
      </v-col>
      <!-- Name -->
      <v-col cols="12" :sm="6" :lg="12">
        <validation-provider
          v-slot="{ errors }"
          name="书名"
          rules="required"
        >
          <v-combobox
            v-model="book.name"
            :hide-details="!errors.length"
            :error-messages="errors"
            label="书名"
            :items="booklist"
            item-text="name"
            item-value="name"
            :return-object="false"
            @change="selectBook(ind)"
            placeholder="可自行定义或从列表选择(初中华文)"
            outlined
            :loading="loading"
          ></v-combobox>
        </validation-provider>
      </v-col>
      <!-- Publisher -->
      <v-col cols="8" :sm="6" :lg="4">
        <validation-provider
          v-slot="{ errors }"
          name="出版社"
          rules="required"
        >
          <v-combobox                
            v-model="book.publisher"
            :hide-details="!errors.length"
            :error-messages="errors"
            label="出版社"
            :items="publishers"
            item-text="name"
            item-value="name"
            :return-object="false"
            placeholder="可自行定义"
            outlined
            :loading="loading"
          ></v-combobox>
        </validation-provider>
      </v-col>
      <!-- Year -->
      <v-col cols="4" :sm="3" :lg="2">
        <validation-provider
          v-slot="{ errors }"
          name="出版年份"
          rules="required|digits:4"
        >
          <v-text-field
            v-model="book.year"
            :hide-details="!errors.length"
            :error-messages="errors"
            type="number"
            label="出版年份"
            placeholder="2010"
            outlined
            :loading="loading"
          ></v-text-field>
        </validation-provider>
      </v-col>
      <!-- Quantity -->
      <v-col cols="3" :sm="2" :lg="2">
        <validation-provider
          v-slot="{ errors }"
          name="数量"
          rules="required"
        >
          <v-text-field
            v-model="book.quantity"
            :hide-details="!errors.length"
            :error-messages="errors"
            type="number"
            label="数量"
            placeholder="可自行定义或从列表选择"
            outlined
            :loading="loading"
          ></v-text-field>
        </validation-provider>
      </v-col>
      <!-- Condition -->
      <v-col cols="9" :sm="7" :lg="4">
        <validation-provider
          v-slot="{ errors }"
          name="质量"
          rules="required"
        >
          <v-select
            v-model="book.condition"
            :hide-details="!errors.length"
            :error-messages="errors"
            :items="conditions"
            item-text="title"
            item-value="value"
            label="质量"
            outlined
            :loading="loading"
          ></v-select>
        </validation-provider>
      </v-col>
    </template>
    <v-col cols="12">
      <v-btn
        @click="addBook"
        color="primary"
        dark 
        depressed>+ 添加书本</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    loading: Boolean,
    value: Object,
  },
  data: () => ({
    properties: {
      school: "",
      levels: [],
      content: []
    },
    levels: [],
    booklist: [],
    conditions: [],
    publishers: [],
    ...mapState({
      schools: state => state.aggregates.general.places.length ? state.aggregates.general.places[0].children : []
    })
  }),
  mounted () {
    this.$db.collection('aggregates').doc('uec-book').get().then((doc) => {
      const data = doc.data()
      this.levels = data.levels
      this.booklist = data.booklist
      this.conditions = data.conditions
      this.publishers = data.publishers
    })
  },
  methods: {
    addBook () {
      this.$set(this.properties.content, this.properties.content.length, { 
        name: "", 
        quantity: 1, 
        publisher: "",
        condition: "",
        year: ""
      })
    },
    selectBook (ind) {
      let selectedBookName = this.properties.content[ind].name
      let book = this.booklist.find(({name}) => name == selectedBookName)
      this.properties.content[ind].publisher = book.publisher
    },
    validate () {
      if (this.properties.content.length === 0) {
        return { success: false, data: ["请至少添加一本书。"] }
      } else {
        return { success: true, data: [] }
      }
    }
  },
  watch: {
    value (val) {
      this.properties = val
    },
    properties: {
      handler (val) {
        this.$emit('input', val)
      },
      deep: true
    }
  }
}
</script>
