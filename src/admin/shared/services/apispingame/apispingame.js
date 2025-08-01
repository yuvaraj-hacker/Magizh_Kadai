import axios from "axios";
import apiurl from "../../../../shared/services/apiendpoint/apiendpoint";
import { gettoken } from "../../../../shared/services/Token/token";


export const getalldata = async(params)=>{
   var res=await axios.get(`${apiurl()}/spingame/apigetalldata`,{params:params, headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}
export const getuniquevaluebyfield = async(params)=>{
   console.log(params)
   var res=await axios.get(`${apiurl()}/spingame/apigetuniquevaluebyfield`,{params:params});
   return res.data;
}

export const deletedata=async(id)=>{
   var res=await axios.delete(`${apiurl()}/spingame/apideletedata`,{params:{_id:id}, headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}
