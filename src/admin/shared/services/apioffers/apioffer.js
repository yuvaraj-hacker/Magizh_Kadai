import axios from "axios";
import apiurl from "../../../../shared/services/apiendpoint/apiendpoint";
import { gettoken } from "../../../../shared/services/Token/token";

export const getalloffers = async()=>{
   var res=await axios.get(`${apiurl()}/offers/apigetoffer`,{headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}

export const getFilterOptions = async(data)=>{
   var res=await axios.post(`${apiurl()}/ingredient/getfilteroptions`,{field:data},{headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}



export const saveoffers = async (formdata) => {
  console.log(formdata);
  try {
    const res = await axios.post( `${apiurl()}/offers/apisaveoffer`, formdata, {headers: {"Content-Type": "application/json","Authorization": `Bearer ${gettoken()}`}});
    return res.data;
  } catch (error) {
    console.error("Error saving offer:", error);
    throw error;
  }
};


export const updateoffers = async (datas) => {
  try {
    const res = await axios.put(`${apiurl()}/offers/apiupdateoffer`,datas,{params: { _id: datas?._id },headers: {"Authorization" : `Bearer ${gettoken()}`}});
return res.data;

} catch (error) {
    console.error("Error saving Location:", error);
    throw error;
}
};
 


export const deleteoffers=async(id)=>{
   var res=await axios.delete(`${apiurl()}/offers/apideleteoffer`,{params:{_id:id}, headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}

// export const searchcategory = async(datas)=>{
//    var res=await axios.post(`${apiurl()}/users/apisearchcategory`,datas,{ headers: {"Authorization" : `Bearer ${gettoken()}`}});
//    return res.data;
// }
