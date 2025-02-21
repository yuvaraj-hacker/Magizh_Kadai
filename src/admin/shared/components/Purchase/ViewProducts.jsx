// import { Dialog } from 'primereact/dialog';
// import React from 'react'
// import apiurl from '../../../../shared/services/apiendpoint/apiendpoint';

// export default function ViewProducts(props) {
//     const { ViewProduct, setViewProduct, loading, ViewProductData } = props;

//     return (
//         <Dialog header="Product Details" visible={ViewProduct} onHide={() => setViewProduct(false)} className="!w-full lg:!w-[40rem]">
//             {ViewProductData?.map(product => (
//                 <div key={product._id} className="grid grid-cols-12 p-4 mb-8 border-2 border-gray-200 rounded-3xl lg:p-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4">
//                     <div className="col-span-12 lg:col-span-4 img box">
//                         <img src={`${apiurl()}/${product.Images[0]}`} alt={product.Product_Name} className="max-lg:w-full lg:w-[180px]"/>
//                     </div>
//                     <div className="w-full col-span-12 lg:col-span-8 detail lg:pl-3">
//                         <div className="flex items-center justify-between w-full mb-4">
//                             <h5 className="text-xl font-bold leading-9 text-gray-900 font-manrope">{product.Product_Name}</h5>
//                         </div>
//                         <p className="mb-6 text-base font-normal leading-7 text-gray-500">{product.Product_Description}  </p>
//                         <div className="flex items-center justify-between">
//                             <h6 className="font-bold leading-9 text-right text-blue-700 font-manrope">QTY: {product.Quantity}</h6>
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </Dialog>
//     )
// }

import { Dialog } from 'primereact/dialog';
import React from 'react';
import apiurl from '../../../../shared/services/apiendpoint/apiendpoint';

export default function ViewPurchase(props) {
    const { ViewProduct, setViewProduct, ViewProductData, tabledata } = props;

    return (
        <Dialog header="Purchase Details" visible={ViewProduct} onHide={() => setViewProduct(false)} className=" !w-[70rem]" >
            {ViewProductData && (
                <div className="   max-lg:max-w-lg max-lg:mx-auto">
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead className="bg-gray-100">
                                <tr className="text-gray-600 text-sm">
                                    <th className="p-2 border">S.No</th>
                                    <th className="p-2 border">HSN No</th>
                                    <th className="p-2 border">Product</th>
                                    <th className="p-2 border">Brand</th>
                                    <th className="p-2 border">QTY</th>
                                    <th className="p-2 border">Price</th>
                                    <th className="p-2 border">Dis (%)</th>
                                    <th className="p-2 border">Dis.Amount</th>
                                    <th className="p-2 border">Tax Type</th>
                                    <th className="p-2 border">Tax (%)</th>
                                    <th className="p-2 border">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ViewProductData?.map((product, index) => (
                                    <tr key={product._id} className="text-gray-700 text-sm">
                                        <td className="p-2 border">{index + 1}</td>
                                        <td className="p-2 border">{product.HSN || 'N/A'}</td>
                                        <td className="p-2 border">{product.Product_Name || 'N/A'}</td>
                                        <td className="p-2 border">{product.Brand_Name || 'N/A'}</td>
                                        <td className="p-2 border">{product.QTY || 'N/A'}</td>
                                        <td className="p-2 border">₹{product.Price || '0'}</td>
                                        <td className="p-2 border">{product.Discount || '0'}%</td>
                                        <td className="p-2 border">{product.Disc_Amount || '0'}</td>
                                        <td className="p-2 border">{product.Tax_Type || '0'}</td>
                                        <td className="p-2 border">{product.Tax_Percentage || '0'}%</td>
                                        <td className="p-2 border">₹{product.Sub_Total || '0'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </Dialog>
    );
}
