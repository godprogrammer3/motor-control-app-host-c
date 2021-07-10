<template>
  <div>
    <v-app-bar color="indigo darken-4" style="height: 70px" flat>
      <v-app-bar-nav-icon style="color: white" @click="drawer = true">
        <v-icon large> menu </v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title style="color: white" class="text-h4 ml-10"
        >แผนการดำเนินงาน</v-toolbar-title
      >

      <v-spacer></v-spacer>
      <span style="margin: 20px; color: white" class="text-h5">{{
        datenow
      }}</span>
    </v-app-bar>
      <v-navigation-drawer v-model="drawer" absolute temporary width="30vw">
      <!-- <v-list nav>
        <v-list-item-group color="indigo darken-4">
          <v-list-item @click="$router.replace({ path: '/' })">
            <v-list-item-icon>
              <v-icon large>format_list_numbered</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-h6"
              >แผนการดำเนินงาน</v-list-item-title
            >
          </v-list-item>
          <v-list-item @click="drawer = false">
            <v-list-item-icon>
              <v-icon large>history</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-h6">ประวัติ</v-list-item-title>
          </v-list-item>
         
          <v-list-item @click="$router.replace('setting')">
            <v-list-item-icon>
              <v-icon large>settings</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-h6">ตั้งค่า</v-list-item-title>
          </v-list-item>
        </v-list-item-group> 
        <v-spacer></v-spacer>
      </v-list>   -->
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block color="red" class="white--text text-h6" @click="showConfirmShutdownPopup">
           ปิดเครื่อง
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <HomeJobList
      @handle-event="handleEvent"
    ></HomeJobList>
    <v-dialog v-model="isDialogShow" class="elevation-0" elevation="0" persistent>
      <Popup
        :type="dialogType"
        :value="dialogValue"
        @popup-event="popupEventHandler"
        
      ></Popup>
    </v-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import moment from "moment";
import HomeJobList from "@/components/HomeJobList.vue";
import Popup from "../components/Popup/Popup.vue";

export default {
  components: {
    HomeJobList,
    Popup
  },
  data() {
    return {
      dialogInfo: {},
      datenow: moment().format("DD/M/YYYY"),
      date: new Date().toISOString().substr(0, 10),
      lists: [],
      drawer: false,
      input: "",
      workNo: "",
      length: "",
      isDatePickerShow: false,
      mode: "home",
      isDialogShow: false,
      dialogType: {},
      dialogValue: {},
    };
  },
  methods: {
    handleEvent(data) {
      if (data.type === "change_mode") {
        this.mode = data.value;
      }
    },
    dateUpdate() {
      this.datenow = moment().format("DD/M/YYYY");
    },
    showConfirmShutdownPopup(){
      this.dialogType = 'confirm',
      this.dialogValue = { str:'confirmShutdown' };
      this.isDialogShow = true;
    },
    popupEventHandler(event){
      if(event.type === 'confirm-shutdown'){
        this.isDialogShow = false;
      }
    }

  },
  mounted() {
    this.interval = setInterval(this.dateUpdate, 1800000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>
<style lang="css">
</style>
