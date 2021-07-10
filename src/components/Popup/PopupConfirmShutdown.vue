<template>
  <v-col align="center" justify="center" class="text-h3 pa-5">
    <v-row align="center" justify="center"
      ><span>ยืนยันที่จะปิดเครื่อง</span>
    </v-row
    >
    <v-row align="center" justify="center"><span>ใช่หรือไม่ ?</span> </v-row>
    <v-row align="center" justify="space-around" class="mt-4">
      <v-btn
        class="text-h4 white--text px-10"
        style="height:auto;width:auto;"
        color="red"
        @click="shutdown"
      >
        ใช่
      </v-btn>
      <v-btn
        class="text-h4 white--text"
        style="height:auto;width:auto;"
        color="grey"
        @click="$emit('popup-confirm-shutdown', {str:'cancel'})"
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
  name:'PopupConfirmShutDown',
  data() {
    return {
      overlay:false,
      isDialogShow:false,
      errorMessage:''
    }
  },
  methods: {
    async startWork() {
      this.overlay = true;  
      result = await API.controls.startWork(this.group.id);
      if(!result.successful && 0){
        this.overlay = false;
        this.errorMessage = 'กล่อง control ไม่ได้เชื่อมต่อ';
        this.isDialogShow = true;
        return -1;
      } 
      var result = await API.processes.notifyNCClientToStartWork(this.group);
      this.overlay = false;
      if(!result.successful){
        this.errorMessage = 'เครื่อง C ไม่ได้เชื่อมต่อ';
        this.isDialogShow = true;
        return -1;
      }


      this.$emit('popup-confirm-start-job', {str:'yes',group:this.group});
      
    },
    async shutdown(){
      console.log('This line in shutdown()');
      this.overlay = true;
      const result = API.apps.shutdown();
      this.overlay = false;
      if(!result.successful){
         this.errorMessage = 'กรุณาลองอีกครั้ง';
         this.isDialogShow = true;
        return -1;
      }
    }
  },
};
</script>

<style></style>
