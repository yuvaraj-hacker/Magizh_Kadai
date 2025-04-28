import axios from "axios";
import apiurl from "../../../../shared/services/apiendpoint/apiendpoint";
import { gettoken } from "../../../../shared/services/Token/token";

export const getallpurchases = async(params)=>{
   var res = await axios.get(`${apiurl()}/purchase/apigetallpurchase`,{params:params, headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}

export const getFilterOptions = async(data)=>{
    var res= await axios.post(`${apiurl()}/purchase/getfilteroptions`,{field:data},{headers: {"Authorization" : `Bearer ${gettoken()}`}});
    return res.data;
}

export const savepurchase=async(formdata)=>{
    var res=await axios.post(`${apiurl()}/purchase/apisavepurchase`,formdata,{ headers: {"Authorization" : `Bearer ${gettoken()}`}});
    return res.data;
}

export const updatepurchase = async(formData)=>{
   var res=await axios.put(`${apiurl()}/purchase/apiupdatepurchase`,formData,{params:{_id:formData._id}, headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}

export const deletepurchase = async(id)=>{
   var res = await axios.delete(`${apiurl()}/purchase/apideletepurchase`,{params:{id:id}, headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}

export const getpurchaseitemsbyid = async(Purchase_id)=>{
    var res= await axios.get(`${apiurl()}/purchase/apigetpurchaseitemsbyid`,{params:{Purchase_id},headers: {"Authorization" : `Bearer ${gettoken()}`}});
    return res.data;    
}