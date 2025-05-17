import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog'
import React, { useEffect, useMemo, useState } from 'react'
import { searchProducts } from '../../../../shared/services/apiproducts/apiproduct';
import moment from 'moment';
import { saveorders } from '../../services/apiorders/apiorders';
import apiurl from '../../../../shared/services/apiendpoint/apiendpoint';
import axios from 'axios';

function AddOrder(props) {
    const { ordervisible, setOrderVisible, loading, addressFields, formdata, loadData, addRow, handledeleteField, handlechangeProduct, searchResults, setSearchResults, handlechange, setFormdata, handlesave, handleupdate } = props;
    const [RowIndex, setRowIndex] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [exactMatches, setExactMatches] = useState([]);
    const [maximized, setMaximized] = useState(true); // default full view
    const [today, setToday] = useState('');

    useEffect(() => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0]; // 'YYYY-MM-DD'
        setToday(formattedDate);
    }, []);

    const debouncedSearch = useMemo(() => {
        let timeoutId;
        return async (value) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(async () => {
                if (value.trim().length > 0) {
                    try {
                        const results = await searchProducts(value); // Your API call
                        // Find exact matches
                        const exactMatchedProducts = results.filter(product =>
                            product.Product_Name.toLowerCase() === value.toLowerCase()
                        );
                        setExactMatches(exactMatchedProducts);
                        setSearchResults(results);
                        setShowResults(results.length > 0);
                    } catch (error) {
                        console.error("Error fetching search results:", error);
                        setSearchResults([]);
                        setExactMatches([]);
                    }
                } else {
                    setSearchResults([]);
                    setExactMatches([]);
                    setShowResults(false);

                }
            }, 300);
        };
    }, []);
    const handleSearch = (e, rowIndex) => {
        const value = e.target.value;
        setSearchTerm(value);
        const updatedFormdata = { ...formdata };
        updatedFormdata.ordermasterdata[rowIndex.rowIndex] = {
            ...updatedFormdata.ordermasterdata[rowIndex.rowIndex],
            Product_Name: value
        };
        setFormdata(updatedFormdata);
        debouncedSearch(value);
        setRowIndex(rowIndex['rowIndex']);
    };
    const highlightText = (text, highlight) => {
        if (!highlight.trim()) return text; // Return the text as is if highlight is empty
        const regex = new RegExp(`(${highlight})`, "gi"); // Case-insensitive search
        return text.replace(regex, `<span className="bg-primary text-white px-1 mx-1 rounded">$1</span>`);
    };

    const sno = (rowData, rowIndex) => {
        return (
            <div>
                {rowIndex['rowIndex'] + 1}
            </div>
        )
    }

    const HSN = (rowData, rowIndex) => {
        return (
            <>
                <div>
                    <input type="number" name="HSN" value={rowData?.HSN} onChange={(event) => handlechangeProduct(event, rowIndex)} className="w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border rounded-md outline-none" />
                </div>
            </>
        )
    }
    const Product_Name = (rowData, rowIndex) => {
        return (
            <div className=''>
                <input type="text" name="Product_Name" id={'Product_Name' + rowIndex['rowIndex']} value={rowData?.Product_Name} onChange={(event) => handleSearch(event, rowIndex)} className="w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border rounded-md outline-none" />
                {RowIndex == rowIndex['rowIndex'] && showResults && searchResults && searchResults.length > 0 && (
                    <ul className="absolute    z-10 min-w-60 bg-white shadow-md rounded-lg p-2 mt-2 h-96   overflow-hidden overflow-y-auto">
                        {searchResults.map((result, index) => (
                            <li key={index} role="button" onClick={() => loadData(index, rowIndex)} className="flex items-center  py-2 px-3  rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none" dangerouslySetInnerHTML={{ __html: highlightText(result['Product_Name'], searchTerm), }}
                            />
                        ))}
                    </ul>
                )}
            </div>
        );
    };
    const Brand_Name = (rowData, rowIndex) => {
        return (
            <div>
                <input type="text" name="Brand_Name" id={'Brand_Name' + rowIndex['rowIndex']} value={rowData?.Brand_Name} onChange={() => handlechangeProduct(event, rowIndex)} className="w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border rounded-md outline-none" />
            </div>
        )
    }
    const QTY = (rowData, rowIndex) => {
        return (
            <div>
                <input type="text" name="QTY" value={rowData?.QTY} onChange={(event) => handlechangeProduct(event, rowIndex)} className="w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border rounded-md outline-none" />
            </div>
        )
    }
    const Price = (rowData, rowIndex) => {
        return (
            <div>
                <input type="number" name="Price" value={rowData?.Price} onChange={(event) => handlechangeProduct(event, rowIndex)} className="w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border rounded-md outline-none" />
            </div>
        )
    }
    const Disc = (rowData, rowIndex) => {
        return (
            <div>
                <input type="number" name="Discount_Percentage" value={rowData?.Discount_Percentage} onChange={(event) => handlechangeProduct(event, rowIndex)} className="w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border rounded-md outline-none" />
            </div>
        )
    }
    const DiscAmount = (rowData, rowIndex) => {
        return (
            <div>
                <input type="number" name="Disc_Amount" value={rowData?.Disc_Amount} defaultValue={rowData?.Disc_Amount} onChange={(event) => handlechangeProduct(event, rowIndex)} className="w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border rounded-md outline-none" />
            </div>
        )
    }
    const TaxType = (rowData, rowIndex) => (
        <select name="Tax_Type" type="text" value={rowData?.Tax_Type} onChange={(event) => handlechangeProduct(event, rowIndex)} className="w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border rounded-md outline-none" >
            <option value="">--Select Tax Type--</option>
            <option value="Inclusive">Inclusive</option>
            <option value="Exclusive">Exclusive</option>
        </select>
    );
    const Tax_Percentage = (rowData, rowIndex) => {
        return (
            <div>
                <input type="number" name="Tax_Percentage" value={rowData?.Tax_Percentage} onChange={(event) => handlechangeProduct(event, rowIndex)} className="w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border rounded-md outline-none" />
            </div>
        )
    }
    const Sub_Total = (rowData) => {
        return (
            <div>
                <input type="number" name="Sub_Total" readOnly value={rowData?.Sub_Total || 0} className="w-full focus:outline-none px-4 py-2 outline-none" />
            </div>
        );
    };
    const action = (rowData, rowIndex) => {
        return (
            <div className='flex'>
                <button type='button' onClick={(event) => handledeleteField(event, rowIndex)} className="inline-flex items-center me-3 text-xl font-medium text-red-600 gap-x-1 decoration-2" >
                    <i className="fi fi-rr-trash"></i>
                </button>
            </div>
        )
    }
    return (
        <>
            <Dialog header={formdata?._id ? "Order Update" : "Add Order"} visible={ordervisible} headerClassName='text-primary' onHide={() => setOrderVisible(false)} className="!w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 lg:!w-[95vw]" maximizable maximized={maximized} onMaximize={(e) => setMaximized(e.maximized)}>
                <form onSubmit={formdata?._id ? handleupdate : handlesave}>
                    <div className=" mb-3  grid grid-cols-12 items-start gap-4">
                        <div className='col-span-9 flex flex-col gap-4 '>
                            <h1 className='text-primary font-bold'>Customer Details</h1>
                            <div className="grid grid-cols-1 gap-2 md:grid-cols-5 items-end">
                                <div>
                                    <label className="block mb-2 text-sm font-medium dark:text-white">Name<span className='text-red-500'>*</span></label>
                                    <input type="text" name="Billing_Name" value={formdata?.Billing_Name} onChange={handlechange} className="w-full   focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white px-4 py-2 border rounded-md outline-none" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium dark:text-white">Email<span className='text-red-500'>*</span></label>
                                    <input type="text" name="Email" value={formdata?.Email} onChange={handlechange} className="w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500  px-4 py-2 border rounded-md outline-none" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium dark:text-white">Mobile Number  <span className='text-red-500'>*</span></label>
                                    <input type="text" name="Mobilenumber" value={formdata?.Mobilenumber} pattern="\d{10}" onChange={handlechange} className="w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border rounded-md outline-none" />
                                </div>
                                <div className='col-span-2'>
                                    <label className="block mb-2 text-sm font-medium dark:text-white">
                                        Address <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={addressFields.address}
                                        onChange={handlechange}
                                        className="w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border rounded-md outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium dark:text-white">
                                        City<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="district"
                                        value={addressFields.district}
                                        onChange={handlechange}
                                        className="w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border rounded-md outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium dark:text-white">
                                        State <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={addressFields.state}
                                        onChange={handlechange}
                                        className="w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border rounded-md outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium dark:text-white">
                                        Country <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={addressFields.country}
                                        onChange={handlechange}
                                        readOnly
                                        className="w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border rounded-md outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium dark:text-white">
                                        Zipcode <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="zipcode"
                                        value={addressFields.zipcode}
                                        onChange={handlechange}
                                        className="w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border rounded-md outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium dark:text-white">GST NO</label>
                                    <input type="text" name="GST_Number" value={formdata?.GST_Number}
                                        onChange={handlechange}
                                        pattern="^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$"
                                        placeholder="e.g., 33ABCDE1234F1Z5" title="Enter a valid 15-character GSTIN (e.g., 33ABCDE1234F1Z5)" className="w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border rounded-md outline-none" />
                                </div>

                            </div>
                        </div>
                        <div className="col-span-3 flex flex-col  items-end justify-end gap-2 mb-5">
                            {/* <div>
                                <label className="block mb-1 text-sm font-medium dark:text-white">Invoice ID <span className='text-red-500'>*</span></label>
                                <input type="text" name="Invoice_ID"   className="w-full bg-primary text-white    focus:outline-none  px-4 py-2 border rounded-md outline-none" />
                            </div> */}
                            <div className="w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 md:w-64">
                                <label htmlFor="orderDate" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                                    Order Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    id="orderDate"
                                    name="Order_Date"
                                    value={today}
                                    onChange={(e) => setToday(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none dark:bg-gray-800 dark:text-white dark:border-gray-600"
                                />
                            </div>
                            {/* <div className="w-full   md:w-64">
                                <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                                    Order ID <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="orderId"
                                    name="Order_ID"
                                    className="w-full px-4 py-2 border bg-primary text-white   border-gray-300 rounded-md shadow-sm focus:outline-none     dark:bg-gray-800 dark:text-white dark:border-gray-600"
                                />
                            </div> */}
                        </div>
                    </div>
                    <div>
                        <DataTable value={formdata['ordermasterdata']} showGridlines className='border' >
                            <Column header="S.No" headerClassName='bg-primary text-white ' body={sno} style={{ minWidth: '50px' }} />
                            <Column header="HSN No" headerClassName='bg-primary text-white ' body={HSN} style={{ minWidth: '120px' }} />
                            <Column header="Product" headerClassName='bg-primary text-white ' body={Product_Name} style={{ minWidth: '250px' }} />
                            {/* <Column header="Brand"  headerClassName='bg-primary text-white ' body={Brand_Name} style={{ minWidth: '200px' }} /> */}
                            <Column header="QTY" headerClassName='bg-primary text-white ' body={QTY} style={{ minWidth: '90px' }} />
                            <Column header="Price" headerClassName='bg-primary text-white ' body={Price} style={{ minWidth: '150px' }} />
                            <Column header="Dis(%)" headerClassName='bg-primary text-white ' body={Disc} style={{ minWidth: '100px' }} />
                            <Column header="Dis.Amount" headerClassName='bg-primary text-white ' body={DiscAmount} style={{ minWidth: '100px' }} />
                            <Column header="Tax Type" headerClassName='bg-primary text-white ' body={TaxType} style={{ minWidth: '190px' }} />
                            <Column header="Tax (%)" headerClassName='bg-primary text-white ' body={Tax_Percentage} style={{ minWidth: '100px' }} />
                            <Column header="Subtotal" headerClassName='bg-primary text-white ' body={Sub_Total} style={{ minWidth: '100px' }} />
                            {/* <Column header="Taxable Amount" body={Amount} style={{ minWidth: '130px' }} /> */}
                            <Column header="Action" headerClassName='bg-primary text-white ' body={action} style={{ minWidth: '80px' }} />
                        </DataTable>
                    </div>
                    <div className="flex justify-between mt-3">
                        <button type='button' onClick={addRow} className='bg-primary p-2 rounded-md text-white'>
                            <i className="fi fi-rr-plus"></i> Add Row
                        </button>
                        {/* <div>QTY: {formdata?.Total_Quantity}</div> */}
                        <div>Total: ₹ {formdata?.Total_Amount || '0'}</div>
                    </div>

                    <div className='my-5'>
                        <h1 className='py-4 text-xl text-primary font-extrabold'>Remarks</h1>
                        <div>
                            <div className="flex gap-4 items-center">
                                <div className="mb-2">
                                    <div className="mb-2">
                                        <label>Payment Status</label>
                                    </div>
                                    <select name="Payment_Status" value={formdata?.Payment_Status} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none"   >
                                        <option value="" >Select a status</option>
                                        <option value="Not Paid">Not Paid</option>
                                        <option value="Paid">Paid</option>
                                    </select>
                                </div>
                                <div className="mb-2">
                                    <div className="mb-2">
                                        <label>Order Status</label>
                                    </div>
                                    <select name="Order_Status" value={formdata?.Order_Status} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none"   >
                                        <option value="" >Select a status</option>
                                        <option value="Payment Pending">Payment Pending</option>
                                        <option value="Payment Confirmed">Payment Confirmed</option>
                                        <option value="Order Placed">Order Placed</option>
                                        <option value="Order Processing">Order Processing</option>
                                        <option value="Order Dispatched">Order Dispatched</option>
                                        <option value="Order Delivered">Order Delivered</option>
                                        <option value="Order Returned">Order Returned</option>
                                        <option value="Order Cancel">Order Cancel</option>
                                        <option value="Order Replacement">Order Replacement</option>
                                    </select>
                                </div>
                                <div className="mb-2">
                                    <div className="mb-2">
                                        <label>Payment Method</label>
                                    </div>
                                    <select name="Payment_Method" value={formdata?.Payment_Method} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none"   >
                                        <option value="" >Select a status</option>
                                        <option value="Card">Card</option>
                                        <option value="Cash">Cash</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-3 items-center justify-center'>
                        <div className="mt-2 text-center" onClick={() => setOrderVisible(false)}>
                            <button className=" px-4 py-2 text-white bg-primary border rounded-md" >
                                Cancel
                            </button>
                        </div>
                        <div className="mt-2 text-center">
                            <button type="submit" className=" px-4 py-2 text-white bg-primary border rounded-md" >
                                {loading && <span className="animate-spin text-xl inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>} {formdata._id ? "Update" : "Save"}
                            </button>
                        </div>
                    </div>
                </form>
            </Dialog>


        </>
    )
}

export default AddOrder
