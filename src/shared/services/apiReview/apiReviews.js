import axios from "axios";
import apiurl from "../apiendpoint/apiendpoint";
import { gettoken } from "../Token/token";

export const saveReview = async(formData) => {
    try {
        const res = await axios.post(`${apiurl()}/reviews/apisavereview`, formData, { headers: {"Authorization": `Bearer ${gettoken()}`,"Content-Type": "multipart/form-data" }});
        return res.data;
    } catch(err) {
        console.error("Error saving review:", err);
        throw err;
    }
}

export const apigetallReview = async(params) => {
    try {
        const res = await axios.get(`${apiurl()}/reviews/apigetallreview`,{params:params, headers: {"Authorization" : `Bearer ${gettoken()}`}});
        return res.data
    } catch (error) {
        console.error(error);
    }
}


  
export const updateReview = async ({ _id, formData }) => {
    try {
        const response = await axios.put(`${apiurl()}/reviews/apiupdatereview?_id=${_id}`,formData,{headers: {'Authorization': `Bearer ${gettoken()}`,'Content-Type': 'multipart/form-data', },});
        console.log("Update Review Response:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error in updateReview:', error);
        throw error;
    }
};
