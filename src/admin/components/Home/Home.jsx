
import React, { useState, useEffect } from "react";
import { getcategory } from "../../shared/services/apicategory/apicategory";
import apiurl from "../../../shared/services/apiendpoint/apiendpoint";
import { getproducts } from "../../shared/services/apiproducts/apiproducts";


export default function Home() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getcategory({});
                setCategories(response.resdata);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getproducts({});
                setProducts(response || []);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) return <div className="flex items-center justify-center h-[70vh]">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
    </div>;;
    if (error) return <div className="p-4 text-center text-red-500">Error loading datas</div>;

    return (
        <div className="p-4 bg-gray-100">
            <div className="flex flex-col items-center justify-between p-6 mb-6 shadow-md bg-gradient-to-br from-primary to-secondary rounded-2xl lg:flex-row">
                <div className="lg:w-1/2">
                    <h1 className="mb-2 text-3xl font-bold text-white">
                        Welcome to Magizh Kadai
                    </h1>
                    <p className="mb-4 text-white">
                        Everything you need for a modern and comfortable lifestyle!.
                    </p>
                </div>
                <div className="flex justify-center mt-6 lg:w-1/2 lg:mt-0">
                    {/* <img
                        src="/assets/herosection/car1.png"
                        alt="Delivery Scooter"
                        className="w-[480px] h-auto"
                    /> */}
                </div>
            </div>
            {/* Menu Categories Section */}
            <div className="py-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Categories</h2>
                    <a href="/admin/category" className="text-orange-500 hover:underline">
                        View all
                    </a>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                    {categories.map((category) => (
                        <div
                            key={category._id}
                            className="flex flex-col items-center p-4 bg-white shadow rounded-2xl hover:shadow-lg"
                        >
                            <img
                                src={`${apiurl()}/${category.Images[0]}`}
                                alt={category.Category_Name}
                                className="object-contain w-16 h-16 mb-2"
                            />
                            <p className="font-medium text-gray-800">{category.Category_Name}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Menu Products Section */}
            <div className="py-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Products</h2>
                    <a href="/admin/products" className="text-orange-500 hover:underline">
                        View all
                    </a>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                    {products.slice(0, 6).map((product) => (
                        <div
                            key={product._id}
                            className="flex flex-col items-center p-4 bg-white shadow rounded-2xl hover:shadow-lg"
                        >
                            <img
                                src={`${apiurl()}/${product.Images[0]}`}
                                alt={product.Product_Name}
                                className="object-contain w-16 h-16 mb-2"
                            />
                            <p className="font-medium text-gray-800">{product.Product_Name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}