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

export default function Orders() {
    const [totalRecords, setTotalRecords] = useState(0);
    const [page, setPage] = useState(1);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [visible, setVisible] = useState(false);
    const [formdata, setFormdata] = useState({});
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
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setFormdata({ ...formdata, [e.target.name]: filesArray });
        } else {
            setFormdata({ ...formdata, [e.target.name]: e.target.value });
        }
    }

    const cusfilter = (field, value) => {
        setcolFilter(prev => ({ ...prev, [field]: { $in: value } }));
        setFirst(0)
    };

    const handlesave = async (e) => {
        e.preventDefault();
        setLoading(true);
        await saveorders(updatedFormData);
        toast.success("Successfully saved");
        getallorder();
        setVisible(false);
        setLoading(false);
    };

    const newform = () => {
        setFormdata({});
        setVisible(true)
    }

    const editfrom = (data) => {
        setFormdata(data);
        setVisible(true)
    }

    const handleupdate = async (e) => {
        e.preventDefault()
        setLoading(true)
        await updateOrder(formdata)
        toast.success("Sucessfully updated")
        getallorder()
        setVisible(false)
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
        var resData = await apidownloadPDF(data)
        const pdfBlob = new Blob([resData], { type: 'application/pdf' });
        const pdfFileName = `${data}.pdf`;
        saveAs(pdfBlob, pdfFileName);
    }

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

    return (
        <div>
            <div className="bg-white border rounded-3xl">
                <Tableheadpanel newform={newform} setglobalfilter={setglobalfilter} />
                <Tableview tabledata={tabledata} totalRecords={totalRecords} first={first} editfrom={editfrom} handledelete={handledelete}
                    cusfilter={cusfilter} filtervalues={filtervalues} onPage={onPage} page={page} viewProducts={viewProducts} downloadPDF={downloadPDF} handleReply={handleReply} />
                <Tablepagination page={page} first={first} rows={rows} totalRecords={totalRecords} onPage={onPage} setRows={setRows} />
                <Addandeditform visible={visible} setVisible={setVisible} loading={loading} formdata={formdata} setFormdata={setFormdata}
                    handlechange={handlechange} handlesave={handlesave} handleupdate={handleupdate} />
                <ViewProducts ViewProduct={ViewProduct} setViewProduct={setViewProduct} ViewProductData={ViewProductData} />
                <ConfirmDialog />
                {selectedOrder && (
                    <OrderReplyModal
                        isOpen={isReplyModalOpen}
                        onClose={handleCloseReplyModal}
                        orderDetails={selectedOrder}
                    />
                )}
            </div>

        </div>
    )
}
