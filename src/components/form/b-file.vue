<template>
  <file-pond
    ref="pond"
    name="file uploader"
    :allow-multiple="multiple"
    v-bind="$attrs"
    v-on="$listeners"
    @:init="handleFilePondInit"
  />
</template>

<script>
import util from "@/components/util/index.js";

/**
 * filepond
 * https://pqina.nl/filepond
 * filepond docs
 * https://pqina.nl/filepond/docs/
 */
// Import Vue FilePond
import vueFilePond from "vue-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import FilePond plugins
// Please note that you need to install these plugins separately

// Import image preview plugin styles
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

// Create component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);

export default {
  name: "BFile",
  inheritAttrs: false,
  props: {
    info: util.props.String,
    multiple: util.props.Boolean,
  },
  created() {},
  destroy() {
    FilePond.destroy();
  },
  methods: {
    handleFilePondInit: function() {
      console.log("FilePond has initialized");
      // example of instance method call on pond reference
      this.$refs.pond.getFiles();
    }
  }
};
</script>
