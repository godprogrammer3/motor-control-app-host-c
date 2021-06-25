<template>
  <v-container fluid class="pa-0">
    <v-row class="elevation-2" style="background-color:white;padding-left:3vw;padding-right:7vw;" align="center" justify="center">
      <v-col align="center" justify="center"><span>ลำดับ</span></v-col>
      <v-col align="center" justify="center"><span>หมายเลขงาน</span></v-col>
      <v-col align="center" justify="center"><span>หน้ากว้าง</span></v-col>
      <v-col align="center" justify="center"><span>ความยาวแผ่น</span></v-col>
      <v-col align="center" justify="center"><span>จำนวนแผ่น</span></v-col>
      <v-col align="center" justify="center"><span>ความยาวงาน</span></v-col>
      <v-col align="center" justify="center"><span>วันที่ดำเนินงาน</span></v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-list
        class="mt-3 list-class"
        style="height:75vh;"
      >
        <draggable
          v-model="items"
          :disabled="isDragableDisabled"
          handle=".handle"
        >
          <v-list-item v-for="(item, index) in items" :key="index">
            <v-card width="100%" class="mb-5 rounded-xl">
              <v-toolbar
                :color="item.isContinue ? 'indigo' : 'orange'"
                height="95"
              >
                <v-toolbar-title class="text-h5 white--text ml-5 nocopy"
                  >กลุ่มหมายเลข {{ item.id }}</v-toolbar-title
                >
                <v-spacer></v-spacer>
                <v-btn
                  v-if="isJobRunning != true"
                  fab
                  dark
                  color="green"
                  @click="startJob(item)"
                >
                  <v-icon dark large>play_arrow</v-icon>
                </v-btn>
              </v-toolbar>
              <v-container fluid fill-height>
                <v-row align="center" justify="center">
                  <v-col cols="12">
                    <v-simple-table>
                      <template v-slot:default>
                        <tbody>
                          <tr
                            v-for="(sub_item, sub_index) in item.jobs"
                            :key="sub_index"
                          >
                          <v-row align="center" justify="center" style="width:90vw;">
                            <v-col align="center" justify="center"><span>{{ sub_index + 1 }}</span></v-col>
                            <v-col align="center" justify="center"><span>{{ sub_item.id }}</span></v-col>
                            <v-col align="center" justify="center"><span>{{ sub_item.width}}</span></v-col>
                            <v-col align="center" justify="center"><span>{{ sub_item.height}}</span></v-col>
                            <v-col align="center" justify="center"><span> {{ sub_item.sheet}}</span></v-col>
                            <v-col align="center" justify="center"><span>{{ sub_item.height * sub_item.sheet / 100.0}}</span></v-col>
                            <v-col align="center" justify="center"><span> {{ parseDateFromDB(sub_item.workDate) }}</span></v-col>
                          </v-row>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table></v-col
                  >
                </v-row>
              </v-container>
            </v-card>
          </v-list-item>
        </draggable>
      </v-list></v-row
    >
     <!-- <v-row align="center" justify="center" style="height:10vh;">
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
          เปลี่ยนกระดาษ
        </v-btn>
      </v-col>
    </v-row> -->
    <v-dialog v-model="isDialogShow" class="elevation-0" elevation="0" persistent>
      <Popup
        :type="dialogType"
        :value="dialogValue"
        @popup-event="popupEventHandler"
        
      ></Popup>
    </v-dialog>
     <v-overlay :value="overlay"><v-progress-circular
      :size="50"
      color="indigo"
      indeterminate
    ></v-progress-circular></v-overlay>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import draggable from "vuedraggable";
import Popup from "@/components/Popup/Popup.vue";
import * as API from "../utills/api";
export default {
  name: "HomeJobList",
  props: {
    isJobRunning: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    draggable,
    Popup,
  },
  data() {
    return {
      isDragableDisabled: false,
      isDialogShow: false,
      dialogType: "",
      dialogValue: "",
      overlay:false,
      items:[]
    };
  },
  created() {
   this.fetchData();
  },
  methods: {
    ...mapActions(['getAllJobByAllGroup']),
    popupEventHandler(event) {
      if (event.type == "action") {
        if (event.value == "cancel") {
          this.isDialogShow = false;
          this.dialogValue = {};
        }else if(event.value == "confirm"){
          this.isDialogShow = false;
          this.dialogType = "confirm";
          this.dialogValue = { str:'changingPaper' };
          this.isDialogShow = true;
        }
      }else if (event.type == "confirm-start-job") {
        if (event.value.str == "cancel") {
          this.isDialogShow = false;
        } else if (event.value.str == "yes") {
          this.$router.replace({
            name: "Operating",
            params: {
              group: event.value.group,
            },
          });
        }
      }
    },
    confirmChangePaper(){
      this.dialogType = 'confirm';
      this.dialogValue = {str:'confirmChangePaper'};
      this.isDialogShow = true;
    },
    showDialog(type) {
      if (type == "confirmDelete") {
        this.dialogType = "confirm";
        this.dialogValue = { str: "delete" };
      } else {
        this.dialogType = type;
        this.dialogValue = { str: "createJob" };
      }
      this.isDialogShow = true;
    },
    parseDateFromDB(date){
      var date = new Date(date);
      return date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
    },
    fetchData(){
      this.overlay = true;
      API.groups.listWithJobs({
        orderBy:'order',
        direction:'ASC'
      }).then((response) => {
        this.overlay = false;
        if (response.successful) {
          if (response.data.length) {
            this.isNotHasData = false;
            this.items = response.data;
          } else {
            this.isNotHasData = true;
          }
        }else{
          this.dialogType = 'error';
          this.dialogValue = { errorMessage: 'กรุณาลองอีกครั้ง'};
          this.isDialogShow = true;
        }
      });
    },
    startJob(group) {
      this.dialogType = "confirm";
      this.dialogValue = { str: "startJob", group: group };
      this.isDialogShow = true;
    },
  },
  computed: {
    ...mapGetters(["getAllJobByAllGroupData"])
  },
  watch: {
    getAllJobByAllGroupData(newValue, oldValue) {
      if(newValue!= undefined){
        this.items = newValue;
      }
    }
  },
  sockets: {
    connect: function() {
      console.log("socket connected");
    },
    CHECK_HOST_C: function(data) {
      console.log('Requested host c check at',data);
      this.$socket.emit('CHECK_HOST_C_RESPONSE',data);
    },
    START_WORK:function(data){
      console.log('->This in HomJobList>Scockets>START_WORK:');
      console.log('Start work from server',data);
      this.$router.replace({name:'Operating',params:{
            group:data
          }});
    }
  },
};
</script>
<style scoped>
.list-class {
  width: 95%;
  overflow: auto;
}
.handle {
  width: auto;
}
</style>
