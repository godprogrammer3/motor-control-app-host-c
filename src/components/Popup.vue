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
    <PopupAddWastPaper
      v-else-if="type == 'addWastPaper'"
      class="align-center"
      @popup-add-wast-paper-event="
        (event) =>
          $emit('popup-event', { type: event.type, value: event.value })
      "
    >
    </PopupAddWastPaper>
    <PopupChangingPaper
      v-else-if="type == 'changingPaper'"
      class="align-center"
      @popup-changing-paper-event="
        (event) =>
          $emit('popup-event', { type: event.type, value: event.value })
      "
    >
    </PopupChangingPaper>
  </div>
</template>

<script>
import PopupConfirm from "./PopupConfirm";
import PopupAddWastPaper from "./PopupAddWastPaper";
import PopupChangingPaper from "./PopupChangingPaper";
export default {
  components: {
    PopupConfirm,
    PopupAddWastPaper,
    PopupChangingPaper
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
