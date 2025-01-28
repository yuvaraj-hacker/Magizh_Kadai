import React from 'react';

const PreviewModalCategorydeals = ({ banner, onClose, apiUrl }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-lg p-6 bg-white rounded-lg">
        <button onClick={onClose} className="absolute text-gray-500 top-4 right-4 hover:text-gray-700">
          ✕
        </button>
        <div className="overflow-hidden rounded-2xl" style={{ backgroundColor: banner.bgColor || '#7300ff' }}>
          <div className="p-3 overflow-hidden md:p-5">
            <img
            src={banner.preview.startsWith('uploads') ? `${apiUrl}/${banner.preview}` : banner.preview || URL.createObjectURL(banner.file)}
              alt={banner.title}
              className="object-cover w-full rounded-lg"
            />
          </div>
          <div className="flex items-center justify-center w-full overflow-hidden rounded-b-2xl">
            <img src="/assets/swipermax/min_bg_design.png" alt="" className="w-full" />
          </div>
          <div className="w-full py-4 text-center rounded-b-3xl" style={{ backgroundColor: banner.textBgColor || '#730037' }}>
            <h2
              className="mx-auto text-sm font-semibold xl:text-lg font-inria-serif"
              style={{ color: banner.textColor || '#ffffff' }}
            >
              {banner.title}
            </h2>
            <p className="mt-2 text-xs text-white">{banner.subtitle}</p>
          </div>
          <div className="relative h-2.5">
            <img src="/src/assets/swipermax/min_bg_fr.png" className="absolute -bottom-0 -left-3" alt="" />
            <img src="/src/assets/swipermax/min_bg_fl.png" className="absolute -bottom-0 -right-3" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModalCategorydeals;
