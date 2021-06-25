<template>
  <v-card class="pa-6" width="40vw">
    <v-row align="center" justify="center"
      ><v-col align="center" justify="center"
        ><v-btn
          class="text-h1 px-6"
          style=" height: auto ;
  width: auto ;"
          @click="$emit('keyboard-event', { type: 'letter', value: '7' })"
          >7</v-btn
        ></v-col
      >
      <v-col align="center" justify="center"
        ><v-btn
          class="text-h1 px-6"
          style=" height: auto ;
  width: auto ;"
          @click="$emit('keyboard-event', { type: 'letter', value: '8' })"
          >8</v-btn
        ></v-col
      >
      <v-col align="center" justify="center">
        <v-btn
          class="text-h1 px-6"
          style=" height: auto ;
  width: auto ;"
          @click="$emit('keyboard-event', { type: 'letter', value: '9' })"
          >9</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center" justify="center"
        ><v-btn
          class="text-h1 px-6"
          style=" height: auto ;
  width: auto ;"
          @click="$emit('keyboard-event', { type: 'letter', value: '4' })"
          >4</v-btn
        ></v-col
      >
      <v-col align="center" justify="center"
        ><v-btn
          class="text-h1 px-6"
          style=" height: auto ;
  width: auto ;"
          @click="$emit('keyboard-event', { type: 'letter', value: '5' })"
          >5</v-btn
        ></v-col
      >
      <v-col align="center" justify="center">
        <v-btn
          class="text-h1 px-6"
          style=" height: auto ;
  width: auto ;"
          @click="$emit('keyboard-event', { type: 'letter', value: '6' })"
          >6</v-btn
        >
      </v-col></v-row
    >
    <v-row>
      <v-col align="center" justify="center"
        ><v-btn
          class="text-h1 px-6"
          style=" height: auto ;
  width: auto ;"
          @click="$emit('keyboard-event', { type: 'letter', value: '1' })"
          >1</v-btn
        ></v-col
      >
      <v-col align="center" justify="center"
        ><v-btn
          class="text-h1 px-6"
          style=" height: auto ;
  width: auto ;"
          @click="$emit('keyboard-event', { type: 'letter', value: '2' })"
          >2</v-btn
        ></v-col
      >
      <v-col align="center" justify="center">
        <v-btn
          class="text-h1 px-6"
          style=" height: auto ;
  width: auto ;"
          @click="$emit('keyboard-event', { type: 'letter', value: '3' })"
          >3</v-btn
        >
      </v-col></v-row
    >
    <v-row>
      <v-col align="center" justify="center"
        ><v-btn
          class="text-h1 px-6"
          style=" height: auto ;
  width: auto ;"
          @click="$emit('keyboard-event', { type: 'letter', value: '0' })"
          >0</v-btn
        ></v-col
      >
      <v-col align="center" justify="center"
        ><v-btn
          class="text-h2"
          style=" height: 1.9em ;
  width: auto ;"
          @click="$emit('keyboard-event', { type: 'action', value: 'clear' })"
          >CLR</v-btn
        ></v-col
      >
      <v-col align="center" justify="center">
        <v-btn
          style="width:8.5em;height:8.20em;"
          @click="$emit('keyboard-event', { type: 'action', value: 'delete' })"
          ><v-icon x-large>backspace</v-icon></v-btn
        >
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col align="center" justify="center">
        <v-btn
          color="indigo darken-4"
          class="text-h4 white--text "
          width="7vw"
          height="7vh"
          style="height:auto; width:auto;"
          @click="$emit('keyboard-event', { type: 'action', value: 'save' })"
          >บันทึก</v-btn
        ></v-col
      >
      <v-col align="center" justify="center"
        ><v-btn
          color="indigo darken-4 "
          class="text-h4 white--text"
          width="7vw"
          height="7vh"
          style="height:auto; width:auto;"
          @click="$emit('keyboard-event', { type: 'action', value: 'finish' })"
          >ดำเนินการต่อ</v-btn
        ></v-col
      >
    </v-row>
  </v-card>
</template>

<script>
export default {};
</script>
<style scoped></style>
