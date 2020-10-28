<template>
  <div id="Popup" class="elevation-0">
    <PopupConfirm
      v-if="type == 'confirm'"
      :type="value"
      class="align-center"
      @popup-comfirm-event="
        (event) =>
          $emit('popup-event', { type: event.type, value: event.value })
      "
    ></PopupConfirm>
  </div>
</template>

<script>
import PopupConfirm from "./PopupConfirm";
export default {
  components: {
    PopupConfirm,
  },
  mounted() {},
  props: {
    type: {
      type: String,
      default: "",
    },
    value: {
      type: Object,
      default: ()=>{},
    },
  },
};
</script>

<style></style>
