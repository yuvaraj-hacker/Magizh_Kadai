import React, { useCallback, useEffect, useRef, useState } from 'react';
import { savereturn } from '../../../admin/shared/services/apireturn/apireturn';
import toast from 'react-hot-toast';
import { apigetallcategory } from '../../services/apicategory/apicategory';
import { getallProductsByCategory } from '../../services/apiproducts/apiproduct';

function Business() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formdata, setFormdata] = useState({});
    const fileInputRef = useRef();
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const handlesave = async (e) => {
        e.preventDefault();
        const updatedFormData = {
            Name: formdata.Name,
            Whatsapp: formdata.Whatsapp,
            product_Name: formdata.product_Name,
            Images: images.map(img => img.file), // Important: pass the File objects
            expectedDate: formdata.expectedDate,
            quantity: formdata.quantity,
        };

        try {
            await savereturn(updatedFormData); // 💥 savereturn will internally create FormData
            toast.success('Successfully saved');
            setOpenModal(false);
            setFormdata("");
            setImages("");
            if (fileInputRef.current) {
                fileInputRef.current.value = null;
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong');
        }
    };

    const allCategories = useCallback(async () => {
        setLoading(true);
        try {
            const res = await apigetallcategory();
            setCategories(res.resdata);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        allCategories();
    }, [allCategories]);


    const priorityOrder = [
        "New Arrivals",
        "Drinkware/Bottles",
        "Home Utilities",
        "Laptop/Mobile Accessories",
        "Bathroom Accessories",
        "Kitchen Accessories",
        "Others",
        "Upcoming Arrivals"
    ];

    const sortedCategories = categories
        .filter(category => category.Category_Name !== "Everything" && category.Category_Name !== "All Categories")
        .sort((a, b) => {
            const aPriority = priorityOrder.indexOf(a.Category_Name);
            const bPriority = priorityOrder.indexOf(b.Category_Name);
            if (aPriority !== -1 && bPriority !== -1) {
                return aPriority - bPriority; // both in priority list → sort by order
            }
            if (aPriority !== -1) return -1; // a is in priority list, b is not → a first
            if (bPriority !== -1) return 1;  // b is in priority list, a is not → b first
            return 0; // neither in priority list → keep original order
        });


    const handleCategoryChange = async (e) => {
        const selectedCategory = e.target.value;
        setFormdata({ ...formdata, category: selectedCategory });
        try {
            const res = await getallProductsByCategory({ category: selectedCategory });
            setProducts(res); // assuming the API returns an array of products
        } catch (err) {
            console.error('Failed to fetch products by category:', err);
        }
    };




    return (
        <>
            <section className="max-w-[115rem] mx-auto px-5 py-20  ">
                {/* <div className="flex justify-between">
          <p className="">gvddf</p>
          <button onClick={() => setOpenModal(true)} className="p-2 bg-[#024A34] text-white rounded-md">
            Add New
          </button>
        </div> */}


                <div className="  inset-0 z-50 flex items-center justify-center  ">
                    <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-xl relative">
                        {/* <button onClick={() => setOpenModal(false)} className="absolute top-2 right-4 text-gray-500 hover:text-black text-xl">
                ×
              </button> */}
                        <div className='mb-5'>
                            <h1 className='text-center text-lg font-extrabold '>Business-to-Business</h1>
                            <p className="text-center">Unlock exclusive wholesale deals and grow your business with us!!</p>
                        </div>
                        <form onSubmit={handlesave} className="bg-white rounded-xl space-y-4">
                            <div className="flex flex-col space-y-2">
                                <label className="block text-sm font-medium">Your Name</label>
                                <input type="text" required value={formdata?.Name || ''}
                                    onChange={(e) => setFormdata({ ...formdata, Name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#024A34]" />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label className="block text-sm font-medium">Contact Number</label>
                                <input type="tel" required value={formdata?.Whatsapp || ''}
                                    onChange={(e) => setFormdata({ ...formdata, Whatsapp: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#024A34]" />
                            </div>

                            <div className="flex flex-col space-y-2">
                                <label className="block text-sm font-medium">Select Category</label>
                                <select
                                    required
                                    value={formdata?.category || ''}
                                    onChange={handleCategoryChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#024A34]"
                                >
                                    <option value="" disabled>Select a Category</option>
                                    {sortedCategories.filter(category => category.Category_Name !== "Others" && category.Category_Name !== "Upcoming Arrivals").map((category) => (
                                        <option key={category._id} value={category.Category_Name}>
                                            {category.Category_Name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col space-y-2">
                                {/* Select Product */}
                                <label className="block text-sm font-medium">Select Product</label>
                                <select
                                    required
                                    value={formdata?.product || ''}
                                    onChange={(e) => setFormdata({ ...formdata, product: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#024A34]"
                                >
                                    <option value="" disabled>Select a Product</option>
                                    {products.map((product) => (
                                        <option key={product._id} value={product.name}>
                                            {product.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {products.length > 0 ? (
                                    products.map(product => (
                                        <div key={product._id} className="p-4 border rounded shadow">
                                            <h3 className="font-semibold">{product.Product_Name}</h3>

                                        </div>
                                    ))
                                ) : (
                                    <p className="col-span-full text-gray-500">No products found for this category.</p>
                                )}
                            </div>

                            <div className="flex flex-col space-y-2">
                                <label className="block text-sm font-medium">Quantity</label>
                                <div className="flex items-center space-x-4">
                                    <button type="button" onClick={() => setFormdata((prev) => ({
                                        ...prev,
                                        quantity: Math.max((prev.quantity || 10) - 1, 10), // Minimum quantity is 10
                                    }))
                                    } className="px-3 py-1 bg-gray-200 rounded-lg text-lg" >
                                        –
                                    </button>
                                    <input type="number" min="10" // Minimum value for the input field is 10
                                        value={formdata?.quantity || 10}
                                        onChange={(e) => setFormdata({
                                            ...formdata, quantity: Math.max(parseInt(e.target.value) || 10, 10), // Ensures minimum value is 10
                                        })
                                        }
                                        className="w-16 text-center px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#024A34]"
                                    />
                                    <button type="button" onClick={() => setFormdata((prev) => ({
                                        ...prev, quantity: (prev.quantity || 10) + 1, // Increment the quantity
                                    }))
                                    } className="px-3 py-1 bg-gray-200 rounded-lg text-lg"  >
                                        +
                                    </button>
                                </div>
                            </div>

                            <button>
                                Add New
                            </button>
                            {/* <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 text-sm p-3 rounded-md mt-2">
                  📸 <strong>Important:</strong> Kindly share the product image via WhatsApp during the Product Request.
                </div> */}
                            <div>
                                <button type="submit" disabled={loading} className="bg-[#024A34] cursor-pointer items-center w-fit text-center mx-auto px-6 py-2 justify-center flex gap-1 rounded-3xl md:text-base text-base text-white">
                                    {loading ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </section>
        </>
    );
}

export default Business;
