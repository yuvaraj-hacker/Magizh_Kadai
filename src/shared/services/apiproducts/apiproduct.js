import axios from "axios";
import apiurl from "../apiendpoint/apiendpoint";

export const getallproducts = async (params) => {
    var res = await axios.get(`${apiurl()}/products/apigetallproducts`, {
        params: params
    });
    return res.data;
}

export const getallProductsByCategory = async (params) => {
    var res = await axios.get(`${apiurl()}/products/apigetallproductsbycategory`, {
        params: params
    });
    return res.data;
}

export const getallTrendingProducts = async () => {
    var res = await axios.get(`${apiurl()}/products/apigetTrendingProducts`);
    return res.data;
}

export const getallNewCollection = async () => {
    var res = await axios.get(`${apiurl()}/products/apigetNewCollection`);
    return res.data;
}





export const searchProducts = async (query) => {
    try {
        const res = await axios.post(`${apiurl()}/products/searchproducts`, {
            query
        });
        return res.data;
    } catch (error) {
        console.error('Error searching products:', error);
    }
};

export const apigetproductbyid = async (id) => {
    try {
        const res = await axios.get(`${apiurl()}/products/apigetproductsbyid`, {
            params: {
                _id: id
            }
        });
        return res.data;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch product');
    }
};

export const savesearchquery = async (query, Email) => {
    try {
        const res = await axios.post(`${apiurl()}/searchquery/apisavesearchquery`, {
            query,
            Email
        });
        return res.data;
    } catch (error) {
        console.error('Error saving  searchquery:', error);
    }
};