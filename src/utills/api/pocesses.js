import axios from "axios";
var instance = axios.create({
    baseURL: "http://localhost:3000/processes",
    adapter: require("axios/lib/adapters/http"),
    });
export async function checkNCClientConnect(){
      var result;
      try{
        result = await instance.get("/check-nc-client-connect");
        result = result.data;
      }catch(error){
        result = error.response.data;
      }finally{
        return result;
      }
} 
