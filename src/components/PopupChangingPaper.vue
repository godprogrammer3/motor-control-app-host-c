<template>
  <v-col align="center" justify="center" class="text-h3 pa-5">
    <v-row align="center" justify="center"
      > <v-icon x-large style="transform:scale(4);margin:2em;">restore_page</v-icon
          >
    </v-row>
    <v-row align="center" justify="center"
      ><span>อยู่ระหว่างเปลี่ยนกระดาษ</span>
    </v-row>
    <v-row align="center" justify="center"
      ><span>กดปุ่มเสร็จสิ้นเมื่อเปลี่ยนเสร็จ</span></v-row
    >
    <v-row align="center" justify="space-around" class="mt-4">
      <v-btn
        class="text-h4 white--text px-10"
        style="height:auto;width:auto;"
        color="green"
        @click="$emit('popup-changing-paper-event','cancel')"
      >
        เสร็จสิ้น
      </v-btn>
    </v-row>
  </v-col>
</template>

<script>
import { mapActions} from "vuex";
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
