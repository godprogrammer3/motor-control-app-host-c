import Vue from "vue";
import Vuex from "vuex";
import API from "./api";
import moment from "moment";
const api = new API();
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allJobList: [],
    fillterJobList: [],
    setting: {},
    allJobByAllGroup: [],
    allHistoryJobByAllGroup: [],
    allGroup: [],
  },
  mutations: {
    UPDATE_JOBLIST(state, data) {
      state.allJobList = data;
    },
    UPDATE_FILLTER_JOBLIST(state, data) {
      state.fillterJobList = data;
    },
    UPDATE_SETTING(state, data) {
      state.setting = data;
    },
    UPDATE_ALL_JOB_BY_ALL_GROUP(state, data) {
      state.allJobByAllGroup = data;
    },
    UPDATE_ALL_HISTORY_JOB_BY_ALL_GROUP(state, data) {
      state.allHistoryJobByAllGroup = data;
    },
    UPDATE_ALL_GROUP(state, data) {
      state.allGroup = data;
    },
  },
  actions: {
    async getAllJobByAllGroup({ commit }, payload) {
      let result = await api.getAllJobByAllGroup();
      this.commit("UPDATE_ALL_JOB_BY_ALL_GROUP", result);
      result = await api.getAllGroup();
      this.commit("UPDATE_ALL_GROUP", result);
    },
    async getAllHistoryJobByAllGroup({ commit }, payload) {
      let result = await api.getAllHistoryJobByAllGroup();
      this.commit("UPDATE_ALL_HISTORY_JOB_BY_ALL_GROUP", result);
    },
    async reorderGroup({ commit }, payload) {
      let result = await api.reorderGroup(payload);
      result = await api.getAllJobByAllGroup();
      this.commit("UPDATE_ALL_JOB_BY_ALL_GROUP", result);
      result = await api.getAllGroup();
      this.commit("UPDATE_ALL_GROUP", result);
    },
    async updateInGroup({ commit }, payload) {
      let result = await api.updateInGroup(payload);
      result = await api.getAllJobByAllGroup();
      this.commit("UPDATE_ALL_JOB_BY_ALL_GROUP", result);
      result = await api.getAllGroup();
      this.commit("UPDATE_ALL_GROUP", result);
    },
    async deleteJob({ commit }, payload) {
      let result = await api.deleteJob(payload);
      result = await api.getAllJobByAllGroup();
      this.commit("UPDATE_ALL_JOB_BY_ALL_GROUP", result);
      result = await api.getAllGroup();
      this.commit("UPDATE_ALL_GROUP", result);
    },
    async createJob({ commit }, payload) {
      let result = await api.createJob(payload);
      result = await api.getAllJobByAllGroup();
      this.commit("UPDATE_ALL_JOB_BY_ALL_GROUP", result);
      result = await api.getAllGroup();
      this.commit("UPDATE_ALL_GROUP", result);
    },
    async editJob({ commit }, payload) {
      let result = await api.editJob(payload);
      result = await api.getAllJobByAllGroup();
      this.commit("UPDATE_ALL_JOB_BY_ALL_GROUP", result);
    },
    async getJobListByDate({ commit }, payload) {
      let result = await api.getJobListByDate(payload.type, payload.value);
      this.commit("UPDATE_FILLTER_JOBLIST", result);
    },
    async getSetting({ commit }, payload) {
      let result = await api.getSetting();
      this.commit("UPDATE_SETTING", result);
    },
    async editSetting({ commit }, payload) {
      let result = await api.editSetting(payload);
      this.commit("UPDATE_SETTING", payload);
    },
    async createGroupWithJob({ commit }, payload) {
      let result = await api.createGroupWithJob(payload);
      result = await api.getAllJobByAllGroup();
      this.commit("UPDATE_ALL_JOB_BY_ALL_GROUP", result);
      result = await api.getAllGroup();
      this.commit("UPDATE_ALL_GROUP", result);
    },
    changeOnTopWork({ commit }, payload) {
      api.changeOnTopWork(payload);
    },
    changeOffsetWork({ commit }, payload) {
      api.changeOffsetWork(payload);
    },
    startWork({ commit }, payload) {
      api.startWork(payload);
    },
    processWork({ commit }, payload) {
      api.processWork(payload);
    },
    stopWork({ commit }, payload) {
      api.stopWork(payload);
    },
    changeTargetWork({ commit }, payload) {
      api.changeTargetWork(payload);
    },
    setModeWork({ commit }, payload) {
      api.setModeWork(payload);
    },
    setSlowWork({ commit }, payload) {
      api.setSlowWork(payload);
    },
  },
  getters: {
    getSettingData: (state) => {
      if (state.setting == undefined) {
        return [];
      } else {
        return state.setting;
      }
    },
    getAllJobByAllGroupData: (state) => {
      if (state.allJobByAllGroup.length == 0 || state.allGroup.length == 0) {
        return [];
      } else {
        return state.allJobByAllGroup;
      }
    },
    getAllHistoryJobByAllGroupData: (state) => {
      if (state.allHistoryJobByAllGroup.length == 0) {
        return [];
      } else {
        return state.allHistoryJobByAllGroup;
      }
    },
    getHistoryJoblist: (state) => {
      let result = [];
      for (var i = 0; i < state.fillterJobList.length; i++) {
        result.push({
          no: i + 1,
          workNo: state.fillterJobList[i].jobId,
          length: state.fillterJobList[i].length,
          offset: state.fillterJobList[i].overhead,
          total:
            state.fillterJobList[i].length + state.fillterJobList[i].overhead,
          startedTime: moment(state.fillterJobList[i].startedTime).format(
            "YYYY-MM-DD"
          ),
          usedTime:
            moment(state.fillterJobList[i].startedTime).format("HH:mm") +
            "-" +
            moment(state.fillterJobList[i].finishedTime).format("HH:mm"),
        });
      }
      return result;
    },
    getJoblist: (state) => {
      let result = [];
      for (var i = 0; i < state.allJobList.length; i++) {
        result.push({
          no: i + 1,
          workNo: state.allJobList[i].jobId,
          length: state.allJobList[i].length,
          workDate: moment(state.allJobList[i].workTime + "").format(
            "YYYY-MM-DD"
          ),
        });
      }
      return result;
    },
    getAllDateInJobList(state) {
      var self = this;
      var set = new Set();
      return function(month, year) {
        set.clear();
        for (var i = 0; i < state.allJobList.length; i++) {
          let date = moment(state.allJobList[i].workTime);

          if (date.month() + 1 == month && date.year() == year) {
            set.add(date.format("D"));
          }
        }
        let result = Array.from(set);
        result.sort();
        return result;
      };
    },
    getAllMonthInJobList(state) {
      var self = this;
      let set = new Set();
      return function(year) {
        set.clear();
        for (var i = 0; i < state.allJobList.length; i++) {
          let date = moment(state.allJobList[i].workTime);
          if (date.year() == year) {
            set.add(date.format("M"));
          }
        }
        let result = Array.from(set);
        result.sort();
        return result;
      };
    },
    getAllYearInJobList: (state) => {
      let set = new Set();
      set.clear();
      for (var i = 0; i < state.allJobList.length; i++) {
        set.add(moment(state.allJobList[i].workTime + "").format("YYYY"));
      }
      let result = Array.from(set);
      return result;
    },
    getSumaryHistoryJob: (state) => {
      let total = 0,
        sumLength = 0,
        sumOffet = 0,
        summary = 0;
      for (var i = 0; i < state.fillterJobList.length; i++) {
        sumLength += state.fillterJobList[i].length;
        sumOffet += state.fillterJobList[i].overhead;
      }
      summary = sumLength + sumOffet;
      total = state.fillterJobList.length;
      return {
        total: total,
        sumLength: sumLength,
        sumOffet: sumOffet,
        summary: summary,
      };
    },
  },
  modules: {},
});
