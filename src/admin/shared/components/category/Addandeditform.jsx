
import { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import apiurl from '../../../../shared/services/apiendpoint/apiendpoint';

export default function Addandeditform(props) {
    const { visible, setVisible, handlesave, handlechange, loading, formdata, handleupdate,imageDataUrl } = props;
    const [subcategories, setSubcategories] = useState(formdata?.Subcategories || [{ name: '', image: null ,Subcategory_Color: '#000000'}]);
  
    // useEffect(() => {
    //   if (formdata?.Subcategories) {
    //     setSubcategories(formdata.Subcategories);
    //   }
    // }, [formdata]);

    useEffect(() => {
      // Check if formdata exists and has Subcategories, or set default subcategories for new form
      if (formdata?.Subcategories) {
        setSubcategories(formdata.Subcategories);
      } else {
        // For new form, initialize with an empty subcategory
        setSubcategories([{ name: '', image: null, Subcategory_Color: '#000000' }]);
      }
    }, [formdata]);
    
    // useEffect(() => {
    //   if (visible) {
    //     if (formdata && formdata._id) {
    //       setSubcategories(formdata.Subcategories || [{ name: '', image: null, Subcategory_Color: '#000000' }]);
    //     } else {
    //       setSubcategories([{ name: '', image: null, Subcategory_Color: '#000000' }]); 
    //     }
    //   }
    // }, [visible, formdata]);
    
    const handleSubcategoryChange = (index, field, value) => {
      const updatedSubcategories = [...subcategories];
      updatedSubcategories[index][field] = value;
      setSubcategories(updatedSubcategories);
      handlechange({ target: { name: 'Subcategories', value: updatedSubcategories } });
    };
  
    const addSubcategory = () => {
      setSubcategories([...subcategories, { name: '', image: null,Subcategory_Color: '#000000' }]);
    };
  
    const removeSubcategory = (index) => {
      const updatedSubcategories = subcategories.filter((_, i) => i !== index);
      setSubcategories(updatedSubcategories);
      handlechange({ target: { name: 'Subcategories', value: updatedSubcategories } });
    };
  
    if (!visible) return null;
  
    return (
      <div className="fixed inset-0 !z-50 flex items-center justify-center p-4 bg-black bg-opacity-30 backdrop-blur-sm">
        <div className="w-full max-w-4xl overflow-hidden bg-white shadow-2xl rounded-2xl">
          {/* Header */}
          <div className="p-6 bg-secondary">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-white">Add Category & Subcategory</h2>
              <button 
                onClick={() => setVisible(false)}
                className="p-2 text-white transition-colors rounded-full hover:bg-white hover:bg-opacity-20"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
  
          <div className="p-6 overflow-y-auto max-h-[70vh]">
            <form onSubmit={!formdata?._id ? handlesave : handleupdate}>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Main Image Upload Section */}
                <div className="lg:col-span-1">
                  <div className="h-full p-4 bg-gray-50 rounded-xl">
                    <label className="block mx-auto max-w-80 w-full transition-colors bg-white border-2 border-purple-300 border-dashed cursor-pointer aspect-square rounded-xl hover:border-purple-500">
                    {
                                formdata?.Images ?
                                <img src={imageDataUrl?imageDataUrl:`${apiurl()}/${formdata?.Images[0]}`}  className='object-cover w-full rounded-xl' />:
                      <div className="flex flex-col items-center justify-center h-full p-4">
                        <div className="flex items-center justify-center w-16 h-16 mb-4 bg-purple-100 rounded-full">
                          <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-sm font-medium text-gray-700">Drop your main image here</p>
                        <p className="mt-1 text-xs text-gray-500">SVG, PNG, JPG (max. 800x800px)</p>
                      </div>
}
                      <input type="file" name="Images" multiple onChange={handlechange} className="hidden" />
                    </label>
                  </div>
                </div>
  
                {/* Form Fields Section */}
                <div className="space-y-6 lg:col-span-2">
                  <div className=" grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Category Name</label>
                      <input
                        type="text"
                        name="Category_Name"
                        value={formdata?.Category_Name}
                        onChange={handlechange}
                        className="w-full px-4 py-3 transition-all border-0 rounded-lg outline-none bg-gray-50 focus:ring-2 focus:ring-purple-500"
                        required
                        placeholder="Enter category name"
                      />
                    </div>
                    {/* <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Brand Name</label>
                      <input
                        type="text"
                        name="Brand_Name"
                        value={formdata?.Brand_Name}
                        onChange={handlechange}
                        className="w-full px-4 py-3 transition-all border-0 rounded-lg outline-none bg-gray-50 focus:ring-2 focus:ring-purple-500"
                       
                        placeholder="Enter brand name"
                      />
                    </div> */}
                    {/* <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Card Color</label>
                      <input
                        type="color"
                        name="Card_color"
                        value={formdata?.Card_color}
                        onChange={handlechange}
                        className="w-full h-12 px-2 rounded-lg cursor-pointer"
                        
                      />
                    </div> */}
                    {/* <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Order Show Format</label>
                      <input
                        type="text"
                        name="Order_show_format"
                        value={formdata?.Order_show_format}
                        onChange={handlechange}
                        className="w-full px-4 py-3 transition-all border-0 rounded-lg outline-none bg-gray-50 focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter number"
                        
                      />
                    </div> */}
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Status</label>
                      <select
                        name="Status"
                        value={formdata?.Status}
                        onChange={handlechange}
                        className="w-full px-4 py-3 transition-all border-0 rounded-lg outline-none appearance-none bg-gray-50 focus:ring-2 focus:ring-purple-500"
                        required
                      >
                        <option selected disabled>---Select a status---</option>
                        <option>Active</option>
                        <option>Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
  
              {/* Subcategories Section */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Subcategories</h3>
                  <button
                    type="button"
                    onClick={addSubcategory}
                    className="inline-flex items-center gap-2 px-4 py-2 font-medium text-purple-600 transition-colors rounded-lg bg-purple-50 hover:bg-purple-100"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add New
                  </button>
                </div>
  
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {subcategories.map((subcategory, index) => (
                    <div key={index} className="relative p-4 bg-gray-50 rounded-xl group">
                      <button
                        type="button"
                        onClick={() => removeSubcategory(index)}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-all"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
  
                      <div className="flex gap-4">
                      <label className="flex-shrink-0 w-20 h-20 transition-colors bg-white border-2 border-gray-200 border-dashed cursor-pointer rounded-xl hover:border-gray-300">
                        {subcategory.image ? (
                          <img
                          src={
                            (subcategory.image instanceof File || subcategory.image instanceof Blob)
                              ? URL.createObjectURL(subcategory.image)
                              : `${apiurl()}/${subcategory.image}`
                          }
                          
                            className="object-cover w-full h-full rounded-xl"
                            alt={`Subcategory ${index + 1}`}
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full p-2 text-center text-gray-500">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                        <input
                          type="file"
                          onChange={(e) => handleSubcategoryChange(index, 'image', e.target.files[0])}
                          className="hidden"
                        />
                      </label>
  
                        <div className="flex-1 space-y-3 my-auto">
                          <input
                            type="text"
                            placeholder="Subcategory Name"
                            value={subcategory.name}
                            onChange={(e) => handleSubcategoryChange(index, 'name', e.target.value)}
                            className="w-full px-4 py-3 transition-all bg-white border-0 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
                          
                          />
                        </div>
                        {/* <div className="flex items-center gap-2">
                            <label className="text-sm font-medium text-gray-700">Color:</label>
                            <input
                              type="color"
                              value={subcategory.Subcategory_Color || '#000000'}
                              onChange={(e) => handleSubcategoryChange(index, 'Subcategory_Color', e.target.value)}
                              className="w-16 h-8 p-0 bg-transparent border-0 rounded cursor-pointer"
                            />
                            <span className="text-sm text-gray-500">
                              {subcategory.Subcategory_Color || '#000000'}
                            </span>
                          </div> */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
  
              {/* Submit Button */}
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="relative w-full py-4 overflow-hidden font-medium text-white transition-all bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl hover:from-purple-600 hover:to-blue-600"
                >
                  <div className="relative z-10 flex items-center justify-center gap-2">
                    {loading && (
                      <svg className="w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                    <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
  
