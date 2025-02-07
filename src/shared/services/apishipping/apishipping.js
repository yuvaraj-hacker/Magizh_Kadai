import axios from "axios";
import apiurl from "../apiendpoint/apiendpoint";
import { gettoken } from "../Token/token";

    export const apigetallShipping = async(params) => {
        try {
            const res = await axios.get(`${apiurl()}/shipping/apigetallshippingAddress`,{params:params, headers: {"Authorization" : `Bearer ${gettoken()}`}});
            return res.data
        } catch (error) {
            console.error(error);
        }
    }

export const saveShipping = async(datas)=>{
    try {
       var res=await axios.post(`${apiurl()}/shipping/apisaveshippingAddress`,datas,{ headers: {"Authorization" : `Bearer ${gettoken()}`}});
       return res.data;
    }
    catch(err){
       console.log(err);
    }
}

export const updateShipping = async(datas)=>{
    try {
        var res=await axios.put(`${apiurl()}/shipping/apiupdateshippingAddress`,datas,{params:{_id:datas?._id}, headers: {"Authorization" : `Bearer ${gettoken()}`}});
        return res.data;
    }
    catch(err){
       console.log(err);
    }
}

export const deleteShipping = async(_id)=>{
    try {
        const res=await axios.delete(`${apiurl()}/shipping/apideleteshippingAddress`,{params:{_id}, headers: {"Authorization" : `Bearer ${gettoken()}`}});
        return res.data;
    }
    catch(err){
       console.log(err);
    }
}