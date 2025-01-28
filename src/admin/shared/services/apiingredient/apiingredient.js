import axios from "axios";
import apiurl from "../../../../shared/services/apiendpoint/apiendpoint";
import { gettoken } from "../../../../shared/services/Token/token";

export const getallingredient = async(params)=>{
   var res=await axios.get(`${apiurl()}/ingredient/apigetallingredient`,{params:params, headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}

export const getFilterOptions = async(data)=>{
   var res=await axios.post(`${apiurl()}/ingredient/getfilteroptions`,{field:data},{headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}



export const saveingredient = async (formData) => {
  try {
      const res = await axios.post(`${apiurl()}/ingredient/apisaveingredient`,formData, { headers: {"Content-Type": "multipart/form-data","Authorization": `Bearer ${gettoken()}`}}
      );
      return res.data;
  } catch (error) {
      console.error("Error saving ingredient:", error);
      throw error;
  }
};


export const updateingredient = async (formdata) => {
  console.log('Apiformdata:',formdata)
  try {
    const res = await axios.put(`${apiurl()}/ingredient/apiupdateingredient`,formdata,{params: { _id: formdata?._id },headers: {"Content-Type": "multipart/form-data","Authorization" : `Bearer ${gettoken()}`}});
return res.data;

} catch (error) {
    console.error("Error saving Location:", error);
    throw error;
}
};
 


export const deleteingredient=async(id)=>{
   var res=await axios.delete(`${apiurl()}/ingredient/apideleteingredient`,{params:{_id:id}, headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}

// export const searchcategory = async(datas)=>{
//    var res=await axios.post(`${apiurl()}/users/apisearchcategory`,datas,{ headers: {"Authorization" : `Bearer ${gettoken()}`}});
//    return res.data;
// }
