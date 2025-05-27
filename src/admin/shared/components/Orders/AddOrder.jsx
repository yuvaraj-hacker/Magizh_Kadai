import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { searchProducts } from '../../../../shared/services/apiproducts/apiproduct';
import moment from 'moment';
import { saveorders } from '../../services/apiorders/apiorders';
import apiurl from '../../../../shared/services/apiendpoint/apiendpoint';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { BeatLoader, SyncLoader } from 'react-spinners';

function AddOrder(props) {
    const { ordervisible, setOrderVisible, loading, addressFields, formdata, setActiveField, isPreviewOpen, setIsPreviewOpen, setPdfUrl, orderIdForPreview, pdfUrl, activefield, suggestions, setSuggestions, handleSuggestionClick, tabledata, loadData, addRow, handledeleteField, handlechangeProduct, searchResults, setSearchResults, handlechange, setFormdata, handlesave, handleupdate } = props;
    const [RowIndex, setRowIndex] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [exactMatches, setExactMatches] = useState([]);
    const [maximized, setMaximized] = useState(true); // default full view
    const [today, setToday] = useState('');


    const dropdownRef = useRef(null)
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setSuggestions([]);
                setActiveField(null);
            }
        }

        // Use 'click' instead of 'mousedown' for better behavior
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
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
        console.log(searchResults)
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
            <div className=' '>
                <input type="text" name="Product_Name" id={'Product_Name' + rowIndex['rowIndex']} required value={rowData?.Product_Name} onChange={(event) => handleSearch(event, rowIndex)} className="w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border rounded-md outline-none" />
                {RowIndex == rowIndex['rowIndex'] && showResults && searchResults && searchResults.length > 0 && (
                    <ul className="absolute    z-[9999] min-w-60 bg-white shadow-md rounded-lg p-2 mt-2 h-96   overflow-hidden overflow-y-auto">
                        {searchResults.map((result, index) => (
                            <li key={index} role="button" onClick={() => loadData(index, rowIndex)} className="flex items-center  py-2 px-3  rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none" dangerouslySetInnerHTML={{ __html: highlightText(result['Product_Name'], searchTerm), }}
                            />
                        ))}
                    </ul>
                )}
            </div>
        );
    }
    const Stock = (rowData, rowIndex) => {
        return (
            <div>
                <InputText type="text" name="QTY" value={rowData?.QTY} readOnly onChange={(event) => handlechangeProduct(event, rowIndex)} className="w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border rounded-md outline-none" />
            </div>
        )
    }
    const QTY = (rowData, rowIndex) => {
        return (
            <div>
                <InputText type="text" name="Quantity" required value={rowData?.Quantity} onChange={(event) => handlechangeProduct(event, rowIndex)} className="w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border rounded-md outline-none" />
            </div>
        )
    }
    const Price = (rowData, rowIndex) => {
        return (
            <div>
                <input type="number" name="Regular_Price" required
                    // value={formdata.ordermasterdata[rowIndex]?.Regular_Price || ""}
                    value={rowData?.Regular_Price}
                    onChange={(event) =>
                        handlechangeProduct(event, rowIndex)
                    } className="w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border rounded-md outline-none" />
            </div>
        )
    }
    const Disc = (rowData, rowIndex) => {
        return (
            <div>
                <input type="number" name="Discount" required value={formdata.ordermasterdata[rowIndex]?.Discount ?? ""} onChange={(event) => handlechangeProduct(event, { rowIndex })} className="w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border rounded-md outline-none" />
            </div>
        )
    }
    const DiscAmount = (rowData, rowIndex) => {
        return (
            <div>
                <input type="number" name="Disc_Amount"
                    value={formdata.ordermasterdata[rowIndex]?.Disc_Amount ?? ""}
                    onChange={(event) => handlechangeProduct(event, { rowIndex })} className="w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border rounded-md outline-none" />
            </div>
        )
    }
    const TaxType = (rowData, rowIndex) => (
        <select name="Tax_Type" type="text" value={rowData?.Tax_Type} required onChange={(event) => handlechangeProduct(event, rowIndex)} className="w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border rounded-md outline-none" >
            <option value="">--Select Tax Type--</option>
            <option value="Inclusive">Inclusive</option>
            <option value="Exclusive">Exclusive</option>
        </select>
    );
    const Tax_Percentage = (rowData, rowIndex) => {
        return (
            <div>
                <input type="number" name="Tax_Percentage" required value={rowData?.Tax_Percentage} onChange={(event) => handlechangeProduct(event, rowIndex)} className="w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border rounded-md outline-none" />
            </div>
        )
    }
    const Sub_Total = (rowData) => {
        return (
            <div>
                <input type="number" name="Sub_Total" readOnly value={rowData?.Sub_Total} className="w-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 outline-none border rounded-md" />
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const action = e.nativeEvent.submitter?.name;
        if (formdata?._id) {
            handleupdate(e, action === 'print');
        } else {
            handlesave(e, action === 'print');
        }
    };


    return (
        <>
            <Dialog header={formdata?._id ? "Order Update" : "Add Order"} visible={ordervisible} headerClassName='text-primary' onHide={() => setOrderVisible(false)} className="!w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 lg:!w-[95vw] z-40" maximizable maximized={maximized} onMaximize={(e) => setMaximized(e.maximized)}>
                <form onSubmit={handleSubmit} className='flex flex-col justify-between h-full relative'>
                    <div>
                        <div className=" mb-3  grid md:grid-cols-12 grid-cols-1 items-start gap-4   z-50 bg-white">
                            <div className='md:col-span-9 flex flex-col gap-4  md:order-1 order-2 '>
                                <h1 className='text-primary font-bold'>Customer Details</h1>
                                <div className="grid grid-cols-1 gap-2 md:grid-cols-5 items-end">
                                    <div className='relative ' ref={dropdownRef} >
                                        <label className="block mb-2 text-sm font-medium dark:text-white">Name<span className='text-red-500'>*</span></label>
                                        <input type="text" name="Billing_Name" value={formdata?.Billing_Name} onChange={handlechange} required className="w-full   focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white px-4 py-2 border rounded-md outline-none" />
                                        {activefield === "Billing_Name" && suggestions.length > 0 && (
                                            <ul className="absolute z-10 w-full bg-white border border-black   rounded-md max-h-60 overflow-y-auto">
                                                {suggestions.map((customer, idx) => (
                                                    <li key={idx} className="px-4 py-2 cursor-pointer " onClick={() => handleSuggestionClick(customer)}
                                                    >     {customer.Billing_Name}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    <div className='md:col-span-2'>
                                        <label className="block mb-2 text-sm font-medium dark:text-white">
                                            Address <span className="text-red-500">*</span>
                                        </label>
                                        <input type="text" name="Address" value={formdata?.Address} required onChange={handlechange}
                                            className="w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border rounded-md outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium dark:text-white">
                                            City<span className="text-red-500">*</span>
                                        </label>
                                        <input type="text" name="District" value={formdata.District} required onChange={handlechange}
                                            className="w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border rounded-md outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium dark:text-white">
                                            State <span className="text-red-500">*</span>
                                        </label>
                                        <input type="text" name="State" value={formdata.State} required onChange={handlechange}
                                            className="w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border rounded-md outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium dark:text-white">
                                            Pincode <span className="text-red-500">*</span>
                                        </label>
                                        <input type="text" maxLength={6} name="Zipcode" value={formdata.Zipcode} required onChange={handlechange}
                                            className="w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border rounded-md outline-none"
                                        />
                                    </div>
                                    {/* <div>
                                        <label className="block mb-2 text-sm font-medium dark:text-white">Email<span className='text-red-500'></span></label>
                                        <input type="text" name="Email" value={formdata?.Email} onChange={handlechange} className="w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500  px-4 py-2 border rounded-md outline-none" />
                                    </div> */}
                                    <div className='relative ' ref={dropdownRef} >
                                        <label className="block mb-2 text-sm font-medium dark:text-white">Mobile Number  <span className='text-red-500'>*</span></label>
                                        <input type="text" maxLength={10} name="Mobilenumber" value={formdata?.Mobilenumber} required pattern="\d{10}" onChange={handlechange} className="w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border rounded-md outline-none" />
                                        {activefield === "Mobilenumber" && suggestions.length > 0 && (
                                            <ul className="absolute z-10 w-full bg-white  border-black   rounded-md max-h-60 border overflow-y-auto">
                                                {suggestions.map((customer, idx) => (
                                                    <li key={idx} className="px-4 py-2 cursor-pointer" onClick={() => handleSuggestionClick(customer)}
                                                    >       {customer.Mobilenumber}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    {/* <div>
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
                                    </div> */}
                                    <div>
                                        <label className="block mb-2 text-sm font-medium dark:text-white">GST NO</label>
                                        <input type="text" name="GST_Number" value={formdata?.GST_Number} onChange={handlechange} pattern="^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$"
                                            placeholder="e.g., 33ABCDE1234F1Z5" title="Enter a valid 15-character GSTIN (e.g., 33ABCDE1234F1Z5)" className="w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 border rounded-md outline-none" />
                                    </div>
                                </div>
                            </div>
                            <div className="md:col-span-3 flex flex-col  items-end justify-end gap-2 mb-5 md:order-2 order-1">
                                {/* <div>
                                <label className="block mb-1 text-sm font-medium dark:text-white">Invoice ID <span className='text-red-500'>*</span></label>
                                <input type="text" name="Invoice_ID"   className="w-full bg-primary text-white    focus:outline-none  px-4 py-2 border rounded-md outline-none" />
                            </div> */}
                                <div className="w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 md:w-64 mt-10">
                                    <label htmlFor="orderDate" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                                        Order Date <span className="text-red-500">*</span>
                                    </label>
                                    <input type="date" id="orderDate" name="Order_Date" value={today} onChange={(e) => { const selectedDate = e.target.value; setToday(selectedDate); setFormdata(prev => ({ ...prev, Order_Date: selectedDate })); }}
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
                            <DataTable value={formdata['ordermasterdata']} showGridlines className='border w-full' >
                                <Column header="S.No" headerClassName='bg-primary text-white ' body={sno} style={{ minWidth: '50px' }} />
                                {/* <Column header="HSN No" headerClassName='bg-primary text-white ' body={HSN} style={{ minWidth: '120px' }} /> */}
                                <Column header="Product" headerClassName='bg-primary text-white ' body={Product_Name} style={{ minWidth: '270px' }} />
                                {/* <Column header="Brand"  headerClassName='bg-primary text-white ' body={Brand_Name} style={{ minWidth: '200px' }} /> */}
                                <Column header="Stock" headerClassName='bg-primary text-white ' body={Stock} style={{ minWidth: '90px' }} />
                                <Column header="QTY" headerClassName='bg-primary text-white ' body={QTY} style={{ minWidth: '90px' }} />
                                <Column header="Price" headerClassName='bg-primary text-white ' body={(rowData, options) => Price(rowData, options.rowIndex)} style={{ minWidth: '150px' }} />
                                <Column header="Dis(%)" headerClassName='bg-primary text-white ' body={(rowData, options) => Disc(rowData, options.rowIndex)} style={{ minWidth: '100px' }} />
                                <Column header="Dis.Amount" headerClassName='bg-primary text-white ' body={(rowData, options) => DiscAmount(rowData, options.rowIndex)} style={{ minWidth: '100px' }} />
                                <Column header="Tax Type" headerClassName='bg-primary text-white ' body={TaxType} style={{ minWidth: '190px' }} />
                                <Column header="Tax (%)" headerClassName='bg-primary text-white ' body={Tax_Percentage} style={{ minWidth: '100px' }} />
                                <Column header="Subtotal" headerClassName='bg-primary text-white ' body={Sub_Total} style={{ minWidth: '150px' }} />
                                {/* <Column header="Taxable Amount" body={Amount} style={{ minWidth: '130px' }} /> */}
                                <Column header="Action" headerClassName='bg-primary text-white ' body={action} style={{ minWidth: '80px' }} />
                            </DataTable>
                        </div>
                        <div className="flex justify-between mt-3">
                            <button type='button' onClick={addRow} className='bg-primary p-2 rounded-md md:text-base text=sm text-white'>
                                <i className="fi fi-rr-plus"></i> Add Row
                            </button>
                            {/* <div>QTY: {formdata?.Total_Quantity}</div> */}
                        </div>

                        <div className='my-5 '>
                            <h1 className='py-4 text-xl text-primary font-extrabold'>Remarks</h1>
                            <div className='flex justify-between flex-wrap items-center md:gap-10' >
                                <div className='  items-start  w-full md:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <InputText name='Remarks' placeholder='Remarks..' value={formdata?.Remarks} onChange={handlechange} className=' focus:outline-none border p-2 focus:ring-2 focus:ring-blue-400   '></InputText>
                                    <div className=' '>
                                        <div className="flex gap-4 items-center">
                                            <div className="mb-2">
                                                <select name="Payment_Status" value={formdata?.Payment_Status} required placeholder="Payment Status" onChange={handlechange} className="w-full   px-4 py-2 border rounded-md outline-none"   >
                                                    <option value="" >Payment Status</option>
                                                    <option value="Not Paid">Not Paid</option>
                                                    <option value="Paid">Paid</option>
                                                    <option value="Payment Cancel">Payment Cancel</option>
                                                </select>
                                            </div>

                                            {formdata?.Description === "Order placed through website" ? (
                                                <div className="mb-2">
                                                    <select name="Order_Status" value={formdata?.Order_Status} required placeholder="Order Status" onChange={handlechange} className="w-full    px-4 py-2 border rounded-md outline-none"   >
                                                        <option value="" >Order Status</option>
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
                                            ) : (
                                                <></>
                                            )}
                                            {formdata?.Payment_Status === "Paid" && (
                                                <div className="mb-2">
                                                    <select name="Payment_Method" placeholder="Payment Method" required value={formdata?.Payment_Method} onChange={handlechange} className="w-full    px-4 py-2 border rounded-md outline-none"   >
                                                        <option value="" >Payment Method</option>
                                                        <option value="Card">Card</option>
                                                        <option value="Cash">Cash</option>
                                                        <option value="upi">UPI</option>
                                                    </select>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className='font-bold 2xl:mr-40 '>Total: ₹ {formdata?.Total_Amount || '0'}</div>
                            </div>
                        </div>
                    </div>

                    <div className='flex gap-3 items-center justify-end pb-5'>
                        <div className="mt-2 text-center cursor-pointer" >
                            <button type='submit' role='status' name='print' className=" px-4 py-2 text-white bg-[#2565EB] border rounded-md flex md:text-base text-sm items-center gap-2"
                            // onClick={(e) => {
                            //     e.preventDefault();
                            //     const { Billing_Name, Address, District, State, Zipcode, Mobilenumber, ordermasterdata } = formdata;
                            //     if (!Billing_Name?.trim() || !Address?.trim() || !District?.trim() || !State?.trim() || !Zipcode?.trim() || !Mobilenumber?.trim()
                            //     ) { alert("Please fill in all required fields before saving and printing."); return; }
                            //     const hasValidProduct = Array.isArray(ordermasterdata) && ordermasterdata.some(row => row?.Product_Name?.trim() && row?.Quantity > 0 && row?.Regular_Price > 0);
                            //     if (!hasValidProduct) { alert("Please add at least one valid product"); return; }
                            //     if (formdata?._id) { handleupdate(e, true); } else { handlesave(e, true); }
                            // }}
                            >
                                <i class="fi fi-rr-print flex items-center"></i>
                                {formdata?._id ? "Update & Print" : "Save & Print"} </button>
                        </div>
                        <div className="mt-2 text-center">
                            <button type="submit" name='save' className=" px-4 py-2 text-white bg-primary border rounded-md md:text-base text-sm"   >
                                {loading && <span className="animate-spin text-xl inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>} {formdata._id ? "Update" : "Save"}
                            </button>
                        </div>
                    </div>
                </form>
                {isPreviewOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="relative p-4 bg-white rounded-xl max-w-4xl w-full h-[90] overflow-auto">
                            <div className="mb-4 text-lg font-semibold">PDF Preview</div>
                            {pdfUrl ? (
                                <>
                                    <iframe src={pdfUrl} className="w-full  h-[80vh] border" title="PDF Preview" />
                                    <div className="flex justify-end items-center gap-3 mt-4">
                                        <button className="bg-slate-600 hover:bg-slate-700 focus:ring-2 flex items-center gap-3 focus:ring-slate-400 p-2 text-white rounded-md transition"
                                            onClick={() => { const link = document.createElement('a'); link.href = pdfUrl; link.download = `${orderIdForPreview}.pdf`; link.click(); }}  >
                                            <i className="fi fi-rr-download flex items-center "></i>
                                            Download
                                        </button>
                                        <button
                                            className="bg-indigo-600 hover:bg-indigo-700 focus:ring-2 flex items-center gap-3 focus:ring-indigo-400 p-2 text-white rounded-md transition"
                                            onClick={() => { const printWindow = window.open(pdfUrl); if (printWindow) { printWindow.addEventListener('load', () => { printWindow.focus(); printWindow.print(); }); } }} >
                                            <i className="fi fi-rr-print flex items-center "></i>
                                            Print
                                        </button>
                                        <button
                                            className="  absolute top-4 right-4 text-white rounded-md "
                                            onClick={() => { setIsPreviewOpen(false); setPdfUrl(null); }} >
                                            <i className="fi fi-sr-circle-xmark flex items-center text-3xl text-red-600"></i>
                                        </button>

                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className='flex items-center gap-3'>
                                        <div className='text-primary'>Loading PDF</div>
                                        <BeatLoader color="#024A34" />
                                    </div>
                                </>
                            )}

                        </div>
                    </div>
                )}

            </Dialog>




        </>
    )
}

export default AddOrder
