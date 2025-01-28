
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import apiurl from '../../../../shared/services/apiendpoint/apiendpoint';
import { useEffect, useState } from 'react';
import moment from 'moment-timezone';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Tableview = (props) => {
  const { tabledata, editfrom, handledelete, filtervalues,activeTab  } = props;
  const [tempFilterValues, setTempFilterValues] = useState(filtervalues);
  const [viewMode, setViewMode] = useState('grid');
  useEffect(() => {
    setTempFilterValues(filtervalues);
}, [filtervalues]);

const filteredTableData = tabledata.filter(banner => banner.banner_type === activeTab);

  const actionButtons = (rowData) => (
    <div className="flex gap-2">
      <button 
        onClick={() => editfrom(rowData)} 
        className="p-2 transition-colors duration-300 shadow rounded-xl bg-blue-50 hover:bg-blue-100"
      >
        <i className="text-blue-600 fi fi-rr-pen-circle"></i>
      </button>
      <button 
        onClick={() => handledelete(rowData?._id)} 
        className="p-2 transition-colors duration-300 shadow rounded-xl bg-red-50 hover:bg-red-100"
      >
        <i className="text-red-600 fi fi-rr-trash"></i>
      </button>
    </div>
  );

  const imageTemplate = (rowData) => {
    if (!rowData.Images || rowData.Images.length === 0) return null;
    
    return (
      <div className="w-[200px] h-[120px] rounded-lg overflow-hidden shadow-md">
        <img
          src={`${apiurl()}/${rowData.Images[0].preview}`}
          alt="Banner"
          className="object-cover w-full h-full"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/200x120?text=No+Image';
          }}
        />
      </div>
    );
  };

  // // Filter data based on the active banner type
  // const filteredTableData = activeBannerType
  //   ? tabledata.filter(banner => banner.banner_type === activeBannerType)
  //   : tabledata;

  const GridView = () => {
    return (
      <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTableData.map((banner) => (
          <div key={banner._id} className="overflow-hidden transition-shadow duration-300 bg-white shadow-lg rounded-xl hover:shadow-2xl">
            <Swiper
              modules={[Pagination, Navigation, Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{
                delay: parseInt(banner.autoplayInterval) || 8000,
                disableOnInteraction: false,
              }}
              className="aspect-video"
            >
              {banner.Images.map((image) => (
                <SwiperSlide key={image.id}>
                  <div className="relative w-full h-full">
                    <img
                      src={`${apiurl()}/${image.preview}`}
                      alt={image.title}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                      <div className="absolute bottom-0 p-4 text-white">
                        <h3 className="font-semibold">{image.title}</h3>
                        <p className="text-sm opacity-90">{image.subtitle}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Created: {moment(banner.createdAt).format('MMM DD, YYYY')}
                </span>
                {actionButtons(banner)}
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                {banner.Images.map((image, index) => (
                  <div key={image.id} className="p-3 rounded-lg bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Banner {index + 1}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        image.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {image.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">Priority: {image.priority}</p>
                    <p className="text-xs text-gray-600">
                      {moment(image.startDate).format('MMM DD')} - {moment(image.endDate).format('MMM DD')}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                    {(image.targeting?.devices || []).map(device => (
                        <span key={device} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full">
                          {device}
                        </span>
                      ))}
                    </div>
                    <div className="mt-2">
                      <p className="text-xs text-gray-600">Impressions: {image.analytics?.impressions}</p>
                      <p className="text-xs text-gray-600">Clicks: {image.analytics?.clicks}</p>
                      <p className="text-xs text-gray-600">
                        CTR: {image.analytics?.ctr ? `${image.analytics.ctr}%` : '0%'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const TableView = () => {
    return (
      <DataTable 
        value={filteredTableData}
        className="!text-sm"
        rowClassName={() => 'border-b border-secondary hover:bg-gray-50 transition-colors'}
        scrollable
        scrollHeight="800px"
      >
        <Column header="Action" body={actionButtons} style={{ width: '100px' }} />
        <Column header="Preview" body={imageTemplate} style={{ width: '200px' }} />
        <Column 
          field="createdAt" 
          header="Created At" 
          body={(rowData) => moment(rowData.createdAt).format('MMM DD, YYYY')}
          style={{ width: '150px' }}
        />
        <Column 
          field="autoplayInterval" 
          header="Autoplay" 
          body={(rowData) => `${rowData.autoplayInterval}ms`}
          style={{ width: '120px' }}
        />
        <Column
          header="Images"
          body={(rowData) => (
            <div className="space-y-2">
              {rowData.Images.map((image, index) => (
                <div key={image.id} className="flex items-center gap-4 p-2 transition-colors rounded-lg bg-gray-50 hover:bg-gray-100">
                  <span className="font-medium min-w-[80px]">Banner {index + 1}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    image.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {image.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <span className="text-sm text-gray-600">
                    {moment(image.startDate).format('MMM DD')} - {moment(image.endDate).format('MMM DD')}
                  </span>
                  <div className="flex gap-1">
                    {image.targeting?.devices.map(device => (
                      <span key={device} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full">
                        {device}
                      </span>
                    ))}
                  </div>
                  <div className="ml-4 text-xs text-gray-500">
                    <p>Impressions: {image.analytics?.impressions}</p>
                    <p>Clicks: {image.analytics?.clicks}</p>
                    <p>CTR: {image.analytics?.ctr ? `${image.analytics.ctr}%` : '0%'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          style={{ minWidth: '400px' }}
        />
      </DataTable>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-center"></h2>
        <div className="flex gap-2">
          <button 
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
              viewMode === 'grid' 
                ? 'bg-primary text-white shadow' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <i className="fi fi-rr-objects-column"></i>
          </button>
          <button 
            onClick={() => setViewMode('table')}
            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
              viewMode === 'table' 
                ? 'bg-primary text-white shadow' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <i className="fi fi-sr-table-list"></i>
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? <GridView /> : <TableView />}
    </div>
  );
};

export default Tableview;
