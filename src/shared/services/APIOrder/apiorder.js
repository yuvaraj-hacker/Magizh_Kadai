import axios from "axios";
import apiurl from "../apiendpoint/apiendpoint";
import { gettoken } from "../Token/token";

const apigetallOrder = async(params) => {
    try {
        const res = await axios.get(`${apiurl()}/orders/apigetallorder`,{params:params, headers: {"Authorization" : `Bearer ${gettoken()}`}});
        return res.data
    } catch (error) {
        console.error(error);
    }
}

const GenerateHash = async(datas)=>{
    try {
       var res=await axios.post(`${apiurl()}/orders/apisecure_hash`,datas,{ headers: {"Authorization" : `Bearer ${gettoken()}`,withCredentials: true}});
       return res.data;
    }
    catch(err){
       console.log(err);
    }
}

const PaymentRespomse = async(datas)=>{
    try {
       var res=await axios.get(`${apiurl()}/orders/apipayment_response`,{params:{datas},headers: {"Authorization" : `Bearer ${gettoken()}`,withCredentials: true}});
       return res.data;
    }
    catch(err){
       console.log(err);
    }
}

const updateOrder = async(datas)=>{
    try {
       var res=await axios.put(`${apiurl()}/orders/apiupdateorder`,datas,{params:{_id:datas._id}, headers: {"Authorization" : `Bearer ${gettoken()}`}});
       return res.data;
    }
    catch(err){
       console.log(err);
    }
}

const apigetallCustomers = async(params) => {
    try {
        const res = await axios.get(`${apiurl()}/customers/apigetallcustomers`,{params:params, headers: {"Authorization" : `Bearer ${gettoken()}`}});
        return res.data
    } catch (error) {
        console.error(error);
    }
}

export const updateCustomers = async (params) => {
    try {
        const res = await axios.put(`${apiurl()}/customers/updatecustomer`, params, { headers: {Authorization: `Bearer ${gettoken()}` }
        });
        return res.data;  
    } catch (error) {
        console.error('Error updating customer:', error);
        throw error;
    }
};
export const apidownloadPDF = async(datas)=>{
    var res = await axios.post(`${apiurl()}/orders/downloadPDF`,{Order_id:datas},{ responseType:'blob', headers: {"Authorization" : `Bearer ${gettoken()}`}});
    return res.data;
 }

 export const apiSaveorder = async (data) => {
    try {
        const res = await axios.post(`${apiurl()}/orders/apisaveorder`,data , {  headers: {"Authorization" : `Bearer ${gettoken()}`}},);
        return res.data;
    } catch (err) {
        console.log(err);
        throw err; 
    }
};

export const apigenerateToken = async (Order_ID,amount) => {
    try {

        // const merchantID = "2592873"; // Virtual Merchant Account ID
        // const merchantUserID = "kbazaaradmin"; // Virtual Merchant User ID
        // const merchantPinCode = "6X0O1GGP9BLW8Q";
        // const url = "https://api.convergepay.com/hosted-payments/transaction_token";

        // const data = new URLSearchParams();
        // data.append('ssl_merchant_id', merchantID);
        // data.append('ssl_user_id', merchantUserID);
        // data.append('ssl_pin', merchantPinCode);
        // data.append('ssl_invoice_number', Order_ID);
        // data.append('ssl_transaction_type', 'ccsale');
        // data.append('ssl_verify', 'N');
        // data.append('ssl_get_token', 'Y');
        // data.append('ssl_add_token', 'Y');
        // data.append('ssl_amount', amount);

        const res = await axios.post(`${apiurl()}/orders/gettoken`,{Order_ID,amount}, {  headers: {"Authorization" : `Bearer ${gettoken()}`}});

        return res.data;
    } catch (err) {
        console.log(err);
        throw err; 
    }
};

export {apigetallOrder, updateOrder,apigetallCustomers, GenerateHash, PaymentRespomse}