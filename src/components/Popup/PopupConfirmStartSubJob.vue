<template>
  <v-col align="center" justify="center" class="text-h3 pa-5">
    <v-row align="center" justify="center"
      ><span>ยืนยันที่จะ</span
      ><span class="green--text ml-3">เริ่มงาน</span></v-row
    >
    <v-row align="center" justify="center"
      ><span>หมายเลข</span><span class="ml-3">{{job.id}}</span></v-row
    >
    <v-row align="center" justify="center"><span>ใช่หรือไม่ ?</span> </v-row>
    <v-row align="center" justify="space-around" class="mt-4">
      <v-btn
        class="text-h4 white--text px-10"
        style="height:auto;width:auto;"
        color="green"
        @click="startWork"
      >
        ใช่
      </v-btn>
      <v-btn
        class="text-h4 white--text"
        style="height:auto;width:auto;"
        color="grey"
        @click="$emit('popup-confirm-start-sub-job', {str:'cancel',job:job})"
      >
        ยกเลิก
      </v-btn>
    </v-row>
     <v-overlay :value="overlay"><v-progress-circular
      :size="50"
      color="indigo"
      indeterminate
    ></v-progress-circular></v-overlay>
    <v-dialog v-model="isDialogShow">
      <v-card width="50vw" style="margin-left:24.4%;">
        <v-row align="center" justify="center"> 
          <v-col align="center" justify="center" class="text-h3">
              <span class="red--text">เกิดข้อผิดพลาดในการดำเนินการ</span>
          </v-col>
        </v-row>
        <v-row align="center" justify="center"> 
          <v-col align="center" justify="center" class="text-h3">
              <span>{{errorMessage}}</span>
          </v-col>
        </v-row>
        <v-row align="center" justify="center"> 
          <v-col align="center" justify="center">
               <v-btn
        class="text-h4 white--text px-10"
        style="height:auto;width:auto;"
        color="indigo"
        @click="isDialogShow = false"
      >
        ย้อนกลับ
      </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import * as API from '../../utills/api';
export default {
  props: {
    job: {
      type: Object,
      default: ()=>{}
    },
  },
  data() {
    return {
      overlay:false,
      isDialogShow:false,
      errorMessage:''
    }
  },
  methods: {
    async startWork() {
      //this.overlay = true;  
      
    
      this.$emit('popup-confirm-start-sub-job', {str:'yes',job:this.job});
      
    }
  },
};
</script>

<style></style>
