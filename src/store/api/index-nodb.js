class API {
  constructor() {
    this.allJobList = [];
    this.setting = {
      defaultOnTop: 20,
      defaultSlowModeVelocity: 30,
    };
  }
  getAllJobList() {
    return this.allJobList;
  }

  deleteJob(jobId) {
    this.allJobList = this.allJobList.filter((value) => value.jobId !== jobId);
  }
  createJob(job) {
    job.onTop = 20;
    job.overhead = 0;
    this.allJobList.push(job);
  }
  editJob(job) {
    for (let i = 0; i < this.allJobList.length; i++) {
      if (this.allJobList[i].jobId === job.oldJobId) {
        const tmp = {
          jobId: job.jobId,
          length: job.length,
          workTime: job.workTime,
        };
        this.allJobList[i] = tmp;
      }
    }
  }

  getJobListByDate(type, value) {
    let result = [];
    if (type === "date") {
      result = this.allJobList.filter((item) => item.workTime == value);
    } else if (type === "month") {
      result = this.allJobList.filter(
        (item) => item.workTime.substring(0, 7) == value
      );
    } else {
      result = this.allJobList.filter(
        (item) => item.workTime.substring(0, 4) == value
      );
    }
    return result;
  }
  getSetting() {
    return this.setting;
  }
  editSetting(setting) {
    this.setting = setting;
  }
}
export default API;
