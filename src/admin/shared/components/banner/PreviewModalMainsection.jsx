import React from 'react';

const PreviewModalMainsection = ({ banner, onClose, apiUrl }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-lg p-6 bg-white rounded-lg">
        <button onClick={onClose} className="absolute text-gray-500 top-4 right-4 hover:text-gray-700">
          ✕
        </button>
        <div
          className="relative overflow-hidden rounded-3xl"
          style={{ backgroundColor: banner.bgColor || '#7300ff' }}
        >
          <img src="/src/assets/swipermax/max_bg_design.png" alt="" className="absolute top-1 left-1" />
          <div className="grid grid-cols-12">
            <div
              className="z-10 flex flex-col items-start justify-center col-span-5 gap-2 px-5"
              style={{ color: banner.textColor || '#ffffff' }}
            >
              <h2 className="xsm:text-[30px] sm:text-[35px] md:text-[40px] lg:text-[35px] xl:text-[36px] 2xl:text-[48px] 3xl:text-[65px] 3xl:leading-10 font-jomhuria">
                {banner.title}
              </h2>
              <h2 className="font-bold 2xl:text-2xl font-poltawski">
                {banner.subtitle}
              </h2>
            </div>
            <img
              src={banner.preview.startsWith('uploads') ? `${apiUrl}/${banner.preview}` : banner.preview || URL.createObjectURL(banner.file)}
              alt={banner.title}
              className="w-full col-span-7 rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModalMainsection;
