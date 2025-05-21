import { Dialog } from 'primereact/dialog';
import React from 'react'
import apiurl from '../../../../shared/services/apiendpoint/apiendpoint';

export default function ViewProducts(props) {
    const { ViewProduct, setViewProduct, ViewProductData } = props;
    console.log('productdata', ViewProductData)
    return (
        <Dialog header="Product Details" visible={ViewProduct} onHide={() => setViewProduct(false)} className="!w-full lg:!w-[40rem]">
            {ViewProductData?.map(product => (
                <div key={product._id} className="grid grid-cols-12 p-4 mb-4      border rounded-3xl lg:p-4 max-lg:max-w-lg max-lg:mx-auto gap-y-4">
                    <div className="col-span-12 lg:col-span-4 img box">
                        <img src={`${apiurl()}/${product.Images[0]}`} alt={product.Product_Name} className="max-lg:w-full lg:w-[180px]" />
                    </div>
                    <div className="w-full col-span-12 lg:col-span-8 detail lg:pl-3">
                        <div className="flex items-center justify-between w-full mb-4">
                            <h5 className="text-sm font-bold leading-9 text-gray-900 font-manrope">{product.Product_Name}</h5>
                        </div>
                        {/* <p className="mb-6 text-base font-normal leading-7 text-gray-500">{product.Product_Description}  </p> */}
                        <div className="flex items-center justify-between">
                            <h6 className="font-bold leading-9 text-right text-blue-700 font-manrope">QTY: {product.Quantity}</h6>
                        </div>
                    </div>
                </div>
            ))}
        </Dialog>
    )
}
