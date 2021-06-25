<template>
  <v-row align="center" justify="center" style="margin:0;"
    ><v-card width="50vw" style="height:auto;">
      <v-container fluid>
        <v-row align="center" justify="center">
          <PopupConfirmChangePaper
            v-if="type.str == 'confirmChangePaper'"
            @popup-confirm-change-paper-event="
              (event) => {
                $emit('popup-comfirm-event', {
                  type: 'action',
                  value: event,
                });
              }
            "
          ></PopupConfirmChangePaper>
          <PopupChangingPaper
            v-else-if="type.str == 'changingPaper'"
            @popup-changing-paper-event="
              (event) => {
                $emit('popup-comfirm-event', {
                  type: 'action',
                  value: event,
                });
              }
            "
          ></PopupChangingPaper>
          <PopupConfirmStartJob
            v-else-if="type.str == 'startJob'"
            :group="type.group"
            @popup-confirm-start-job="
              (event) =>
                $emit('popup-comfirm-event', {
                  type: 'confirm-start-job',
                  value: event,
                })
            "
          ></PopupConfirmStartJob>
            <PopupConfirmCancelJob
            v-else-if="type.str == 'cancelJob'"
            :group="type.value"
            @popup-confirm-start-job="
              (event) =>
                $emit('popup-comfirm-event', {
                  type: 'confirm-cancel-job',
                  value: event,
                })
            "
          ></PopupConfirmCancelJob>
        </v-row>
      </v-container>
    </v-card>
  </v-row>
</template>

<script>
import PopupConfirmChangePaper from "./PopupConfirmChangePaper";
import PopupChangingPaper from "./PopupChangingPaper";
import PopupConfirmStartJob from "./PopupConfirmStartJob.vue";
import PopupConfirmCancelJob from './PopupConfirmCancelJob.vue';
export default {
  components: {
    PopupConfirmChangePaper,
    PopupChangingPaper,
    PopupConfirmStartJob,
    PopupConfirmCancelJob
  },
  props: {
    type: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style></style>
