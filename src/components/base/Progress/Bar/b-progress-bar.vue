<template>
  <div class="row mx-0 align-items-center">
    <div
      class="progress col px-0"
      :style="{ height: `${strong}px` }"
    >
      <template v-if="list && list.length > 0">
        <b-bar-item
          v-for="(obj, index) in list"
          :key="index"
          :striped="striped"
          :animated="animated"
          :value="obj.value"
          :color="obj.color"
        />
      </template>
      <b-bar-item
        v-else
        :color="color"
        :value="value"
        :striped="striped"
        :animated="animated"
      />
    </div>
    <label
      v-if="!hideValue"
      class="col-1 m-0 p-0 pl-1"
    >{{ parseInt(value) || 0 }}%</label>
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import BBarItem from "./b-progress-bar-item.vue";

export default {
  name: "BProgressBar",
  components: { BBarItem, },
  props: {
    value: {
      ...util.props.UNumber,
      validator: (value) => util.props.UNumber.validator(value) && value <= 100,
    },
    color: [String, Array,],
    strong: util.props.UNumber,
    list: [Object, Array],
    striped: util.props.Boolean,
    animated: util.props.Boolean,
    hideValue: util.props.Boolean,
  },
};
</script>
