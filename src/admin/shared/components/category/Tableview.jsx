

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { MultiSelect } from 'primereact/multiselect';
import apiurl from '../../../../shared/services/apiendpoint/apiendpoint';
import { useEffect, useState } from 'react';
import { getFilterOptions } from '../../services/apicategory/apicategory';
import moment from 'moment-timezone';

const Tableview = (props) => {
  const { tabledata, editfrom, handledelete, cusfilter, filtervalues, onPage, page, setglobalfilter, newform } = props;
  const [tempFilterValues, setTempFilterValues] = useState(filtervalues);
  const [filterOptions, setFilterOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSubcategories, setSelectedSubcategories] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const [scroll, setScrollHeight] = useState("750px");

  useEffect(() => {
    const updateHeight = () => {
      if (window.innerWidth >= 1920) { // Extra large screens
        setScrollHeight("750px");
      } else if (window.innerWidth >= 1024) { // Laptops
        setScrollHeight("600px");
      } else {
        setScrollHeight("750px"); // Default for smaller screens
      }
    };

    updateHeight(); // Initial check
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  useEffect(() => {
    setTempFilterValues(filtervalues);
  }, [filtervalues]);

  useEffect(() => {
    columns.filter(col => col.filter).forEach(async (col) => {
      const options = await getFilterOptions(col.field);
      setFilterOptions(prev => ({
        ...prev,
        [col.field]: options[col.field].map(val => ({
          label: val,
          value: val
        }))
      }));
    });
  }, []);

  const actionbotton = (rowData) => {
    return (
      <div className="flex justify-center gap-3">
        <button
          onClick={() => editfrom(rowData)}
          className="  transition-colors duration-200 rounded-full hover:bg-blue-50"
        >
          <i className="text-lg text-blue-600 fi fi-rr-pen-circle"></i>
        </button>
        <button
          onClick={() => handledelete(rowData?._id)}
          className="  transition-colors duration-200 rounded-full hover:bg-red-50"
        >
          <i className="text-lg text-red-600 fi fi-rr-trash"></i>
        </button>
      </div>
    );
  };

  const handleViewSubcategories = (rowData) => {
    setSelectedSubcategories(rowData.Subcategories);
    setSelectedRow(rowData);
    setShowModal(true);
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

  const image = (rowData) => {
    return (
      <div className="flex justify-center">
        <div className="relative group">
          <img
            src={`${apiurl()}/${rowData.Images[0]}`}
            className="object-cover w-24 h-16 transition-transform duration-200 rounded-lg shadow-sm group-hover:scale-105"
            alt={rowData.Category_Name}
          />
          <div className="absolute inset-0 transition-all duration-200 bg-black bg-opacity-0 rounded-lg group-hover:bg-opacity-10" />
        </div>
      </div>
    );
  };

  const array = (rowData) => {
    return (
      <div className="flex items-center gap-2">
        <div className="flex-1">
          {rowData?.Subcategories.length >= 1 ? (
            <span className="text-gray-600">
              {rowData.Subcategories.map(sub => sub.name).join(', ')}
            </span>
          ) : (
            <span className="italic text-gray-400">No subcategories</span>
          )}
        </div>
        {/* {rowData.Subcategories?.length > 0 && (
          <button
            onClick={() => handleViewSubcategories(rowData)}
            className="p-2 transition-colors duration-200 rounded-full hover:bg-gray-100"
          >
            <i className="text-lg text-gray-600 fi fi-rr-eye hover:text-blue-600"></i>
          </button>
        )} */}
      </div>
    );
  };

  const statusTemplate = (rowData) => {
    const getStatusColor = (status) => {
      switch (status.toLowerCase()) {
        case 'active':
          return 'bg-green-100 text-green-700';
        case 'inactive':
          return 'bg-third text-white';
        default:
          return 'bg-blue-100 text-blue-700';
      }
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(rowData.Status)}`}>
        {rowData.Status}
      </span>
    );
  };

  const colorTemplate = (rowData) => {
    return (
      <div className="flex items-center gap-2">
        <div
          className="w-6 h-6 border rounded-full shadow-sm"
          style={{ backgroundColor: rowData.Card_color }}
        />
        <span>{rowData.Card_color}</span>
      </div>
    );
  };

  const columns = [
    // { field: 'Order_show_format', header: 'Order Wise', filter: true },
    { field: 'Category_Name', header: 'Category Name', filter: true },
    { field: 'Subcategories', header: 'Sub Categories', width: "300px", formattype: 'array' },
    // { field: 'Card_color', header: 'Card Color', body: colorTemplate },
    { field: 'Status', header: 'Status', filter: true, body: statusTemplate }
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
              <label className="block text-sm font-medium text-gray-700 text-wrap">
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
                Object.keys(tempFilterValues).forEach(key => handleClearFilters(key));
                setShowFilterPanel(false);
              }}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Clear All
            </button>
            <button
              onClick={() => {
                Object.keys(tempFilterValues).forEach(key => handleApplyFilters(key));
                setShowFilterPanel(false);
              }}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-lg hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const TableHeader = () => (
    <div className="">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilterPanel(true)}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <i className="mr-2 fi fi-rr-filter"></i>
            Filters
            {Object.values(tempFilterValues).some(v => v && v.length > 0) && (
              <span className="ml-2 px-2 py-0.5 text-xs font-medium text-white bg-blue-600 rounded-full">
                {Object.values(tempFilterValues).filter(v => v && v.length > 0).length}
              </span>
            )}
          </button>
          <button
            onClick={() => {
              Object.keys(tempFilterValues).forEach(key => handleClearFilters(key));
              setSearchValue('');
            }}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <i className="mr-2 fi fi-rr-refresh"></i>
            Reset
          </button>
        </div>
      </div>

      {Object.entries(tempFilterValues).some(([_, value]) => value && value.length > 0) && (
        <div className="flex flex-wrap gap-2 mt-4">
          {Object.entries(tempFilterValues).map(([key, value]) => {
            if (value && value.length > 0) {
              return value.map((v, i) => (
                <span
                  key={`${key}-${i}`}
                  className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full"
                >
                  {key}: {v}
                  <button
                    onClick={() => {
                      setTempFilterValues(prev => ({
                        ...prev,
                        [key]: prev[key].filter(item => item !== v)
                      }));
                      handleApplyFilters(key);
                    }}
                    className="ml-2 hover:text-blue-900"
                  >
                    <i className="fi fi-rr-cross-small"></i>
                  </button>
                </span>
              ));
            }
            return null;
          })}
        </div>
      )}
    </div>
  );

  const modalHeader = selectedRow && (
    <div className="flex items-center gap-4 p-4">
      <img
        src={`${apiurl()}/${selectedRow.Images[0]}`}
        className="object-cover w-16 h-16 rounded-lg"
        alt={selectedRow.Category_Name}
      />
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">{selectedRow.Category_Name}</h2>
        <p className="text-gray-500">Subcategories ({selectedSubcategories?.length || 0})</p>
      </div>
    </div>
  );

  return (
    <div className=" ">
      <div className='p-4  border border-t-primary flex justify-between rounded-t-xl'>
        <div>


        </div>
        <div className='flex gap-4'>
          <input type="input" placeholder="Search..." className="px-4 py-2 border outline-none rounded-xl" onChange={(e) => setglobalfilter(e.target.value)} />
          <button onClick={newform} className="inline-flex items-center px-3 py-2 text-sm font-semibold text-white bg-primary border border-transparent rounded-lg gap-x-2 disabled:opacity-50 disabled:pointer-events-none">
            <svg className="flex-shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2.63452 7.50001L13.6345 7.5M8.13452 13V2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Add Category
          </button>
        </div>
        <TableHeader />
      </div>

      <div className='  '>
        <DataTable
          value={tabledata}
          scrollable
          scrollHeight={scroll}
          className="!text-sm "
          rowClassName={() => 'border border-b-primary border-r-primary transition-colors duration-200   '}
          showGridlines={false}
          stripedRows
          responsiveLayout="scroll"
        >
          <Column
            header="S.No"
            body={(rowData, { rowIndex }) => rowIndex + 1}
            headerClassName="text-white bg-primary"
            className=""
          />
          <Column
            header="Action"
            body={actionbotton}
            headerClassName="text-white bg-primary"
            className=""
          />
          <Column
            header="Images"
            body={image}
            headerClassName="text-white bg-primary"
          />
          {columns.map((col, i) => (
            col.formattype === 'array' ? (
              <Column
                key={i}
                header={col.header}
                field={col.field}
                style={{ minWidth: col.width }}
                body={array}
                headerClassName="text-white bg-primary"
              />
            ) : (
              <Column
                key={i}
                field={col.field}
                header={col.header}
                body={col.body}
                headerClassName="text-white bg-primary"
              />
            )
          ))}
        </DataTable>
      </div>

      <FilterPanel />

      <Dialog
        visible={showModal}
        onHide={() => setShowModal(false)}
        header={modalHeader}
        className="w-[90vw] max-w-4xl"
        breakpoints={{ '960px': '75vw', '641px': '100vw' }}
      >
        <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3">
          {selectedSubcategories && selectedSubcategories.map((sub, index) => (
            <div
              key={index}
              className="relative overflow-hidden transition-all duration-200 bg-white border shadow-sm group rounded-xl hover:shadow-md"
            >
              <div className="w-full overflow-hidden aspect-video">
                <img
                  src={`${apiurl()}/${sub.image}`}
                  alt={sub.name}
                  className="object-cover w-full h-full transition-transform duration-200 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{sub.name}</h3>
              </div>
              <div className="absolute inset-0 transition-opacity duration-200 bg-black opacity-0 rounded-xl group-hover:opacity-5" />
            </div>
          ))}
        </div>
      </Dialog>
    </div>
  );
};

export default Tableview;


