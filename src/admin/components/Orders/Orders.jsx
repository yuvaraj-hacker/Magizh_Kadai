import React, { useCallback, useEffect, useRef, useState } from 'react'
import Tableheadpanel from '../../shared/components/Orders/Tableheadpanel';
import Addandeditform from '../../shared/components/Orders/Addandeditform';
import Tablepagination from '../../shared/others/Tablepagination';
import Tableview from '../../shared/components/Orders/Tableview';
import toast from "react-hot-toast";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { deleteorders, getallorders, getOrderitemsbyid, getregularcustomername, regularcustomer, saveorders, updateorders } from '../../shared/services/apiorders/apiorders';
import ViewProducts from '../../shared/components/Orders/ViewProducts';
import { apidownloadPDF, updateOrder } from "../../../shared/services/APIOrder/apiorder.js";
import { saveAs } from 'file-saver';
import OrderReplyModal from '../../shared/components/Orders/OrderReplyModal.jsx';
import AddOrder from '../../shared/components/Orders/AddOrder.jsx';
import { SyncLoader } from 'react-spinners';

export default function Orders() {
    const [totalRecords, setTotalRecords] = useState(0);
    const [page, setPage] = useState(1);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [visible, setVisible] = useState(false);
    const [ordervisible, setOrderVisible] = useState(false);
    const [formdata, setFormdata] = useState({ ordermasterdata: [], total: 0, Total_Quantity: 0, Sub_Total: 0, Billing: 'Billing', GST_Number: '', Order_Date: '', Address: "", District: "", State: "Tamil Nadu", Zipcode: "" });
    const [loading, setLoading] = useState(false);
    const [tabledata, setTabledata] = useState([]);
    const [colfilter, setcolFilter] = useState({});
    const [globalfilter, setglobalfilter] = useState('');
    const [filtervalues, setfiltervalues] = useState([]);
    const [ViewProduct, setViewProduct] = useState(false);
    const [ViewProductData, setViewProductData] = useState([]);
    const [ViewProductLoading, setViewProductLoading] = useState(false);
    const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [searchResults, setSearchResults] = useState([])
    // const [addressFields, setAddressFields] = useState({ });ss
    const [suggestions, setSuggestions] = useState([]);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [activefield, setActiveField] = useState(null);
    let isMounted = true;
    const isInitialMount = useRef(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [orderIdForPreview, setOrderIdForPreview] = useState(null);

    {
        loading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center h-20 w-10 justify-center z-50">
                <SyncLoader color="#024A34" />
            </div>
        )
    }


    const getallorder = useCallback(async () => {
        const res = await getallorders({ first, rows, globalfilter, colfilter });
        setTabledata(res?.resdata);
        setTotalRecords(res?.totallength);
    }, [first, rows, globalfilter, colfilter]);

    useEffect(() => {
        if (isMounted) {
            getallorder();
        }
        return (() => isMounted = false);
    }, [first, rows, globalfilter, colfilter])
    const onPage = (page) => {
        setPage(page)
        setFirst(rows * (page - 1));
        setRows(rows);
    };

    // useEffect(() => {
    //     if (formdata.Delivery_Address && isInitialMount.current) {
    //         const addressParts = formdata.Delivery_Address.split(',').map(item => item.trim());
    //         setAddressFields({
    //             Address: addressParts[0] || "", District: addressParts[1] || "", State: addressParts[2] && addressParts[2] !== "" ? addressParts[2] : "Tamil Nadu", Zipcode: addressParts[3] || ""
    //         });
    //         isInitialMount.current = false;
    //     }
    // }, [formdata.Delivery_Address]);


    const handlechange = async (e) => {
        const { name, value, files } = e.target;
        setActiveField(name)
        if (files) { setFormdata(prev => ({ ...prev, [name]: Array.from(files) })); return; }
        if (name === "Billing_Name" || name === "Mobilenumber") {
            setFormdata(prev => ({ ...prev, [name]: value }));
            if (value.length >= 1) {
                try {
                    const res = await getregularcustomername(value);
                    setSuggestions(res);
                } catch (err) {
                    console.error("Autocomplete fetch failed", err);
                }
            } else {
                setSuggestions([]);
            }
            return;
        }
        if (["Address", "District", "State", "Zipcode"].includes(name)) {
            const updatedFields = { ...formdata, [name]: value };
            setFormdata(updatedFields);
            const fullAddress = `${updatedFields.Address}, ${updatedFields.District}, ${updatedFields.State}, ${updatedFields.Zipcode}`;
            setFormdata(prev => ({ ...prev, Delivery_Address: fullAddress }));
        } else { setFormdata(prev => ({ ...prev, [name]: value })); }
    };
    const cusfilter = (field, value) => {
        setcolFilter(prev => ({ ...prev, [field]: { $in: value } }));
        setFirst(0)
    };

    const handleSuggestionClick = (customer) => {
        setFormdata(prevData => ({
            ...prevData,
            Billing_Name: customer.Billing_Name,
            Email: customer.Email,
            Mobilenumber: customer.Mobilenumber,
            Delivery_Address: customer.Delivery_Address,
            Address: customer.Address,
            District: customer.District,
            State: customer.State,
            Zipcode: customer.Zipcode,
        }));

        setSuggestions([]);
    };



    // const handlesave = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     await saveorders(updatedFormData);
    //     toast.success("Successfully saved");
    //     getallorder();
    //     setVisible(false);
    //     setLoading(false);
    // };

    const addRow = () => {
        const ordermasterdata = { Tax_Type: "" };
        setFormdata(prevData => ({
            ...prevData,
            ordermasterdata: [...prevData.ordermasterdata || [], ordermasterdata]
        }));
    };

    const handledeleteField = (event, rowIndex) => {
        if (formdata['ordermasterdata'].length >= 1) {
            const updatedProducts = formdata.ordermasterdata
                .filter((_, index) => index !== rowIndex['rowIndex'])
                .map((res) => ({ ...res }));
            const Total_Amount = updatedProducts.reduce(
                (sum, item) => sum + (parseFloat(item.Sub_Total) || 0),
                0
            ).toFixed(2);
            const Total_Quantity = updatedProducts.reduce(
                (sum, item) => sum + (parseInt(item.QTY) || 0),
                0
            );
            setFormdata({
                ...formdata,
                ordermasterdata: updatedProducts,
                Total_Amount,
                Total_Quantity,
            });
        }
    };


    const handlechangeProduct = (event, rowData) => {
        const updatedProducts = [...formdata.ordermasterdata];
        const index = rowData['rowIndex'];
        const field = event.target.name;
        const value = event.target.value;
        if (field === "Quantity") {
            const availableStock = parseFloat(updatedProducts[index].QTY || 0);
            const enteredQty = parseFloat(value) || 0;
            if (availableStock === 0) { toast.error("Currently Out of Stock"); updatedProducts[index][field] = "0"; setFormdata({ ...formdata, ordermasterdata: updatedProducts }); return; }
            if (availableStock != 0 && enteredQty > availableStock) {
                toast.error(`No available stock. Max available: ${availableStock}`); updatedProducts[index][field] = "0"; setFormdata({ ...formdata, ordermasterdata: updatedProducts })
                return 0;
            }
        }
        updatedProducts[index][field] = value;
        let { Quantity, Regular_Price, Discount, Disc_Amount, Tax_Percentage, Tax_Type } = updatedProducts[index];
        Quantity = parseFloat(Quantity) || 0;
        Regular_Price = parseFloat(Regular_Price) || 0;
        Discount = parseFloat(updatedProducts[index].Discount) || 0;
        Disc_Amount = parseFloat(updatedProducts[index].Disc_Amount) || 0;
        Tax_Percentage = parseFloat(Tax_Percentage) || 0;
        const totalBase = Quantity * Regular_Price;

        // STEP 1: Calculate Tax First
        let totalWithTax = 0;
        if (Tax_Type === "Inclusive") {
            totalWithTax = totalBase; // Tax already included
        } else {
            const taxAmount = (totalBase * Tax_Percentage) / 100;
            totalWithTax = totalBase + taxAmount;
        }

        // STEP 2: Apply Discount after Tax
        if (field === "Discount") {
            Disc_Amount = (totalWithTax * Discount) / 100;
            updatedProducts[index].Disc_Amount = parseFloat(Disc_Amount.toFixed(2));
        } else if (field === "Disc_Amount") {
            Discount = totalWithTax ? (Disc_Amount / totalWithTax) * 100 : 0;
            updatedProducts[index].Discount = parseFloat(Discount.toFixed(2));
        }

        // Final discount calculation (sync)
        Disc_Amount = (totalWithTax * Discount) / 100;
        updatedProducts[index].Disc_Amount = parseFloat(Disc_Amount.toFixed(2));

        // Final Subtotal
        const Sub_Total = totalWithTax - Disc_Amount;
        updatedProducts[index].Sub_Total = parseFloat(Sub_Total.toFixed(2));

        let Total_Amount = updatedProducts.reduce((sum, item) => sum + (parseFloat(item.Sub_Total) || 0), 0).toFixed(2);
        let Total_Quantity = updatedProducts.reduce((sum, item) => sum + (parseInt(item.QTY) || 0), 0);
        setFormdata({ ...formdata, ordermasterdata: updatedProducts, Total_Amount, Total_Quantity, Sub_Total: Sub_Total.toFixed(2), });

    };

    const handlesave = async (e, showPrint = false) => {
        e.preventDefault();
        setLoading(true);
        const updatedFormdata = { ...formdata, Billing: "Billing", };
        const res = await saveorders(updatedFormdata);
        toast.success("Successfully saved");
        await regularcustomer(updatedFormdata);
        getallorder();
        const resetOrderMasterData = [{ Product_Name: '', Quantity: '', QTY: '', Regular_Price: '', Discount: '', Discount_Amount: '', Tax_Type: '', Tax_Percentage: '', Sub_Total: '', }];
        setFormdata(prevData => ({ ...prevData, Billing_Name: '', Address: '', District: '', State: 'Tamil Nadu', Zipcode: '', Mobilenumber: '', GST_Number: '', ordermasterdata: resetOrderMasterData, Total_Amount: '', Payment_Status: '', Payment_Method: '', Order_Status: '', Remarks: '' }));
        const orderId = res?.orderId;
        if (showPrint && orderId) { setIsPreviewOpen(true); downloadPDF(orderId); setOrderIdForPreview(orderId); }
        setLoading(false);
    };

    const newform = () => {
        setFormdata({});
        setVisible(true)
    }

    const editfrom = async (data) => {
        var res = await getOrderitemsbyid(data.Order_id);
        setFormdata({ ...data, ordermasterdata: res });
        setOrderVisible(true);
    }

    const handleupdate = async (e, showPrint = false) => {
        e.preventDefault()
        setLoading(true)
        const res = await updateOrder(formdata)
        console.log("res", res)
        toast.success("Sucessfully updated")
        getallorder()
        const orderId = res?.order?.Order_id;
        console.log(orderId)
        if (showPrint && orderId) { setIsPreviewOpen(true); downloadPDF(orderId); setOrderIdForPreview(orderId); }
        if (!showPrint) { setOrderVisible(false) }
        setLoading(false)
    }

    const handledelete = (id) => {
        confirmDialog({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'bg-red-500 ml-2 text-white p-2',
            rejectClassName: 'p-2 outline-none border-0',
            accept: async () => {
                await deleteorders(id)
                toast.success("Sucessfully deleted")
                getallorder()
            }
        });
    };

    const downloadPDF = async (data) => {
        console.log("data", data)
        const resData = await apidownloadPDF(data);
        const pdfBlob = new Blob([resData], { type: 'application/pdf' });
        const pdfFileUrl = URL.createObjectURL(pdfBlob);
        setPdfUrl(pdfFileUrl);
        return pdfFileUrl;
    };

    const viewProducts = async (Order_id) => {
        var res = await getOrderitemsbyid(Order_id);
        setViewProductData(res);
        setViewProduct(true)
    }

    const handleReply = (rowData) => {
        setSelectedOrder(rowData);
        setIsReplyModalOpen(true);
    };

    const handleCloseReplyModal = () => {
        setIsReplyModalOpen(false);
        setSelectedOrder(null);
    };

    const newOrder = () => {
        setFormdata({ ordermasterdata: [{ Tax_Type: "" }], Address: "", District: "", State: "Tamil Nadu", GST_Number: '', Country: "India", Zipcode: "" });
        setOrderVisible(true)
    };

    const loadData = (searchIndex, rowData) => {
        const selectedProduct = { ...searchResults[searchIndex] };
        const rowIndex = rowData.rowIndex;
        delete selectedProduct._id;
        selectedProduct.Order_id = formdata.Order_id;
        selectedProduct.Quantity = 1;
        Object.entries(selectedProduct).forEach(([key, value]) => { handlechangeProduct({ target: { name: key, value: value } }, { rowIndex }); },);
        setSearchResults([]);
    };

    return (
        <div>
            <div className="bg-white border rounded-3xl flex flex-col justify-between" style={{ height: "calc(100vh - 70px)" }}>
                <div>
                    {/* <Tableheadpanel newform={newform} newOrder={newOrder} setglobalfilter={setglobalfilter} /> */}
                    <Tableview isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} newform={newform} setPdfUrl={setPdfUrl} newOrder={newOrder} setglobalfilter={setglobalfilter} pdfUrl={pdfUrl} tabledata={tabledata} totalRecords={totalRecords} first={first} editfrom={editfrom} handledelete={handledelete}
                        cusfilter={cusfilter} filtervalues={filtervalues} onPage={onPage} page={page} viewProducts={viewProducts} downloadPDF={downloadPDF} handleReply={handleReply} />
                </div>
                <Tablepagination page={page} first={first} rows={rows} totalRecords={totalRecords} onPage={onPage} setRows={setRows} />
                <AddOrder orderIdForPreview={orderIdForPreview} isPreviewOpen={isPreviewOpen} setIsPreviewOpen={setIsPreviewOpen} setPdfUrl={setPdfUrl} pdfUrl={pdfUrl} activefield={activefield} setIsModalOpen={setIsModalOpen} downloadPDF={downloadPDF} setActiveField={setActiveField} setSuggestions={setSuggestions} suggestions={suggestions} handleSuggestionClick={handleSuggestionClick} tabledata={tabledata} ordervisible={ordervisible} handlechangeProduct={handlechangeProduct} addRow={addRow} handledeleteField={handledeleteField} setFormdata={setFormdata} setOrderVisible={setOrderVisible} setSearchResults={setSearchResults} loadData={loadData} searchResults={searchResults} formdata={formdata} handlechange={handlechange} handleupdate={handleupdate} handlesave={handlesave} />
                <Addandeditform visible={visible} setVisible={setVisible} loading={loading} formdata={formdata} setFormdata={setFormdata}
                    handlechange={handlechange} handlesave={handlesave} handleupdate={handleupdate} />
                <ViewProducts ViewProduct={ViewProduct} setViewProduct={setViewProduct} ViewProductData={ViewProductData} />
                <ConfirmDialog />
                {selectedOrder && (
                    <OrderReplyModal isOpen={isReplyModalOpen} onClose={handleCloseReplyModal} orderDetails={selectedOrder} />
                )}
            </div>

        </div>
    )
}
