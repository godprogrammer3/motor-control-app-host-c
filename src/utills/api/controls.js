import axios from "axios";
var instance = axios.create({
    baseURL: "http://192.168.43.49:3000/control",
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

export async function addWasteBySheet(sheets){
  var result;
  try{
    result = await instance.post("/addWastePaperSheet",{
      sheets:sheets
    });
    const response = responseSuccess;
    responseSuccess.data = result;
    return response;
  }catch(error){
    const response = responseFailed;
    response.data = error?.response?.data;
    return response;
  }
} 

export async function addWasteByLenght(lenght){
  var result;
  try{
    result = await instance.post("/addWastePaperLenght",{
      lenght:lenght
    });
    const response = responseSuccess;
    responseSuccess.data = result;
    return response;
  }catch(error){
    const response = responseFailed;
    response.data = error?.response?.data;
    return response;
  }
} 

export async function addPaperSheet(sheets){
  var result;
  try{
    result = await instance.post("/addPaperSheet",{
      sheets:sheets
    });
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