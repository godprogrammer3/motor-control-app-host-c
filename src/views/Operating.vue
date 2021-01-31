<template>
  <div>
    <v-app-bar color="indigo darken-4" style="height:70px" flat>
      <span class="white--text text-h4 mr-5">กลุ่มหมายเลข  {{group.group_id}}</span>
      <v-toolbar-title class="white--text text-h4"
        >กำลังดำเนินงาน...</v-toolbar-title
      >
      <span class="white--text text-h4 ml-5">({{currentJobOrder}}/{{group.job.length}} งาน)</span>
    </v-app-bar>
    <v-container fluid class="pa-0">
    <v-row class="elevation-2" style="background-color:white;" align="center" justify="center">
      <v-col align="center" justify="center"><span class="indigo--text text-h5">หมายเลขงาน :</span><span class="text-h5 ml-2">{{group.job[currentOrder].job_id}}</span></v-col>
      <v-col align="center" justify="center"><span class="indigo--text text-h5">หน้ากว้าง :</span><span class="text-h5 ml-2">{{group.job[currentOrder].width} นิ้ว</span></v-col>
      <v-col align="center" justify="center"><span class="indigo--text text-h5">ความยาวแผ่น :</span ><span class="text-h5 ml-2">30 มม.</span></v-col>
      <v-col align="center" justify="center"><span class="indigo--text text-h5">จำนวนแผ่น :</span><span class="text-h5 ml-2">10 แผ่น</span></v-col>
      <v-col align="center" justify="center"><span class="indigo--text text-h5">ความยาวงาน :</span><span class="text-h5 ml-2">15.2 เมตร</span></v-col>
    </v-row>
    <v-row align="center" justify="center" class="mt-5">
        <span class="text-h2 indigo--text">งานเสร็จสิ้น :</span>
        <span class="text-h2 ml-5">5.65 %</span>
    </v-row>
      <v-container>
        <v-row align="center" justify="center"
          ><v-col
            ><v-card color="green" class="text-h4 white--text"
              ><v-col align="center" justify="center"
                ><v-row align="center" justify="center">เสร็จสิ้น</v-row
                ><v-row align="center" justify="center">189</v-row
                ><v-row align="center" justify="center">เมตร</v-row></v-col
              ></v-card
            ></v-col
          ><v-col
            ><v-card color="indigo darken-4" class="text-h4 white--text"
              ><v-col align="center" justify="center"
                ><v-row align="center" justify="center">คงเหลือ</v-row
                ><v-row align="center" justify="center">2659</v-row
                ><v-row align="center" justify="center">เมตร</v-row></v-col
              ></v-card
            ></v-col
          ><v-col
            ><v-card color="purple" class="text-h4 white--text"
              ><v-col align="center" justify="center"
                ><v-row align="center" justify="center">ทั้งหมด</v-row
                ><v-row align="center" justify="center">3348</v-row
                ><v-row align="center" justify="center">เมตร</v-row></v-col
              ></v-card
            ></v-col
          ></v-row
        >
        <v-row align="center" justify="center"
          ><v-col
            ><v-card color="red" class="text-h4 white--text"
              ><v-col align="center" justify="center"
                ><v-row align="center" justify="center">ความเร็ว</v-row
                ><v-row align="center" justify="center">65</v-row
                ><v-row align="center" justify="center">เมตร/นาที</v-row></v-col
              ></v-card
            ></v-col
          >
          <v-col
            ><v-card
              color="orange"
              class="text-h4 white--text"
              ><v-col align="center" justify="center"
                ><v-row align="center" justify="center">ON TOP</v-row
                ><v-row align="center" justify="center">30</v-row
                ><v-row align="center" justify="center"
                  ><span class="mr-5">เมตร</span>
                  </v-row
                ></v-col
              ></v-card
            ></v-col
          >
          <v-col
            ><v-card
              color="blue"
              class="text-h4 white--text"
              ><v-col align="center" justify="center"
                ><v-row align="center" justify="center">เพิ่ม/ลด</v-row
                ><v-row align="center" justify="center">+100</v-row
                ><v-row align="center" justify="center"
                  ><span class="mr-5">แผ่น</span>
                 </v-row
                ></v-col
              ></v-card
            ></v-col
          ></v-row
        >
      </v-container>
      <footer class="elevation-2 pl-10" fixed absolute>
        <v-row align="center" justify="center"
          ><span class="text-h4 indigo--text">งานต่อไป</span></v-row
        >
        <v-row align="center" justify="center">
          <v-col align="center" justify="center"><span class="indigo--text text-h5">หมายเลขงาน :</span><span class="text-h5 ml-2">1235</span></v-col>
          <v-col align="center" justify="center"><span class="indigo--text text-h5">หน้ากว้าง :</span><span class="text-h5 ml-2">21 นิ้ว</span></v-col>
          <v-col align="center" justify="center"><span class="indigo--text text-h5">ความยาวแผ่น :</span ><span class="text-h5 ml-2">31 มม.</span></v-col>
          <v-col align="center" justify="center"><span class="indigo--text text-h5">จำนวนแผ่น :</span><span class="text-h5 ml-2">11 แผ่น</span></v-col>
          <v-col align="center" justify="center"><span class="indigo--text text-h5">ความยาวงาน :</span><span class="text-h5 ml-2">16.2 เมตร</span></v-col>
        </v-row>
      </footer>
      <v-row align="center" justify="center" style="height:10vh;">
      <v-col align="center" justify="center">
        <v-btn
          color="indigo"
          dark
          x-large
          bottom
          @click="confirmChangePaper
          "
          class="text-h5"
        >
          เปลี่ยนกระดาษหรือเกิดปัญหา
        </v-btn>
      </v-col>
    </v-row>
      <v-dialog v-model="isDialogShow" elevation="0" :persistent="isPersistent">
        <Popup
          :type="dialogType"
          :value="dialogValue"
          @popup-event="popupEventHandler"
        ></Popup>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Popup from "@/components/Popup.vue";
import API from "@/store/api";
export default {
  components: {
    Popup,
  },
  data() {
    return {
      isSlowMode: false,
      isAutoMode: true,
      isNotSlowMode: true,
      isAutoMode: true,
      isCloseDialogShow: false,
      input: "",
      isEditDialogShow: false,
      editValue: "",
      editType: "",
      offsetValue: 100,
      onTopValue: 30,
      displayLable: "",
      speed: 0,
      headers: [
        {
          text: "หมายเลขงาน",
          col_size: 3,
          data: "1234",
        },
        {
          text: "กว้าง",
          col_size: 2,
          data: "20",
        },
        {
          text: "ยาว",
          col_size: 2,
          data: "30",
        },
        {
          text: "จำนวนแผ่น",
          col_size: 2,
          data: "50",
        },
        {
          text: "ความยาวรวม",
          col_size: 3,
          data: "300",
        },
      ],
      items: [
        {
          data: [
            { job_id: 127, job_length: 500, job_work_date: "5/09/63" },
            { job_id: 127, job_length: 500, job_work_date: "5/09/63" },
            { job_id: 127, job_length: 500, job_work_date: "5/09/63" },
          ],
          isContinue: true,
        },
        {
          data: [{ job_id: 127, job_length: 500, job_work_date: "5/09/63" }],
          isContinue: true,
        },
        {
          data: [
            { job_id: 127, job_length: 500, job_work_date: "5/09/63" },
            { job_id: 127, job_length: 500, job_work_date: "5/09/63" },
          ],
          isContinue: false,
        },
      ],
      isDragableDisabled: false,
      isDialogShow: false,
      dialogType: "",
      dialogValue: "",
      onTop: 30,
      offset: 100,
      isShowHomePopup: false,
      isPersistent:true,
      api: new API() ,
      currentJobOrder:0
    };
  },
  methods: {
    process() {
      this.processWork();
      this.isShowInserPaper = false;
    },
    stop() {
      this.stopWork();
      this.$router.replace("/");
    },
    cancelJob() {
      this.dialogType = "confirm";
      this.dialogValue = { str: "cancelJob" ,value:this.group};
      this.isDialogShow = true;
    },
    popupEventHandler(event) {
      if (event.type == "action") {
        if (event.value == "cancel") {
          this.isDialogShow = false;
          this.dialogValue = {};
        }else if(event.value == "confirm"){
          this.api.changePaper();
          this.isDialogShow = false;
          this.dialogType = "changingPaper";
          this.dialogValue = {};
          this.isDialogShow = true;
        }else if(event.value == "finish"){
          this.api.finishChangePaper();
          this.isDialogShow = false;
          this.dialogValue = {};
        }
      } 
    },
    confirmChangePaper(){
      this.dialogType = 'confirm';
      this.dialogValue = {str:'confirmChangePaper'};
      this.isDialogShow = true;
    },
    editOnTop() {
      this.dialogType = "editOnTop";
      this.dialogValue = { onTop: this.onTop };
      this.isDialogShow = true;
    },
    editOffset() {
      this.dialogType = "editOffset";
      this.dialogValue = { offset: this.offset };
      this.isDialogShow = true;
    },
    openPopupHome() {
      this.dialogType = "openPopupHome";
      this.dialogValue = null;
      this.isDialogShow = true;
    },
    ...mapActions(["processWork", "stopWork"]),
  },
  watch: {
    isEditDialogShow(newValue, oldValue) {
      if (!newValue) {
        this.input = "";
      }
    },
  },
  props: {
    group: {
      type: Object,
      default:()=>{},
    },
  },
  mounted() {
    console.log(this.group);
    this.dialogType = "addWastPaper";
    this.dialogValue = null;
    this.isDialogShow = true;
  },
  sockets: {
    connect: function() {
      console.log("socket connected");
    },
    CANCEL_JOB: function(data) {
      console.log(data);
      this.$router.replace({path:'/'}).catch((error)=>{
        console.log('->In operating page:')
        console.log(error);
      });
    },
    
  },
};
</script>

<style></style>
