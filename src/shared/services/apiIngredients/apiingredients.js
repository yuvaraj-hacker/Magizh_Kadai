import axios from "axios";
import apiurl from "../apiendpoint/apiendpoint";
import { gettoken } from "../Token/token";


export const apigetallingredients = async(params) => {
    try {
        const res = await axios.get(`${apiurl()}/ingredient/apigetingredient`,{params:params, headers: {"Authorization" : `Bearer ${gettoken()}`}});
        return res.data
    } catch (error) {
        console.error(error);
    }
}