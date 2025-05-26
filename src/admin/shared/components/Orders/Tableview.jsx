
import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import apiurl from '../../../../shared/services/apiendpoint/apiendpoint';
import { getFilterOptions } from '../../services/apiorders/apiorders';

import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import moment from 'moment-timezone';
import { BeatLoader } from 'react-spinners';

const Tableview = (props) => {
  const { tabledata, editfrom, newform, newOrder, setglobalfilter, handledelete, setPdfUrl, viewProducts, isModalOpen, setIsModalOpen, cusfilter, filtervalues, onPage, page, downloadPDF, pdfUrl, handleReply } = props;
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
        {/* <button title="Download Invoice" onClick={() => { downloadPDF(rowData.Order_id) }} className="inline-flex items-center text-xl font-medium text-red-600 gap-x-1 decoration-2 " >
          <i className="text-red-500 fi fi-rr-file-pdf"></i>
        </button> */}
        <button title="Download Invoice" className="inline-flex items-center text-xl font-medium text-red-600 gap-x-1 decoration-2" >
          <i className="text-red-500 fi fi-rr-file-pdf"
            onClick={() => { setIsModalOpen(true); downloadPDF(rowData.Order_id); }}></i>
        </button>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="relative p-4 bg-white rounded-xl max-w-4xl w-full h-[90] overflow-auto">
              <div className="mb-4 text-lg font-semibold">PDF Preview</div>
              {pdfUrl ? (
                <>
                  <iframe src={pdfUrl} className="w-full  h-[80vh] border" title="PDF Preview" />
                  <div className="flex justify-end items-center gap-3 mt-4">
                    <button className="bg-slate-600 hover:bg-slate-700 focus:ring-2 flex items-center gap-3 focus:ring-slate-400 p-2 text-white rounded-md transition"
                      onClick={() => { const link = document.createElement('a'); link.href = pdfUrl; link.download = `${rowData.Order_id}.pdf`; link.click(); }}  >
                      <i className="fi fi-rr-download flex items-center "></i>
                      Download
                    </button>
                    <button
                      className="bg-indigo-600 hover:bg-indigo-700 focus:ring-2 flex items-center gap-3 focus:ring-indigo-400 p-2 text-white rounded-md transition"
                      onClick={() => { const printWindow = window.open(pdfUrl); if (printWindow) { printWindow.addEventListener('load', () => { printWindow.focus(); printWindow.print(); }); } }} >
                      <i className="fi fi-rr-print flex items-center "></i>
                      Print
                    </button>
                    <button
                      className="  absolute top-4 right-4 text-white rounded-md "
                      onClick={() => { setIsModalOpen(false); setPdfUrl(null); }} >
                      <i className="fi fi-sr-circle-xmark flex items-center text-3xl text-red-600"></i>
                    </button>
                  </div>
                </>
              ) : (
                <div className='flex items-center gap-3'>
                  <div className='text-primary'>Loading PDF</div>
                  <BeatLoader color="#024A34" />
                </div>
              )}

            </div>
          </div>
        )}

        {/* <button
          onClick={() => handleReply(rowData)}
          className="relative p-2 transition-colors duration-300 rounded-full group hover:bg-purple-50"
          title="Reply to Order" >
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
    // { field: 'Email', header: 'Email', width: "150px" },
    { field: 'Mobilenumber', header: 'Mobile Number', width: "150px" },
    // { field: 'City', header: 'City',  width: "150px" },
    { field: 'Delivery_Address', header: 'Address', width: "200px" },
    // { field: 'purchaseType', header: 'Purchase Type', width: "200px", filter: true },
    // { field: 'purchaseDateandTime', header: 'Purchase DateandTime', width: "200px", filter: true },
    { field: 'Total_Amount', header: 'Total Amount', width: "150px" },
    { field: 'Payment_Status', header: 'Payment Status', width: "150px", filter: true },
    { field: 'Order_Status', header: 'Order Status', width: "150px", filter: true },
    { field: 'Payment_Method', header: 'Payment Method', width: "150px", filter: true },
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
            <button onClick={() => { columns.filter(col => col.filter).forEach(col => handleApplyFilters(col.field)); setShowFilterPanel(false); }} className="flex-1 px-4 py-2 text-sm font-medium text-white bg-primary  border border-transparent rounded-lg hover:bg-primary  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" >  Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const TableHeader = () => (
    <div className="p-4 bg-white border-b">
      <div className="flex items-center justify-between gap-4">
        {/* <div className="relative flex-1 max-w-md">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 ">
              Orders
            </h2>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-center gap-4 px-6  ">
            <div>
              <div className="inline-flex gap-x-2">
                <input type="input" placeholder="Search..." className="px-4 py-2 border outline-none rounded-xl" onChange={(e) => setglobalfilter(e.target.value)} />
              </div>
            </div>
            <div>
              <div className="inline-flex gap-x-2">
                <button
                  onClick={newOrder}
                  className="inline-flex items-center px-3 py-2 text-sm font-semibold text-white bg-primary border border-transparent rounded-lg gap-x-2">
                  <svg className="flex-shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2.63452 7.50001L13.6345 7.5M8.13452 13V2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Add Order
                </button>
              </div>
            </div>
          </div>
        </div> */}
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
    <div className="bg-white border shadow-sm rounded-xl ">
      <div className='flex gap-4 items-center justify-between'>
        <TableHeader />
        <div className="flex items-center justify-center gap-4 px-6  ">
          <div>
            <div className="inline-flex gap-x-2">
              <input type="input" placeholder="Search..." className="px-4 py-2 border outline-none rounded-xl" onChange={(e) => setglobalfilter(e.target.value)} />
            </div>
          </div>
          <div>
            <div className="inline-flex gap-x-2">
              <button
                onClick={newOrder}
                className="inline-flex items-center px-3 py-2 text-sm font-semibold text-white bg-primary border border-transparent rounded-lg gap-x-2">
                <svg className="flex-shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2.63452 7.50001L13.6345 7.5M8.13452 13V2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Add Order
              </button>
            </div>
          </div>
        </div>
      </div>

      <DataTable
        rowClassName={() => 'border-b border-secondary'}
        selectionMode="single"
        value={tabledata}
        scrollable
        scrollHeight="calc(100vh - 200px)"
        // scrollHeight="680px"
        className='!text-sm  '
        stateStorage="session"
        stateKey="dt-state-demo-local"  >
        <Column header="Action" headerClassName='bg-primary text-white' body={actionbotton} />
        {columns.map((col, i) => (
          <Column
            key={i}
            field={col.field}
            header={col.header}
            // filter={col.filter}
            headerClassName='bg-primary text-white'
            style={{ minWidth: col.width }}
            body={(rowData, meta) => {
              if (col.format == "Date") {
                return moment.tz(rowData[meta.field], "Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss A");
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