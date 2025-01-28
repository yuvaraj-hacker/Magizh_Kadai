import axios from "axios";
import apiurl from "../../../../shared/services/apiendpoint/apiendpoint";
import { gettoken } from "../../../../shared/services/Token/token";

export const getallbanners = async(params)=>{
   var res=await axios.get(`${apiurl()}/banners/apigetallbanners`,{params:params, headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}

export const getFilterOptions = async(data)=>{
   var res=await axios.post(`${apiurl()}/banners/getfilteroptions`,{field:data},{headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}

// export const savebanners=async(datas)=>{
//    try {
//       const formData = new FormData();
//       for (const key in datas) {
//          if(key== 'Images'){
//             for(let i = 0; i < datas['Images'].length; i++)
//               if (datas['Images'][i] instanceof File)
//                 formData.append(key, datas[key][i]);
//               else
//                formData.append(key, datas[key]);
//          }
//          else{
//             formData.append(key, datas[key]);
//          }
//       }
//       var res=await axios.post(`${apiurl()}/banners/apisavebanner`,formData,{ headers: {"Authorization" : `Bearer ${gettoken()}`}});
//       return res.data;
//    }
//    catch(err){
//       console.log(err);
//    }
// }

// export const savebanners = async (datas) => {
//   try {
//     const bannersWithBase64 = await Promise.all(
//       datas.banners.map(async (banner) => {
//         if (banner.file) {
//           // Convert file to base64
//           const base64 = await toBase64(banner.file);
//           return { ...banner, base64 };
//         }
//         return banner;
//       })
//     );

//     // Construct the full data object with banners and other settings
//     const formData = {
//       ...datas,
//       images: bannersWithBase64
//     };

//     const res = await axios.post(
//       `${apiurl()}/banners/apisavebanner`,
//       formData,
//       { headers: { "Authorization": `Bearer ${gettoken()}` } }
//     );

//     return res.data;
//   } catch (err) {
//     console.error('Error saving banners:', err);
//   }
// };

// // Helper function to convert a file to base64
// const toBase64 = (file) => new Promise((resolve, reject) => {jk
//   const reader = new FileReader();
//   reader.readAsDataURL(file);
//   reader.onload = () => resolve(reader.result);
//   reader.onerror = (error) => reject(error);
// });

export const savebanners = async (datas) => {
  try {
    // Ensure Images is defined as an array before proceeding
    const imagesArray = Array.isArray(datas.Images) ? datas.Images : [];

    // Convert each image's file to a base64 string if a file is present
    const bannersWithBase64 = await Promise.all(
      imagesArray.map(async (image) => {
        if (image instanceof File) {
          const base64 = await toBase64(image);
          return base64;
        }
        return image;
      })
    );

    // Construct the payload with images and other banner details
    const formData = {
      ...datas,
      Images: bannersWithBase64,
    };

    // Make a POST request with the form data
    const res = await axios.post(
      `${apiurl()}/banners/apisavebanner`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${gettoken()}`
        }
      }
    );

    return res.data;
  } catch (err) {
    console.error('Error saving banners:', err);
    throw err;
  }
};

// Helper function to convert a file to base64
const toBase64 = (file) => 
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });


// export const updatebanners = async (datas) => {
//    const formData = new FormData();
//    for (const key in datas) {
//      if (key === 'Images') {
//        for (let i = 0; i < datas['Images'].length; i++) {
//          if (datas['Images'][i] instanceof File) {
//            formData.append('Images', datas['Images'][i]); 
//          } else {
//            formData.append('Images', datas['Images'][i]); 
//          }
//        }
//      } else {
//        formData.append(key, datas[key]); 
//      }
//    } 
//    formData.forEach((value, key) => {console.log(`${key}: ${value}`);});
//    try {
//      const res = await axios.put(`${apiurl()}/banners/apiupdatebanner`,formData,{params: { _id: datas?._id },headers: {Authorization: `Bearer ${gettoken()}`,'Content-Type': 'multipart/form-data',},} );
//      return res.data;
//    } catch (error) {
//      console.error('Error in updateproducts:', error);
//      throw error;
//    }
//  };

export const updatebanners = async (datas) => {
  const formData = new FormData();

  for (const key in datas) {
    if (key === 'Images') {
      for (let i = 0; i < datas['Images'].length; i++) {
        const image = datas['Images'][i];
        
        // If the image is a File (new upload), append it directly
        if (image instanceof File) {
          formData.append('Images', image);
        } else if (typeof image === 'string') {
          // Parse if the image is a JSON string
          formData.append('Images', JSON.stringify(JSON.parse(image)));
        } else {
          // Otherwise, it’s already an object, so convert it to JSON
          formData.append('Images', JSON.stringify(image));
        }
      }
    } else {
      formData.append(key, datas[key]);
    }
  }

  formData.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });

  try {
    const res = await axios.put(`${apiurl()}/banners/apiupdatebanner`, formData, {
      params: { _id: datas?._id },
      headers: {
        Authorization: `Bearer ${gettoken()}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error in updatebanners:', error);
    throw error;
  }
};

 
export const deletebanners=async(id)=>{
   var res=await axios.delete(`${apiurl()}/banners/apideletebanner`,{params:{_id:id}, headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}


export const getbannertype = async(params)=>{
  var res = await axios.get(`${apiurl()}/banners/apigetbannertype`,{params:params, headers: {"Authorization" : `Bearer ${gettoken()}`}});
  return res.data;
}

export const getallbannertype = async(params)=>{
  var res = await axios.get(`${apiurl()}/banners/apigetallbannertype`,{params:params, headers: {"Authorization" : `Bearer ${gettoken()}`}});
  return res.data;
}



export const savebannertype=async(datas)=>{
   var res=await axios.post(`${apiurl()}/banners/apisavebannertype`,datas,{ headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}

export const updatebannertype = async(bannerdata)=>{
  var res=await axios.put(`${apiurl()}/banners/apiupdatebannertype`,bannerdata,{params:{_id:bannerdata._id}, headers: {"Authorization" : `Bearer ${gettoken()}`}});
  return res.data;
}

export const deletebannertype=async(id)=>{
  var res=await axios.delete(`${apiurl()}/banners/apideletebannertype`,{params:{_id:id}, headers: {"Authorization" : `Bearer ${gettoken()}`}});
  return res.data;
}


export const getFilterOptionsbannertype = async(data)=>{
  var res=await axios.post(`${apiurl()}/banners/getfilteroptionsbannertype`,{field:data},{headers: {"Authorization" : `Bearer ${gettoken()}`}});
  return res.data;
}
