import { useCallback, useEffect, useState } from "react"
import Tablepagination from "../../shared/others/Tablepagination";
import toast from "react-hot-toast";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import Tableheadpanel from "../../shared/components/category/Tableheadpanel";
import Tableview from "../../shared/components/category/Tableview";
import Addandeditform from "../../shared/components/category/Addandeditform";
import { deletecategory, getallcategory, savecategory, updatecategory } from "../../shared/services/apicategory/apicategory";
export default function Category() {

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
    const [imageDataUrl, setImageDataUrl] = useState(null);

    let isMounted = true;

    const getallproduct = useCallback(async () => {
        const res = await getallcategory({ first, rows, globalfilter, colfilter });
        setTabledata(res?.resdata);
        setTotalRecords(res?.totallength);
    }, [first, rows, globalfilter, colfilter]);

    useEffect(() => {
        if (isMounted) {
            getallproduct();
        }
        return (() => isMounted = false);
    }, [first, rows, globalfilter, colfilter])

    const onPage = (page) => {
        setPage(page)
        setFirst(rows * (page - 1));
        setRows(rows);
    };

    // const handlechange = (e)=>{
    //     if(e.target.files){
    //         setFormdata({...formdata,...{[e.target.name]:e.target.files}});
    //     }
    //     else {
    //     setFormdata({...formdata,...{[e.target.name]:e.target.value}});
    //     }
    // }

    const handlechange = (e) => {
        if (e.target.files) {
            const reader = new FileReader();
            reader.onload = function (eve) {
                setImageDataUrl(eve.target.result);
            };

            reader.readAsDataURL(e.target.files[0]);

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
        e.preventDefault()
        setLoading(true)
        await savecategory(formdata)
        toast.success("Sucessfully saved")
        getallproduct()
        setVisible(false)
        setLoading(false)
    }

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
        await updatecategory(formdata)
        toast.success("Sucessfully updated")
        getallproduct()
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
                await deletecategory(id)
                toast.success("Sucessfully deleted")
                getallproduct()
            }
        });
    };

    return (
        <div>
            <div className="bg-white border rounded-3xl">
                <Tableheadpanel newform={newform} setglobalfilter={setglobalfilter} />
                <Tableview tabledata={tabledata} totalRecords={totalRecords} first={first} editfrom={editfrom} handledelete={handledelete} cusfilter={cusfilter} filtervalues={filtervalues} onPage={onPage} page={page} />
                <Tablepagination page={page} first={first} rows={rows} totalRecords={totalRecords} onPage={onPage} setRows={setRows} />
                <Addandeditform visible={visible} setVisible={setVisible} loading={loading} formdata={formdata} setFormdata={setFormdata} imageDataUrl={imageDataUrl} handlechange={handlechange} handlesave={handlesave} handleupdate={handleupdate} />
                <ConfirmDialog />
            </div>

        </div>
    )
}