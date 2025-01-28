import { Dialog } from 'primereact/dialog'
import React from 'react'


export default function BannerTypeform({bannervisible,setBannerVisible,bannerdata,setBannerdata,bannerloading,handlebannerchange,handlebannertypesave,handlebannertypeupdate}) {

    return (
        <Dialog header="Product Details" visible={bannervisible} onHide={() => setBannerVisible(false)} className="!w-full lg:!w-[40rem]">
        <form onSubmit={!bannerdata?._id ? handlebannertypesave : handlebannertypeupdate}>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                <div className="mb-2">
                    <div className="mb-2">
                        <label>Title</label>
                    </div>
                    <input type="text" name="title" value={bannerdata?.title} onChange={handlebannerchange} className="w-full px-4 py-2 border rounded-md outline-none border-secondary" required />
                </div>
                <div className="mb-2">
                    <div className="mb-2">
                        <label>Description</label>
                    </div>
                    <input type="text" name="description" value={bannerdata?.description} onChange={handlebannerchange} className="w-full px-4 py-2 border rounded-md outline-none border-secondary" required />
                </div>
                <div className="mb-2">
                    <div className="mb-2">
                        <label>maxBanners</label>
                    </div>
                    <input type="text" name="maxBanners" value={bannerdata?.maxBanners} onChange={handlebannerchange} className="w-full px-4 py-2 border rounded-md outline-none border-secondary" required />
                </div>
                <div className="mb-2">
                    <div className="mb-2">
                        <label>Dimensions</label>
                    </div>
                    <input type="text" name="dimensions" value={bannerdata?.dimensions} onChange={handlebannerchange} className="w-full px-4 py-2 border rounded-md outline-none border-secondary" required />
                </div>
                <div className="mb-2">
                    <div className="mb-2">
                        <label>Layout</label>
                    </div>
                    <input type="text" name="layout" value={bannerdata?.layout} onChange={handlebannerchange} className="w-full px-4 py-2 border rounded-md outline-none border-secondary" required />
                </div>
                <div className="mb-2">
                    <div className="mb-2">
                        <label>Status</label>
                    </div>
                    <select name="Status" value={bannerdata?.Status} onChange={handlebannerchange} className="w-full px-4 py-2 border rounded-md outline-none border-secondary" required >
                        <option selected disabled>---Select a status---</option>
                        <option>Active</option>
                        <option>In Active</option>
                    </select>
                </div>
            </div>
            <div className="mb-2">
                <button type="submit" className="w-full px-4 py-2 text-white border rounded-md bg-secondary" >
                    {bannerloading && <span className="animate-spin text-xl inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>}  Save
                </button>
            </div>
        </form>
    </Dialog>
)
}
