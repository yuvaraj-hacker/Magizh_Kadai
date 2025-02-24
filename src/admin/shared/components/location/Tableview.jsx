

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { MultiSelect } from 'primereact/multiselect';
import apiurl from '../../../../shared/services/apiendpoint/apiendpoint';
import { useEffect, useState } from 'react';

import moment from 'moment-timezone';
// import { getFilterOptions } from '../../services/apilocation/apilocation';

const Tableview = (props) => {
  const { tabledata, editfrom, handledelete, cusfilter, filtervalues, onPage, page } = props;
  const [tempFilterValues, setTempFilterValues] = useState(filtervalues);
  const [filterOptions, setFilterOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSubcategories, setSelectedSubcategories] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [searchValue, setSearchValue] = useState('');

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
          className="p-2 transition-colors duration-200 rounded-full hover:bg-blue-50"
        >
          <i className="text-lg text-blue-600 fi fi-rr-pen-circle"></i>
        </button>
        <button
          onClick={() => handledelete(rowData?._id)}
          className="p-2 transition-colors duration-200 rounded-full hover:bg-red-50"
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


  const array = (rowData) => {
    return (
      <div className="flex items-center gap-2">
        <div className="flex-1">
          {rowData.Subcategories?.length > 0 ? (
            <span className="text-gray-600">
              {rowData.Subcategories.map(sub => sub.name).join(', ')}
            </span>
          ) : (
            <span className="italic text-gray-400">No subcategories</span>
          )}
        </div>
        {rowData.Subcategories?.length > 0 && (
          <button
            onClick={() => handleViewSubcategories(rowData)}
            className="p-2 transition-colors duration-200 rounded-full hover:bg-gray-100"
          >
            <i className="text-lg text-gray-600 fi fi-rr-eye hover:text-blue-600"></i>
          </button>
        )}
      </div>
    );
  };

  const statusTemplate = (rowData) => {
    const getStatusColor = (status) => {
      switch (status.toLowerCase()) {
        case 'active':
          return 'bg-green-100 text-green-700';
        case 'inactive':
          return 'bg-gray-100 text-gray-700';
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


 const dateTemplate = (rowData, column) => {
  return moment(rowData[column.field]).format('YYYY-MM-DD HH:mm:ss');
};

  const columns = [
    { field: 'City', header: 'City', filter: true },
    { field: 'Zipcode', header: 'Zipcode', filter: true },
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
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Apply Filters
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



  return (
    <div className="bg-white border shadow-sm rounded-xl">
      <TableHeader />

      <DataTable value={tabledata} scrollable scrollHeight="550px" className="!text-sm" rowClassName={() => 'hover:bg-gray-50 transition-colors duration-200'} showGridlines
        responsiveLayout="scroll" >
        <Column header="Action" body={actionbotton} headerClassName="text-gray-700 bg-gray-50" className="text-center" />
        <Column field="City" header="City" headerClassName="text-gray-700 bg-gray-50" />
        <Column field="State" header="State" headerClassName="text-gray-700 bg-gray-50" />
        <Column field="Zipcode" header="Zipcode" headerClassName="text-gray-700 bg-gray-50" />
        <Column field="Local_Tax" header="Local Tax" headerClassName="text-gray-700 bg-gray-50" />
        <Column field="DeliveryFee" header="Delivery Fee" headerClassName="text-gray-700 bg-gray-50" />
        <Column field="Order_Price_Free_Delivery" header="Minimum Orderprice for free delivery" headerClassName="text-gray-700 bg-gray-50" />
        <Column field="Overall_Discount" header="Overall Discount" headerClassName="text-gray-700 bg-gray-50" />
        <Column field="Status" header="Status" body={statusTemplate} headerClassName="text-gray-700 bg-gray-50" />
        {/* <Column
          field="createdAt"
          header="Created At"
          body={(rowData) => dateTemplate(rowData, { field: 'createdAt' })}
          headerClassName="text-gray-700 bg-gray-50"
        />
        <Column
          field="updatedAt"
          header="Updated At"
          body={(rowData) => dateTemplate(rowData, { field: 'updatedAt' })}
          headerClassName="text-gray-700 bg-gray-50"
        /> */}
      </DataTable>
      <FilterPanel />
    </div>
  );
};

export default Tableview;


