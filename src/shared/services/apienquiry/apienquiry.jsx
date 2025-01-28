import axios from "axios";
import apiurl from "../apiendpoint/apiendpoint";

const apisaveenquiry = async(datas) => {
    try {
        const formData = new FormData();
        for (const key in datas) {
            formData.append(key, datas[key]);
        }
        const res = await axios.post(`${apiurl()}/enquiry/apisaveenquiry`, formData);
        return res.data
    } catch (error) {
        console.error(error);
    }
}

export {apisaveenquiry};