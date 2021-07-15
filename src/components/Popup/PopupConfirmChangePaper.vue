<template>
  <v-col align="center" justify="center" class="text-h3 pa-5">
    <v-row align="center" justify="center"
      > <v-icon x-large style="transform:scale(4);margin:2em;">note</v-icon
          >
    </v-row>
    <v-row align="center" justify="center"
      ><span>มีการเปลี่ยนกระดาษหรือเกิดปัญหา</span>
    </v-row>
    <v-row align="center" justify="center"
      ><span>ใช่หรือไม่ ?</span></v-row
    >
    <v-row align="center" justify="space-around" class="mt-4">
      <v-btn
        class="text-h4 white--text px-10"
        style="height:auto;width:auto;"
        color="green"
        @click="$emit('popup-confirm-change-paper-event','confirm')"
      >
        ใช่
      </v-btn>
        <v-btn
        class="text-h4 white--text px-10"
        style="height:auto;width:auto;"
        color="grey"
        @click="$emit('popup-confirm-change-paper-event','cancel')"
      >
        ไม่
      </v-btn>
    </v-row>
  </v-col>
</template>

<script>
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
