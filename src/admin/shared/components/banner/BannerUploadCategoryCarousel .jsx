// BannerUploadCategoryCarousel .js

import React, { useState, useCallback } from 'react';
import PreviewModalMainsection from './PreviewModalMainsection';
import PreviewModalCategorydeals from './PreviewModalCategorydeals';


const BannerUploadCategoryCarousel  = ({ banners = [], onChange, apiUrl }) => {
  const [draggedBanner, setDraggedBanner] = useState(null);
  const [previewBanner, setPreviewBanner] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedBanner(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = useCallback(
    (e, index) => {
      e.preventDefault();
      if (draggedBanner === null) return;

      const newBanners = [...banners];
      const draggedItem = newBanners[draggedBanner];
      newBanners.splice(draggedBanner, 1);
      newBanners.splice(index, 0, draggedItem);

      onChange(newBanners);
      setDraggedBanner(index);
    },
    [banners, draggedBanner, onChange]
  );

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    const validFiles = files.filter((file) => {
      const isValidType = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
      const isValidSize = file.size <= 2 * 1024 * 1024; // Max size: 2MB
      return isValidType && isValidSize;
    });

    const newBanners = [...banners];
    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newBanners.push({
          id: Date.now() + Math.random(),
          file,
          preview: e.target.result,
          type: 'Category Deals',
          banner_type:'Category Deals',
          title: '',
          subtitle: '',
          link: '',
          bgColor: '',
          textColor: '',
          textBgColor:'',
          startDate: new Date().toISOString().split('T')[0],
          endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          isActive: true,
          priority: newBanners.length + 1,
          analytics: {
            clicks: 0,
            impressions: 0,
            ctr: 0,
          },
          targeting: {
            devices: ['desktop', 'mobile', 'tablet'],
            geoLocations: [],
            userGroups: [],
          },
          schedule: {
            displayTimes: [],
            frequency: 'always',
          },
        });
        onChange(newBanners);
      };
      reader.readAsDataURL(file);
    });
  };

  const updateBanner = (index, field, value) => {
    const newBanners = [...banners];
    newBanners[index] = {
      ...newBanners[index],
      [field]: value,
    };
    onChange(newBanners);
  };

  const removeBanner = (index) => {
    const newBanners = banners.filter((_, i) => i !== index);
    onChange(newBanners);
  };

  const openPreview = (banner) => setPreviewBanner(banner);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="p-6 mb-8 bg-white shadow-sm rounded-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Category Carousel Banner</h3>
          <div className="text-sm text-gray-500">
            {banners.length} / 4 banners
          </div>
        </div>

        <label className="relative cursor-pointer group">
          <div className="flex flex-col items-center justify-center h-48 gap-4 transition-colors border-2 border-gray-300 border-dashed rounded-lg group-hover:border-blue-500">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-50">
              <svg
                className="w-8 h-8 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-800">Drop your images here</p>
            <p className="text-xs text-gray-500">PNG, JPG, WebP up to 2MB</p>
          </div>
          <input
            type="file"
            className="hidden"
            multiple
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
          />
        </label>
      </div>

      <div className="space-y-4">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            className="p-4 transition-shadow bg-white rounded-lg shadow-sm hover:shadow-md"
          >
            <div className="flex gap-6">
              <div className="relative flex-shrink-0 w-48 h-32">
                <img
                  src={banner.preview.startsWith('uploads') ? `${apiUrl}/${banner.preview}` : banner.preview || URL.createObjectURL(banner.file)}
                  alt={banner.title}
                  className="object-cover w-full h-full rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center transition-opacity bg-black bg-opacity-0 rounded-lg opacity-0 hover:bg-opacity-50 hover:opacity-100">
                  <button
                    onClick={() => removeBanner(index)}
                    className="p-2 text-white bg-red-500 rounded-full"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="grid flex-1 grid-cols-2 gap-4">
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Banner Title"
                    value={banner.title}
                    onChange={(e) => updateBanner(index, 'title', e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Subtitle (optional)"
                    value={banner.subtitle}
                    onChange={(e) => updateBanner(index, 'subtitle', e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Link URL"
                    value={banner.link}
                    onChange={(e) => updateBanner(index, 'link', e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                  <label className="block mb-1 text-sm font-medium">Background Color</label>
                  <input
                    type="color"
                    value={banner.bgColor}
                    onChange={(e) => updateBanner(index, 'bgColor', e.target.value)}
                    className="w-full border rounded-md outline-none"
                  />
                  <label className="block mb-1 text-sm font-medium">Text Color</label>
                  <input
                    type="color"
                    value={banner.textColor}
                    onChange={(e) => updateBanner(index, 'textColor', e.target.value)}
                    className="w-full border rounded-md outline-none"
                  />
                   <label className="block mb-1 text-sm font-medium">Text BgColor</label>
                  <input
                    type="color"
                    value={banner.textBgColor}
                    onChange={(e) => updateBanner(index, 'textBgColor', e.target.value)}
                    className="w-full border rounded-md outline-none"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={banner.startDate}
                      onChange={(e) => updateBanner(index, 'startDate', e.target.value)}
                      className="flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="date"
                      value={banner.endDate}
                      onChange={(e) => updateBanner(index, 'endDate', e.target.value)}
                      className="flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <select
                    value={banner.schedule?.frequency}
                    onChange={(e) => updateBanner(index, 'schedule', { ...banner.schedule, frequency: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="always">Always Show</option>
                    <option value="weekdays">Weekdays Only</option>
                    <option value="weekends">Weekends Only</option>
                    <option value="custom">Custom Schedule</option>
                  </select>
                  <div className="flex flex-wrap gap-2">
                    {['desktop', 'mobile', 'tablet'].map(device => (
                      <label key={device} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={banner.targeting.devices.includes(device)}
                          onChange={(e) => {
                            const devices = e.target.checked
                              ? [...banner.targeting.devices, device]
                              : banner.targeting.devices.filter(d => d !== device);
                            updateBanner(index, 'targeting', { ...banner.targeting, devices });
                          }}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                        />
                        <span className="text-sm capitalize">{device}</span>
                      </label>
                    ))}
                  </div>
                  <div className='flex items-end'>
                  <button type='button' onClick={() => openPreview(banner)} className="text-gray-500 hover:text-gray-700">
                👁️
              </button>
              </div>
                </div>
              </div>
            </div>
       {/* Analytics Preview */}
            <div className="grid grid-cols-3 gap-4 pt-4 mt-4 border-t">
              <div className="text-center">
                <div className="text-sm text-gray-500">Impressions</div>
                <div className="font-semibold">{banner.analytics.impressions}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-500">Clicks</div>
                <div className="font-semibold">{banner.analytics.clicks}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-500">CTR</div>
                <div className="font-semibold">{banner.analytics.ctr}%</div>
              </div>
            </div>
          </div>
        ))}
      </div>
     {/* Preview Modal */}
      {previewBanner && (
        <PreviewModalCategorydeals
          banner={previewBanner}
          onClose={() => setPreviewBanner(null)}
          apiUrl={apiUrl}
        />
      )}
    </div>
  );
};

export default BannerUploadCategoryCarousel;
