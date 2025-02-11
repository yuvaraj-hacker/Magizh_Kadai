
import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import apiurl from '../../../../shared/services/apiendpoint/apiendpoint';
import { getFilterOptions } from '../../services/apiorders/apiorders';

import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import moment from 'moment-timezone';

const Tableview = (props) => {
  const { tabledata, editfrom, handledelete, viewProducts, cusfilter, filtervalues, onPage, page, downloadPDF, handleReply } = props;

  const [tempFilterValues, setTempFilterValues] = useState(filtervalues);
  const [filterOptions, setFilterOptions] = useState({});
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  useEffect(() => {
    setTempFilterValues(filtervalues);
  }, [filtervalues]);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      const optionsPromises = columns
        .filter(col => col.filter)
        .map(async (col) => {
          const options = await getFilterOptions(col.field);
          return {
            [col.field]: options[col.field].map(val => ({
              label: val,
              value: col.format === "Date" ? moment(val).format('YYYY-MM-DD') : val
            }))
          };
        });

      const optionsResults = await Promise.all(optionsPromises);
      const combinedOptions = optionsResults.reduce((acc, curr) => ({ ...acc, ...curr }), {});
      setFilterOptions(combinedOptions);
    };

    fetchFilterOptions();
  }, []);

  const actionbotton = (rowData) => {
    return (
      <div className="flex gap-2">
        <button title="Edit Order Status" onClick={() => editfrom(rowData)} className="inline-flex items-center text-xl font-medium text-green-600 gap-x-1 decoration-2 " >
          <i className="fi fi-rr-pen-circle"></i>
        </button>
        <button title="View Order Products" onClick={() => viewProducts(rowData?.Order_id)} className="inline-flex items-center text-xl font-medium text-blue-600 gap-x-1 decoration-2 " >
          <i className="fi fi-rr-eye"></i>
        </button>
        <button title="Download Invoice" onClick={() => { downloadPDF(rowData.Order_id) }} className="inline-flex items-center text-xl font-medium text-red-600 gap-x-1 decoration-2 " >
          <i className="text-red-500 fi fi-rr-file-pdf"></i>
        </button>
        {/* <button
          onClick={() => handleReply(rowData)}
          className="relative p-2 transition-colors duration-300 rounded-full group hover:bg-purple-50"
          title="Reply to Order"
        >
          <i className="text-xl text-purple-600 transition-colors fi fi-rr-comments group-hover:text-purple-700" />
        </button> */}
      </div>
    );
  };

  const image = (rowData) => {
    return (
      <div className="flex gap-4 ">
        <img src={`${apiurl()}/${rowData['Images'][0]}`} className='rounded-xl h-[100px] w-[150px] object-cover' />
      </div>
    );
  };

  const handleApplyFilters = (key) => {
    cusfilter(key, tempFilterValues[key]);
    onPage(page);
  };

  const handleClearFilters = (key) => {
    setTempFilterValues(prev => ({ ...prev, [key]: null }));
    cusfilter(key, null);
    onPage(page);
  };
  const formatDateTime = (dateString) => {
    return moment(dateString).format('YYYY-MM-DD HH:mm:ss');
  };

  const columns = [
    { field: 'Order_id', header: 'Order ID', filter: true },
    { field: 'Order_Date', header: 'Order Date', format: "Date", width: "150px" },
    { field: 'Invoice_ID', header: 'Invoice ID', filter: true },
    { field: 'Billing_Name', header: 'Billing Name', width: "150px" },
    { field: 'Email', header: 'Email', width: "150px" },
    { field: 'Mobilenumber', header: 'Mobile Number', width: "150px" },
    { field: 'City', header: 'City', filter: true, width: "150px" },
    { field: 'Delivery_Address', header: 'Delivery Address', width: "200px" },
    // { field: 'purchaseType', header: 'Purchase Type', width: "200px", filter: true },
    { field: 'purchaseDateandTime', header: 'Purchase DateandTime', width: "200px", filter: true },
    { field: 'Total_Amount', header: 'Total Amount', width: "150px" },
    { field: 'Payment_Status', header: 'Payment Status', width: "150px", filter: true },
    { field: 'Order_Status', header: 'Order Status', width: "150px", filter: true },
  ];

  const FilterPanel = () => (
    <div className={`fixed inset-y-0 right-0 w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${showFilterPanel ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
            <button
              onClick={() => setShowFilterPanel(false)}
              className="p-2 transition-colors duration-200 rounded-full hover:bg-gray-100"
            >
              <i className="text-gray-600 fi fi-rr-cross"></i>
            </button>
          </div>
        </div>

        <div className="flex-1 p-4 space-y-6 overflow-y-auto">
          {columns.filter(col => col.filter).map((col, index) => (
            <div key={index} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {col.header}
              </label>
              <MultiSelect
                value={tempFilterValues[col.field]}
                options={filterOptions[col.field] || []}
                className="w-full"
                onChange={(e) => setTempFilterValues(prev => ({ ...prev, [col.field]: e.value }))}
                placeholder={`Select ${col.header}`}
                filter
                showClear
                maxSelectedLabels={3}
                panelClassName="!w-72"
              />
            </div>
          ))}
        </div>

        <div className="p-4 border-t bg-gray-50">
          <div className="flex gap-3">
            <button
              onClick={() => {
                columns.filter(col => col.filter).forEach(col => handleClearFilters(col.field));
                setShowFilterPanel(false);
              }}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Clear All
            </button>
            <button onClick={() => { columns.filter(col => col.filter).forEach(col => handleApplyFilters(col.field)); setShowFilterPanel(false); }} className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" >  Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const TableHeader = () => (
    <div className="p-4 bg-white border-b">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          {/* Optional: Add search functionality if needed */}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilterPanel(true)}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <i className="mr-2 fi fi-rr-filter"></i>
            Filters
            {Object.entries(tempFilterValues).some(([key, value]) =>
              columns.filter(col => col.filter).map(col => col.field).includes(key) &&
              value && value.length > 0
            ) && (
                <span className="ml-2 px-2 py-0.5 text-xs font-medium text-white bg-blue-600 rounded-full">
                  {Object.entries(tempFilterValues).filter(([key, value]) =>
                    columns.filter(col => col.filter).map(col => col.field).includes(key) &&
                    value && value.length > 0
                  ).length}
                </span>
              )}
          </button>
          <button
            onClick={() => {
              columns.filter(col => col.filter).forEach(col => handleClearFilters(col.field));
            }}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <i className="mr-2 fi fi-rr-refresh"></i>
            Reset
          </button>
        </div>
      </div>

      {Object.entries(tempFilterValues).some(([key, value]) =>
        columns.filter(col => col.filter).map(col => col.field).includes(key) &&
        value && value.length > 0
      ) && (
          <div className="flex flex-wrap gap-2 mt-4">
            {columns.filter(col => col.filter).map(col => {
              const key = col.field;
              const value = tempFilterValues[key];
              if (value && value.length > 0) {
                return value.map((v, i) => (
                  <span key={`${key}-${i}`} className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full"  >
                    {col.header}: {v}
                    <button onClick={() => { setTempFilterValues(prev => ({ ...prev, [key]: prev[key].filter(item => item !== v) })); handleApplyFilters(key); }}
                      className="ml-2 hover:text-blue-900"  >
                      <i className="fi fi-rr-cross-small"></i>
                    </button>
                  </span>
                ));
              }
              return null;
            }).filter(Boolean)}
          </div>
        )}
    </div>
  );

  return (
    <div className="bg-white border shadow-sm rounded-xl">
      <TableHeader />
      <DataTable
        rowClassName={() => 'border-b border-secondary'}
        selectionMode="single"
        value={tabledata}
        scrollable
        scrollHeight="680px"
        className='!text-sm'
        stateStorage="session"
        stateKey="dt-state-demo-local"
      >
        <Column header="Action" body={actionbotton} />
        {columns.map((col, i) => (
          <Column
            key={i}
            field={col.field}
            header={col.header}
            // filter={col.filter}
            style={{ minWidth: col.width }}
            body={(rowData, meta) => {
              if (col.format == "Date") {
                return moment.tz(rowData[meta.field], "America/New_York").format("YYYY-MM-DD HH:mm:ss");
              } else if (col.format == "HTML") {
                return <div dangerouslySetInnerHTML={{ __html: rowData[meta.field] }} />
              } else {
                return rowData[meta.field]
              }
            }}
          />
        ))}
      </DataTable>

      <FilterPanel />

    </div>
  );
};

export default Tableview;