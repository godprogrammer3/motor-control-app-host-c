<template>
  <v-col align="center" justify="center" class="text-h3 pa-5">
    <v-row align="center" justify="center"
      ><span>ยืนยันที่จะ</span
      ><span class="red--text ml-3">ยกเลิกงาน</span></v-row
    >
    <v-row align="center" justify="center"
      ><span>กลุ่มหมายเลข</span><span class="ml-3">{{group.group_id}}</span></v-row
    >
    <v-row align="center" justify="center"><span>ใช่หรือไม่ ?</span> </v-row>
    <v-row align="center" justify="space-around" class="mt-4">
      <v-btn
        class="text-h4 white--text px-10"
        style="height:auto;width:auto;"
        color="red"
        @click="cancelJob"
      >
        ใช่
      </v-btn>
      <v-btn
        class="text-h4 white--text px-10"
        style="height:auto;width:auto;"
        color="grey"
        @click="$emit('popup-confirm-start-job', 'cancel')"
      >
        ไม่
      </v-btn>
    </v-row>
  </v-col>
</template>

<script>
import API from "@/store/api";
export default {
  props: {
    group: {
      type: Object,
      default: ()=>{}
    },
  },
  data() {
    return {
      api: new API()
    }
  },
  methods: {
    async cancelJob() {
      this.$emit('popup-confirm-start-job', 'yes');
    }
  },
};
</script>

<style></style>
