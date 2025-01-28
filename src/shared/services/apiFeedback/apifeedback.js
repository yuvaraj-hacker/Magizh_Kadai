import axios from "axios";
import apiurl from "../apiendpoint/apiendpoint";
import { gettoken } from "../Token/token";

const apisavefeedback = async(datas) => {
    try {
        const res = await axios.post(`${apiurl()}/feedback/apisavefeedback`, datas, {  headers: {"Authorization": `Bearer ${gettoken()}`,"Content-Type": "application/json"}});
        return res.data;
    } catch (error) {
        console.error("API Error:", error.response ? error.response.data : error.message);
        throw error;
    }
}

export { apisavefeedback };