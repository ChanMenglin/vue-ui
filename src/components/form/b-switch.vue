<template>
  <div class="custom-control custom-switch">
    <input
      :id="id"
      type="checkbox"
      class="custom-control-input"
      :checked="checked"
      :aria-checked="checked"
      v-bind="$attrs"
      v-on="inputListeners"
    >
    <label
      class="custom-control-label"
      :for="id"
    >{{ label }}</label>
    <b-info :info="info" />
  </div>
</template>

<script>
import tools from "@/tools/index.js";
import util from "@/components/util/index.js";

import BInfo from "@/components/basic/basic-info.vue";

export default {
  name: "BSwitch",
  components: { BInfo },
  mixins: [util.mixins.form.base],
  inheritAttrs: false,
  model: {
    prop: "checked",
    event: "input"
  },
  props: {
    label: util.props.String,
    info: util.props.String,
    checked: util.props.Boolean,
    id: {
      type: String,
      default: function() {
        return "Switch-" + tools.random.getRandomString();
      }
    }
  },
  computed: {
    inputListeners: function() {
      var vm = this;
      // `Object.assign` 将所有的对象合并为一个新对象
      return Object.assign(
        {},
        // 我们从父级添加所有的监听器
        this.$listeners,
        // 然后我们添加自定义监听器，
        // 或覆写一些监听器的行为
        {
          // 这里确保组件配合 `v-model` 的工作
          input: function(event) {
            vm.$emit("input", event.target.checked);
          }
        }
      );
    }
  }
};
</script>
