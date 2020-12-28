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
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
import { levels } from '../../../enum/uec-book.enum'

export default {
  props: {
    loading: Boolean,
    value: Object,
  },
  data: () => ({
    properties: {
      school: "",
      levels: [],
    },
    levels,
    ...mapState({
      schools: state => state.aggregates.aggregates.places.length ? state.aggregates.aggregates.places[16].areas : []
    })
  }),
  mounted () {
    this.properties = this.value
  },
  methods: {
    validate() {
      return { success: true, data: [] }
    }
  },
  watch: {
    value: {
      handler (val) {
        this.properties = val
      },
      deep: true
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
