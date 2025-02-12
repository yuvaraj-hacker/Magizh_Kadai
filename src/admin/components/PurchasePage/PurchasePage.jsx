import React, { useCallback, useEffect, useState } from 'react'
import Tableheadpanel from '../../shared/components/Purchase/Tableheadpanel';
import Tableview from '../../shared/components/Purchase/Tableview';
import Tablepagination from '../../shared/others/Tablepagination';
import Addandeditform from '../../shared/components/Purchase/Addandeditform';
import ViewProducts from '../../shared/components/Purchase/ViewProducts';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';
import { searchproducts } from '../../shared/services/apiproducts/apiproducts';
import { deletepurchase, getallpurchases, getpurchaseitemsbyid, savepurchase, updatepurchase } from '../../shared/services/apipurchase/apipurchase';
import toast from 'react-hot-toast';

export default function PurchasePage() {
    const [totalRecords, setTotalRecords] = useState(0);
    const [page, setPage] = useState(1);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [visible, setVisible] = useState(false);
    const [formdata, setFormdata] = useState({ PurchaseMaster: [], total: 0, Total_Quantity: 0, Total_Amount: 0 });
    const [loading, setLoading] = useState(false);
    const [tabledata, setTabledata] = useState([]);
    const [colfilter, setcolFilter] = useState({});
    const [globalfilter, setglobalfilter] = useState('');
    const [filtervalues, setfiltervalues] = useState([]);
    const [ViewProduct, setViewProduct] = useState(false);
    const [ViewProductData, setViewProductData] = useState([]);
    const [searchResults, setSearchResults] = useState([])
    const [RowIndex, setRowIndex] = useState(null)
    const [ViewProductLoading, setViewProductLoading] = useState(false);

    let isMounted = true;

    const getallpurchase = useCallback(async () => {
        const res = await getallpurchases({ first, rows, globalfilter, colfilter });
        setTabledata(res?.resdata);
        setTotalRecords(res?.totallength);
    }, [first, rows, globalfilter, colfilter]);

    useEffect(() => {
        if (isMounted) {
            getallpurchase();
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
        await savepurchase(formdata);
        toast.success("Successfully saved");
        getallpurchase();
        setVisible(false);
        setLoading(false);
    };

    const newform = () => {
        setFormdata({ PurchaseMaster: [{ QTY: 0, Discount: 0, Disc_Amount: 0, Tax_Percentage: 0,  Tax_Type: "", }], Total_Quantity: 0, Total_Amount: 0 });
        setVisible(true)
    }

    const editfrom = async (data) => {
        var res = await getpurchaseitemsbyid(data.Purchase_id);
        setFormdata({ ...data, PurchaseMaster: res });
        setVisible(true)
    }

    const handleupdate = async (e) => {
        e.preventDefault()
        setLoading(true)
        await updatepurchase(formdata)
        toast.success("Sucessfully updated")
        getallpurchase()
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
                await deletepurchase(id)
                toast.success("Sucessfully deleted")
                getallpurchase()
            }
        });
    };

    const viewProducts = async (Purchase_id) => {
        console.log(Purchase_id)
        var res = await getpurchaseitemsbyid(Purchase_id);
        setViewProductData(res);
        setViewProduct(true)
    }

    const handleSearchChange = async (e, rowIndex) => {
        formdata['PurchaseMaster'][rowIndex['rowIndex']] = { ...formdata['PurchaseMaster'][rowIndex['rowIndex']], Product_Name: e.target.value };
        setFormdata(formdata)

        if (e.target.value) {
            var data = await searchproducts({ data: e.target.value });
            setSearchResults(data);
        }
        else {
            setSearchResults([]);
        }
        setRowIndex(rowIndex['rowIndex']);
    }

    // const addRow = () => {
    //     const newObject = {Product_Name: formdata.Product_Name,QTY:0,Discount:0,Disc_Amount:0,Tax_Percentage:0 };
    //     setFormdata(prevData => ({ ...prevData, PurchaseMaster: [...prevData.PurchaseMaster, newObject] }));
    // };

    const addRow = () => {
        const newObject = { Product_Name: "", Brand_Name: "", QTY: 0, Price: 0, Discount: 0, Disc_Amount: 0, Tax_Percentage: 0, Tax_Type: "", Subtotal: 0};
        setFormdata(prevData => ({
            ...prevData,
            PurchaseMaster: [...prevData.PurchaseMaster, newObject]
        }));
    };

    const handledeleteField = (event, rowIndex) => {
        if (formdata['PurchaseMaster'].length > 1) {
            var datas = formdata;
            const updatedProducts = datas.PurchaseMaster.filter((_, index) => index !== rowIndex['rowIndex']).map((res, index) => ({ ...res }));
            var Total_Amount = updatedProducts.reduce((sum, item) => sum + (item.Amount * 1), 0).toFixed(2);
            var Total_Quantity = updatedProducts.reduce((sum, item) => sum + parseInt(item.QTY), 0);
            setFormdata({ ...formdata, PurchaseMaster: updatedProducts, Total_Amount: Total_Amount, Total_Quantity: Total_Quantity });
        }
    };

    const handlechangeProduct = (value, rowData) => {
        const updatedProducts = [...formdata.PurchaseMaster];
        updatedProducts[rowData['rowIndex']][value.target.name] = value.target.value;
        var route = updatedProducts[rowData['rowIndex']];
        updatedProducts[rowData['rowIndex']].Amount = ((((((route.QTY * 1) * (route.Price * 1)) - (((route.QTY * 1) * (route.Price * 1)) * (route.Discount * 1)) / 100) - (route.Disc_Amount * 1)) * (route.Tax_Percentage * 1) / 100) + (((((route.QTY * 1) * (route.Price * 1)) - (((route.QTY * 1) * (route.Price * 1)) * (route.Discount * 1)) / 100) - (route.Disc_Amount * 1)))).toFixed(2);
        var Total_Amount = updatedProducts.reduce((sum, item) => sum + (item.Amount * 1), 0).toFixed(2);
        var Total_Quantity = formdata['PurchaseMaster'].reduce((sum, item) => sum + parseInt(item.QTY), 0);
        setFormdata({ ...formdata, PurchaseMaster: updatedProducts, Total_Amount: Total_Amount, Total_Quantity: Total_Quantity });
    }


    const loadData = (i, index) => {
        formdata['PurchaseMaster'][index['rowIndex']] = { ...formdata['PurchaseMaster'][index['rowIndex']], ...searchResults[i] }
        formdata['PurchaseMaster'][index['rowIndex']] = { ...formdata['PurchaseMaster'][index['rowIndex']], ...searchResults[i], QTY: 1 };
        var Total_Amount = formdata['PurchaseMaster'].reduce((sum, item) => sum + (item.Amount * 1), 0).toFixed(2);
        var Total_Quantity = formdata['PurchaseMaster'].reduce((sum, item) => sum + parseInt(item.QTY), 0);
        setFormdata({ ...formdata, Total_Amount: Total_Amount, Total_Quantity: Total_Quantity });
        setSearchResults([]);
    }

    return (
        <div>
            <div className="bg-white border rounded-3xl">
                <Tableheadpanel newform={newform} setglobalfilter={setglobalfilter} />
                <Tableview tabledata={tabledata} totalRecords={totalRecords} first={first} editfrom={editfrom} handledelete={handledelete}
                    cusfilter={cusfilter} filtervalues={filtervalues} onPage={onPage} page={page} viewProducts={viewProducts} />
                <Tablepagination page={page} first={first} rows={rows} totalRecords={totalRecords} onPage={onPage} setRows={setRows} />
                <Addandeditform visible={visible} setVisible={setVisible} loading={loading} formdata={formdata} setFormdata={setFormdata} handlechange={handlechange}
                    handlesave={handlesave} handleupdate={handleupdate} addRow={addRow} handleSearchChange={handleSearchChange} searchResults={searchResults}
                    RowIndex={RowIndex} handlechangeProduct={handlechangeProduct} handledeleteField={handledeleteField} loadData={loadData} />
                <ViewProducts ViewProduct={ViewProduct} setViewProduct={setViewProduct} ViewProductData={ViewProductData} />
                <ConfirmDialog />
            </div>

        </div>
    )
}
