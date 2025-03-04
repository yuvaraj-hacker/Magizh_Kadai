import React from 'react';
import { Download, Loader2 } from 'lucide-react';

export default function Tableheadpanel({ newform, setglobalfilter, isExporting, handleExport }) {

  return (
    <div className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-semibold text-primary">
          Products
        </h2>
        {/* {selectedProducts.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {selectedProducts.length} selected
            </span>
            <button onClick={onBulkUpdateClick} className="px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-primary rounded-lg hover:bg-secondary" >
              Bulk Update
            </button>
          </div>
        )} */}
      </div>

      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 border outline-none rounded-xl"
          onChange={(e) => setglobalfilter(e.target.value)}
        />

        {/* Import Button */}
        {/* <label className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 bg-white border rounded-lg cursor-pointer hover:bg-gray-50">
          <Upload className="w-4 h-4 mr-2" />
          Import
          <input
            type="file"
            className="hidden"
            accept=".xlsx,.xls"
            onChange={handleImport}
          />
        </label> */}

        {/* Export Button with Loading State */}

        <button
          onClick={newform}
          className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 border border-transparent rounded-lg bg-primary disabled:opacity-50 disabled:pointer-events-none gap-x-2"
        >
          <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none">
            <path d="M2.63452 7.50001L13.6345 7.5M8.13452 13V2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Add Product
        </button>
        <button
          onClick={handleExport}
          disabled={isExporting}
          className={`inline-flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 bg-white border rounded-lg
            ${isExporting
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-50'
            }`}
        >
          {isExporting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Exporting...
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Export
            </>
          )}
        </button>

      </div>
      <div>

      </div>
    </div>
  );
}