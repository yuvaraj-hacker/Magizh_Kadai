// AddandeditformCategoryDeals.js
import React from 'react';
import apiurl from '../../../../shared/services/apiendpoint/apiendpoint';
import BannerUploadCategoryCarousel from './BannerUploadCategoryCarousel ';

export default function AddandeditformCategoryDeals({
    visible,
    setVisible,
    handlesave,
    loading,
    formdata,
    handleupdate,
    handlechange,
}) {
    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">
                            {formdata?._id ? 'Edit Category Deals Banner' : 'Add New Category Deals Banner'}
                        </h2>
                        <button
                            onClick={() => setVisible(false)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>

                    <form onSubmit={!formdata?._id ? handlesave : handleupdate} className="space-y-6">
                        <BannerUploadCategoryCarousel 
                            banners={formdata?.Images || []}
                            onChange={(images) => handlechange({ target: { name: 'Images', value: images } })}
                            apiUrl={apiurl()}
                        />

                         {/* Carousel Settings */}
 <div className="grid grid-cols-1 gap-6 pt-6 border-t lg:grid-cols-2">
              <div>
                <h3 className="mb-4 text-lg font-semibold">Carousel Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-1 text-sm font-medium">Transition Effect</label>
                    <select
                      name="carouselEffect"
                      value={formdata?.carouselEffect || 'slide'}
                      onChange={handlechange}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="slide">Slide</option>
                      <option value="fade">Fade</option>
                      <option value="zoom">Zoom</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium">Autoplay Interval (ms)</label>
                    <input
                      type="number"
                      name="autoplayInterval"
                      value={formdata?.autoplayInterval}
                      onChange={handlechange}
                      className="w-full px-3 py-2 border rounded-md"
                      min="1000"
                      step="500"
                    />
                  </div>
                </div>
              </div>

              {/* Display Settings */}
              <div>
                <h3 className="mb-4 text-lg font-semibold">Display Settings</h3>
                <div className="space-y-4">
                  {/* <div>
                    <label className="block mb-1 text-sm font-medium">Default Section</label>
                    <select
                      name="defaultSection"
                      value={formdata?.defaultSection || 'main'}
                      onChange={handlechange}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="main">Main Carousel</option>
                      <option value="deals">Deal Banners</option>
                      <option value="category">Category Highlights</option>
                      <option value="sidebar">Sidebar Promotions</option>
                    </select>
                  </div> */}
                  <div>
                    <label className="block mb-1 text-sm font-medium">Navigation Style</label>
                    <select
                      name="navigationStyle"
                      value={formdata?.navigationStyle || 'arrows'}
                      onChange={handlechange}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="arrows">Arrows</option>
                      <option value="dots">Dots</option>
                      <option value="both">Both</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                  <div className="">
                    <label className="block mb-1 text-sm font-medium">Status</label>
                    <select name="Status" value={formdata?.Status} onChange={handlechange} className="w-full px-3 py-2 border rounded-md " required >
                      <option selected disabled>---Select a status---</option>
                      <option>Active</option>
                      <option>In Active</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

                        <div className="flex justify-end pt-6 border-t">
                            <button
                                type="submit"
                                className={`flex items-center gap-2 px-6 py-2 text-white rounded-md ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                                    }`}
                                disabled={loading}
                            >
                                {loading && (
                                    <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin" />
                                )}
                                {formdata?._id ? 'Update Banner' : 'Save Banner'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}