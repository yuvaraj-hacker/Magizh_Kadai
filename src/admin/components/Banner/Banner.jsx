// import { useCallback, useEffect, useState } from "react"
// import { deleteproducts, getallproducts, saveproducts, updateproducts } from "../../shared/services/apiproducts/apiproducts";
// import Tablepagination from "../../shared/others/Tablepagination";
// import toast from "react-hot-toast";
// import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
// import { getallcategory } from "../../shared/services/apicategory/apicategory";
// import Tableview from "../../shared/components/banner/Tableview";
// import Addandeditform from "../../shared/components/banner/Addandeditform";
// import Tableheadpanel from "../../shared/components/banner/Tableheadpanel";
// import { deletebanners, deletebannertype, getallbanners, getallbannertype, savebanners, savebannertype, updatebanners, updatebannertype } from "../../shared/services/apibanners/apibanners";
// import BannerTypeform from "../../shared/components/banner/BannerTypeform";
// import Bannerview from "../../shared/components/banner/Bannerview";
// export default function Banner() {

//     const [totalRecords, setTotalRecords] = useState(0);
//     const [bannertypetotalRecords, setBannertypeTotalRecords] = useState(0);
//     const [page, setPage] = useState(1);
//     const [first, setFirst] = useState(0);
//     const [rows, setRows] = useState(10);
//     const [visible, setVisible] = useState(false);
//     const [bannervisible, setBannerVisible] = useState(false);
//     const [formdata, setFormdata] = useState({});
//     const [bannerdata, setBannerdata] = useState({});
//     const [loading, setLoading] = useState(false);
//     const [bannerloading, setBannerLoading] = useState(false);
//     const [tabledata, setTabledata] = useState([]);
//     const [bannertabledata, setbannertabledata] = useState([]);
//     const [colfilter, setcolFilter] = useState({});
//     const [globalfilter, setglobalfilter] = useState('');
//     const [filtervalues, setfiltervalues] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState('');
//     const [filteredSubcategories, setFilteredSubcategories] = useState([]);
//     const [imageDataUrl, setImageDataUrl] = useState(null);
//     const [isDialogVisible, setIsDialogVisible] = useState(false);

//     let isMounted = true;

//     const getallbanner = useCallback(async () => {
//         const res = await getallbanners({ first, rows, globalfilter, colfilter });
//         setTabledata(res?.resdata);
//         setTotalRecords(res?.totallength);
//     }, [first, rows, globalfilter, colfilter]);


//     useEffect(() => {
//         if (isMounted) {
//             getallbanner();
//         }
//         return (() => isMounted = false);
//     }, [first, rows, globalfilter, colfilter])

//     const getbannertype = useCallback(async () => {
//         const res = await getallbannertype({ first, rows, globalfilter, colfilter });
//         setbannertabledata(res?.resdata);
//         setBannertypeTotalRecords(res?.totallength);
//     }, [first, rows, globalfilter, colfilter]);


//     useEffect(() => {
//         if (isMounted) {
//             getbannertype();
//         }
//         return (() => isMounted = false);
//     }, [first, rows, globalfilter, colfilter])

//     const onPage = (page) => {
//         setPage(page)
//         setFirst(rows * (page - 1));
//         setRows(rows);
//     };


//     const handlechange = (e) => {
//         if (e.target.files) {
//             const filesArray = Array.from(e.target.files);
//             setFormdata({ ...formdata, [e.target.name]: filesArray });
//         } else {
//             setFormdata({ ...formdata, [e.target.name]: e.target.value });
//         }
//     };



//     const handlebannerchange = (e) => {
//         if (e.target.files) {
//             const filesArray = Array.from(e.target.files);
//             setBannerdata({ ...bannerdata, [e.target.name]: filesArray });
//         } else {
//             setBannerdata({ ...bannerdata, [e.target.name]: e.target.value });
//         }
//     };


//     const cusfilter = (field, value) => {
//         setcolFilter(prev => ({ ...prev, [field]: { $in: value } }));
//         setFirst(0)
//     };

