<template>
  <v-row>
    <!-- Book list -->
    <v-col cols="12">
      <h2 class="title">书单</h2>
    </v-col>
    <template v-for="(book, ind) in content">
      <v-col cols="12" class="py-0 my-0 d-flex justify-space-between">
        <div class="grey--text">第 {{ind + 1}} 本书</div>
        <div class="red--text cursor-pointer" @click="content.splice(ind, 1)">删除</div>
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
            v-model="book.properties.publisher"
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
            v-model="book.properties.year"
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
            v-model="book.properties.condition"
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
import { conditions, publishers } from '../../../enum/text-book.enum'
import { booklist } from '../../../enum/uec-book.enum'

export default {
  props: {
    loading: Boolean,
    value: Array,
  },
  data: () => ({
    content: [],
    booklist,
    conditions,
    publishers,
  }),
  mounted () {
    this.content = this.value;
  },
  methods: {
    addBook () {
      this.$set(this.content, this.content.length, { 
        name: "", 
        quantity: 1, 
        properties: {
          publisher: "",
          condition: "",
          year: ""
        }
      })
    },
    selectBook (ind) {
      let selectedBookName = this.content[ind].name
      let book = this.booklist.find(({name}) => name == selectedBookName)
      this.content[ind].properties.publisher = book.publisher
    },
    validate () {
      if (this.content.length === 0) {
        return { success: false, data: ["请至少添加一本书。"] }
      } else {
        return { success: true, data: [] }
      }
    }
  },
  watch: {
    value: {
      handler  (val) {
        this.content = val
      },
      deep: true
    },
    content: {
      handler (val) {
        this.$emit('input', val)
      },
      deep: true
    }
  }
}
</script>
