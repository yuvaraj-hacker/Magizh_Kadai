import { Dialog } from 'primereact/dialog';

export default function ShippingForm(props) {
    const { visible, setVisible, handlesave, handlechange, loading, formdata, loginType,handleCityChange ,cityOptions,handleZipcodeChange,availableZipcodes} = props;
    // location, setFormdata
    return (
        <Dialog header="Shipping Address" visible={visible} onHide={() => setVisible(false)} className="!w-[95%] md:!w-[35rem] dialog-dark" 
        pt={{
            root: { className: 'dark:bg-gray-600' },
            content: { className: 'dark:bg-gray-600' },
            header: { className: 'dark:bg-gray-600 dark:text-white' }
          }}>
            <form onSubmit={handlesave} className="p-2 md:p-4">
                {/* Type selector first */}
                <div className="mb-4">
                    <div className="mb-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-white">Address Type</label>
                    </div>
                    <select name="Address_Type" value={formdata?.Address_Type || ''} onChange={handlechange} 
                        className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-orange-200 dark:bg-gray-500 dark:text-white" required
                    >
                        <option value="" disabled>---select---</option>
                        <option value="Home">Home</option>
                        <option value="Work">Work</option>
                    </select>
                </div>

                {/* Personal Info */}
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                    <div>
                        <div className="mb-4">
                            <div className="mb-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-white">First Name</label>
                            </div>
                            <input type="text" name="First_Name" value={formdata?.First_Name || ''} onChange={handlechange} 
                                className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-orange-200 dark:bg-gray-500 dark:text-white" required 
                            />
                        </div>
                        <div className="mb-4">
                            <div className="mb-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-white">Last Name</label>
                            </div>
                            <input type="text" name="Last_Name" value={formdata?.Last_Name || ''} onChange={handlechange} 
                                className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-orange-200 dark:bg-gray-500 dark:text-white" required 
                            />
                        </div>
                        {loginType === 'Guest' && (
                        <div className="mb-4 col-span-full">
                            <div className="mb-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-white">Email</label>
                            </div>
                            <input type="text" name="Email" value={formdata?.Email || ''} onChange={handlechange} 
                                className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-orange-200 dark:bg-gray-500 dark:text-white" required 
                            />
                        </div>
                        )}
                        
                        <div className="mb-4">
                            <div className="mb-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-white">Mobile Number</label>
                            </div>
                            <input type="tel" name="Mobilenumber" value={formdata?.Mobilenumber || ''} onChange={handlechange} 
                                className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-orange-200 dark:bg-gray-500 dark:text-white" 
                                // pattern="[0-9]*" required 
                            />
                        </div>
                    </div>

                    {/* Address Info */}
                    <div>
                        <div className="mb-4">
                            <div className="mb-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-white">Street Address</label>
                            </div>
                            <input type="text" name="Address" value={formdata?.Address || ''} onChange={handlechange} 
                                className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-orange-200 dark:bg-gray-500 dark:text-white" 
                                placeholder="House/Flat No, Building, Street" required 
                            />
                        </div>
            
                        <div className="mb-4">
                            <div className="mb-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-white">City</label>
                            </div>
                            {/* <select name="City" value={formdata?.City || ''} onChange={handleCityChange}
                                className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-orange-200 dark:bg-gray-500 dark:text-white" required
                            >
                            <option value="" disabled>Select City</option>
                            {cityOptions.map((loc) => (
                                <option key={loc._id} value={loc.City} disabled={loc.Status !== "Active"} className={loc.Status !== "Active" ? 'text-gray-400' : ''} >
                                    {loc.displayName}
                                </option>
                            ))}
                        </select> */}
                        <input type="text" name="City" value={formdata?.City || ''} onChange={handlechange} 
                                className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-orange-200 dark:bg-gray-500 dark:text-white" required 
                            />
                        </div>
                        <div className="mb-4">
                            <div className="mb-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-white">State</label>
                            </div>
                            <input type="text" name="State" value={formdata?.State || ''} onChange={handlechange} 
                                className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-orange-200 dark:bg-gray-500 dark:text-white" required 
                            />
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
                    {/* <div>
                        <div className="mb-2">
                            <label className="text-sm font-medium text-gray-700">Zipcode</label>
                        </div>
                        <input type="text" name="Zipcode" value={formdata?.Zipcode || ''} onChange={handlechange} 
                            className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-orange-200" pattern="[0-9]*" required 
                        />
                    </div> */}
                     <div>
                        <div className="mb-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-white">Zipcode</label>
                        </div>
                        {availableZipcodes.length > 1 ? (
                            <select name="Zipcode" value={formdata?.Zipcode || ''} onChange={handleZipcodeChange}
                                className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-orange-200 dark:bg-gray-500 dark:text-white" required
                            >
                                <option value="" disabled>Select Zipcode</option>
                                {availableZipcodes.map((zip, index) => (
                                    <option key={index} value={zip}>
                                        {zip}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input type="text" name="Zipcode" value={formdata?.Zipcode || ''} onChange={handlechange} 
                                className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-orange-200 dark:bg-gray-500 dark:text-white" pattern="[0-9]*" required 
                                readOnly={availableZipcodes.length === 1}
                            />
                        )}
                    </div>
           
                    <div>
                        <div className="mb-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-white">Country</label>
                        </div>
                        <input type="text" name="Country" value={formdata?.Country || ""} 
                            // value="United States of America" 
                             onChange={handlechange} 
                            className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-orange-200 dark:bg-gray-500 dark:text-white" 
                         
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div>
                    <button 
                        type="submit" 
                        className="w-full py-2.5 px-4 rounded-md bg-[rgb(227,135,52)] text-white hover:bg-[rgb(207,115,32)] transition-colors duration-200"
                    >
                        {loading ? (
                            <span className="inline-block size-5 border-[3px] border-current border-t-transparent text-white rounded-full animate-spin" role="status" aria-label="loading"/>
                        ) : formdata?._id ? 'Update' : 'Save'}
                    </button>
                </div>
            </form>
        </Dialog>
    );
}

