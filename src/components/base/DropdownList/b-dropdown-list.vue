<template>
  <div class="form-group">
    <b-dropdown-picker
      ref="dropdownlist"
      :class="[readonlyClass]"
      menu-width
      :label="showLabel"
      :placeholder="placeholder"
      :disabled="disabled"
      :multiple="isMultiple"
      @delete:item="deleteItem"
    >
      <template #trigger>
        <slot name="trigger" />
      </template>
      <template #icon>
        <slot name="icon" />
      </template>
      <slot>
        <b-dropdown-menu
          v-model="selectedValue"
          :multiple="isMultiple"
          :primary-key="primaryKey"
          :list="searchList"
          :null-value="placeholder"
          :show-null="!searchText && !hideNull"
        >
          <template #header v-if="search">
            <b-text
              v-model="searchText"
              hide-icon
              class="cannt-hide"
              type="search"
              size="sm"
            />
          </template>
          <template #item="{ item }">
            <slot name="item" :item="item" />
          </template>
        </b-dropdown-menu>
      </slot>
    </b-dropdown-picker>
    <b-valid
      v-if="validInfo || $slots.valid"
      state="valid"
    >
      <slot name="valid">
        {{ validInfo }}
      </slot>
    </b-valid>
    <b-valid
      v-if="invalidInfo || $slots.invalid"
      state="invalid"
    >
      <slot name="invalid">
        {{ invalidInfo }}
      </slot>
    </b-valid>
    <b-info :info="info" />
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import BDropdownPicker from "@/components/base/DropdownPicker/b-dropdown-picker.vue";
import BDropdownMenu from '@/components/base/Dropdown/b-dropdown-menu.vue'
import BText from "@/components/form/b-text.vue";

import BValid from "@/components/form/Other/b-form-valid.vue";
import BInfo from "@/components/basic/basic-info.vue";

export default {
  name: "BDropdownList",
  components: {
    BDropdownPicker,
    BDropdownMenu,
    BText,
    BValid,
    BInfo
  },
  mixins: [
    util.mixins.form.base,
    util.mixins.form.readonly,
    util.mixins.form.validator,
    util.mixins.select.select,
  ],
  props: {
    info: util.props.String,
    search: util.props.Boolean,
    hideNull: {
      ...util.props.Boolean,
      default: function() {
        return this.multiple
      }
    },
  },
  data() {
    return {
      searchText: null,
      menuHeight: "0px",
      placeholder: this.nullValue,
    };
  },
  computed: {
    searchList: function() {
      return this.searchText
        ? this.list.filter(e => e.value && (e.value.includes(this.searchText) || e.label.includes(this.searchText)))
        : this.list
    },
  },
  watch: {
    selectedValue: function(value) {
      this.searchText = null
      this.validator(this.$refs.dropdownlist.$el, value)
    },
  },
  methods: {
    deleteItem: function(index) {
      if (index >= 0) this.selectedValue.splice(index, 1)
    },
  }
};
</script>
