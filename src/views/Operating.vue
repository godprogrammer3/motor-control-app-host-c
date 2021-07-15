<template>
  <div>
    <v-app-bar color="indigo darken-4" style="height:70px" flat>
      <span class="white--text text-h4 mr-5"
        >กลุ่มหมายเลข {{ group.id }}</span
      >
      <v-toolbar-title class="white--text text-h4"
        >กำลังดำเนินงาน...</v-toolbar-title
      >
      <span class="white--text text-h4 ml-5"
        >({{ currentJobOrder + 1 }}/{{ group.jobs.length }} งาน)</span
      >
      <v-spacer></v-spacer>
      <v-btn
        class="mx-2"
        medium
        dark
        fab
        color="red darken-2"
        @click="cancelJob()"
      >
        <v-icon x-large dark>close</v-icon>
      </v-btn>
    </v-app-bar>
    <v-container fluid class="pa-0">
      <v-row
        class="elevation-2"
        style="background-color:white;"
        align="center"
        justify="center"
      >
        <v-col align="center" justify="center"
          ><span class="indigo--text text-h5">หมายเลขงาน :</span
          ><span class="text-h5 ml-2">{{
            group.jobs[currentJobOrder].id
          }}</span></v-col
        >
        <v-col align="center" justify="center"
          ><span class="indigo--text text-h5">หน้ากว้าง :</span
          ><span class="text-h5 ml-2">
            {{ group.jobs[currentJobOrder].width }} นิ้ว</span
          ></v-col
        >
        <v-col align="center" justify="center"
          ><span class="indigo--text text-h5">ความยาวแผ่น :</span
          ><span class="text-h5 ml-2"
            >{{ group.jobs[currentJobOrder].height }} มม.</span
          ></v-col
        >
        <v-col align="center" justify="center"
          ><span class="indigo--text text-h5">จำนวนแผ่น :</span
          ><span class="text-h5 ml-2"
            >{{ group.jobs[currentJobOrder].sheet }} แผ่น</span
          ></v-col
        >
        <v-col align="center" justify="center"
          ><span class="indigo--text text-h5">ความยาวงาน :</span
          ><span class="text-h5 ml-2"
            >{{
              (
                (group.jobs[currentJobOrder].sheet *
                  group.jobs[currentJobOrder].height) /
                1000
              ).toFixed(2)
            }}
            เมตร</span
          ></v-col
        >
      </v-row>
      <v-row align="center" justify="center" class="mt-5">
        <span class="text-h2 indigo--text">ลอน C จ่ายกระดาษแล้ว :</span>
        <span class="text-h2 ml-5">{{( targetLength != 0?finishLength / targetLength:0).toFixed(2)}} %</span>
      </v-row>
      <v-container>
        <v-row align="center" justify="center">
          <v-col>
            <v-card color="green" class="text-h4 white--text">
              <v-col align="center" justify="center">
                <v-row align="center" justify="center">จ่ายแล้ว</v-row>
                <v-row align="center" justify="center">{{
                  finishLength.toFixed(2)
                }}</v-row>
                <v-row align="center" justify="center">เมตร</v-row>
              </v-col>
            </v-card>
          </v-col>
          <v-col>
            <v-card color="indigo darken-4" class="text-h4 white--text">
              <v-col align="center" justify="center">
                <v-row align="center" justify="center">คงเหลือ</v-row>
                <v-row align="center" justify="center">{{targetLength-finishLength}}</v-row>
                <v-row align="center" justify="center">เมตร</v-row>
              </v-col>
            </v-card>
          </v-col>
          <v-col>
            <v-card color="purple" class="text-h4 white--text">
              <v-col align="center" justify="center">
                <v-row align="center" justify="center">ทั้งหมด</v-row>
                <v-row align="center" justify="center">{{targetLength}}</v-row>
                <v-row align="center" justify="center">เมตร</v-row>
              </v-col>
            </v-card>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col style="visibility:hidden;">
            <v-card color="red" class="text-h4 white--text">
              <v-col align="center" justify="center">
                <v-row align="center" justify="center">ความเร็ว</v-row>
                <v-row align="center" justify="center">{{
                  speed.toFixed(2)
                }}</v-row>
                <v-row align="center" justify="center">เมตร/นาที</v-row>
              </v-col>
            </v-card>
          </v-col>

           <v-col>
            <v-card color="blue" class="text-h4 white--text">
              <v-col align="center" justify="center">
                <v-row align="center" justify="center">เพิ่ม/ลด</v-row>
                <v-row align="center" justify="center">{{offset}}</v-row>
                <v-row align="center" justify="center"
                  ><span class="mr-5">แผ่น</span>
                </v-row>
              </v-col>
            </v-card>
          </v-col>
          <v-col style="visibility:hidden;">
            <v-card
              color="orange"
              class="text-h4 white--text"
              @click="editOnTop"
            >
              <v-col align="center" justify="center">
                <v-row align="center" justify="center">ON TOP</v-row>
                <v-row align="center" justify="center">30</v-row>
                <v-row align="center" justify="center"
                  ><span class="mr-5">เมตร</span>
                  <v-icon x-large color="white">
                    create
                  </v-icon>
                </v-row>
              </v-col>
            </v-card>
          </v-col>
         
        </v-row>
      </v-container>
      <footer
        v-if="currentJobOrder + 1 < group.jobs.length"
        class="elevation-2 pl-10"
        fixed
        absolute
      >
        <v-row align="center" justify="center"
          ><span class="text-h4 indigo--text">งานต่อไป</span></v-row
        >
        <v-row align="center" justify="center">
          <v-col align="center" justify="center"
            ><span class="indigo--text text-h5">หมายเลขงาน :</span
            ><span class="text-h5 ml-2">{{
              group.jobs[currentJobOrder + 1].id
            }}</span></v-col
          >
          <v-col align="center" justify="center"
            ><span class="indigo--text text-h5">หน้ากว้าง :</span
            ><span class="text-h5 ml-2"
              >{{ group.jobs[currentJobOrder + 1].width }} นิ้ว</span
            ></v-col
          >
          <v-col align="center" justify="center"
            ><span class="indigo--text text-h5">ความยาวแผ่น :</span
            ><span class="text-h5 ml-2"
              >{{ group.jobs[currentJobOrder + 1].height }} มม.</span
            ></v-col
          >
          <v-col align="center" justify="center"
            ><span class="indigo--text text-h5">จำนวนแผ่น :</span
            ><span class="text-h5 ml-2"
              >{{ group.jobs[currentJobOrder + 1].sheet }} แผ่น</span
            ></v-col
          >
          <v-col align="center" justify="center"
            ><span class="indigo--text text-h5">ความยาวงาน :</span
            ><span class="text-h5 ml-2"
              >{{
                (
                  (group.jobs[currentJobOrder + 1].sheet *
                    group.jobs[currentJobOrder + 1].height) /
                  1000
                ).toFixed(2)
              }}
              เมตร</span
            ></v-col
          >
        </v-row>
      </footer>
      <v-row align="center" justify="center" style="height:10vh;">
        <v-col justify="center" style="width:100%;">
          <v-row align="center" justify="center">
            <v-switch
              v-model="isSlowMode"
              inset
              color="green"
            >
              <template v-slot:label>
                <span :class="isSlowMode ? 'green--text' : 'orange--text'">{{
                  isSlowMode ? "โหมดช้า" : "โหมดเร็ว"
                }}</span>
                <v-icon
                  style="margin-left:5px;"
                  x-large
                  :color="isSlowMode ? 'green' : 'orange'"
                >
                  {{ isSlowMode ? "speed" : "speed" }}
                </v-icon>
              </template>
            </v-switch>
            
          </v-row>
        </v-col>
        <v-col justify="center" style="width:100%;">
          <v-row align="center" justify="center">
            <v-switch
              v-model="isAutoMode"
              inset
              color="green"
            >
              <template v-slot:label>
                <span :class="isAutoMode ? 'green--text' : 'orange--text'">{{
                  isAutoMode ? "ซิงค์ความเร็ว" : "ไม่ซิงค์ความเร็ว"
                }}</span>
                <v-icon
                  style="margin-left:5px;"
                  x-large
                  :color="isAutoMode ? 'green' : 'orange'"
                >
                  {{ isAutoMode ? "sync" : "sync_disabled" }}
                </v-icon>
              </template>
            </v-switch>
            
          </v-row>
        </v-col>
        <v-col align="center" justify="center">
          <v-btn
            color="indigo"
            dark
            x-large
            bottom
            @click="addWastPaper"
            class="text-h5"
          >
            เพิ่มกระดาษเสีย
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
       <v-overlay :value="overlay"
      ><v-progress-circular
        :size="50"
        color="indigo"
        indeterminate
      ></v-progress-circular
    ></v-overlay>
    </v-container>
  </div>
