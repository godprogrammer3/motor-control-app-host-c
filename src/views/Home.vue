<template>
  <div>
    <v-app-bar color="indigo darken-4" style="height: 70px" flat>
      <v-toolbar-title style="color: white" class="text-h4 ml-10"
        >แผนการดำเนินงาน</v-toolbar-title
      >

      <v-spacer></v-spacer>
      <span style="margin: 20px; color: white" class="text-h5">{{
        datenow
      }}</span>
    </v-app-bar>
    <HomeJobList
      @handle-event="handleEvent"
    ></HomeJobList>
  </div>
</template>

<script>
// @ is an alias to /src
import moment from "moment";
import HomeJobList from "@/components/HomeJobList.vue";
import { mapActions } from "vuex";

export default {
  components: {
    HomeJobList,
  },
  data() {
    return {
      isDialogShow: false,
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
    showDialog(data) {
      this.isDialogShow = true;
      this.dialogInfo = data;
      if (this.dialogInfo.type === "edit") {
        this.workNo = this.dialogInfo.item.workNo;
        this.length = this.dialogInfo.item.length;
        this.dialogInfo.item.oldWorkNo = this.dialogInfo.item.workNo;
        this.date = this.dialogInfo.item.workDate;
      } else {
        this.workNo = this.dialogInfo.item.workNo;
        this.length = this.dialogInfo.item.length;
      }
    },
    async deleteJobAction() {
      await this.deleteJob(this.dialogInfo.item.workNo);
      this.isDialogShow = false;
    },
    async editJobAction() {
      this.formHasErrors = false;
      Object.keys(this.form).forEach((f) => {
        if (!this.form[f]) this.formHasErrors = true;
        this.$refs[f].validate(true);
      });
      if (!this.formHasErrors) {
        await this.editJob({
          jobId: this.workNo,
          length: this.length,
          workTime: this.date,
          oldJobId: this.dialogInfo.item.oldWorkNo,
        });
        this.isDialogShow = false;
      }
    },
    async createJobAction() {
      await this.createJob({
        jobId: this.workNo,
        length: this.length,
        workTime: this.date,
      });
      this.isDialogShow = false;
    },
    showCreateDialog() {
      this.dialogInfo.type = "create";
      this.workNo = "";
      this.length = 0;
      this.date = new Date().toISOString().substr(0, 10);
      this.isDialogShow = true;
    },
  
    ...mapActions(["deleteJob", "createJob", "editJob", "startWork"]),
  },
  computed: {
    form() {
      return {
        workNo: this.workNo,
        length: this.length,
      };
    },
  },
  mounted() {
    this.interval = setInterval(this.dateUpdate, 1800000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  watch: {
    isDialogShow(newValue, oldValue) {
      this.input = "";
    },
  },
};
</script>
<style lang="css">
</style>
