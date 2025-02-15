
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { MultiSelect } from 'primereact/multiselect';
import apiurl from '../../../../shared/services/apiendpoint/apiendpoint';
import { getFilterOptions } from '../../services/apiproducts/apiproducts';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useEffect, useState } from 'react';
import moment from 'moment-timezone';
import { Checkbox } from "@nextui-org/react";

const Tableview = (props) => {
  const { tabledata, editfrom, handledelete, cusfilter, filtervalues, onPage, page, setSelectedProducts, selectedProducts } = props;
  const [tempFilterValues, setTempFilterValues] = useState(filtervalues);
  const [filterOptions, setFilterOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSubcategories, setSelectedSubcategories] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [expandedHighlights, setExpandedHighlights] = useState({});

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


  const CustomSelectionHeader = () => {
    const selectedLength = props.selectedProducts?.length || 0;
    const allSelected = selectedLength > 0 && selectedLength === props.tabledata.length;
    const someSelected = selectedLength > 0 && selectedLength < props.tabledata.length;

    return (
      <div className="flex items-center justify-center">
        <Checkbox
          isIndeterminate={someSelected}
          isSelected={allSelected}
          onValueChange={(checked) => {
            const newSelection = checked ? [...props.tabledata] : [];
            props.setSelectedProducts(newSelection);
          }}
          classNames={{
            base: "w-5 h-5",
            wrapper: "rounded-md",
          }}
        />
      </div>
    );
  };

  const CustomSelectionBody = (rowData) => {
    const isSelected = props.selectedProducts?.some(item => item._id === rowData._id);

    return (
      <div className="flex items-center justify-center">
        <Checkbox
          isSelected={isSelected}
          onValueChange={(checked) => {
            if (checked) {
              props.setSelectedProducts([...props.selectedProducts, rowData]);
            } else {
              props.setSelectedProducts(
                props.selectedProducts.filter(item => item._id !== rowData._id)
              );
            }
          }}
          classNames={{
            base: "w-5 h-5",
            wrapper: "rounded-md",
          }}
        />
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

  const toggleDescription = (id) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleHighlights = (id) => {
    setExpandedHighlights((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };


  // const renderDescription = (rowData) => {
  //   return (
  //     <div
  //       dangerouslySetInnerHTML={{ __html: rowData.Product_Description }}
  //     />
  //   );
  // };

  const truncateText = (text, maxLength) => {
    if (text?.length <= maxLength) return text;
    return `${text?.substring(0, maxLength)}...`;
  };


  const renderDescription = (rowData) => {
    const maxLength = 150;
    const isExpanded = expandedDescriptions[rowData._id];

    const descriptionText = isExpanded ? rowData.Product_Description : truncateText(rowData.Product_Description, maxLength);

    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: descriptionText }} />
        {rowData.Product_Description?.length > maxLength && (
          <button
            onClick={() => toggleDescription(rowData._id)}
            className="mt-1 text-blue-600 hover:underline"
          >
            {isExpanded ? 'Show Less' : 'Read More'}
          </button>
        )}
      </div>
    );
  };

  const renderHighlights = (rowData) => {
    const maxLength = 100;
    const isExpanded = expandedHighlights[rowData._id];

    const highlightsText = isExpanded ? rowData.Product_Highlights : truncateText(rowData.Product_Highlights, maxLength);

    return (
      <div>
        <div>{highlightsText}</div>
        {rowData.Product_Highlights?.length > maxLength && (
          <button
            onClick={() => toggleHighlights(rowData._id)}
            className="mt-1 text-blue-600 hover:underline"
          >
            {isExpanded ? 'Show Less' : 'Read More'}
          </button>
        )}
      </div>
    );
  };

  const image = (rowData) => {
    return (
      <div className="flex justify-center">
        <div className="relative z-0 w-24 h-16 group">
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            // navigation
            // pagination={{ clickable: true }}
            autoplay={{ delay: 2000 }}
          >
            {rowData.Images.map((img, index) => (
              <SwiperSlide key={index} className="flex items-center justify-center">
                <img
                  src={`${apiurl()}/${img}`}
                  className="object-cover h-16 transition-transform duration-200 rounded-lg shadow-sm w-28 group-hover:scale-105"
                  alt={rowData.Product_Name}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="absolute inset-0 transition-all duration-200 bg-black bg-opacity-0 rounded-lg group-hover:bg-opacity-10" />
        </div>
      </div>
    );
  };



  const columns = [
    { field: 'Product_Name', header: 'Product Name', filter: true },
    // { field: 'Product_Description', header: 'Description', body: renderDescription },
    // { field: 'Product_Highlights', header: 'Product Highlights', body: renderHighlights },
    { field: 'Brand_Name', header: 'Brand Name', filter: true },
    { field: 'Category', header: 'Category', filter: true },
    { field: 'Sub_Category', header: 'Sub Category', filter: true },
    // { field: 'Unit_of_Measurements', header: 'Units' },
    // { field: 'Measurement_Units', header: 'Measurement' },
    // { field: 'Made_In', header: 'Made In' },
    { field: 'QTY', header: 'Qty' },
    { field: 'Regular_Price', header: 'Regular Price' },
    { field: 'Discount', header: 'Discount', filter: true  },
    { field: 'Tax_Type', header: 'Tax Type' },
    { field: 'Tax_Percentage', header: 'Tax Percentage' },
    { field: '', header: 'Tax Amount' },
    { field: '', header: 'Base Price' },
    { field: 'Sale_Price', header: 'Sale Price' },
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

      <DataTable
        value={tabledata}
        scrollable
        scrollHeight="620px"
        className="!text-sm producttable"
        rowClassName={() => 'hover:bg-gray-50 transition-colors duration-200'}
        showGridlines={false}
        stripedRows
        responsiveLayout="scroll"
        selection={selectedProducts}
        onSelectionChange={(e) => setSelectedProducts(e.value)}
        selectionMode="checkbox"
      >
        <Column
          header={CustomSelectionHeader}
          body={CustomSelectionBody}
          headerClassName="text-gray-700 bg-gray-50 !w-16"
           className="!w-16"
          alignHeader="center"
        />
        <Column
          header="Action"
          body={actionbotton}
          headerClassName="text-gray-700 bg-gray-50"
          className="text-center"
        />
        <Column
          header="Images"
          body={image}
          headerClassName="text-gray-700 bg-gray-50"
        />
        {columns.map((col, i) => (
          col.formattype === 'array' ? (
            <Column
              key={i}
              header={col.header}
              field={col.field}
              style={{ minWidth: col.width }}
              body={array}
              headerClassName="text-gray-700 bg-gray-50 "
            />
          ) : (
            <Column
              key={i}
              field={col.field}
              header={col.header}
              body={col.body}
              headerClassName="text-gray-700 bg-gray-50"
            />
          )
        ))}
      </DataTable>

      <FilterPanel />
    </div>
  );
};

export default Tableview