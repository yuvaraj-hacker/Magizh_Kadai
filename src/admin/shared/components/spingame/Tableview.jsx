/* eslint-disable react/prop-types */
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useRef, useState } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import apiurl from '../../../../shared/services/apiendpoint/apiendpoint';

const Tableview = (props) => {
  var { tabledata, editfrom, handledelete, cusfilter, filtervalues, handlefiltervalue, loading, totalRecords, onPage, first, rows } = props

  const [data, setdata] = useState("Co-ord_sets")
  const [tempFilterValues, setTempFilterValues] = useState(filtervalues);

  const [filters, setFilters] = useState({
    Name: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    Mobile: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
  });

  const actionbotton = (rowData) => {
    return (
      <div className="flex gap-4">
        {/* <button onClick={() => editfrom(rowData)} className="inline-flex items-center text-xl font-medium text-blue-600 gap-x-1 decoration-2 " >
          <i className="fa-solid fa-pen"></i>
        </button> */}
        <button onClick={() => handledelete(rowData?._id)} className="inline-flex items-center text-xl font-medium text-red-600 gap-x-1 decoration-2 " >
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    )
  }


  const image = (rowData) => {
    return (
      <div className="flex gap-4">
        <div className="relative overflow-hidden rounded-xl">
          {rowData && rowData['Images'] && rowData['Images'][0] ? ((
            <img src={apiurl() + "/" + rowData['Images'][0]} className='rounded-xl h-auto w-[100px] object-cover' alt="image" />
          )) : (
            <div className="h-[100px] w-[150px] flex items-center justify-center border rounded-xl">
              <span>No Image</span>
            </div>
          )}
        </div>
      </div>
    )
  }
  const statusItemTemplate = (option) => {
    return option;
  };

  // const statusFilterTemplate = (options) => {
  //   return <div>
  //     <MultiSelect
  //       filter
  //       value={options.value}
  //       options={filtervalues}
  //       onShow={() => handlefiltervalue(options.field)}
  //       onChange={(e) => options.filterCallback(e.value, options.index)}
  //       itemTemplate={statusItemTemplate}
  //       placeholder="Select"
  //       className="p-column-filter" />
  //     <div className="flex justify-evenly p-2 mt-2">
  //       <button className='border border-red-400 p-2 px-3 text-sm rounded text-red-400 hover:bg-red-100 duration-300' onClick={(e) => { e.filterModel.constraints[0].value = null; cusfilter(e.field, null) }} >
  //         Clear
  //       </button>
  //       <button className='border border-green-400 p-2 px-3 text-sm rounded text-green-400 hover:bg-green-100 duration-300' onClick={(e) => cusfilter(e.field, e.filterModel.constraints[0].value)} >
  //         Apply
  //       </button>
  //     </div>
  //   </div>
  // };

  // const filterapply = (e) => {
  //   return (
  //     <><button className='border border-green-400 p-2 px-3 text-sm rounded text-green-400 hover:bg-green-100 duration-300' onClick={() => cusfilter(e.field, e.filterModel.constraints[0].value)}>Apply</button></>
  //   )
  // }

  // const filterclear = (e) => {
  //   return (
  //     <><button className='border border-red-400 p-2 px-3 text-sm rounded text-red-400 hover:bg-red-100 duration-300' onClick={() => { e.filterModel.constraints[0].value = null; cusfilter(e.field, null) }}>Clear</button></>
  //   )
  // }

  const handleApplyFilters = (key) => {
    cusfilter(key, tempFilterValues[key]);
  };

  const handleClearFilters = (key) => {
    setTempFilterValues(prev => ({ ...prev, [key]: null }));
    cusfilter(key, null);
  };

  const getOption = async (key) => {
    var filterOptions = await getFilterOptions(key.field);
    var formatoption = filterOptions[key.field].map(val => ({ label: val, value: key.format == "Date" ? moment(val).format('YYYY-MM-DD') : val }));
    setFilterOptions(formatoption);
  }

  const Filter = (key) => (
    <div  >
      <MultiSelect value={tempFilterValues[key.field] || []}
        options={filtervalues || []} onShow={() => handlefiltervalue(key.field)} className="p-column-filter" virtualScrollerOptions={{ itemSize: 43 }} maxSelectedLabels={1}
        filter onChange={(e) => setTempFilterValues(prev => ({ ...prev, [key.field]: e.value }))} placeholder={`Select ${key.field.charAt(0).toUpperCase() + key.field.slice(1)}`}
        panelFooterTemplate={
          <div className="flex justify-evenly p-2 mt-2">
            <button className='p-2 bg-blue-500 text-white rounded-lg px-4' onClick={() => handleClearFilters(key.field)} >
              Clear
            </button>
            <button className='p-2 bg-blue-500 text-white rounded-lg px-4' onClick={() => handleApplyFilters(key.field)} >
              Apply
            </button>
          </div>
        }
      />
    </div>
  );

  const columns = [
    { field: 'Name', header: 'Name', width: "250px", filter: true, 
      // filterElement: statusFilterTemplate, 
    },
    { field: 'Mobile', header: 'Contact No.', width: "200px", filter: true, 
      // filterElement: statusFilterTemplate,
       filterMatchMode: "custom", filterFunction: cusfilter },
    { field: 'Offer', header: 'Offer' },
  ];

  const array = (rowData) => {
    return (
      <div className="flex gap-4">
        {rowData['Size'] && rowData['Size'].length > 0 && (
          <span>{rowData['Size'].join(', ')}</span>
        )}
      </div>
    );
  };

  const arrayy = (rowData) => {
    return (
      <div className="flex gap-4">
        {rowData['Tag'] && rowData['Tag'].length > 0 && (
          <span>{rowData['Tag'].join(', ')}</span>
        )}
      </div>
    );
  };

  const array1 = (rowData) => {
    return (
      <div className="flex gap-4">
        {rowData['gender'] && rowData['gender'].length > 0 && (
          <span>{rowData['gender'].join(', ')}</span>
        )}
      </div>
    );
  };

  const array2 = (rowData) => {
    return (
      <div className="flex gap-4">
        {rowData['search'] && rowData['search'].length > 0 && (
          <span>{rowData['search'].join(', ')}</span>
        )}
      </div>
    );
  };

  const descriptionTemplate = (rowData) => {
    return <span dangerouslySetInnerHTML={{ __html: rowData.Product_Description }} />;
  };

  const ColorTemplate = (rowData) => {
    return <span className='p-3 rounded-full' style={{ backgroundColor: rowData?.Color }}> </span>;
  };

  const sno = (rowData, options) => {
    return (
      <div>
        {options.rowIndex + 1}
      </div>
    )
  }

  const paginatorRight = () => {
    return <div className='pr-5'>Total Records: {totalRecords}</div>;
  }

  return (
    <div >
      <div >
        <DataTable value={tabledata} totalRecords={totalRecords} scrollable loading={loading} scrollHeight="640px" className='!text-sm' filters={filters}
          paginator rows={rows} rowsPerPageOptions={[10, 20, 50, 100]} lazy first={first} onPage={onPage} CurrentPageReport paginatorRight={paginatorRight} paginatorLeft={<div></div>} >
          <Column header="S.No" style={{ minWidth: "100px" }} body={sno} />
          <Column header="Action" style={{ minWidth: "100px" }} body={actionbotton} />
          {/*   <Column header="Images" style={{minWidth: "200px"}} body={image} /> */}
          {columns.map((col, i) => (
            col.formattype == "html" ?
              <Column key={i} header={col.header} field={col.field} className='truncate' style={{ minWidth: col.width }} body={descriptionTemplate} /> :
              col.formattype == "Color" ?
                <Column key={i} header={col.header} field={col.field} style={{ minWidth: col.width }} body={ColorTemplate} /> :
                col.formattype == "array" || col.formattype == "arrayy" ?
                  <Column key={i} header={col.header} field={col.field} style={{ minWidth: col.width }} body={col.formattype == "array" ? array : arrayy} /> :
                  col.formattype == "array1" || col.formattype == "array2" ?
                    <Column key={i} header={col.header} field={col.field} style={{ minWidth: col.width }} body={col.formattype == "array1" ? array1 : array2} /> :
                    <Column key={i} field={col.field} style={{ minWidth: col.width }} filter={col.filter}
                      // filterElement={col.filterElement} filterApply={filterapply} filterClear={filterclear} 
                      filterElement={Filter(col)}
                      showFilterMatchModes={false} showFilterMenuOptions={false} header={col.header} />
          ))}

        </DataTable>
      </div>
    </div>
  )
}

export default Tableview;