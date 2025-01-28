import axios from "axios";
import apiurl from "../../../../shared/services/apiendpoint/apiendpoint";
import { gettoken } from "../../../../shared/services/Token/token";

export const getallusers = async(params)=>{
   var res=await axios.get(`${apiurl()}/users/apigetalluser`,{params:params, headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}

export const getFilterOptions = async(data)=>{
   var res=await axios.post(`${apiurl()}/users/getfilteroptions`,{field:data},{headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}



export const saveusers = async (datas) => {
  try {
    const res = await axios.post(`${apiurl()}/users/apisaveuser`,datas,{ headers: {"Authorization" : `Bearer ${gettoken()}`}});
return res.data;

} catch (error) {
    console.error("Error saving Location:", error);
    throw error;
}
};

export const updateusers = async (datas) => {
  try {
    const res = await axios.put(`${apiurl()}/users/apiupdateuser`,datas,{params: { _id: datas?._id },headers: {"Authorization" : `Bearer ${gettoken()}`}});
return res.data;

} catch (error) {
    console.error("Error saving Location:", error);
    throw error;
}
};
 


export const deleteusers=async(id)=>{
   var res=await axios.delete(`${apiurl()}/location/apideleteuser`,{params:{_id:id}, headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}

// export const searchcategory = async(datas)=>{
//    var res=await axios.post(`${apiurl()}/users/apisearchcategory`,datas,{ headers: {"Authorization" : `Bearer ${gettoken()}`}});
//    return res.data;
// }
