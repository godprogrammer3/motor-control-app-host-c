<template>
  <v-row align="center" justify="center" style="margin:0;" 
    ><v-card width="50vw" style="height:auto;" >
      <v-container fluid >
        <v-row align="center" justify="center">
          <PopupConfirmChangePaper
            v-if="type.str == 'confirmChangePaper'"
            @popup-confirm-change-paper-event="
              (event) =>{
                 $emit('popup-comfirm-event', {
                  type: 'action',
                  value: event,
                })
              }
               
            "
          ></PopupConfirmChangePaper>
           <PopupChangingPaper
            v-else-if="type.str == 'changingPaper'"
            @popup-changing-paper-event="
              (event) =>{
                 $emit('popup-comfirm-event', {
                  type: 'action',
                  value: event,
                })
              }
               
            "
          ></PopupChangingPaper>
        </v-row>
      </v-container> </v-card
  >
  </v-row>
</template>

<script>
import PopupConfirmChangePaper from "./PopupConfirmChangePaper";
import PopupChangingPaper from "./PopupChangingPaper";
export default {
  components: {
    PopupConfirmChangePaper,
    PopupChangingPaper
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
