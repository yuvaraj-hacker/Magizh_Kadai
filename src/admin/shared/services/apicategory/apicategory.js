import axios from "axios";
import apiurl from "../../../../shared/services/apiendpoint/apiendpoint";
import { gettoken } from "../../../../shared/services/Token/token";

export const getallcategory = async(params)=>{
   var res=await axios.get(`${apiurl()}/category/apigetallcategory`,{params:params, headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}

export const getcategory = async()=>{
  var res=await axios.get(`${apiurl()}/category/apigetcategory`,{ headers: {"Authorization" : `Bearer ${gettoken()}`}});
  return res.data;
}
export const getFilterOptions = async(data)=>{
   var res=await axios.post(`${apiurl()}/category/getfilteroptions`,{field:data},{headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}


export const savecategory = async (datas) => {
   try {
     const formData = new FormData();
     if (datas.Images) {
       for (let i = 0; i < datas.Images.length; i++) {if (datas.Images[i] instanceof File) {formData.append('Images', datas.Images[i]);}}
     }
     for (const key in datas) {
       if (key !== 'Images' && key !== 'Subcategories') {formData.append(key, datas[key]);}
     }
     if (datas.Subcategories) {
       datas.Subcategories.forEach((subcategory, index) => {
         if (subcategory.image) { formData.append(`Subcategory_${index}`, subcategory.image);}
         formData.append(`Subcategories[${index}][name]`, subcategory.name);
         formData.append(`Subcategories[${index}][Subcategory_Color]`, subcategory.Subcategory_Color || '#000000');
       });
     }
     const res = await axios.post(`${apiurl()}/category/apisavecategory`, formData, {headers: { "Authorization": `Bearer ${gettoken()}` },});
     return res.data;
   } catch (err) {
     console.error(err);
   }
 };
 

export const updatecategory = async (datas) => {
  try {
    const formData = new FormData();
    if (datas.Images) {
      console.log('Appending main category images:', datas.Images);
      for (let i = 0; i < datas.Images.length; i++) {
        if (datas.Images[i] instanceof File) {
          formData.append('Images', datas.Images[i]);
        }
      }
    }
    for (const key in datas) {
      if (key !== 'Images' && key !== 'Subcategories') {
        formData.append(key, datas[key]);
      }
    }
    if (datas.Subcategories) {
      datas.Subcategories.forEach((subcategory, index) => {
        console.log(`Processing subcategory ${index}:`, subcategory);
        if (subcategory.image instanceof File) {
          formData.append(`Subcategory_${index}`, subcategory.image);
          console.log(`Appending subcategory image for ${subcategory.name}:`, subcategory.image);
        }
        formData.append(`Subcategories[${index}][name]`, subcategory.name);
        formData.append(`Subcategories[${index}][Subcategory_Color]`, subcategory.Subcategory_Color || '#000000');
      });
    }
    for (let [key, value] of formData.entries()) {
      console.log(`FormData - ${key}:`, value);
    }
    const res = await axios.put(
      `${apiurl()}/category/apiupdatecategory`,
      formData,
      {
        params: { _id: datas?._id },
        headers: {
          "Authorization": `Bearer ${gettoken()}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log('Update category response:', res.data);
    return res.data;
  } catch (err) {
    console.error('Error during category update:', err);
    throw err;
  }
};


export const deletecategory=async(id)=>{
   var res=await axios.delete(`${apiurl()}/category/apideletecategory`,{params:{_id:id}, headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}

// export const searchcategory = async(datas)=>{
//    var res=await axios.post(`${apiurl()}/users/apisearchcategory`,datas,{ headers: {"Authorization" : `Bearer ${gettoken()}`}});
//    return res.data;
// }
