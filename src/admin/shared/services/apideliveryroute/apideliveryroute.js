import axios from "axios";
import apiurl from "../../../../shared/services/apiendpoint/apiendpoint";
import { gettoken } from "../../../../shared/services/Token/token";


export const getcoordinates = async(params)=>{
    var res=await axios.get(`${apiurl()}/deliveryroute/get-coordinates`,{params:params, headers: {"Authorization" : `Bearer ${gettoken()}`}});
    return res.data;
 }

 export const apigetdeliveryorder = async(params) => {
    try {
        const res = await axios.get(`${apiurl()}/deliveryroute/apigetdeliveryorder`,{params:params, headers: {"Authorization" : `Bearer ${gettoken()}`}});
        return res.data
    } catch (error) {
        console.error(error);
    }
}