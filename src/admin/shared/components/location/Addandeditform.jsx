import { useEffect, useState } from 'react';

export default function Addandeditform(props) {
    const { visible, setVisible, handlesave, handlechange, loading, formdata, handleupdate } = props;
  
    if (!visible) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-30 backdrop-blur-sm">
        <div className="w-full max-w-2xl overflow-hidden bg-white shadow-2xl rounded-2xl">
          {/* Header */}
          <div className="p-6 bg-secondary">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-white">Add/Edit Form</h2>
              <button onClick={() => setVisible(false)} className="p-2 text-white transition-colors rounded-full hover:bg-white hover:bg-opacity-20" >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
  
          <div className="p-6">
            <form onSubmit={!formdata?._id ? handlesave : handleupdate}>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">City</label>
                    <input type="text" name="City" value={formdata?.City} onChange={handlechange} className="w-full px-4 py-3 transition-all border-0 rounded-lg outline-none bg-gray-50 focus:ring-2 focus:ring-purple-500" required />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">State</label>
                    <input type="text" name="State" value={formdata?.State} onChange={handlechange} className="w-full px-4 py-3 transition-all border-0 rounded-lg outline-none bg-gray-50 focus:ring-2 focus:ring-purple-500" required />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Zipcode</label>
                    <input type="text" name="Zipcode" value={formdata?.Zipcode} onChange={handlechange} className="w-full px-4 py-3 transition-all border-0 rounded-lg outline-none bg-gray-50 focus:ring-2 focus:ring-purple-500" required />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Local Tax</label>
                    <input type="text" name="Local_Tax" value={formdata?.Local_Tax} onChange={handlechange} className="w-full px-4 py-3 transition-all border-0 rounded-lg outline-none bg-gray-50 focus:ring-2 focus:ring-purple-500"  />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Delivery Fee</label>
                    <input type="text" name="DeliveryFee" value={formdata?.DeliveryFee} onChange={handlechange} className="w-full px-4 py-3 transition-all border-0 rounded-lg outline-none bg-gray-50 focus:ring-2 focus:ring-purple-500"  />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Minimum Orderprice for free delivery</label>
                    <input type="text" name="Order_Price_Free_Delivery" value={formdata?.Order_Price_Free_Delivery} onChange={handlechange} className="w-full px-4 py-3 transition-all border-0 rounded-lg outline-none bg-gray-50 focus:ring-2 focus:ring-purple-500"  />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Overall Discount</label>
                    <input type="text" name="Overall_Discount" value={formdata?.Overall_Discount} onChange={handlechange} className="w-full px-4 py-3 transition-all border-0 rounded-lg outline-none bg-gray-50 focus:ring-2 focus:ring-purple-500"  />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Status</label>
                    <select name="Status" value={formdata?.Status} onChange={handlechange} className="w-full px-4 py-3 transition-all border-0 rounded-lg outline-none appearance-none bg-gray-50 focus:ring-2 focus:ring-purple-500" required >
                      <option selected disabled>---Select a status---</option>
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
  
              {/* Submit Button */}
              <div className="mt-8">
                <button type="submit" disabled={loading} className="relative w-full py-4 overflow-hidden font-medium text-white transition-all bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl hover:from-purple-600 hover:to-blue-600" >
                  <div className="relative z-10 flex items-center justify-center gap-2">
                    {loading && (
                      <svg className="w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                    <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
}