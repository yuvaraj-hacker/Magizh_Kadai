import axios from "axios";
import apiurl from "../../../../shared/services/apiendpoint/apiendpoint";
import { gettoken } from "../../../../shared/services/Token/token";


export const savereturn = async (datas) => {
    try {
      const formData = new FormData();
      for (const key in datas) {
        if (key === 'Images') {
          for (let i = 0; i < datas['Images'].length; i++) {
            formData.append('Images', datas['Images'][i]); // Important: Images[]
          }
        } else {
          formData.append(key, datas[key]);
        }
      }
      const res = await axios.post(
        `${apiurl()}/returngift/apisavereturn`,
        formData,
        { headers: { "Authorization": `Bearer ${gettoken()}` } }
      );
      return res.data;
    } catch (err) {
      console.log(err);
      throw err; // important so that handlesave can catch
    }
  };


export const getallreturns = async(params)=>{
    var res=await axios.get(`${apiurl()}/returngift/apigetallreturngift`,{params:params, headers: {"Authorization" : `Bearer ${gettoken()}`}});
    return res.data;
  }

  export const getreturnitemsbyid = async(Purchase_id)=>{
    var res= await axios.get(`${apiurl()}/returngift/apigetreturngiftsbyid`,{params:{Purchase_id},headers: {"Authorization" : `Bearer ${gettoken()}`}});
    return res.data;
}