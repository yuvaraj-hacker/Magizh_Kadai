
/* eslint-disable react/prop-types */
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import apiurl from '../../../../shared/services/apiendpoint/apiendpoint';
import { useEffect, useState } from 'react';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import { getFilterOptions } from '../../services/apicategory/apicategory';
import { Dialog } from 'primereact/dialog';
import moment from 'moment-timezone';
import { getFilterOptionsbannertype } from '../../services/apibanners/apibanners';
import { Pagination } from '@nextui-org/react';

const Bannerview = (props) => {
  const { bannertabledata, Bannereditfrom, handledeletebannertype, cusfilter, filtervalues, onPage, page,setIsDialogVisible ,isDialogVisible,bannertypetotalRecords} = props;

  const [tempFilterValues, setTempFilterValues] = useState(filtervalues);
  const [filterOptions, setFilterOptions] = useState([]);



   const itemsPerPage = 10;
   const totalPages = Math.ceil(bannertypetotalRecords / itemsPerPage);

  useEffect(() => {
    setTempFilterValues(filtervalues);
  }, [filtervalues]);

  const actionbotton = (rowData) => {
    return (
      <div className="flex gap-2">
        <button onClick={() => Bannereditfrom(rowData)} className="inline-flex items-center text-xl font-medium text-blue-600 gap-x-1 decoration-2">
          <i className="fi fi-rr-pen-circle"></i>
        </button>
        <button onClick={() => handledeletebannertype(rowData?._id)} className="inline-flex items-center text-xl font-medium text-red-600 gap-x-1 decoration-2">
          <i className="fi fi-rr-trash"></i>
        </button>
      </div>
    );
  };

  const array = (rowData) => {
    return (
      <div className="flex gap-4">
        {rowData['Subcategories'] && rowData['Subcategories'].length > 0 && (
          <span>{rowData['Subcategories'].join(', ')}</span>
        )}
      </div>
    );
  };

  const image = (rowData) => {
    const hasImages = rowData['Images'] && rowData['Images'].length > 0;
    const imageUrl = hasImages ? `${apiurl()}/${rowData['Images'][0]}` : 'path/to/default-image.jpg';
    return (
      <div className="flex gap-4">
        <img
          src={imageUrl}
          alt="Banner"
          className="rounded-xl h-[100px] w-[150px] object-cover"
        />
      </div>
    );
  };

  const handleApplyFilters = (key) => {
    cusfilter(key, tempFilterValues[key]);
    onPage(page);
  };

  const handleClearFilters = (key) => {
    setTempFilterValues((prev) => ({ ...prev, [key]: null }));
    cusfilter(key, null);
    onPage(page);
  };

  const getOption = async (key) => {
    var filterOptions = await getFilterOptionsbannertype(key.field);
    var formatoption = filterOptions[key.field].map((val) => ({
      label: val,
      value: key.format === 'Date' ? moment(val).format('YYYY-MM-DD') : val,
    }));
    setFilterOptions(formatoption);
  };

  const Filter = (key) => (
    <div onClick={() => getOption(key)}>
      <MultiSelect
        value={tempFilterValues[key.field]}
        options={filterOptions}
        optionLabel="value"
        className="p-column-filter"
        virtualScrollerOptions={{ itemSize: 43 }}
        maxSelectedLabels={1}
        filter
        onChange={(e) =>
          setTempFilterValues((prev) => ({ ...prev, [key.field]: e.value }))
        }
        placeholder={`Select ${key.field.charAt(0).toUpperCase() + key.field.slice(1)}`}
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
    { field: 'title', header: 'Title', filter: true },
    { field: 'description', header: 'Description', filter: true },
    { field: 'maxBanners', header: 'MaxBanners', width: '200px' },
    { field: 'dimensions', header: 'Dimensions', filter: true },
    { field: 'layout', header: 'Layout', filter: true },
    { field: 'Status', header: 'Status', filter: true },
  ];

  return (
    <div>
        
      <Dialog
        visible={isDialogVisible}
        onHide={() => setIsDialogVisible(false)}
        header="Banner Table"
        style={{ width: '80vw', maxWidth: '1200px' }}
        modal
        draggable={true}
        resizable={false}
      >
        <div className="mb-4 text-lg font-semibold text-end">Total Records: {bannertypetotalRecords}</div>
        <DataTable
          rowClassName={() => 'border-b border-secondary'}
          selectionMode="single"
          value={bannertabledata}
          scrollable
          scrollHeight="400px"
          className="!text-sm"
          stateStorage="session"
          stateKey="dt-state-demo-local"
        >
          <Column header="Action" body={actionbotton} />
          {columns.map((col, i) =>
            col.formattype === 'array' ? (
              <Column key={i} header={col.header} field={col.field} style={{ minWidth: col.width }} body={array} />
            ) : (
              <Column
                key={i}
                field={col.field}
                header={col.header}
                filter={col.filter}
                filterElement={Filter(col)}
                showFilterMenuOptions={false}
                showApplyButton={false}
                showClearButton={false}
                showFilterMatchModes={false}
              />
            )
          )}
        </DataTable>
        <div className="flex items-center justify-center w-full p-4">
  {bannertypetotalRecords > 0 && (
    <Pagination
      isCompact
      showControls
      showShadow
      color="primary"
      page={page}
      total={totalPages}
      onChange={(page) => onPage(page)}
    />
  )}
</div>

      </Dialog>
    </div>
    
  );
};

export default Bannerview;
