<template>
  <th
    class="text-center align-middle"
    :rowspan="cell.rowspan"
    :aria-rowspan="cell.rowspan"
    :colspan="cell.colspan"
    :aria-colspan="cell.colspan"
    :data-field="cell.field"
  >
    <div class="d-flex justify-content-center align-items-center">
      <font class="px-1">
        {{ cell.title }}
      </font>
      <i
        v-if="cell.field && !cell.children && sort.includes(cell.field)"
        :class="iconClass"
        style="cursor: pointer"
        @click="$emit('table:sort', cell)"
      />
    </div>
  </th>
</template>

<script>
import config from "@/config/index.js";
import util from "@/components/util/index.js";

export default {
  name: "TableHeadTh",
  props: {
    cell: util.props.Object,
    sortObj: util.props.Object,
    sort: util.props.Array,
  },
  computed: {
    icon: function() {
      return config.ui.icon;
    },
    iconClass: function() {
      if (!this.sortObj || !this.sortObj[this.cell.field])
        return `${this.icon.sort} text-secondary`;
      if (this.sortObj[this.cell.field] == "asc") return this.icon.sortUp;
      if (this.sortObj[this.cell.field] == "desc") return this.icon.sortDown;
      else return "";
    }
  }
};
</script>
