import axios from "axios";
import apiurl from "../apiendpoint/apiendpoint";
import { gettoken } from "../Token/token";

export const apigetallcategory = async(params) => {
    try {
        const res = await axios.get(`${apiurl()}/category/apigetallcategory`,{params:params, headers: {"Authorization" : `Bearer ${gettoken()}`}});
        return res.data
    } catch (error) {
        console.error(error);
    }
}