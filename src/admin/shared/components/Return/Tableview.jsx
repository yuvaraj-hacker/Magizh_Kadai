/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import apiurl from '../../../../shared/services/apiendpoint/apiendpoint';

import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import moment from 'moment-timezone';
import { getFilterOptions } from '../../services/apipurchase/apipurchase';


const Tableview = (props) => {
  const { tabledata, editfrom, handledelete, viewProducts, cusfilter, filtervalues, onPage, page, downloadPDF } = props

  const [tempFilterValues, setTempFilterValues] = useState(filtervalues);
  const [filterOptions, setFilterOptions] = useState([]);
  const [scroll, setScrollHeight] = useState("750px");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  useEffect(() => {
    const updateHeight = () => {
      if (window.innerWidth >= 1920) { // Extra large screens
        setScrollHeight("750px");
      } else if (window.innerWidth >= 1728) {
        setScrollHeight("600px"); // MacBook Pro 16-inch
      } else if (window.innerWidth >= 1512) {
        setScrollHeight("530px"); // MacBook Pro 14-inch
      } else if (window.innerWidth >= 1280) {
        setScrollHeight("530px"); // MacBook Air/Pro 13-inch
      } else if (window.innerWidth >= 1024) { // Laptops
        setScrollHeight("530px");
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

  const actionbotton = (rowData) => {
    return (
      <div className="flex gap-2">
        {/* <button onClick={() => editfrom(rowData)} className="inline-flex items-center text-xl font-medium text-green-600 gap-x-1 decoration-2 " >
          <i className="fi fi-rr-pen-circle"></i>
        </button> */}
        <button onClick={() => viewProducts(rowData?.Purchase_id)} className="inline-flex items-center text-xl font-medium text-blue-600 gap-x-1 decoration-2 " >
          <i className="fi fi-rr-eye"></i>
        </button>
      </div>
    )
  }



  const image = (rowData) => {
    return (
      <div className="flex gap-4">
        <img
          src={`${apiurl()}/${rowData['Images'][0]}`}
          className="rounded-xl w-40 h-28 object-cover bg-contain cursor-pointer"
          onClick={() => handleImageClick(rowData['Images'][0])}
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

  const renderImages = (images) => {
    return (
      <div className="flex space-x-2">
        {images && images.map((image, index) => (
          <img
            key={index}
            src={image} // Assuming image is the URL or file path
            alt={`Product Image ${index + 1}`}
            className="w-16 h-16  object-cover bg-contain rounded-lg"
          />
        ))}
      </div>
    );
  };

  const columns = [
    { field: 'Name', header: 'Name', filter: true },
    { field: 'Whatsapp', header: 'Contaact Number', width: "150px" },
    // { field: 'Order_Date', header: 'Contaact Number', format: "Date", width: "150px" },
    // { field: 'Images', header: 'Product Images', filter: true, body: (rowData) => renderImages(rowData.Images) },
    { field: 'product_Name', header: 'Product Name', filter: true },
    { field: 'quantity', header: 'Quantity', filter: true },
    { field: 'Order_Date', header: 'Request Date', format: "Date", width: "150px" },
    { field: 'expectedDate', header: 'Expected Date',  width: "150px" },
    // {field: 'Billing_Name', header: 'Billing Name',width:"150px"},
    // {field: 'Email', header: 'Email',width:"150px"},
    // {field: 'Mobilenumber', header: 'Mobile Number',width:"150px"},
    // {field: 'City', header: 'City', filter: true,width:"150px"},
    // {field: 'Delivery_Address', header: 'Delivery Address',width:"200px"},
    // { field: 'Total_Amount', header: 'Total Amount', width: "150px" },
    // {field: 'Payment_Status', header: 'Payment Status',width:"150px", filter: true},
  ];

  return (
    <div className='  ' style={{ height: "calc(100vh - 197px)" }}>
      <DataTable rowClassName={() => 'border-b border-secondary'} selectionMode="single" value={tabledata} scrollable className='!text-sm' stateStorage="session" stateKey="dt-state-demo-local" >
        <Column header="S.No" body={(rowData, { rowIndex }) => rowIndex + 1} headerClassName="text-white bg-primary" className=""
        />
        {/* <Column header="Action" body={actionbotton} headerClassName='text-white bg-primary' /> */}
        <Column header="Product Images" body={image} headerClassName='text-white bg-primary ' />

        {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative p-4 bg-white rounded-xl">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white text-xl bg-gray-800 p-1 rounded-full"
            >
              &times;
            </button>
            <img
              src={`${apiurl()}/${selectedImage}`}
              className="max-w-full max-h-screen object-contain"
              alt="Preview"
            />
          </div>
        </div>
      )}

        {columns.map((col, i) => (
          <Column headerClassName='text-white bg-primary' key={i} field={col.field} header={col.header} filter={col.filter} filterElement={Filter(col)} showFilterMenuOptions={false} showApplyButton={false}
            showClearButton={false} showFilterMatchModes={false} style={{ minWidth: col.width }}
            body={(rowData, meta) => { if (col.format == "Date") { return moment(rowData[meta.field]).format("YYYY-MM-DD") } else if (col.format == "HTML") { return <div dangerouslySetInnerHTML={{ __html: rowData[meta.field] }} /> } else { return rowData[meta.field] } }} />
        ))}
      </DataTable>
    </div>
  )
}

export default Tableview;