<template>
  <li class="media">
    <slot name="icon">
      <i
        class="mt-2 mr-3 align-self-start"
        :class="item.icon"
      />
    </slot>
    <div class="media-body">
      <h5 class="my-1">
        <font v-if="!item.href">
          {{ item.title }}
        </font>
        <a
          v-else
          :href="item.href"
        >{{ item.title }}</a>
      </h5>
      {{ item.content }}
      <template v-if="item.children && item.children.length && item.children.length > 0">
        <br>
        <b-button
          class="border-0 bg-transparent px-0"
          text-color="primary"
          @click="show = !show"
        >
          {{ show ? 'Hide' : 'Show More...' }}
        </b-button>
        <b-media
          v-if="show"
          :list="item.children"
        />
        <hr v-if="show">
      </template>
    </div>
  </li>
</template>

<script>
import util from "@/components/util/index.js";

import BButton from "@/components/basic/Button/basic-button.vue";

export default {
  name: "BMediaItem",
  components: { BMedia: () => import("./b-media"), BButton },
  props: {
    item: util.props.Object,
  },
  data() {
    return {
      show: false
    };
  },
};
</script>
