<template>
  <v-dialog
    v-model="show"
    scrollable
    max-width="400"
  >
    <v-card>
      <v-sheet class="pa-4 primary">
        <v-text-field
          v-model="search"
          label="搜寻地点"
          dark
          flat
          solo-inverted
          hide-details
          clearable
          clear-icon="mdi-close-circle-outline"
        ></v-text-field>
      </v-sheet>
      <v-card-text style="height: 400px" class="my-4">
        <v-treeview
          selection-type="independent"
          :items="places()"
          :search="search"
          :value="value"
          item-children="areas"
          selected-color="primary"
          @input="updateSelections"
          selectable
        ></v-treeview>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    value: Array,
  },
  data: () => ({
    ...mapState({
      places: state => state.aggregates.aggregates.places
    }),
    show: false,
    search: ""
  }),
  methods: {
    updateSelections (val) {
      this.$emit('input', val)
    }
  },
  computed: {
    filter () {
      return (item, search, textKey) => item[textKey].toLowerCase().indexOf(search.toLowerCase()) > -1
    },
  },
}
</script>

<style lang="scss">
.v-treeview{
  .v-treeview-node__root{
    & > button:disabled {
      display: none;
    }
    .v-treeview-node__content .v-treeview-node__label{
      color: rgba($color: #000000, $alpha: .8);
    }
  }
}
.v-treeview .v-treeview-node__level{
  width: 12px;
}
</style>