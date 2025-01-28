
import { useEffect, useState } from 'react';
import { MultiSelect } from 'primereact/multiselect';
import apiurl from '../../../../shared/services/apiendpoint/apiendpoint';
import { getproducts } from '../../services/apiproducts/apiproducts';

export default function Addandeditform({ visible, setVisible, handlesave, handlechange, loading, formdata, handleupdate, imageDataUrl }) {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

 
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (formdata?.Products && Array.isArray(formdata.Products)) {
      setSelectedProducts(formdata.Products);
    } else {
      setSelectedProducts([]);
    }
  }, [formdata?.Products]);

  const fetchProducts = async () => {
    try {
      const response = await getproducts();
      if (response && Array.isArray(response)) {
        setProducts(response);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const getFirstImage = (images) => {
    if (Array.isArray(images) && images.length > 0) {
      return `${apiurl()}/${images[0]}`;
    }
    return '/placeholder.png';
  };

  const productTemplate = (option) => {
    if (!option) return null;

    return (
      <div className="flex items-center gap-2">
        <img 
          src={getFirstImage(option.Images)}
          alt={option.Product_Name} 
          className="object-cover w-8 h-8 rounded"
        />
        <span>{option.Product_Name || 'Unnamed Product'}</span>
      </div>
    );
  };

  const selectedProductTemplate = (option) => {
    const product = products.find(p => p._id === option);
    if (!product) return null;

    return (
      <div className="flex items-center gap-2">
        <img 
          src={getFirstImage(product.Images)}
          alt={product.Product_Name} 
          className="object-cover w-6 h-6 rounded"
        />
        <span>{product.Product_Name || 'Unnamed Product'}</span>
      </div>
    );
  };

  const handleProductChange = (e) => {
    const newProducts = e.value;
    setSelectedProducts(newProducts);
    handlechange({
      target: {
        name: 'Products',
        value: newProducts
      }
    });
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="w-full max-w-3xl overflow-hidden bg-white shadow-2xl rounded-xl">
        <div className="p-6 bg-purple-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">Add Ingredient</h2>
            <button onClick={() => setVisible(false)} className="p-2 text-white rounded-full hover:bg-purple-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6  overflow-y-auto max-h-[70vh] space-y-6">
          <form onSubmit={!formdata?._id ? handlesave : handleupdate}>
            {/* Ingredient Name and Description */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Ingredient Name</label>
                <input
                  type="text"
                  name="IngredientName"
                  value={formdata?.IngredientName || ''}
                  onChange={handlechange}
                  className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-500"
                  required
                  placeholder="Enter ingredient name"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="IngredientDescription"
                  value={formdata?.IngredientDescription || ''}
                  onChange={handlechange}
                  className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter ingredient description"
                ></textarea>
              </div>
            </div>

            {/* Products MultiSelect */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Products</label>
              <MultiSelect
                value={selectedProducts}
                options={products.map(product => ({ ...product, value: product._id }))}
                onChange={handleProductChange}
                optionLabel="Product_Name"
                optionValue="_id"
                itemTemplate={productTemplate}
                selectedItemTemplate={selectedProductTemplate}
                placeholder="Select Products"
                className="w-full"
                display="chip"
                filter
              />
            </div>

            {/* Status */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Status</label>
              <select
                name="Status"
                value={formdata?.Status || ''}
                onChange={handlechange}
                className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="" disabled>---Select a status---</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Image Upload */}
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">Ingredient Image</label>
              <label className="block w-full border-2 border-dashed rounded-lg cursor-pointer hover:border-purple-500">
                {formdata?.Image ? (
                  <img src={imageDataUrl ? imageDataUrl : `${apiurl()}/${formdata?.Image}`} className="object-cover w-full rounded-lg" alt="Ingredient" />
                ) : (
                  <div className="flex flex-col items-center justify-center h-48 text-center">
                    <svg className="w-12 h-12 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="mt-2 text-sm text-gray-500">Upload Image (optional)</p>
                  </div>
                )}
                <input type="file" name="Image" onChange={handlechange} className="hidden" />
              </label>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-70"
              >
                {loading ? 'Saving...' : 'Save Ingredient'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
