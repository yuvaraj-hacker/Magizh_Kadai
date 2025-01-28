
import React, { useCallback, useEffect, useState } from 'react';
import Tableheadpanel from '../../shared/components/Offers/Tableheadpanel';
import Addandeditform from '../../shared/components/Offers/Addandeditform';
import { getallproducts } from '../../shared/services/apiproducts/apiproducts';
import toast from 'react-hot-toast';
import { deleteoffers, getalloffers, saveoffers, updateoffers } from '../../shared/services/apioffers/apioffer';
import TableView from '../../shared/components/Offers/Tableview';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';


export default function OfferPage() {
    const [formdata, setFormdata] = useState({});
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [tabledata, setTabledata] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [colfilter, setcolFilter] = useState({});
    const [globalfilter, setglobalfilter] = useState('');
    const [filtervalues, setfiltervalues] = useState([]);
    const [page, setPage] = useState(1);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);

    let isMounted = true;

    const getOffer = useCallback(async () => {
        const res = await getalloffers({ first, rows, globalfilter, colfilter });
        if (res?.resdata) {
            setTabledata(res.resdata);
            setTotalRecords(res.totallength);
        }
    }, [first, rows, globalfilter, colfilter]);

    useEffect(() => {
        if (isMounted) {
            getOffer();
        }
        return (() => isMounted = false);
    }, [first, rows, globalfilter, colfilter])


    const onPage = (page) => {
        setPage(page)
        setFirst(rows * (page - 1));
        setRows(rows);
    };


    const cusfilter = (field, value) => {
        setcolFilter(prev => ({ ...prev, [field]: { $in: value } }));
        setFirst(0)
    };

    // const editfrom = (data) => {
    //     setFormdata(data);

    //     // Dynamically set subcategories based on the selected category
    //     const filteredSubcategories = Array.from(
    //         new Set(
    //             products
    //                 .filter(item => item.Category === data.Category)
    //                 .map(item => item.Sub_Category)
    //         )
    //     ).map(subcategory => ({
    //         name: subcategory,
    //     }));
    //     setSubcategories(filteredSubcategories);

    //     // Ensure selected products are preloaded
    //     setVisible(true);
    // };

    const editfrom = (data) => {
        setFormdata({...data,Products: data.Products.map((product) => product._id),});
        const filteredSubcategories = Array.from(
            new Set(
                products
                    .filter((item) => item.Category === data.Category)
                    .map((item) => item.Sub_Category)
            )
        ).map((subcategory) => ({
            name: subcategory,
        }));
        setSubcategories(filteredSubcategories);
        setVisible(true);
    };
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getallproducts();
                const allProducts = response.resdata;
                const uniqueCategories = Array.from(
                    new Set(allProducts.map(item => item.Category))
                ).map(category => ({
                    name: category,
                }));

                setCategories(uniqueCategories);
                setProducts(allProducts);
            } catch (error) {
                toast.error("Failed to fetch data");
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handlechange = (e) => {
        const { name, value } = e.target;
        setFormdata(prevData => ({
            ...prevData,
            [name]: value,
        }));

        if (name === 'Category' && value) {
            const filteredSubcategories = Array.from(
                new Set(
                    products
                        .filter(item => item.Category === value)
                        .map(item => item.Sub_Category)
                )
            ).map(subcategory => ({
                name: subcategory,
            }));
            setSubcategories(filteredSubcategories);
        }
    };

    const newform = () => {
        setFormdata({});
        setVisible(true);
    };
    const handlesave = async (e) => {
        e.preventDefault()
        setLoading(true)
        await saveoffers(formdata)
        toast.success("Sucessfully saved")
         getOffer()
        setVisible(false)
        setLoading(false)
    }

    const handleupdate = async (e) => {
        e.preventDefault()
        setLoading(true)
        await updateoffers(formdata)
        toast.success("Sucessfully updated")
        getOffer()
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
            accept:async ()=>{
             await deleteoffers(id)
             toast.success("Sucessfully deleted")
             getOffer()
            }
        });
    };
    return (
        <>
            <Tableheadpanel newform={newform} />
            <TableView
                tabledata={tabledata}
                totalRecords={totalRecords}
                first={first}
                editfrom={editfrom}
                handledelete={handledelete}
                cusfilter={cusfilter}
                filtervalues={filtervalues}
                onPage={onPage}
                page={page}
            />
            <Addandeditform
                visible={visible}
                setVisible={setVisible}
                formdata={formdata}
                handlechange={handlechange}
                categories={categories}
                setCategories={setCategories}
                subcategories={subcategories}
                setSubcategories={setSubcategories}
                products={products}
                handlesave={handlesave}
                handleupdate={handleupdate}
            />
              <ConfirmDialog />
        </>
    );
}

