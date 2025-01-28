import axios from "axios";
import apiurl from "../apiendpoint/apiendpoint";
import { gettoken } from "../Token/token";

const apigetallShipping = async(params) => {
    try {
        const res = await axios.get(`${apiurl()}/shipping/apigetallshippingAddress`,{params:params, headers: {"Authorization" : `Bearer ${gettoken()}`}});
        return res.data
    } catch (error) {
        console.error(error);
    }
}

const saveShipping = async(datas)=>{
    try {
       var res=await axios.post(`${apiurl()}/shipping/apisaveshippingAddress`,datas,{ headers: {"Authorization" : `Bearer ${gettoken()}`}});
       return res.data;
    }
    catch(err){
       console.log(err);
    }
}

const updateShipping = async(datas)=>{
    try {
        var res=await axios.put(`${apiurl()}/shipping/apiupdateshippingAddress`,datas,{params:{_id:datas?._id}, headers: {"Authorization" : `Bearer ${gettoken()}`}});
        return res.data;
    }
    catch(err){
       console.log(err);
    }
}

export { apigetallShipping, saveShipping, updateShipping };