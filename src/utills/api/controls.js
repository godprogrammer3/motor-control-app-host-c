import axios from "axios";
import { environtment } from "../../config/environment";
var instance = axios.create({
    baseURL: environtment.API_HOST+"/control",
    adapter: require("axios/lib/adapters/http"),
    });
export async function startWork(id){
      var result;
      try{
        result = await instance.get("/start/"+id);
        const response = responseSuccess;
        responseSuccess.data = result;
        return response;
      }catch(error){
        const response = responseFailed;
        response.data = error?.response?.data;
        return response;
      }
} 

const responseSuccess = {
    successful:true,
    errorCode:"00",
    statusCode: 200,
    message:"Success",
    data: {}
}

const responseFailed = {
    successful:false,
    errorCode:"99",
    statusCode: 500,
    message:"Unknown Server Error",
    data: null
}