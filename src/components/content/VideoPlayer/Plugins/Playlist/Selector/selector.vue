<template>
  <div>
    <div
      v-if="!disabledList"
      class="w-100"
    >
      <b-list
        v-model="selected"
        class="flex-wrap mb-1"
        inline
        :list="list"
      />
      <hr class="my-1">
    </div>
    <div class="row no-gutters">
      <b-button
        v-for="i in array"
        :key="i"
        class="col-auto m-1 btn text-monospace"
        outline
        :value="i"
        style="width: 4em"
      />
    </div>
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import BList from "@/components/base/List/b-list.vue";
import BButton from "@/components/basic/Button/basic-button.vue";

export default {
  name: "BVideoSelector",
  components: { BList, BButton },
  props: {
    total: util.props.UInt,
  },
  data() {
    return {
      selected: 1,
      pageSize: 100
    };
  },
  computed: {
    totalNu: function() {
      return Number(this.total);
    },
    showPag: function() {
      return this.totalNu <= this.pageSize;
    },
    pageCount: function() {
      return this.totalNu % this.pageSize == 0
        ? Math.floor(this.totalNu / this.pageSize)
        : Math.floor(this.totalNu / this.pageSize) + 1;
    },
    array: function() {
      let length =
        this.pageCount === this.selected
          ? this.totalNu - (this.selected - 1) * this.pageSize
          : this.pageSize;
      return Array.from(
        { length: length },
        (v, i) => (this.selected - 1) * this.pageSize + i + 1
      );
    },
    disabledList: function() {
      return this.pageCount == 1;
    },
    list: function() {
      if (this.disabledList) return {};
      return Array.from({ length: this.pageCount }, (v, i) => i + 1).map(e => {
        let start = (e - 1) * this.pageSize + 1;
        let end = this.pageCount === e ? this.totalNu : e * this.pageSize;
        return {
          value: e,
          label: `${start} - ${end}`
        };
      });
    }
  },
  methods: {
    click: function(event) {
      console.log(event);
    }
  }
};
</script>
