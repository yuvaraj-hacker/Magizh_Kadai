import { useCallback, useEffect, useState } from "react"
import Tablepagination from "../../shared/others/Tablepagination";
import toast from "react-hot-toast";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { deleteingredient, getallingredient, saveingredient, updateingredient } from "../../shared/services/apiingredient/apiingredient";
import { getallfeedback } from "../../shared/services/apifeedback/apifeedback";
import Tableheadpanel from "../../shared/components/productrequests/Tableheadpanel";
import Tableview from "../../shared/components/productrequests/Tableview";
import { getSearchquery, SearchStatusUpdate } from "../../shared/services/apiproducts/apiproducts";
export default function Productrequests() {

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
    const [statusModal, setStatusModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    let isMounted = true;

    const getIngredient = useCallback(async () => {
        const res = await getSearchquery({ first, rows, globalfilter, colfilter });
        setTabledata(res?.resdata);
        setTotalRecords(res?.totallength);
    }, [first, rows, globalfilter, colfilter]);

    useEffect(() => {
        if (isMounted) {
            getIngredient();
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

    const newform = () => {
        setFormdata({});
        setVisible(true)
    }

    const editfrom = (data) => {
        setFormdata(data);
        setVisible(true)
    }

    const handleStatusUpdate = async (newStatus, selectedProduct) => {
        try {
          setLoading(true);
          const response = await SearchStatusUpdate(newStatus, selectedProduct);
          if (response?.success) {
            toast.success('Status updated successfully');
            getIngredient();
            setStatusModal(false);
          } else {
            toast.error(response?.message || 'Failed to update status');
          }
        } catch (error) {
          console.error("Error updating status:", error);
          toast.error(error.message || 'Error updating status');
        } finally {
          setLoading(false);
        }
      };

    return (
        <div>
            <div className="bg-white border rounded-3xl">
                <Tableheadpanel newform={newform} setglobalfilter={setglobalfilter} />
                <Tableview tabledata={tabledata} totalRecords={totalRecords} first={first} editfrom={editfrom} statusModal={statusModal} setStatusModal={setStatusModal} loading={loading} setLoading={setLoading}
          selectedProduct={selectedProduct}  setSelectedProduct={setSelectedProduct}   handleStatusUpdate={handleStatusUpdate}      cusfilter={cusfilter} filtervalues={filtervalues} onPage={onPage} page={page} />
                <Tablepagination page={page} first={first} rows={rows} totalRecords={totalRecords} onPage={onPage} setRows={setRows} />
                <ConfirmDialog />
            </div>

        </div>
    )
}