import React, { useCallback, useEffect, useState } from 'react'
import Tableheadpanel from '../../shared/components/Orders/Tableheadpanel';
import Addandeditform from '../../shared/components/Orders/Addandeditform';
import Tablepagination from '../../shared/others/Tablepagination';
import Tableview from '../../shared/components/Orders/Tableview';
import toast from "react-hot-toast";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { deleteorders, getallorders, getOrderitemsbyid, saveorders, updateorders } from '../../shared/services/apiorders/apiorders';
import ViewProducts from '../../shared/components/Orders/ViewProducts';
import { apidownloadPDF, updateOrder } from "../../../shared/services/APIOrder/apiorder.js";
import { saveAs } from 'file-saver';
import OrderReplyModal from '../../shared/components/Orders/OrderReplyModal.jsx';
import AddOrder from '../../shared/components/Orders/AddOrder.jsx';

export default function Orders() {
    const [totalRecords, setTotalRecords] = useState(0);
    const [page, setPage] = useState(1);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [visible, setVisible] = useState(false);
    const [ordervisible, setOrderVisible] = useState(false);
    const [formdata, setFormdata] = useState({ ordermasterdata: [], total: 0, Total_Quantity: 0, Sub_Total: 0 });
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
    const [addressFields, setAddressFields] = useState({ address: "", district: "", state: "Tamilnadu", country: "India", zipcode: "" });
    const [pdfUrl, setPdfUrl] = useState(null);
    let isMounted = true;

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

    const handlechange = (e) => {
        const { name, value, files } = e.target;
        console.log(name)
        console.log(value)
        console.log(files)
        if (files) {
            setFormdata(prev => ({ ...prev, [name]: Array.from(files) }));
            return;
        } if (name === "address" || name === "district" || name === "state" ||
            name === "country" || name === "zipcode") {
            setAddressFields(prev => ({
                ...prev,
                [name]: value
            }));
            const updatedFields = {
                ...addressFields,
                [name]: value
            };
            const fullAddress = `${updatedFields.address}, ${updatedFields.district}, ${updatedFields.state}, ${updatedFields.country}, ${updatedFields.zipcode}`;
            setFormdata(prev => ({
                ...prev,
                Delivery_Address: fullAddress
            }));
        } else {
            setFormdata(prev => ({ ...prev, [name]: value }));
        }
    };

    const cusfilter = (field, value) => {
        setcolFilter(prev => ({ ...prev, [field]: { $in: value } }));
        setFirst(0)
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
            ordermasterdata: [...prevData.ordermasterdata, ordermasterdata]
        }));
    };

    const handledeleteField = (event, rowIndex) => {
        if (formdata['ordermasterdata'].length > 1) {
            const updatedProducts = formdata.ordermasterdata
                .filter((_, index) => index !== rowIndex['rowIndex'])
                .map((res) => ({ ...res }));

            // Correctly recalculate total amount and quantity
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



    //    const handlechangeProduct = (event, rowData) => {
    //     const updatedProducts = [...formdata.ordermasterdata];
    //     const index = rowData['rowIndex'];
    //     const field = event.target.name;
    //     const value = event.target.value;
    //     updatedProducts[index][field] = value;
    //     updatedProducts[index][field] = field === "HSN" ? parseInt(value, 10) : value;
    //     // Extract values
    //     let { QTY, Price, Discount, Disc_Amount, Tax_Percentage, Tax_Type } = updatedProducts[index];
    //     QTY = parseFloat(QTY) || 0;
    //     Price = parseFloat(Price) || 0;
    //     Discount = parseFloat(Discount) || 0;
    //     Disc_Amount = parseFloat(Disc_Amount) || 0;
    //     Tax_Percentage = parseFloat(Tax_Percentage) || 0;
    //     // Calculate subtotal before tax
    //     let subtotalBeforeTax = (QTY * Price) - ((QTY * Price) * (Discount / 100)) - Disc_Amount;

    //     let Sub_Total = 0;

    //     if (Tax_Type === "Inclusive") {
    //         // Tax is already included in the price, extract the base price
    //         let taxFactor = 1 + (Tax_Percentage / 100);
    //         let baseAmount = subtotalBeforeTax / taxFactor;
    //         let taxAmount = subtotalBeforeTax - baseAmount;
    //         Sub_Total = subtotalBeforeTax.toFixed(2);
    //     } else {
    //         // Exclusive tax is added on top
    //         let taxAmount = (subtotalBeforeTax * Tax_Percentage) / 100;
    //         Sub_Total = (subtotalBeforeTax + taxAmount).toFixed(2);
    //     }
    //     updatedProducts[index].Sub_Total = parseFloat(Sub_Total);

    //     // Calculate total amount and total quantity
    //     let Total_Amount = updatedProducts.reduce((sum, item) => sum + (parseFloat(item.Sub_Total) || 0), 0).toFixed(2);
    //     let Total_Quantity = updatedProducts.reduce((sum, item) => sum + (parseInt(item.QTY) || 0), 0);
    //     setFormdata({ ...formdata, ordermasterdata: updatedProducts, Total_Amount: Total_Amount, Total_Quantity: Total_Quantity, Sub_Total: Sub_Total });
    // };


    const handlechangeProduct = (event, rowData) => {
        const updatedProducts = [...formdata.ordermasterdata];
        const index = rowData['rowIndex'];
        const field = event.target.name;
        const value = event.target.value;
        if (field === "QTYS") {
            const availableStock = parseFloat(updatedProducts[index].QTY || 0); // Actual stock
            const enteredQty = parseFloat(value) || 0;
            if (availableStock === 0) { toast.error("Currently Out of Stock"); updatedProducts[index][field] = ""; setFormdata({ ...formdata, ordermasterdata: updatedProducts }); return; }
            if (availableStock != 0 && enteredQty > availableStock) { toast.error(`No available stock. Max available: ${availableStock}`);
            updatedProducts[index][field] = "0";
            setFormdata({...formdata , ordermasterdata:updatedProducts})
             return 0; }
        }
        updatedProducts[index][field] = field === "HSN" ? parseInt(value, 10) : value;
        // Extract and parse values
        let { QTYS, Regular_Price, Discount, Disc_Amount, Tax_Percentage, Tax_Type } = updatedProducts[index];
        QTYS = parseFloat(QTYS) || 0;
        Regular_Price = parseFloat(Regular_Price) || 0;
        Discount = parseFloat(Discount) || 0;
        Disc_Amount = parseFloat(Disc_Amount) || 0;
        Tax_Percentage = parseFloat(Tax_Percentage) || 0;
        const totalBase = QTYS * Regular_Price;
        // Sync discount fields
        if (field === "Disc_Amount") {
            // Recalculate percentage from amount
            Discount = totalBase ? (Disc_Amount / totalBase) * 100 : 0;
            updatedProducts[index].Discount = Math.round(Discount);
        } else if (field === "Discount") {
            // Recalculate amount from percentage
            Disc_Amount = (totalBase * Discount) / 100;
            updatedProducts[index].Disc_Amount = Math.round(Disc_Amount);
        }
        // Recalculate subtotal before tax
        let subtotalBeforeTax = totalBase - (totalBase * (Discount / 100));
        let Sub_Total = 0;
        if (Tax_Type === "Inclusive") {
            let taxFactor = 1 + (Tax_Percentage / 100);
            let baseAmount = subtotalBeforeTax / taxFactor;
            Sub_Total = subtotalBeforeTax;
        } else {
            let taxAmount = (subtotalBeforeTax * Tax_Percentage) / 100;
            Sub_Total = subtotalBeforeTax + taxAmount;
        }
        updatedProducts[index].Sub_Total = parseFloat(Sub_Total.toFixed(2));
        // Calculate total amount and quantity
        let Total_Amount = updatedProducts.reduce((sum, item) => sum + (parseFloat(item.Sub_Total) || 0), 0).toFixed(2);
        let Total_Quantity = updatedProducts.reduce((sum, item) => sum + (parseInt(item.QTY) || 0), 0);
        setFormdata({ ...formdata, ordermasterdata: updatedProducts, Total_Amount, Total_Quantity, Sub_Total: Sub_Total.toFixed(2), });
    };


    const handlesave = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(formdata)
        await saveorders(formdata);
        toast.success("Successfully saved");
        getallorder();
        setOrderVisible(false);
        setLoading(false);
    };


    const newform = () => {
        setFormdata({});
        setVisible(true)
    }
    // const editfrom = (data) => {
    //     setFormdata(data);
    //     setOrderVisible(true)
    // }

    const editfrom = async (data) => {
        var res = await getOrderitemsbyid(data.Order_id);
        setFormdata({ ...data, ordermasterdata: res });
        setOrderVisible(true)
    }


    const handleupdate = async (e) => {
        e.preventDefault()
        setLoading(true)
        await updateOrder(formdata)
        toast.success("Sucessfully updated")
        getallorder()
        setOrderVisible(false)
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

    // const downloadPDF = async (data) => {
    //     var resData = await apidownloadPDF(data)
    //     const pdfBlob = new Blob([resData], { type: 'application/pdf' });
    //     const pdfFileName = `${data}.pdf`;
    //     saveAs(pdfBlob, pdfFileName);
    // }
    const downloadPDF = async (data) => {
        const resData = await apidownloadPDF(data);
        const pdfBlob = new Blob([resData], { type: 'application/pdf' });
        const pdfFileUrl = URL.createObjectURL(pdfBlob);
        setPdfUrl(pdfFileUrl); // set for preview
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
        setFormdata({ ordermasterdata: [{ Tax_Type: "" }] });
        setAddressFields({ address: "", district: "", state: "Tamilnadu", country: "India", zipcode: "" });
        setOrderVisible(true)
    };

    // const loadData = (i, index) => {
    //     formdata['ordermasterdata'][index['rowIndex']] = { ...formdata['ordermasterdata'][index['rowIndex']], ...searchResults[i] }
    //     setFormdata({ ...formdata});
    //     setSearchResults([]);
    // }
    const loadData = (searchIndex, rowData) => {
        const selectedProduct = { ...searchResults[searchIndex] };
        const rowIndex = rowData.rowIndex;
        delete selectedProduct._id;
        selectedProduct.Order_id = formdata.Order_id;
        console.log("selectedProduct", selectedProduct)
        console.log("rowindex", rowIndex)
        Object.entries(selectedProduct).forEach(([key, value]) => { handlechangeProduct({ target: { name: key, value: value } }, { rowIndex }); },);
        setSearchResults([]);
        setShowResults(false);
    };

    return (
        <div>
            <div className="bg-white border rounded-3xl flex flex-col justify-between" style={{ height: "calc(100vh - 70px)" }}>
                <div>
                    <Tableheadpanel newform={newform} newOrder={newOrder} setglobalfilter={setglobalfilter} />
                    <Tableview newform={newform} newOrder={newOrder} setglobalfilter={setglobalfilter} pdfUrl={pdfUrl} tabledata={tabledata} totalRecords={totalRecords} first={first} editfrom={editfrom} handledelete={handledelete}
                        cusfilter={cusfilter} filtervalues={filtervalues} onPage={onPage} page={page} viewProducts={viewProducts} downloadPDF={downloadPDF} handleReply={handleReply} />
                </div>
                <Tablepagination page={page} first={first} rows={rows} totalRecords={totalRecords} onPage={onPage} setRows={setRows} />
                <AddOrder addressFields={addressFields} ordervisible={ordervisible} handlechangeProduct={handlechangeProduct} addRow={addRow} handledeleteField={handledeleteField} setFormdata={setFormdata} setOrderVisible={setOrderVisible} setSearchResults={setSearchResults} loadData={loadData} searchResults={searchResults} formdata={formdata} handlechange={handlechange} handleupdate={handleupdate} handlesave={handlesave} />
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
