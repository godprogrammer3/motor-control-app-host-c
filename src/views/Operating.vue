<template>
  <div>
    <v-app-bar color="indigo darken-4" style="height:70px" flat>
      <span class="white--text text-h4 mr-5"
        >กลุ่มหมายเลข {{ group.group_id }}</span
      >
      <v-toolbar-title class="white--text text-h4"
        >กำลังดำเนินงาน...</v-toolbar-title
      >
      <span class="white--text text-h4 ml-5"
        >({{ currentJobOrder + 1 }}/{{ group.job.length }} งาน)</span
      >
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
            group.job[currentJobOrder].job_id
          }}</span></v-col
        >
        <v-col align="center" justify="center"
          ><span class="indigo--text text-h5">หน้ากว้าง :</span
          ><span class="text-h5 ml-2">
            {{ group.job[currentJobOrder].width }} นิ้ว</span
          ></v-col
        >
        <v-col align="center" justify="center"
          ><span class="indigo--text text-h5">ความยาวแผ่น :</span
          ><span class="text-h5 ml-2"
            >{{ group.job[currentJobOrder].height }} มม.</span
          ></v-col
        >
        <v-col align="center" justify="center"
          ><span class="indigo--text text-h5">จำนวนแผ่น :</span
          ><span class="text-h5 ml-2"
            >{{ group.job[currentJobOrder].sheet }} แผ่น</span
          ></v-col
        >
        <v-col align="center" justify="center"
          ><span class="indigo--text text-h5">ความยาวงาน :</span
          ><span class="text-h5 ml-2"
            >{{
              (
                (group.job[currentJobOrder].sheet *
                  group.job[currentJobOrder].height) /
                1000
              ).toFixed(2)
            }}
            เมตร</span
          ></v-col
        >
      </v-row>
      <v-row align="center" justify="center" class="mt-5">
        <span class="text-h2 indigo--text">งานเสร็จสิ้น :</span>
        <span class="text-h2 ml-5">5.65 %</span>
      </v-row>
      <v-container>
        <v-row align="center" justify="center">
          <v-col>
            <v-card color="green" class="text-h4 white--text">
              <v-col align="center" justify="center">
                <v-row align="center" justify="center">เสร็จสิ้น</v-row>
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
                <v-row align="center" justify="center">2659</v-row>
                <v-row align="center" justify="center">เมตร</v-row>
              </v-col>
            </v-card>
          </v-col>
          <v-col>
            <v-card color="purple" class="text-h4 white--text">
              <v-col align="center" justify="center">
                <v-row align="center" justify="center">ทั้งหมด</v-row>
                <v-row align="center" justify="center">3348</v-row>
                <v-row align="center" justify="center">เมตร</v-row>
              </v-col>
            </v-card>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col>
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
          <v-col>
            <v-card color="blue" class="text-h4 white--text">
              <v-col align="center" justify="center">
                <v-row align="center" justify="center">เพิ่ม/ลด</v-row>
                <v-row align="center" justify="center">+100</v-row>
                <v-row align="center" justify="center"
                  ><span class="mr-5">แผ่น</span>
                </v-row>
              </v-col>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <footer
        v-if="currentJobOrder + 1 < group.job.length"
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
              group.job[currentJobOrder + 1].job_id
            }}</span></v-col
          >
          <v-col align="center" justify="center"
            ><span class="indigo--text text-h5">หน้ากว้าง :</span
            ><span class="text-h5 ml-2"
              >{{ group.job[currentJobOrder + 1].width }} นิ้ว</span
            ></v-col
          >
          <v-col align="center" justify="center"
            ><span class="indigo--text text-h5">ความยาวแผ่น :</span
            ><span class="text-h5 ml-2"
              >{{ group.job[currentJobOrder + 1].height }} มม.</span
            ></v-col
          >
          <v-col align="center" justify="center"
            ><span class="indigo--text text-h5">จำนวนแผ่น :</span
            ><span class="text-h5 ml-2"
              >{{ group.job[currentJobOrder + 1].sheet }} แผ่น</span
            ></v-col
          >
          <v-col align="center" justify="center"
            ><span class="indigo--text text-h5">ความยาวงาน :</span
            ><span class="text-h5 ml-2"
              >{{
                (
                  (group.job[currentJobOrder + 1].sheet *
                    group.job[currentJobOrder + 1].height) /
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
              style="transform:scale(1.3);"
              v-model="isAutoMode"
              inset
              color="green"
            >
              <template v-slot:label>
                <span :class="isAutoMode ? 'green--text' : 'orange--text'">{{
                  isAutoMode ? "โหมดอัตโนมัติ" : "โหมดแมนนวล"
                }}</span>
                <v-icon
                  style="margin-left:5px;transform:scale(1.2);"
                  x-large
                  :color="isAutoMode ? 'green' : 'orange'"
                >
                  {{ isAutoMode ? "computer" : "person" }}
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
      speed: 0.0,
      isDragableDisabled: false,
      isDialogShow: false,
      dialogType: "",
      dialogValue: "",
      onTop: 30,
      offset: 100,
      isShowHomePopup: false,
      isPersistent: true,
      api: new API(),
      currentJobOrder: 0,
      finishLength: 0.0,
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
    popupEventHandler(event) {
      console.log(event);
      if (event.type == "action") {
        if (event.value == "cancel") {
          this.isDialogShow = false;
          this.dialogValue = {};
        } else if (event.value == "confirm") {
          this.api.changePaper();
          this.isDialogShow = false;
          this.dialogType = "changingPaper";
          this.dialogValue = {};
          this.isDialogShow = true;
        } else if (event.value == "finish") {
          this.api.finishChangePaper();
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
      default: () => {},
    },
  },
  mounted() {
    console.log("-> This is in Operating > mounted");
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
      this.$router.replace({ path: "/" }).catch((error) => {
        console.log("->In operating page:");
        console.log(error);
      });
    },
    Lenght_A: function(data) {
      console.log("-> Log in : Operating>sockets>Lenght_A");
      console.log(data);
      this.finishLength = data;
    },
    Speed_C: function(data) {
      console.log("-> Log in : Operating>sockets>Speed_C");
      console.log(data);
      this.speed = data;
    },
  },
};
</script>

<style></style>
