/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import apiurl from '../../../../shared/services/apiendpoint/apiendpoint';

import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import moment from 'moment-timezone';
import { getFilterOptions } from '../../services/apipurchase/apipurchase';


const Tableview = (props) =>{
  const {tabledata,editfrom,handledelete, viewProducts,cusfilter,filtervalues,onPage,page,downloadPDF}=props

  const [tempFilterValues, setTempFilterValues] = useState(filtervalues);
  const [filterOptions,setFilterOptions] = useState([]);

  useEffect(() => {
    setTempFilterValues(filtervalues);
  }, [filtervalues]);

  const actionbotton = (rowData) => {
    return (
      <div className="flex gap-2">
        <button onClick={()=>editfrom(rowData)} className="inline-flex items-center text-xl font-medium text-green-600 gap-x-1 decoration-2 " >
          <i className="fi fi-rr-pen-circle"></i>
        </button>
        <button onClick={()=>viewProducts(rowData?.Purchase_id)} className="inline-flex items-center text-xl font-medium text-blue-600 gap-x-1 decoration-2 " >
          <i className="fi fi-rr-eye"></i>
        </button>
      </div>
    )
  }

  const image = (rowData) => {
    return (
      <div className="flex gap-4 ">
        <img src={`${apiurl()}/${rowData['Images'][0]}`}  className='rounded-xl h-[100px] w-[150px] object-cover' />
      </div>
    )
  }
  const handleApplyFilters = (key) => {
    cusfilter(key, tempFilterValues[key]);
    onPage(page);
  };

  const handleClearFilters = (key) => {
    setTempFilterValues(prev => ({ ...prev, [key]: null }));
    cusfilter(key, null);
    onPage(page);
  };

  const getOption = async (key)=>{
    var filterOptions = await getFilterOptions(key.field);
    var formatoption = filterOptions[key.field].map( val =>({ label:val,value: key.format == "Date"? moment(val).format('YYYY-MM-DD') :val}));
    setFilterOptions(formatoption);
  }

  const Filter = (key) => (
    <div onClick={()=>getOption(key)}>
      <MultiSelect value={tempFilterValues[key.field]} options={filterOptions} optionLabel="value" className="p-column-filter" virtualScrollerOptions={{ itemSize: 43 }} maxSelectedLabels={1}
        filter onChange={(e) => setTempFilterValues(prev => ({ ...prev, [key.field]: e.value }))} placeholder={`Select ${key.field.charAt(0).toUpperCase() + key.field.slice(1)}`}
          panelFooterTemplate={
          <div className="flex justify-between p-2 mt-2">
            <Button label="Clear" onClick={() => handleClearFilters(key.field)} className="p-1 text-white bg-blue-500 w-[45%]" />
            <Button label="Apply" onClick={() => handleApplyFilters(key.field)} className="p-1 mx-1 text-white bg-blue-500 w-[45%]" />
          </div>
        }
      />
    </div>
  );

  const columns = [
    {field: 'Purchase_id', header: 'Purchase ID',filter: true},
    {field: 'Purchase_Date', header: 'Purchase Date',format:"Date",width:"150px"},
    {field: 'Invoice_ID', header: 'Invoice ID',filter: true},
    {field: 'Total_Quantity', header: 'Quantity',filter: true},
    // {field: 'Billing_Name', header: 'Billing Name',width:"150px"},
    // {field: 'Email', header: 'Email',width:"150px"},
    // {field: 'Mobilenumber', header: 'Mobile Number',width:"150px"},
    // {field: 'City', header: 'City', filter: true,width:"150px"},
    // {field: 'Delivery_Address', header: 'Delivery Address',width:"200px"},
    {field: 'Total_Amount', header: 'Total Amount',width:"150px"},
    // {field: 'Payment_Status', header: 'Payment Status',width:"150px", filter: true},
  ];

  return(
    <div>
      <DataTable rowClassName={() => 'border-b border-secondary'}  selectionMode="single"   value={tabledata} scrollable scrollHeight="680px" className='!text-sm' stateStorage="session" stateKey="dt-state-demo-local" >
        <Column header="Action" body={actionbotton} />
        {/* <Column header="Images"  body={image} /> */}
        {columns.map((col, i) => (
          <Column key={i} field={col.field} header={col.header} filter={col.filter} filterElement={Filter(col)} showFilterMenuOptions={false} showApplyButton={false}
           showClearButton={false} showFilterMatchModes={false} style={{ minWidth: col.width }}
            body={(rowData,meta)=> { if(col.format =="Date"){ return moment(rowData[meta.field]).format("YYYY-MM-DD")} else if(col.format == "HTML"){return <div dangerouslySetInnerHTML={{ __html: rowData[meta.field] }} />} else {return rowData[meta.field]}} } />
        ))}
      </DataTable>
    </div>
  )
}

export default Tableview;