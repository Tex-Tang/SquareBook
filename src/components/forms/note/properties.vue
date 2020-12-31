<template>
  <v-row>
    <v-col cols="12" :md="7">
      <validation-provider
        v-slot="{ errors }"
        name="科目"
        rules="required"
      >
        <v-select
          v-model.number="properties.subject"
          outlined
          label="科目"
          placeholder="选择科目"
          item-value="value"
          item-text="title"
          :items="subjects"
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
import { levels } from '../../../enum/levels.enum'
import { subjects } from '../../../enum/note.enum'

export default {
  props: {
    loading: Boolean,
    value: Object,
  },
  data: () => ({
    properties: {
      subject: "",
      levels: [],
    },
    levels,
    subjects,
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