//     const handlesave = async (e) => {
//         e.preventDefault();
//         console.log(formdata)
//         setLoading(true);
//         await savebanners({ ...formdata });
//         toast.success("Successfully saved");
//         getallbanner();
//         setVisible(false);
//         setLoading(false);
//     };


 

//     const handlebannertypesave = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         await savebannertype({ ...bannerdata });
//         toast.success("Successfully saved");
//         getallbanner();
//         setBannerVisible(false);
//         setBannerLoading(false);
//     };

//     const newform = () => {
//         setFormdata({});
//         setSelectedCategory(null)
//         setVisible(true)
//     }
//     const bannerform = () => {
//         setBannerdata({});
//         setBannerVisible(true)
//     }

//     const editfrom = (data) => {
//         setFormdata(data);
//         setSelectedCategory(data.Category);
//         const selectedCategoryName = data.Category;
//         setSelectedCategory(selectedCategoryName);
//         const selectedCategoryObject = categories.find(category => category.Category_Name === selectedCategoryName);
//         if (selectedCategoryObject) {
//             const subcategories = selectedCategoryObject.Subcategories.map(subcategoryString => subcategoryString.split(',').map(sub => sub.trim()));
//             setFilteredSubcategories(subcategories.flat());
//         } else {
//             setFilteredSubcategories([]);
//         }
//         setVisible(true)

//     }


//     const Bannereditfrom = (data) => {
//         setBannerdata(data);
//         setBannerVisible(true)

//     }

//     const handleupdate = async (e) => {
//         e.preventDefault()
//         console.log("Form Data on Update:", formdata);
//         setLoading(true)
//         console.log(formdata)
//         await updatebanners(formdata)
//         toast.success("Sucessfully updated")
//         getallbanner()
//         setVisible(false)
//         setLoading(false)
//     }
//     const handlebannertypeupdate = async (e) => {
//         e.preventDefault()
//         console.log("Form Data on Update:", bannerdata);
//         setLoading(true)
//         console.log(bannerdata)
//         await updatebannertype(bannerdata)
//         toast.success("Sucessfully updated")
//         getbannertype()
//         setBannerVisible(false)
//         setBannerLoading(false)
//     }

//     const handledelete = (id) => {
//         confirmDialog({
//             message: 'Do you want to delete this record?',
//             header: 'Delete Confirmation',
//             icon: 'pi pi-info-circle',
//             defaultFocus: 'reject',
//             acceptClassName: 'bg-red-500 ml-2 text-white p-2',
//             rejectClassName: 'p-2 outline-none border-0',
//             accept: async () => {
//                 await deletebanners(id)
//                 toast.success("Sucessfully deleted")
//                 getallbanner()
//             }
//         });
//     };

//     const handledeletebannertype = (id) => {
//         confirmDialog({
//             message: 'Do you want to delete this record?',
//             header: 'Delete Confirmation',
//             icon: 'pi pi-info-circle',
//             defaultFocus: 'reject',
//             acceptClassName: 'bg-red-500 ml-2 text-white p-2',
//             rejectClassName: 'p-2 outline-none border-0',
//             accept: async () => {
//                 await deletebannertype(id)
//                 toast.success("Sucessfully deleted")
//                 getbannertype()
//             }
//         });
//     };


//     return (
//         <div>
//             <div className="bg-white border rounded-3xl">
//                 <Tableheadpanel newform={newform} setglobalfilter={setglobalfilter} bannerform={bannerform} setIsDialogVisible={setIsDialogVisible} />

//                 <Tableview tabledata={tabledata} totalRecords={totalRecords} first={first} editfrom={editfrom} handledelete={handledelete}
//                     cusfilter={cusfilter} filtervalues={filtervalues} onPage={onPage} page={page} />

//                     <Bannerview setIsDialogVisible={setIsDialogVisible} isDialogVisible={isDialogVisible} bannertabledata={bannertabledata} bannertypetotalRecords={bannertypetotalRecords} first={first} Bannereditfrom={Bannereditfrom} handledeletebannertype={handledeletebannertype}
//                     cusfilter={cusfilter} filtervalues={filtervalues} onPage={onPage} page={page}  />

