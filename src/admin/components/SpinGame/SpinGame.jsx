import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { deletedata, getalldata, getuniquevaluebyfield } from "../../shared/services/apispingame/apispingame";
import Tableview from "../../shared/components/spingame/Tableview";
import Tableheadpanel from "../../shared/components/spingame/Tableheadpanel";

export default function SpinGame() {
  const [totalRecords, setTotalRecords] = useState(0);
  const [gender, setgender] = useState([]);
  const [size, setsize] = useState([]);
  const [Tag, setTag] = useState([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  // const [page, setPage] = useState(0);
  const [visible, setVisible] = useState(false);
  const [colors, setcolors] = useState(false);
  const [formdata, setFormdata] = useState();
  const [loading, setLoading] = useState(false);
  const [tabledata, setTabledata] = useState([]);
  const [colfilter, setcolFilter] = useState({});
  const [globalfilter, setglobalfilter] = useState("");
  const [filtervalues, setfiltervalues] = useState([]);
  const [categories, setCategories] = useState([]);
  const [allcategorydata, setallcategorydata] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [file, setFile] = useState();

  var arr = [];
  let isMounted = true;

  const getallproduct = useCallback(async () => {
    setLoading(true)
    const res = await getalldata({ first, rows, globalfilter, ...colfilter });
    setLoading(false)
    setTabledata(res?.resdata);
    setTotalRecords(res?.totallength);
  }, [first, rows, globalfilter, colfilter]);

  const onPage = (pages) => {
    console.log('pages', pages);
    setFirst(pages.first);
    setRows(pages.rows);
  };

  const handlefiltervalue = async (field) => {
    const res = await getuniquevaluebyfield({ field });
    setfiltervalues(res);
  };

  const cusfilter = (field, value) => {
    setcolFilter({ colfilter: { ...colfilter.colfilter, ...{ [field]: value } } });
  };

  const handledelete = (id) => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "bg-red-500 ml-2 text-white p-2",
      rejectClassName: "p-2 outline-none border-0",
      accept: async () => {
        var res = await deletedata(id);
        res?.success ? toast.success("Successfully deleted") : toast.error("Something went wrong");
        getallproduct();
      },
    });
  };

  useEffect(() => {
    if (isMounted) {
      getallproduct();
    }
    return () => (isMounted = false);
  }, [first, rows, globalfilter, colfilter]);

  return (
    <div>
      <div className="bg-white border rounded-3xl">
        <Tableheadpanel setglobalfilter={setglobalfilter} />

        <Tableview loading={loading} tabledata={tabledata} totalRecords={totalRecords} formdata={formdata} first={first} rows={rows}
          cusfilter={cusfilter} filtervalues={filtervalues} handlefiltervalue={handlefiltervalue} onPage={onPage} handledelete={handledelete} />

        <ConfirmDialog />
      </div>
    </div>
  );
}
