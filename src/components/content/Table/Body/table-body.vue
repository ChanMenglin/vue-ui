<template>
  <tbody>
    <table-body-tr
      v-for="(row, rowIndex) in data"
      :key="rowIndex"
      :row="row"
      :index="rowIndex + 1"
      :row-style="rowStyle"
      :operate="operate"
      :columns="columns"
      :select-status="selectStatus"
      :selected-options="selectedOptions"
      :primary-key="primaryKey"
      :hide-serial="hideSerial"
      :hide-select="hideSelect"
      @tr:selected="selected => trSelected(selected, row)"
      @click.native="$emit('tr:click', formatRowData(row))"
      @tr:oper="data => trOper(data)"
      @dblclick.native="$emit('tr:dblclick', formatRowData(row))"
    />
  </tbody>
</template>

<script>
import util from "@/components/util/index.js";

import tableBodyTr from "./table-body-tr";

export default {
  name: "TableBody",
  components: { tableBodyTr },
  model: {
    prop: "selected",
    event: "tr:selected"
  },
  props: {
    data: util.props.Array,
    primaryKey: util.props.String,
    columns: util.props.Array,
    rowStyle: util.props.Object,
    operate: util.props.Array,
    hideSerial: util.props.Boolean,
    hideSelect: util.props.Boolean,
    selectStatus: Number, // 0: 默认, 1: 单选, 2: 多选
    selected: [Array, Object],
    theadSelected: util.props.Boolean
  },
  data() {
    return {
      selectedOptions: this.selected
    };
  },
  watch: {
    theadSelected: function(value) {
      this.data.forEach(e => this.trSelected(value, e));
    },
    selected: function(value) {
      this.selectedOptions = value;
    },
    selectedOptions: function(value) {
      this.$emit("tr:selected", value);
    }
  },
  methods: {
    trOper: function(data) {
      if (this.selectStatus == 1) this.select(data.data);
      this.$emit("tr:selected", this.formatRowData(data.data));
    },
    select: function(row) {
      if (this.selectStatus == 0) return;
      let formatRow = this.formatRowData(row);
      if (this.isSelected(row)) return;
      if (this.selectStatus == 1) {
        // 单选
        this.selectedOptions = formatRow;
      } else if (this.selectStatus == 2) {
        // 多选
        this.selectedOptions
          ? this.selectedOptions.push(formatRow)
          : (this.selectedOptions = [formatRow]);
      }
    },
    unSelect: function(row) {
      // 多选（单选时会自动覆盖之前的值）
      if (
        this.selectStatus != 2 ||
        !this.selectedOptions ||
        this.selectedOptions.length == 0
      )
        return;
      let value = row[this.primaryKey].value || row[this.primaryKey];
      this.selectedOptions.splice(
        this.selectedOptions.findIndex(
          e => e[this.primaryKey] && e[this.primaryKey] == value
        ),
        1
      );
    },
    formatRowData: function(row) {
      let o = {};
      Object.entries(row).map(e => {
        if (e[0].toString().charAt(0) != "$") {
          this.$set(o, e[0], e[1].value || e[1]);
        }
      });
      return o;
    },
    isSelected: function(row) {
      let value = row[this.primaryKey].value || row[this.primaryKey];
      if (!this.selectedOptions || this.selectStatus == 0) return false;
      if (this.selectStatus == 1)
        return this.selectedOptions[this.primaryKey] == value;
      else if (this.selectStatus == 2)
        return (
          this.selectedOptions.some &&
          this.selectedOptions.some(
            e => e[this.primaryKey] && e[this.primaryKey] == value
          )
        );
      else return false;
    },
    trSelected: function(checked, row) {
      checked ? this.select(row) : this.unSelect(row);
    }
  }
};
</script>
