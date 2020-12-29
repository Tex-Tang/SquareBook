<template>
  <span>
    <div class="mt-4">
      <div class="subtitle grey--text font-weight-semibold">学校</div>
      <v-checkbox
        v-for="school in activeProperties.school"
        :key="school"
        v-model="properties.school"
        :value="school.value"
        :label="placesMap()[school.value]"
        :loading="loading"
        hide-details
        class="mt-1"
        dense
      >
        <template v-slot:append>
          <v-chip v-if="school.total > 0" color="primary" dark class="px-2" label small>{{ school.total }}</v-chip>
        </template>
      </v-checkbox>
    </div>
    <div class="mt-4">
      <div class="subtitle grey--text font-weight-semibold">年级</div>
      <v-checkbox
        v-for="level in levels"
        :key="level.value"
        v-model="properties.levels"
        :value="level.value"
        :label="level.title"
        :loading="loading"
        hide-details
        class="mt-1"
        dense
      >
        <template v-slot:append>
          <v-chip v-if="getLevelCount(level.value) > 0" color="primary" dark class="px-2" label small>{{ getLevelCount(level.value) }}</v-chip>
          <v-chip v-else color="grey" dark class="px-2" label small>{{ getLevelCount(level.value) }}</v-chip>
        </template>
      </v-checkbox>
    </div>
  </span>
</template>

<script>
import { mapState } from 'vuex'
import { levels } from '../../enum/uec-book.enum'
import { getActiveProperties } from '../../api/aggregate'

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
    activeProperties: {
      school: [],
      levels: {}
    },
    levels,
    ...mapState({
      placesMap: state => state.aggregates.placesMap
    })
  }),
  mounted () {
    getActiveProperties('uec-book').then(({ data }) => {
      this.activeProperties.school = data.school
      this.activeProperties.levels = data.levels
    })
  },
  methods: {
    validate() {
      return { success: true, data: [] }
    },
    getLevelCount(level) {
      if (this.activeProperties.levels[level]) {
        return this.activeProperties.levels[level];
      }
      return 0
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
