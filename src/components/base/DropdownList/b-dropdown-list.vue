<template>
  <div class="form-group">
    <b-dropdown-picker
      ref="dropdownlist"
      :class="[readonlyClass]"
      menu-width
      :show="show"
      :label="label"
      :placeholder="placeholder"
      :disabled="disabled"
      :multiple="isMultiple"
      @deleteItem="deleteItem"
    >
      <template #trigger>
        <slot name="trigger" />
      </template>
      <template #icon>
        <slot name="icon" />
      </template>
      <slot>
        <b-dropdown-header
          v-if="search"
          @click.native="headerClick"
        >
          <b-text
            v-model="searchText"
            hide-icon
            type="search"
            size="sm"
          />
        </b-dropdown-header>
        <b-dropdown-divider v-if="search" />
        <b-dropdown-item
          v-if="!searchText && !hideNull"
          :label="placeholder"
          :disabled="disabled"
          @click.native="menuClick(null)"
        />
        <b-dropdown-item
          v-for="item in searchList"
          :key="item.value"
          :info="item.info"
          :label="item.label"
          :active="isChecked(item)"
          :disabled="item.disabled || disabled"
          @click.native="menuClick(item)"
        />
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
import BDropdownHeader from "@/components/base/Dropdown/b-dropdown-header.vue";
import BDropdownDivider from '@/components/base/Dropdown/b-dropdown-divider.vue'
import BDropdownItem from "@/components/base/Dropdown/b-dropdown-item.vue";

import BText from "@/components/form/b-text.vue";

import BValid from "@/components/form/Other/b-form-valid.vue";
import BInfo from "@/components/basic/basic-info.vue";

export default {
  name: "BDropdownList",
  components: {
    BDropdownPicker,
    BDropdownHeader,
    BDropdownDivider,
    BDropdownItem,
    BText,
    BValid,
    BInfo
  },
  mixins: [
    util.mixins.form.base,
    util.mixins.form.readonly,
    util.mixins.form.validator,
    util.mixins.select.check,
  ],
  props: {
    multiple: util.props.Boolean,
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
      show: false,
      searchText: null,
      menuHeight: "0px",
      isMultiple: this.multiple,
      placeholder: '<Pleace select...>',
    };
  },
  computed: {
    searchList: function() {
      return this.searchText
        ? this.list.filter(e => e.value && (e.value.includes(this.searchText) || e.label.includes(this.searchText)))
        : this.list
    },
    label: function() {
      return this.isMultiple
        ? this.checkedValues && this.checkedValues.map && this.checkedValues.map(e => e[this.primaryKey] || e.label || e.value || e ) || null
        : this.checkedValues && (this.checkedValues[this.primaryKey] || this.checkedValues.label || this.checkedValues.value || this.checkedValues) || null
    },
  },
  methods: {
    headerClick: function() {
      this.show = true
    },
    menuClick: function(item) {
      this.show = false
      let value = this.primaryKey ? item : item && item.value || item
      if (this.isMultiple) {
        if (!value) return
        let index = this.checkedMap.indexOf(value)
        if (index >= 0) this.checkedValues.splice(index, 1)
        else this.checkedValues.push(value)
      } else {
        this.checkedValues = value
      }
      this.searchText = null // 清空查询字段
      this.validator(this.$refs.dropdownlist.$el, this.checkedValues)
    },
    deleteItem: function(index) {
      if (index >= 0) this.checkedValues.splice(index, 1)
      this.validator(this.$refs.dropdownlist.$el, this.checkedValues)
    },
  }
};
</script>