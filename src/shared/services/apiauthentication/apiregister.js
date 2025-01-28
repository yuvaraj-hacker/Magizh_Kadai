import axios from "axios";
import apiurl from "../apiendpoint/apiendpoint";
import { gettoken } from "../Token/token";

// const apisendotp = async(data)=>{
//    var res = await axios.post(`${apiurl()}/api/apisendotp`,data);
//    return res.data;
// }

const apiverifyotp = async(data)=>{
   var res = await axios.post(`${apiurl()}/api/apiverifyotp`,data);
   return res.data;
}

const apisendotpforgotpassword = async(data)=>{
   var res = await axios.post(`${apiurl()}/api/apisentotpforgotPassword`,data);
   return res.data;
}

const apiverifyotpforgotpassword = async(data)=>{
   var res = await axios.post(`${apiurl()}/api/apiverifyforgotPasswordotp`,data);
   return res.data;
}

const apiupdatepassword = async(data)=>{
   var res = await axios.put(`${apiurl()}/api/apiupdateforgotPassword`,data);
   return res.data;
}

export const apiRegisterUser = async (userData) => {
   try {
       const res = await axios.post(`${apiurl()}/api/apisendotp`, userData, {
           headers: {
               "Authorization": `Bearer ${gettoken()}`,
               "Content-Type": "application/json"
           }
       });
       return res.data;
   } catch (error) {
       console.error('Registration error:', error);
   }
};

export const apiSaveUserDetails = async (userData) => {
    try {
        const res = await axios.put(`${apiurl()}/api/apisaveuserdata`, userData, {
            headers: {
                "Authorization": `Bearer ${gettoken()}`,
                "Content-Type": "application/json"
            }
        });
        return res.data;
    } catch (error) {
        console.error('Registration error:', error);
    }
 };

// Google Registration API
export const apiGoogleRegister = async (googleData) => {
   try {
       const res = await axios.post(`${apiurl()}/api/google-signin`, googleData, {
           headers: {
               "Authorization": `Bearer ${gettoken()}`,
               "Content-Type": "application/json"
           }
       });
       return res.data;
   } catch (error) {
       console.error('Google registration error:', error);
       throw error;
   }
};

// Get Google User Info
export const apiGetGoogleUserInfo = async (accessToken) => {
   try {
       const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
           headers: {
               "Authorization": `Bearer ${accessToken}`
           }
       });
       return res.data;
   } catch (error) {
       console.error('Google user info error:', error);
       throw error;
   }
};



// Guest Registration API
export const apiGuestRegister = async (guestData) => {
    try {
        const res = await axios.post(`${apiurl()}/api/guest-signin`, guestData, {
            headers: {
                "Authorization": `Bearer ${gettoken()}`,
                "Content-Type": "application/json"
            }
        });
        return res.data;
    } catch (error) {
        console.error('Google registration error:', error);
        throw error;
    }
 };

export {apiverifyotp,apisendotpforgotpassword,apiverifyotpforgotpassword, apiupdatepassword };