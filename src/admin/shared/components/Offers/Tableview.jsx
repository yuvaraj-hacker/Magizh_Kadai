// import React from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { MultiSelect } from 'primereact/multiselect';
// import apiurl from '../../../../shared/services/apiendpoint/apiendpoint';

// const TableView = ({ 
//   tabledata, 
//   totalRecords, 
//   first, 
//   editfrom, 
//   handledelete, 
//   cusfilter, 
//   filtervalues, 
//   onPage, 
//   page 
// }) => {
//   const actionButtons = (rowData) => (
//     <div className="flex justify-center gap-3">
//       <button
//         onClick={() => editfrom(rowData)}
//         className="p-2 transition-colors duration-200 rounded-full hover:bg-blue-50"
//       >
//         <i className="text-lg text-blue-600 fi fi-rr-pen-circle"></i>
//       </button>
//       <button
//         onClick={() => handledelete(rowData?._id)}
//         className="p-2 transition-colors duration-200 rounded-full hover:bg-red-50"
//       >
//         <i className="text-lg text-red-600 fi fi-rr-trash"></i>
//       </button>
//     </div>
//   );

//   const statusTemplate = (rowData) => {
//     const getStatusColor = (status) => {
//       switch (status?.toLowerCase()) {
//         case 'active':
//           return 'bg-green-100 text-green-700';
//         case 'inactive':
//           return 'bg-gray-100 text-gray-700';
//         default:
//           return 'bg-blue-100 text-blue-700';
//       }
//     };

//     return (
//       <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(rowData.Status)}`}>
//         {rowData.Status}
//       </span>
//     );
//   };

//   const renderProducts = (rowData) => {
//     const productCount = rowData.Products?.length || 0;
//     return (
//       <div className="flex flex-col">
//         <span className="font-medium">{productCount} Products</span>
//         <span className="text-sm text-gray-500">
//           {rowData.Category} - {rowData.Sub_Category}
//         </span>
//       </div>
//     );
//   };

//   const designTemplate = (rowData) => (
//     <div className="flex items-center gap-2">
//       <div 
//         className="w-4 h-4 rounded" 
//         style={{ backgroundColor: rowData.CardBackgroundColor }}
//       ></div>
//       <span>{rowData.Design}</span>
//     </div>
//   );

//   const columns = [
//     { field: 'Title', header: 'Offer Title' },
//     { field: 'Design', header: 'Design', body: designTemplate },
//     { field: 'Choice_Product_By', header: 'Selection Type' },
//     { field: 'Products', header: 'Products', body: renderProducts },
//     { field: 'Status', header: 'Status', body: statusTemplate }
//   ];

//   return (
//     <div className="bg-white border shadow-sm rounded-xl">
//       <DataTable
//         value={tabledata}
//         scrollable
//         scrollHeight="680px"
//         className="!text-sm"
//         rowClassName={() => 'hover:bg-gray-50 transition-colors duration-200'}
//         showGridlines={false}
//         stripedRows
//         responsiveLayout="scroll"
//         paginator
//         rows={10}
//         first={first}
//         totalRecords={totalRecords}
//         onPage={onPage}
//       >
//         <Column
//           header="Actions"
//           body={actionButtons}
//           headerClassName="text-gray-700 bg-gray-50"
//           className="text-center"
//         />
//         {columns.map((col, i) => (
//           <Column
//             key={i}
//             field={col.field}
//             header={col.header}
//             body={col.body}
//             headerClassName="text-gray-700 bg-gray-50"
//           />
//         ))}
//       </DataTable>
//     </div>
//   );
// };

// export default TableView;

import React from 'react';
import apiurl from '../../../../shared/services/apiendpoint/apiendpoint';

const TableView = ({
  tabledata,
  totalRecords,
  first,
  editfrom,
  handledelete,
  onPage,
  page,
  rows = 10
}) => {
  const totalPages = Math.ceil(totalRecords / rows);

  const renderPagination = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex items-center justify-between px-4 py-3 bg-white border-t">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">
            Showing {first + 1} to {Math.min(first + rows, totalRecords)} of {totalRecords} entries
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPage(page - 1)}
            disabled={page === 1}
            className="px-3 py-1 text-sm text-gray-500 bg-white border rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          {pageNumbers.map(num => (
            <button
              key={num}
              onClick={() => onPage(num)}
              className={`px-3 py-1 text-sm rounded-md ${
                page === num
                  ? 'bg-green-600 text-white'
                  : 'text-gray-500 bg-white border hover:bg-gray-50'
              }`}
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => onPage(page + 1)}
            disabled={page === totalPages}
            className="px-3 py-1 text-sm text-gray-500 bg-white border rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-6 py-4 text-sm font-medium text-left text-gray-500">Actions</th>
              <th className="px-6 py-4 text-sm font-medium text-left text-gray-500">Title</th>
              <th className="px-6 py-4 text-sm font-medium text-left text-gray-500">Design</th>
              <th className="px-6 py-4 text-sm font-medium text-left text-gray-500">Selection Type</th>
              <th className="px-6 py-4 text-sm font-medium text-left text-gray-500">Products</th>
              <th className="px-6 py-4 text-sm font-medium text-left text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tabledata && tabledata.length > 0 ? (
              tabledata.map((row) => (
                <tr key={row._id} className="group hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => editfrom(row)}
                        className="p-1.5 text-blue-600 rounded-full hover:bg-blue-50"
                      >
                        <i className="text-lg fi fi-rr-pen-circle"></i>
                      </button>
                      <button
                         onClick={() => handledelete(row?._id)} 
                        className="p-1.5 text-red-600 rounded-full hover:bg-red-50"
                      >
                        <i className="text-lg fi fi-rr-trash"></i>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900">{row.Title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 border rounded"
                        style={{ backgroundColor: row.CardBackgroundColor }}
                      />
                      <span className="text-sm text-gray-900">{row.Design}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{row.Choice_Product_By}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {row.Products?.slice(0, 3).map((product) => (
                          <div
                            key={product._id}
                            className="relative w-8 h-8 overflow-hidden rounded-full ring-2 ring-white"
                          >
                            {product.Images?.[0] && (
                              <img
                                src={`${apiurl()}/${product.Images[0]}`}
                                alt={product.Product_Name}
                                className="object-cover w-full h-full"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                      {row.Products?.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{row.Products.length - 3} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-0.5 text-xs font-medium rounded-full ${
                      row.Status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {row.Status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  No offers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {renderPagination()}
    </div>
  );
};

export default TableView;