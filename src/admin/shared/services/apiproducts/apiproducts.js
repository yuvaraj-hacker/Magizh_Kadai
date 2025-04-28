import axios from "axios";
import apiurl from "../../../../shared/services/apiendpoint/apiendpoint";
import { gettoken } from "../../../../shared/services/Token/token";

export const getallproducts = async(params)=>{
  var res=await axios.get(`${apiurl()}/products/apigetallproductsadmin`,{params:params, headers: {"Authorization" : `Bearer ${gettoken()}`}});
  return res.data;
}


export const getproducts = async()=>{
  var res=await axios.get(`${apiurl()}/products/getproducts`,{ headers: {"Authorization" : `Bearer ${gettoken()}`}});
  return res.data;
}


export const getFilterOptions = async(data)=>{
  var res=await axios.post(`${apiurl()}/products/getfilteroptions`,{field:data},{headers: {"Authorization" : `Bearer ${gettoken()}`}});
  return res.data;
}

export const saveproducts=async(datas)=>{
  try {
    const formData = new FormData();
    for (const key in datas) {
      if(key== 'Images'){
        for(let i = 0; i < datas['Images'].length; i++)
          if (datas['Images'][i] instanceof File)
            formData.append(key, datas[key][i]);
          else
          formData.append(key, datas[key]);
      }
      else{
        formData.append(key, datas[key]);
      }
    }
    var res=await axios.post(`${apiurl()}/products/apisaveproduct`,formData,{ headers: {"Authorization" : `Bearer ${gettoken()}`}});
    return res.data;
  }
  catch(err){
    console.log(err);
  }
}

// export const updateproducts = async (datas) => {
//   try {
//     const formData = new FormData();
//     for (const key in datas) {
//       if (key === 'Images') {
//         for (let i = 0; i < datas['Images'].length; i++) {
//           if (datas['Images'][i] instanceof File) {
//             formData.append('Images', datas['Images'][i]);
//           } else {
//             formData.append('Images', datas['Images'][i]);
//           }
//         }
//       } else {
//         formData.append(key, datas[key]);
//       }
//     }
//     formData.forEach((value, key) => {console.log(`${key}: ${value}`);});
//     const res = await axios.put(`${apiurl()}/products/apiupdateproduct`,formData,{params: { _id: datas?._id },headers: {Authorization: `Bearer ${gettoken()}`,'Content-Type': 'multipart/form-data',},} );
//     return res.data;
//   } catch (error) {
//     console.error('Error in updateproducts:', error);
//     throw error;
//   }
// };

// export const updateproducts = async (datas) => {
//   try {
//     const formData = new FormData();
//     const newImages = datas.Images.filter(image => image instanceof File);
//     const existingImages = datas.Images.filter(image => !(image instanceof File));
//     existingImages.forEach(img => formData.append('ExistingImages', img));
//     newImages.forEach(file => formData.append('Images', file));
//     for (const key in datas) {
//       if (key !== 'Images') {formData.append(key, datas[key]);}
//     }
//     const res = await axios.put(`${apiurl()}/products/apiupdateproduct`, formData, {params: { _id: datas?._id },headers: {Authorization: `Bearer ${gettoken()}`,'Content-Type': 'multipart/form-data',},
//     });
//     return res.data;
//   } catch (error) {
//     console.error('Error in updateproducts:', error);
//     throw error;
//   }
// };


// export const updateproducts = async (formdata) => {
//   console.log('Apiformdata:',formdata)
//   try {
//     const res = await axios.put(`${apiurl()}/products/apiupdateproduct`,formdata,{params: { _id: formdata?._id },headers: {"Content-Type": "multipart/form-data","Authorization" : `Bearer ${gettoken()}`}});
// return res.data;

// } catch (error) {
//     console.error("Error saving updateproducts:", error);
//     throw error;
// }
// };

export const updateproducts = async (formdata) => {
  try {
    const formData = new FormData();

    // Append valid images to FormData
    if (formdata.Images && Array.isArray(formdata.Images)) {
      formdata.Images.forEach((image) => {
        if (typeof image === "string") {
          formData.append("Images", image); // Existing image
        } else if (image instanceof File) {
          formData.append("Images", image); // New uploaded image
        }
      });
    }

    // Append other fields
    Object.keys(formdata).forEach((key) => {
      if (key !== "Images") {
        formData.append(key, formdata[key]);
      }
    });

    // API Call
    const res = await axios.put(
      `${apiurl()}/products/apiupdateproduct`,
      formData,
      {
        params: { _id: formdata._id },
        headers: {
          Authorization: `Bearer ${gettoken()}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error("Error saving updateproducts:", error);
    throw error;
  }
};


export const handleBulkUpdateProducts = async (_ids, updateFields) => {
  console.log('Api form data:', { _ids, updateFields });
  try {
    const res = await axios.put(`${apiurl()}/products/apibulkupdate`,{ _ids, updateFields }, {
        headers: {"Content-Type": "application/json","Authorization": `Bearer ${gettoken()}`,}
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error saving update products:", error);
    throw error;
  }
};


export const deleteproducts=async(id)=>{
  var res=await axios.delete(`${apiurl()}/products/apideleteproduct`,{params:{_id:id}, headers: {"Authorization" : `Bearer ${gettoken()}`}});
  return res.data;
}

export const searchproducts = async(datas)=>{
  var res = await axios.post(`${apiurl()}/products/searchproducts`,datas,{ headers: {"Authorization" : `Bearer ${gettoken()}`}});
  return res.data;
}

export const getSearchquery = async(params)=>{
  var res = await axios.get(`${apiurl()}/searchquery/apigetsearchquery`,{params:params, headers: {"Authorization" : `Bearer ${gettoken()}`}});
  return res.data;
}

export const SearchStatusUpdate = async (status, selectedProduct) => {
  if (!selectedProduct?._id || !status) {
    throw new Error('Missing required parameters: id or status');
  }

  try {
    const response = await axios.put(
      `${apiurl()}/searchquery/apiupdateSearchQueryStatus`,
      {
        id: selectedProduct._id,
        Product_Status: status
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${gettoken()}`
        }
      }
    );

    if (!response.data) {
      throw new Error('No data received from server');
    }

    return response.data;
  } catch (error) {
    console.error("Error updating status:", error);
    throw error;
  }
};