//                 <Tablepagination page={page} first={first} rows={rows} totalRecords={totalRecords} onPage={onPage} setRows={setRows} />
//                 <Addandeditform visible={visible} setVisible={setVisible} loading={loading} formdata={formdata} setFormdata={setFormdata} imageDataUrl={imageDataUrl}
//                     handlechange={handlechange} handlesave={handlesave} handleupdate={handleupdate} selectedCategory={selectedCategory} filteredSubcategories={filteredSubcategories} categories={categories} />
//                 <ConfirmDialog />
//                 <BannerTypeform bannervisible={bannervisible} setBannerVisible={setBannerVisible} bannerdata={bannerdata} setBannerdata={setBannerdata} bannerloading={bannerloading}
//                     handlebannerchange={handlebannerchange} handlebannertypesave={handlebannertypesave} handlebannertypeupdate={handlebannertypeupdate} />
//             </div>

//         </div>
//     )
// }

import { useCallback, useEffect, useState } from "react"
import { deletebanners, getallbanners, savebanners, updatebanners } from "../../shared/services/apibanners/apibanners";
import Tablepagination from "../../shared/others/Tablepagination";
import toast from "react-hot-toast";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import Tableview from "../../shared/components/banner/Tableview";
import Tableheadpanel from "../../shared/components/banner/Tableheadpanel";
import AddandeditformMainCarousel from "../../shared/components/banner/AddandeditformMainCarousel";
import AddandeditformCategoryDeals from "../../shared/components/banner/AddandeditformCategoryDeals";

export default function Banner() {
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
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [filteredSubcategories, setFilteredSubcategories] = useState([]);
    const [activeTab, setActiveTab] = useState('Main Carousel');

    let isMounted = true;

    const getallbanner = useCallback(async () => {
        const res = await getallbanners({ first, rows, globalfilter, colfilter });
        setTabledata(res?.resdata);
        setTotalRecords(res?.totallength);
    }, [first, rows, globalfilter, colfilter]);

    useEffect(() => {
        if (isMounted) {
            getallbanner();
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
    };

    const cusfilter = (field, value) => {
        setcolFilter(prev => ({ ...prev, [field]: { $in: value } }));
        setFirst(0)
    };

    const handlesave = async (e) => {
        e.preventDefault();
        setLoading(true);
        await savebanners({ ...formdata });
        toast.success("Successfully saved");
        getallbanner();
        setVisible(false);
        setLoading(false);
    };

    const handleupdate = async (e) => {
        e.preventDefault()
        setLoading(true)
        await updatebanners(formdata)
        toast.success("Sucessfully updated")
        getallbanner()
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
                await deletebanners(id)
                toast.success("Sucessfully deleted")
                getallbanner()
            }
        });
    };

    return (
        <div>
            <div className="bg-white border rounded-3xl">
                <Tableheadpanel
                    newform={() =>{setFormdata({}); setVisible(true)}}
                    setglobalfilter={setglobalfilter}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />

                <Tableview
                    tabledata={tabledata}
                    totalRecords={totalRecords}
                    first={first}
                    editfrom={(data) => {
                        setFormdata(data);
                        setVisible(true);
                    }}
                    handledelete={handledelete}
                    cusfilter={cusfilter}
                    filtervalues={filtervalues}
                    onPage={onPage}
                    page={page}
                    activeTab={activeTab}
                />

                <Tablepagination
                    page={page}
                    first={first}
                    rows={rows}
                    totalRecords={totalRecords}
                    onPage={onPage}
                    setRows={setRows}
                />

                {activeTab === 'Main Carousel' && (
                    <AddandeditformMainCarousel
                        visible={visible}
                        setVisible={setVisible}
                        loading={loading}
                        formdata={formdata}
                        setFormdata={setFormdata}
                        handlechange={handlechange}
                        handlesave={handlesave}
                        handleupdate={handleupdate}
                    />
                )}

                {activeTab === 'Category Deals' && (
                    <AddandeditformCategoryDeals
                        visible={visible}
                        setVisible={setVisible}
                        loading={loading}
                        formdata={formdata}
                        setFormdata={setFormdata}
                        handlechange={handlechange}
                        handlesave={handlesave}
                        handleupdate={handleupdate}
                    />
                )}

                <ConfirmDialog />
            </div>
        </div>
    )
}