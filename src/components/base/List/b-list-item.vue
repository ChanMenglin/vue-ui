<template>
  <base-a
    v-if="href"
    class="list-group-item list-group-item-action"
    hide-icon
    :href="href"
    :class="objClass"
    :disabled="disabled"
  >
    <slot>{{ label }}</slot>
    <sr-msg>{{ srMsg || color }}</sr-msg>
  </base-a>
  <li
    v-else
    class="list-group-item text-truncate"
    :class="objClass"
    :aria-disabled="disabled"
  >
    <slot>{{ label }}</slot>
    <sr-msg>{{ srMsg }}</sr-msg>
  </li>
</template>

<script>
import util from "@/components/util/index.js";

import BaseA from "@/components/basic/A/basic-a.vue";
import srMsg from "@/components/basic/basic-sr-msg.vue";

export default {
  name: "BListItem",
  components: { BaseA, srMsg },
  props: {
    href: util.props.href,
    label: util.props.String,
    color: {
      ...util.props.color,
      default: "white"
    },
    active: util.props.Boolean,
    disabled: util.props.Boolean,
    srMsg: util.props.String
  },
  computed: {
    objClass: function() {
      let c = " ";
      c += this.color ? ` list-group-item-${this.color} ` : " ";
      c += this.active ? " active " : " ";
      return c;
    }
  }
};
</script>

