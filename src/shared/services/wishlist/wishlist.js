import axios from "axios";
import apiurl from "../apiendpoint/apiendpoint";
import { gettoken } from "../Token/token";

export const savewishitems = async(data)=>{
    var res = await axios.post(`${apiurl()}/wishlist/savewishlist`,data,{headers: {"Authorization" : `Bearer ${gettoken()}`}});
    return res.data;
 }

 export const getWishlistItems = async (email) => {
    try {
      const response = await axios.get(`${apiurl()}/wishlist/getallwishlist`, {params: { Email: email }, headers: {"Authorization": `Bearer ${gettoken()}`  }});
      return response.data;
    } catch (error) {
      console.error("Error fetching wishlist items:", error);
      throw error;
    }
  };

export const updateWishlistItem = async (productId, Quantity, Email) => {
  const response = await axios.put( `${apiurl()}/wishlist/updatewishlist`, { productId, Quantity, Email }, { headers: { Authorization: `Bearer ${gettoken()}` } } );
  return response.data;
};

export const deleteWishlistItem = async (productId) => {
  try {
    const response = await axios.delete(`${apiurl()}/wishlist/deleteonewishlist`, { params: { _id: productId }, headers: { Authorization: `Bearer ${gettoken()}` }, });
    return response.data;
  } catch (error) {
    console.error('Error deleting wishlist item:', error);
    throw error;
  }
};

export const RemoveWishlistItem = async (productId) => {
  const response = await axios.delete(`${apiurl()}/wishlist/removewishlist`, { params: productId, headers: { Authorization: `Bearer ${gettoken()}` }, });
  return response.data;
};

export const deleteAllWishlistItems = async (email) => {
  try {
    const response = await axios.delete(`${apiurl()}/wishlist/deleteallwishlist`, {
      params: { Email: email },  // Pass email as a query param
      headers: { Authorization: `Bearer ${gettoken()}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting all wishlist items:', error);
    throw error;
  }
};
