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
          $emit('popup-event', {
            type: event.type,
            value: event.value,
            extraValue: event.extraValue,
          })
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
    <PopupEditOnTop
      v-else-if="type == 'editOnTop'"
      :oldOnTop="value.onTop.toString()"
      @popup-edit-on-top-event="
        (event) =>
          $emit('popup-event', {
            type: event.type,
            value: event.value,
            extraValue: event.extraValue,
          })
      "
    ></PopupEditOnTop>
    <PopupEditOntopComplete
      v-else-if="type == 'editOntopComplete'"
      class="align-center"
      :value="value.value"
      @popup-edit-offset-complete-event="
        (event) => {
          $emit('popup-event', { type: event.type, value: event.value });
        }
      "
    >
    </PopupEditOntopComplete>
  </div>
</template>

<script>
import PopupConfirm from "./PopupConfirm";
import PopupAddWastPaper from "./PopupAddWastPaper";
import PopupChangingPaper from "./PopupChangingPaper";
import PopupEditOnTop from "./PopupEditOnTop";
import PopupEditOntopComplete from "./PopupEditOntopComplete";
export default {
  components: {
    PopupConfirm,
    PopupAddWastPaper,
    PopupChangingPaper,
    PopupEditOnTop,
    PopupEditOntopComplete,
  },
  mounted() {},
  props: {
    type: {
      type: String,
      default: "",
    },
    value: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style></style>
