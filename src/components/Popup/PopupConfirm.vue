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
          <PopupConfirmStartSubJob
          v-else-if="type.str == 'startSubJob'"
            :job="type.value"
            @popup-confirm-start-sub-job="
              (event) =>
                $emit('popup-comfirm-event', {
                  type: 'confirm-start-sub-job',
                  value: event,
                })
            "
          >

          </PopupConfirmStartSubJob>
          <PopupConfirmShutdown
            v-else-if="type.str == 'confirmShutdown'"
            @popup-confirm-shutdown="
              (event) =>
                $emit('popup-comfirm-event', {
                  type: 'confirm-shutdown',
                  value: event,
                })
            "
          ></PopupConfirmShutdown>
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
import PopupConfirmStartSubJob from './PopupConfirmStartSubJob.vue';
import PopupConfirmShutdown from './PopupConfirmShutdown.vue';
export default {
  components: {
    PopupConfirmChangePaper,
    PopupChangingPaper,
    PopupConfirmStartJob,
    PopupConfirmCancelJob,
    PopupConfirmStartSubJob,
    PopupConfirmShutdown
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
