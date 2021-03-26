import axios from "axios";
class API {
  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:3000",
      adapter: require("axios/lib/adapters/http"),
    });
  }
  async reorderGroup(groups) {
    try {
      var newGroup = [];
      for (var i = 0; i < groups.length; i++) {
        newGroup.push({
          group_id: groups[i].group_id,
          group_order: i + 1,
          is_continue: groups[i].is_continue,
        });
      }
      var result = await this.instance.post("/reorderGroup", newGroup);
      if (result.status === 200) {
        return result.data;
      } else {
        throw new Error("Error : " + result.status);
      }
    } catch (e) {
      console.log(e);
    }
  }
  async updateInGroup(payload) {
    try {
      var result = await this.instance.post("/updateInGroup", payload);
      if (result.status === 200) {
        return result.data;
      } else {
        throw new Error("Error : " + result.status);
      }
    } catch (e) {
      console.log(e);
    }
  }
  async createGroupWithJob(group) {
    try {
      var newGroup = [];
      group.forEach((element) => {
        element.job.forEach((sub_job) => {
          if (sub_job.isSelected) {
            newGroup.push(sub_job);
          }
        });
      });
      if (newGroup.length <= 1) {
        return -1;
      } else {
        var result = await this.instance.post("/createGroupWithJob", newGroup);
        if (result.status === 200) {
          return result.data;
        } else {
          throw new Error("Error : " + result.status);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
  async getAllGroup() {
    try {
      var result = await this.instance.get("/getAllGroup");
      if (result.status === 200) {
        return result.data;
      } else {
        throw new Error("Error : " + result.status);
      }
    } catch (e) {
      console.log(e);
    }
  }
  async getAllJobByAllGroup() {
    try {
      var result = await this.instance.get("/getAllJobByAllGroup");
      if (result.status === 200) {
        return result.data;
      } else {
        throw new Error("Error : " + result.status);
      }
    } catch (e) {
      console.log(e);
    }
  }
  async getAllHistoryJobByAllGroup() {
    try {
      var result = await this.instance.get("/getAllHistoryJobByAllGroup");
      if (result.status === 200) {
        return result.data;
      } else {
        throw new Error("Error : " + result.status);
      }
    } catch (e) {
      console.log(e);
    }
  }
  async getAllJobList() {
    try {
      var result = await this.instance.get("/getAllJobList");
      if (result.status === 200) {
        return result.data;
      } else {
        throw new Error("Error : " + result.status);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async deleteJob(job) {
    try {
      var result = await this.instance.delete(`/deleteJob/${job.job_id}`);
      if (result.status === 200) {
        return result.data;
      } else {
        throw new Error("Error : " + result.status);
      }
    } catch (e) {
      console.log(e);
    }
  }
  async createJob(job) {
    try {
      var result = await this.instance.post("/createJob", job);
      if (result.status === 200) {
        return result.data;
      } else {
        throw new Error("Error : " + result.status);
      }
    } catch (e) {
      console.log(e);
      return -1;
    }
  }
  async editJob(job) {
    try {
      var result = await this.instance.put("/editJob", job);
      if (result.status === 200) {
        return result.data;
      } else {
        throw new Error("Error : " + result.status);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async getJobListByDate(type, value) {
    try {
      var result = await this.instance.get("/getJobListByDate", {
        params: {
          type: type,
          value: value,
        },
      });
      if (result.status === 200) {
        return result.data;
      } else {
        throw new Error("Error : " + result.status);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async getSetting() {
    try {
      var result = await this.instance.get("/getSetting");
      if (result.status === 200) {
        return result.data;
      } else {
        throw new Error("Error : " + result.status);
      }
    } catch (e) {
      console.log(e);
    }
  }
  async editSetting(setting) {
    try {
      var result = await this.instance.put("/editSetting", setting);
      if (result.status === 200) {
        return result.data;
      } else {
        throw new Error("Error : " + result.status);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async getLastHistoryDate() {
    try {
      var result = await this.instance.get("/getLastHistoryDate");
      if (result.status === 200) {
        return result.data;
      } else {
        throw new Error("Error : " + result.status);
      }
    } catch (e) {
      console.log(e);
    }
  }
  async getHistoryJobByQuery(query) {
    try {
      let result;
      if (query.type == "day") {
        result = await this.instance.get(
          `/getHistoryJobByQueryDate?date=${query.day}&month=${query.month}&year=${query.year}`
        );
      } else if (query.type == "month") {
        result = await this.instance.get(
          `/getHistoryJobByQueryMonth?month=${query.month}&year=${query.year}`
        );
      } else if (query.type == "year") {
        result = await this.instance.get(
          `/getHistoryJobByQueryYear?year=${query.year}`
        );
      }
      if (result.status === 200) {
        return result.data;
      } else {
        throw new Error("Error : " + result.status);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async getAllYearHistory() {
    try {
      let result = await this.instance.get("/getAllYearHistory");
      if (result.status === 200) {
        return result.data;
      } else {
        throw new Error("Error : " + result.status);
      }
    } catch (e) {
      console.log(e);
    }
  }
  async getAllMonthHistory(query) {
    try {
      let result = await this.instance.get(
        `/getAllMonthHistory?year=${query.year}`
      );
      if (result.status === 200) {
        return result.data;
      } else {
        throw new Error("Error : " + result.status);
      }
    } catch (e) {
      console.log(e);
    }
  }
  async getAllDayHistory(query) {
    try {
      let result = await this.instance.get(
        `/getAllDayHistory?year=${query.year}&month=${query.month}`
      );
      if (result.status === 200) {
        return result.data;
      } else {
        throw new Error("Error : " + result.status);
      }
    } catch (e) {
      console.log(e);
    }
  }

  startWork(work) {
    this.instance.post("/start", work);
  }
  processWork(work) {
    this.instance.post("/process", work);
  }
  stopWork(work) {
    this.instance.post("/stop", work);
  }
  changeTargetWork(target) {
    this.instance.put("/changeTarger", target);
  }
  changeOnTopWork(onTop) {
    this.instance.put("/changeOnTop", onTop);
  }
  changeOffsetWork(onTop) {
    this.instance.put("/changeOffset", onTop);
  }
  setModeWork(mode) {
    this.instance.put("/setMode", mode);
  }
  setSlowWork(isSlow) {
    this.instance.put("/setSlow", isSlow);
  }
  changePaper() {
    this.instance.get("/changePaper");
  }
  finishChangePaper() {
    this.instance.get("/finishChangePaper");
  }
  async addWasteInitial(wastePaper) {
    try {
      var result = await this.instance.put(
        `/addWasteInitial?wastePaper=${wastePaper}`
      );
      if (result.status == 204) {
        return { status: 0 };
      } else {
        return { status: result.status, value: result.data };
      }
    } catch (error) {
      console.log(error);
      return { status: -1 };
    }
  }
}
export default API;
