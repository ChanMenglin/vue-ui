<template>
  <span class="row m-1">
    <template v-for="(item, index) in list">
      <slot name="item" :item="item" :itemClass="itemClass" :disabled="disabled">
        <b-grid-item
          :key="index"
          :item="item"
          class="text-center"
          :class="itemClass"
          :multiple="isMultiple"
          :primary-key="primaryKey"
          :selected="selectedValue"
          :disabled="item.disabled || disabled"
          @item:click="itemClick"
        />
      </slot>
    </template>
  </span>
</template>

<script>
import util from "@/components/util/index.js";

import BGridItem from "./b-grid-item";

export default {
  name: "BGridRow",
  components: { BGridItem },
  mixins: [ util.mixins.select.select, ],
  props: {
    disabled: util.props.Boolean,
    colCount: util.props.UInt,
  },
  computed: {
    itemClass: function() {
      return 12 % this.colCount == 0 ? `col-${12 / this.colCount}` : "col-auto";
    },
  },
  methods: {
    itemClick: function(item) {
      if (this.isMultiple) {
        let index = this.selectedValue.findIndex(e => (e && e[this.primaryKey || 'value'] || e) === (item && item[this.primaryKey || 'value'] || item))
        index >= 0
          ? this.selectedValue.splice(index, 1)
          : this.selectedValue.push(item)
      } else {
        this.selectedValue = item
      }
      this.$emit('item:click', this.selectedValue)
    },
  },
};
</script>
