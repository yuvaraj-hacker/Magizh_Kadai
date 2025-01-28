import { useCallback, useEffect, useState } from "react"
import Tableview from "../../shared/components/customers/Tableview";
import Tablepagination from "../../shared/others/Tablepagination";
import Tableheadpanel from "../../shared/components/customers/Tableheadpanel";
import { ConfirmDialog } from 'primereact/confirmdialog';
import { getallcustomers } from "../../shared/services/apicustomers/apicustomers";
export default function Customers(){
    const [totalRecords, setTotalRecords] = useState(0);
    const [page, setPage] = useState(1);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
  
    const [tabledata, setTabledata]=useState([]);
    const [colfilter, setcolFilter] = useState({});
    const [globalfilter,setglobalfilter]=useState('')
    const [filtervalues,setfiltervalues]=useState([])

    let isMounted = true;

    const getallproduct = useCallback(async ()=>{
        console.log({first,rows,...colfilter})
        const res= await getallcustomers({first,rows,globalfilter,colfilter});
        setTabledata(res?.resdata);
        setTotalRecords(res?.totallength);
    },[first,rows,globalfilter,colfilter]);


    useEffect(()=>{
        if(isMounted){
            getallproduct();
        }
        return(()=>isMounted = false);
    },[first,rows,globalfilter,colfilter])


    const onPage = (page) => {
        setPage(page)
        setFirst(rows *(page -1));
        setRows(rows);
    };

    const cusfilter = (field, value) => {
        setcolFilter(prev => ({ ...prev, [field]: {$in:value} }));
        setFirst(0)
    };
 
    return(
        <div>

                <div className="bg-white border rounded-3xl">
                    <Tableheadpanel setglobalfilter={setglobalfilter} />

                    <Tableview tabledata={tabledata} totalRecords={totalRecords} first={first} cusfilter={cusfilter} filtervalues={filtervalues} onPage={onPage} page={page} />

                    <Tablepagination page={page} first={first} rows={rows} totalRecords={totalRecords} onPage={onPage} setRows={setRows}/> 
                  
                    <ConfirmDialog />
                </div>
    
        </div>
    )
}