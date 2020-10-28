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
        style="height:73vh;"
      >
        <draggable
          v-model="items"
          :disabled="isDragableDisabled"
          handle=".handle"
        >
          <v-list-item v-for="(item, index) in items" :key="index">
            <v-card width="100%" class="mb-5 rounded-xl">
              <v-toolbar
                :color="item.is_continue ? 'indigo' : 'orange'"
                height="95"
              >
                <v-toolbar-title class="text-h5 white--text ml-5 nocopy"
                  >กลุ่มหมายเลข {{ item.group_id }}</v-toolbar-title
                >
              </v-toolbar>
              <v-container fluid fill-height>
                <v-row align="center" justify="center">
                  <v-col cols="12">
                    <v-simple-table>
                      <template v-slot:default>
                        <tbody>
                          <tr
                            v-for="(sub_item, sub_index) in item.job"
                            :key="sub_index"
                          >
                          <v-row align="center" justify="center" style="width:90vw;">
                            <v-col align="center" justify="center"><span>{{ sub_index + 1 }}</span></v-col>
                            <v-col align="center" justify="center"><span>{{ sub_item.job_id }}</span></v-col>
                            <v-col align="center" justify="center"><span>{{ sub_item.width}}</span></v-col>
                            <v-col align="center" justify="center"><span>{{ sub_item.height}}</span></v-col>
                            <v-col align="center" justify="center"><span> {{ sub_item.sheet}}</span></v-col>
                            <v-col align="center" justify="center"><span>{{ sub_item.height * sub_item.sheet / 100.0}}</span></v-col>
                            <v-col align="center" justify="center"><span> {{ parseDateFromDB(sub_item.work_date) }}</span></v-col>
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
          เปลี่ยนกระดาษ
        </v-btn>
      </v-col>
    </v-row>
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
import Popup from "@/components/Popup.vue";
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
  mounted() {
    this.overlay = true;
    this.getAllJobByAllGroup().then(()=>{this.items = this.getAllJobByAllGroupData ,this.overlay = false;});
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
