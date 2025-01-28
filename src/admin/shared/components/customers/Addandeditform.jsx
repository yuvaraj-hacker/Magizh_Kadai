
import { Dialog } from 'primereact/dialog';

export default function Addandeditform(props) {

    const { visible, setVisible, handlesave, handlechange, loading, formdata,handleupdate } = props;



    return (
        <Dialog header="Product Details" visible={visible}  onHide={() => setVisible(false)} className="!w-full lg:!w-[40rem]">
            <form onSubmit={!formdata?._id?handlesave:handleupdate}>
                <div className='mb-3'>
                    <div className='flex items-center justify-center mb-3'>
                        <label className="flex flex-col items-center justify-center w-[80%] h-55 sm:w-[40%] sm:h-60 rounded-full border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-4 pb-5">
                                <i className="fi fi-sr-mode-landscape"></i>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG</p>
                            </div>
                            <input type="file" name="Images" multiple onChange={handlechange} className="hidden"  />
                        </label>
                    </div>
                    <div className='hidden'>
                        <img width="50px" src="https://img.freepik.com/free-photo/3d-rendering-beautiful-luxury-bedroom-suite-hotel-with-tv_105762-2173.jpg?t=st=1711361047~exp=1711364647~hmac=71fd55e8418ee7913fe07a5f00af8d93c6db7474a1d71e2d5fbf7d431975180f&w=1380" alt="" />
                    </div>
                </div>
                
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                    <div>
                        <div className="mb-2">
                            <div className="mb-2">
                                <label>Title</label>
                            </div>
                            <input type="text" name="Brand_Name" value={formdata?.Brand_Name} onChange={handlechange} className="py-2 px-4 rounded-md border w-full outline-none" required />
                        </div>
                        <div className="mb-2">
                            <div className="mb-2">
                                <label>Description</label>
                            </div>
                            <input type="text" name="Description" value={formdata?.Description} onChange={handlechange} className="py-2 px-4 rounded-md border w-full outline-none" required />
                        </div>
                        <div className="mb-2">
                            <div className="mb-2">
                                <label>Material</label>
                            </div>
                            <input type="text" name="Material" value={formdata?.Material} onChange={handlechange} className="py-2 px-4 rounded-md border w-full outline-none" required />
                        </div>
                        <div className="mb-2">
                            <div className="mb-2">
                                <label>Color</label>
                            </div>
                            <input type="text" name="Color" value={formdata?.Color} onChange={handlechange} className="py-2 px-4 rounded-md border w-full outline-none" required />
                        </div>
                        <div className="mb-2">
                            <div className="mb-2">
                                <label>Regular Price</label>
                            </div>
                            <input type="text" name="Regular_Price" value={formdata?.Regular_Price} onChange={handlechange} className="py-2 px-4 rounded-md border w-full outline-none" required />
                        </div>
                    </div>
                    <div>
                        <div className="mb-2">
                            <div className="mb-2">
                                <label>Sale Price</label>
                            </div>
                            <input type="text" name="Sale_Price" value={formdata?.Sale_Price} onChange={handlechange} className="py-2 px-4 rounded-md border w-full outline-none" required />
                        </div>
                        <div className="mb-2">
                            <div className="mb-2">
                                <label>Discount</label>
                            </div>
                            <input type="text" name="Discount" value={formdata?.Discount} onChange={handlechange} className="py-2 px-4 rounded-md border w-full outline-none" required />
                        </div>
                        <div className="mb-2">
                            <div className="mb-2">
                                <label>GST Type</label>
                            </div>
                            <input type="text" name="GST_Type" value={formdata?.GST_Type} onChange={handlechange} className="py-2 px-4 rounded-md border w-full outline-none" required />
                        </div>
                        <div className="mb-2">
                            <div className="mb-2">
                                <label>GST Percentage</label>
                            </div>
                            <input type="text" name="GST_Percentage" value={formdata?.GST_Percentage} onChange={handlechange} className="py-2 px-4 rounded-md border w-full outline-none" required />
                        </div>

                        <div className="mb-2">
                            <div className="mb-2">
                                <label>Status</label>
                            </div>
                            <select  name="Status" value={formdata?.Status} onChange={handlechange} className="py-2 px-4 rounded-md border w-full outline-none" required >
                            <option selected disabled>---select a status---</option>
                            <option>Active</option>
                            <option>Inactive</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="mb-2">

                    <button type="submit" className="py-2 px-4 rounded-md border w-full bg-primary text-white" >

                        {loading && <span className="animate-spin text-xl inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>}  Save
                    </button>
                </div>
            </form>
        </Dialog>
    )
}