import axios from "axios";
var instance = axios.create({
    baseURL: process.env.VUE_APP_API_HOST+"/groups",
    adapter: require("axios/lib/adapters/http"),
    });
export async function listWithJobs(option){
      var result;
      try{
        result = await instance.get("/list-with-jobs",
        {
          params:{
            ...option
          } 

        }
        );
        result = result.data;
      }catch(error){
        result = error.response.data;
      }finally{
        return result;
      }
} 

export async function updateList(groups){
  var result;
  try{
    result = await instance.patch("/bulk-update",groups);
    result = result.data;
  }catch(error){
    result = error.response.data;
  }finally{
    return result;
  }
} 

export async function createWithJobs(jobs){
  var result;
  try{
    result = await instance.post("/create-with-jobs",jobs);
    result = result.data;
  }catch(error){
    result = error.response.data;
  }finally{
    return result;
  }
} 

export async function updateJobsInGroup(data){
  var result;
  try{
    result = await instance.patch("/update-jobs-in-group",data);
    result = result.data;
  }catch(error){
    result = error.response.data;
  }finally{
    return result;
  }
} 

export async function getWithJobs(id){
  var result;
  try{
    result = await instance.get("/get-with-jobs/"+id,);
    result = result.data;
  }catch(error){
    result = error.response.data;
  }finally{
    return result;
  }
} 