</template>

<script>
import Popup from "@/components/Popup/Popup.vue";
import * as API from "../utills/api";
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
      speed: 0.0,
      isDragableDisabled: false,
      isDialogShow: false,
      dialogType: "",
      dialogValue: "",
      onTop: 30,
      offset: 0,
      isShowHomePopup: false,
      isPersistent: true,
      currentJobOrder: 0,
      finishLength: 0.0,
      targetLength:0,
      overlay:false,
      group:{}
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
      this.dialogValue = { str: "cancelJob", value: this.group };
      this.isDialogShow = true;
    },
    async popupEventHandler(event){
      console.log(event);
      if (event.type == "action") {
        if (event.value == "cancel") {
          this.isDialogShow = false;
          this.dialogValue = {};
        } else if (event.value == "confirm") {
          this.isDialogShow = false;
          this.dialogType = "changingPaper";
          this.dialogValue = {};
          this.isDialogShow = true;
        } else if (event.value == "finish") {
          this.isDialogShow = false;
          this.dialogValue = {};
        } else if (event.value == "saveOntop") {
          this.isDialogShow = false;
          this.dialogType = "editOntopComplete";
          this.dialogValue = {
            value: event.extraValue.value,
          };
          this.isDialogShow = true;
        } else if (event.value == "ok") {
          this.isDialogShow = false;
        }
      }else if (event.type == "confirm-cancel-job") {
        if (event.value == "cancel") {
          this.isDialogShow = false;
        } else if (event.value == "yes") {
          this.overlay = true;
          const result = await API.processes.notifyNCClientToCancelWork();
          this.overlay = false;
          // if(!result.successful){
          //   this.dialogType = 'error';
          //   this.dialogValue = { errorMessage:'เครื่อง C ไม่ได้เชื่อมต่อ'};
          //   this.isDialogShow = true;
          //   return -1;
          // }
          this.$router.replace("/");
        }
      }else if(event.type == "confirm-start-sub-job"){
        this.isDialogShow = false;
      }
    },
    confirmChangePaper() {
      this.dialogType = "confirm";
      this.dialogValue = { str: "confirmChangePaper" };
      this.isDialogShow = true;
    },
    addWastPaper() {
      this.isDialogShow = false;
      this.dialogType = "changingPaper";
      this.dialogValue = {};
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
    fetchData(){
      this.overlay = true;
      API.groups.getWithJobs(this.$route.query.id).then((response) => {
        this.overlay = false;
        if (response.successful) {
          this.group = response.data;
        }else{
          this.dialogType = 'error';
          this.dialogValue = { errorMessage: 'กรุณาลองอีกครั้ง'};
          this.isDialogShow = true;
        }
      });
    }
  },
  watch: {
    isEditDialogShow(newValue, oldValue) {
      if (!newValue) {
        this.input = "";
      }
    },
  },
  created () {
    this.fetchData();
  },
  sockets: {
    connect: function() {
      console.log("socket connected");
    },
    NOTIFY_C_CLIENT_TO_CANCEL_WORK:function(data){
      this.$socket.emit('NOTIFY_C_CLIENT_TO_CANCEL_WORK_RESPONSE',data);
      this.$router.replace("/");
    },
    Lenght_target: function( data ){
     this.targetLength = data;
    },
    Lenght_C: function( data ){
      this.finishLength = data;
    },
     wastePaper_sheet:function( data ){
      console.log(data);
      this.offset = data;
    },
    end:function(data){
       if(this.currentJobOrder + 1  < this.group.jobs.length){
         this.currentJobOrder++;
       }
    }
  },
};
</script>

<style></style>
