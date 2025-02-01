
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Slider from 'react-slick'
import { InputText } from 'primereact/inputtext'


function Side({ categories, }) {
    const [value, setValue] = useState(50);
    return (
        <>
            <div className=' sticky top-28 h-screen bg-gray-100'>
                <div className=' border-b p-4 flex justify-between'>
                    <div className=' text-sm text-black '>
                        FILTERS
                    </div>
                    <div className=' text-sm cursor-pointer text-blue-400  '>
                        CLEAR ALL
                    </div>
                </div>
                <div className='space-y-2 p-4 border-b'>
                    <div className=' text-sm text-gray-600 '>
                        CATEGORIES
                    </div>
                    <div className={` max-h-[50vh] w-64 cursor-default overflow-auto`}>
                        <ul className=" text-xs " >
                            {categories.map(
                                (category) => category.Category_Name !== "Everything" && (
                                    <li key={category._id} className="group py-1">
                                        <Link to={`${category.Category_Name == 'All Categories' ? '/products' : `/products?category=${category.Category_Name}`}`}  >
                                            <div className="flex gap-2 justify-start items-center p-0.5 overflow-hidden">
                                                {/* <img src={`${apiurl()}/${category.Images[0]}`} alt="" className="lg:w-14 w-10 rounded-lg group-hover:scale-105 duration-300" /> */}
                                                <input type="checkbox" className='cursor-pointer' readOnly />
                                                <h5 className="whitespace-pre-wrap text-gray-500">{category.Category_Name}</h5>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>

                <div className='space-y-2 p-4 border-b'>
                    <h1 className="  text-sm text-gray-600 uppercase ">Price</h1>
                    <div className="card flex justify-content-center">
                        <div className="w-14rem">
                            <InputText value={value} onChange={(e) => setValue(e.target.value)} className="w-full" />
                            <Slider value={value} onChange={(e) => setValue(e.value)} className="w-full" />
                        </div>
                    </div>
                </div>

                <div className='space-y-2 p-4 border-b'>
                    <h1 className="  text-sm text-gray-600 uppercase ">Discount</h1>
                    <div className='text-xs space-y-2'>
                        <div className="flex gap-2 justify-start items-center p-0.5 overflow-hidden ">
                            {/* <img src={`${apiurl()}/${category.Images[0]}`} alt="" className="lg:w-14 w-10 rounded-lg group-hover:scale-105 duration-300" /> */}
                            <input type="checkbox" className='text-white  border-none  ' readOnly />
                            <h5 className="whitespace-pre-wrap text-gray-500 flex items-center">30 % or more</h5>
                        </div>
                        <div className="flex gap-2 justify-start items-center p-0.5 overflow-hidden">
                            {/* <img src={`${apiurl()}/${category.Images[0]}`} alt="" className="lg:w-14 w-10 rounded-lg group-hover:scale-105 duration-300" /> */}
                            <input type="checkbox" className='text-white  border-none  ' readOnly />
                            <h5 className="whitespace-pre-wrap text-gray-500 flex items-center">40 % or more</h5>
                        </div>
                        <div className="flex gap-2 justify-start items-center p-0.5 overflow-hidden">
                            {/* <img src={`${apiurl()}/${category.Images[0]}`} alt="" className="lg:w-14 w-10 rounded-lg group-hover:scale-105 duration-300" /> */}
                            <input type="checkbox" className='text-white  border-none  ' readOnly />
                            <h5 className="whitespace-pre-wrap text-gray-500 flex items-center">50 % or more</h5>
                        </div>
                        <div className="flex gap-2 justify-start items-center p-0.5 overflow-hidden">
                            {/* <img src={`${apiurl()}/${category.Images[0]}`} alt="" className="lg:w-14 w-10 rounded-lg group-hover:scale-105 duration-300" /> */}
                            <input type="checkbox" className='text-white  border-none  ' readOnly />
                            <h5 className="whitespace-pre-wrap text-gray-500 flex items-center">60 % or more</h5>
                        </div>
                    </div>
                </div>
                <div className='space-y-2 p-4 border-b'>
                    <h1 className="  text-sm text-gray-600 uppercase ">Customer Ratings</h1>
                    <div className='text-xs py-1'>
                        <div className="flex gap-2 justify-start items-center  overflow-hidden ">
                            {/* <img src={`${apiurl()}/${category.Images[0]}`} alt="" className="lg:w-14 w-10 rounded-lg group-hover:scale-105 duration-300" /> */}
                            <input type="checkbox" className='text-white  border-none  ' readOnly />
                            <h1 className="whitespace-pre-wrap text-gray-500 flex items-center">3 <span><i className="fi fi-ss-star flex items-center"></i></span> & above</h1>
                        </div>
                        <div className="flex gap-2 justify-start items-center  overflow-hidden">
                            {/* <img src={`${apiurl()}/${category.Images[0]}`} alt="" className="lg:w-14 w-10 rounded-lg group-hover:scale-105 duration-300" /> */}
                            <input type="checkbox" className='text-white  border-none  ' readOnly />
                            <h1 className="whitespace-pre-wrap text-gray-500 flex items-center">4 <span> <i className="fi fi-ss-star flex items-center"></i> </span> & above</h1>

                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}

export default Side
