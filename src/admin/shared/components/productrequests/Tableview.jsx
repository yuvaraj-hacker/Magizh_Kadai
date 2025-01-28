/* eslint-disable react/prop-types */

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import apiurl from '../../../../shared/services/apiendpoint/apiendpoint';
import { useEffect, useState } from 'react';

import { getFilterOptions } from '../../services/apicustomers/apicustomers';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import moment from 'moment-timezone';
import StatusModal from './StatusModal';


const Tableview = (props) => {
  const { tabledata, editfrom, handledelete, cusfilter, filtervalues, onPage, page,statusModal,setStatusModal,selectedProduct,setSelectedProduct,handleStatusUpdate ,loading,setLoading} = props

  const [tempFilterValues, setTempFilterValues] = useState(filtervalues);
  const [filterOptions, setFilterOptions] = useState([]);

  useEffect(() => {
    setTempFilterValues(filtervalues);
  }, [filtervalues]);

  const actionbotton = (rowData) => (
    
    <div className="flex gap-2">
      <button onClick={() => {
        setSelectedProduct(rowData);
        setStatusModal(true);
      }} className="inline-flex items-center text-xl font-medium text-green-600 gap-x-1 decoration-2">
        <i className="fi fi-rr-refresh"></i>
      </button>
    </div>
  );


  const handleApplyFilters = (key) => {
    cusfilter(key, tempFilterValues[key]);
    onPage(page);
  };

  const handleClearFilters = (key) => {
    setTempFilterValues(prev => ({ ...prev, [key]: null }));
    cusfilter(key, null);
    onPage(page);
  };

  const getOption = async (key) => {
    var filterOptions = await getFilterOptions(key.field);
    var formatoption = filterOptions[key.field].map(val => ({ label: val, value: key.format == "Date" ? moment(val).format('YYYY-MM-DD') : val }));
    setFilterOptions(formatoption);
  }

  const Filter = (key) => (
    <div onClick={() => getOption(key)}>
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
    { field: 'Email', header: 'Email', filter: false },
    { field: 'query', header: 'Request Products', filter: false },
    { field: 'Product_Status', header: 'Status', filter: false },
    { field: 'actions', header: 'Actions', body: actionbotton, filter: false }
];

return (
  <div>
    <div>
      <DataTable rowClassName={() => 'border-b border-secondary'} 
        selectionMode="single" 
        value={tabledata} 
        scrollable 
        scrollHeight="680px" 
        className='!text-sm' 
        stateStorage="session" 
        stateKey="dt-state-demo-local">

        {columns.map((col, i) => (
          <Column 
            key={i} 
            field={col.field} 
            header={col.header} 
            body={col.body}
            filter={col.filter} 
            filterElement={col.filter ? Filter(col) : null} 
            showFilterMenuOptions={false} 
            showApplyButton={false} 
            showClearButton={false} 
            showFilterMatchModes={false} 
          />
        ))}
      </DataTable>
      <StatusModal 
        isOpen={statusModal}
        onClose={() => setStatusModal(false)}
        selectedProduct={selectedProduct}
        onStatusUpdate={handleStatusUpdate}
        loading={loading}
      />
    </div>
  </div>
);
}

export default Tableview;