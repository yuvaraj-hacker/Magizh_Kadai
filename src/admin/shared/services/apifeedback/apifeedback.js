import axios from "axios";
import apiurl from "../../../../shared/services/apiendpoint/apiendpoint";
import { gettoken } from "../../../../shared/services/Token/token";

export const getallfeedback = async(params)=>{
   var res=await axios.get(`${apiurl()}/feedback/apigetfeedback`,{headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}

