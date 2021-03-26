<template>
  <v-row align="center" justify="center" style="margin:0;">
    <v-card width="50vw" style="height:auto;">
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col align="center" justify="center" class="text-h3 pa-5">
            <v-row align="center" justify="center"><span>ยืนยันที่จะเพิ่มกระดาษเสีย</span>
            </v-row>
            <v-row align="center" justify="center"><span>ใช่หรือไม่ ?</span></v-row>
            <v-row align="center" justify="space-around" class="mt-4">
              <v-btn class="text-h4 white--text px-10" style="height:auto;width:auto;" color="green"
                @click="$emit('popup-comfirm-add-wast-paper-event','confirm')">
                ใช่
              </v-btn>
              <v-btn class="text-h4 white--text px-10" style="height:auto;width:auto;" color="grey"
                @click="$emit('popup-comfirm-add-wast-paper-event','cancel')">
                ไม่
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-row>

</template>

<script>
  import { mapActions } from "vuex";
  export default {
    props: {
    },
    data() {
      return {
      }
    },
    methods: {
    },
  };
</script>

<style></style>