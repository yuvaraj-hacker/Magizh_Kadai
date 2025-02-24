import axios from "axios";
import apiurl from "../../../../shared/services/apiendpoint/apiendpoint";
import { gettoken } from "../../../../shared/services/Token/token";

export const getalllocation = async(params)=>{
  var res=await axios.get(`${apiurl()}/location/apigetalllocation`,{params:params, headers: {"Authorization" : `Bearer ${gettoken()}`}});
  return res.data;
}

export const getFilterOptions = async(data)=>{
  var res=await axios.post(`${apiurl()}/location/getfilteroptions`,{field:data},{headers: {"Authorization" : `Bearer ${gettoken()}`}});
  return res.data;
}

export const savelocation = async (datas) => {
  try {
    const res = await axios.post(`${apiurl()}/location/apisavelocation`,datas,{ headers: {"Authorization" : `Bearer ${gettoken()}`}});
return res.data;

} catch (error) {
    console.error("Error saving Location:", error);
    throw error;
}
};

export const updatelocation = async (datas) => {
  const res = await axios.put(`${apiurl()}/location/apiupdatelocation`,datas,{params: { _id: datas?._id },headers: {"Authorization" : `Bearer ${gettoken()}`}});
  return res.data;
};



export const deletelocation=async(id)=>{
   var res = await axios.delete(`${apiurl()}/location/apideletelocation`,{params:{_id:id}, headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}

export const getLocationbyCity = async(params)=>{
  var res = await axios.post(`${apiurl()}/location/apilocationbycity`,params,{ headers: {"Authorization" : `Bearer ${gettoken()}`}});
  return res.data;
}

// export const searchcategory = async(datas)=>{
//    var res=await axios.post(`${apiurl()}/users/apisearchcategory`,datas,{ headers: {"Authorization" : `Bearer ${gettoken()}`}});
//    return res.data;
// }
