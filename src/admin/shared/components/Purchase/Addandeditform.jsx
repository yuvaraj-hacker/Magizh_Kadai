import { form } from 'framer-motion/m';
import { Dialog } from 'primereact/dialog';
import { getuserdetails } from '../../../../shared/services/Token/token';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function Addandeditform(props) {
    const { visible, setVisible, handlesave, handlechange, loading, formdata, handleupdate, handlechangeProduct, handleSearchChange, RowIndex, searchResults, addRow,
        handledeleteField, loadData } = props;


    const Product_Name = (rowData, rowIndex) => {
        return (
            <div>
                <input type="text" name="Product_Name" id={'Product_Name' + rowIndex['rowIndex']} value={rowData?.Product_Name} onChange={(event) => handleSearchChange(event, rowIndex)} className="w-full px-4 py-2 border rounded-md outline-none" required />
                {RowIndex == rowIndex['rowIndex'] && searchResults && searchResults.length > 0 &&
                    <ul className="hs-dropdown-menu transition-[opacity,margin] absolute z-[2] duration min-w-60 bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full">
                        {searchResults.map((result, index) => (
                            <li role='button' onClick={() => loadData(index, rowIndex)} key={index} className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700" href="#">
                                {result['Product_Name']}
                            </li>
                        ))}
                    </ul>
                }
            </div>
        )
    }

    const Brand_Name = (rowData, rowIndex) => {
        return (
            <div>
                <input type="text" name="Brand_Name" id={'Brand_Name' + rowIndex['rowIndex']} value={rowData?.Brand_Name} onChange={() => handlechangeProduct(event, rowIndex)} className="w-full px-4 py-2 border rounded-md outline-none" required />
            </div>
        )
    }

    const QTY = (rowData, rowIndex) => {
        return (
            <div>
                <input type="text" name="QTY" value={rowData?.QTY} onChange={(event) => handlechangeProduct(event, rowIndex)} className="w-full px-4 py-2 border rounded-md outline-none" required />
            </div>
        )
    }

    const DiscAmount = (rowData, rowIndex) => {
        return (
            <div>
                <input type="number" name="Disc_Amount" defaultValue={rowData?.Disc_Amount} onChange={(event) => handlechangeProduct(event, rowIndex)} className="w-full px-4 py-2 border rounded-md outline-none" required />
            </div>
        )
    }

    const Disc = (rowData, rowIndex) => {
        return (
            <div>
                <input type="number" name="Discount" value={rowData?.Discount} onChange={(event) => handlechangeProduct(event, rowIndex)} className="w-full px-4 py-2 border rounded-md outline-none" required />
            </div>
        )
    }

    const Tax_Percentage = (rowData, rowIndex) => {
        return (
            <div>
                <input type="number" name="Tax_Percentage" value={rowData?.Tax_Percentage} onChange={(event) => handlechangeProduct(event, rowIndex)} className="w-full px-4 py-2 border rounded-md outline-none" required />
            </div>
        )
    }

    const Price = (rowData, rowIndex) => {
        return (
            <div>
                <input type="number" name="Price" value={rowData?.Price} onChange={(event) => handlechangeProduct(event, rowIndex)} className="w-full px-4 py-2 border rounded-md outline-none" required />
            </div>
        )
    }

    const Amount = (rowData, rowIndex) => {
        return (
            <div>
                <input type="number" name="Amount" value={rowData?.Amount} onChange={(event) => handlechangeProduct(event, rowIndex)} className="w-full px-4 py-2 border rounded-md outline-none" required />
            </div>
        )
    }

    const sno = (rowData, rowIndex) => {
        return (
            <div>
                {rowIndex['rowIndex'] + 1}
            </div>
        )
    }

    const action = (rowData, rowIndex) => {
        return (
            <div className='flex'>
                <button type='button' onClick={(event) => handledeleteField(event, rowIndex)} className="inline-flex items-center me-3 text-xl font-medium text-red-600 gap-x-1 decoration-2" >
                    <i className="fi fi-rr-trash"></i>
                </button>
            </div>
        )
    }

    return (
        <Dialog header={formdata?._id ? "Purchase Update" : "Purchase Add"} visible={visible} onHide={() => setVisible(false)} className="!w-full lg:!w-[95vw]" maximizable>
            <form onSubmit={formdata?._id ? handleupdate : handlesave}>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-12 mb-3">
                    <div className='col-span-9'>
                        <div className="grid grid-cols-1 gap-2 md:grid-cols-4 items-end">
                            <div>
                                <label className="block mb-2 text-sm font-medium dark:text-white">Organization Name<span className='text-red-500'>*</span></label>
                                <input type="text" name="Organization_Name" value={formdata?.Organization_Name} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium dark:text-white">Address <span className='text-red-500'>*</span></label>
                                <input type="text" name="Address" value={formdata?.Address} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium dark:text-white">City <span className='text-red-500'>*</span></label>
                                <input type="text" name="City" value={formdata?.City} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium dark:text-white">State <span className='text-red-500'>*</span></label>
                                <input type="text" name="State" value={formdata?.State} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium dark:text-white">Country <span className='text-red-500'>*</span></label>
                                <input type="text" name="Country" value={formdata?.Country} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium dark:text-white">Zipcode <span className='text-red-500'>*</span></label>
                                <input type="number" name="Zipcode" value={formdata?.Zipcode} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium dark:text-white">Mobile Number</label>
                                <input type="text" name="Mobilenumber" value={formdata?.Mobilenumber} pattern="\d{10}" onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" />
                                {/* <input type="number" name="Mobilenumber" id="Mobilenumber" value={formdata?.Mobilenumber} onChange={(event) => handleAutoChange(event)} autoComplete="off" className="w-full px-4 py-2 border rounded-md outline-none" />
                                { ClientData&&ClientData.length > 0 &&
                                    <ul className="hs-dropdown-menu transition-[opacity,margin] absolute z-[2] duration min-w-60 bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full">
                                        {ClientData.map((result, index) => (
                                            <li role='button' onClick={() => loadClient(index)} key={index} className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700" href="#">
                                                {result['Mobilenumber'] +' - '+ result['First_Name']}
                                            </li>
                                        ))}
                                    </ul>
                                } */}
                            </div>
                        </div>
                    </div>
                    <div className='justify-end col-span-3 md:flex'>
                        <div>
                            <div>
                                <label className="block mb-2 text-sm font-medium dark:text-white">Invoice ID <span className='text-red-500'>*</span></label>
                                <input type="text" name="Invoice_ID" value={formdata?.Invoice_ID} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium dark:text-white">Order Date <span className='text-red-500'>*</span></label>
                                <input type="date" name="Order_Date" value={formdata?.Order_Date} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <DataTable value={formdata['PurchaseMaster']} showGridlines>
                        <Column header="S.No" body={sno} style={{ minWidth: '50px' }} />
                        <Column header="Product" body={Product_Name} style={{ minWidth: '200px' }} />
                        <Column header="Brand" body={Brand_Name} style={{ minWidth: '200px' }} />
                        <Column header="QTY" body={QTY} style={{ minWidth: '130px' }} />
                        <Column header="Price" body={Price} style={{ minWidth: '100px' }} />
                        <Column header="Disc%" body={Disc} style={{ minWidth: '100px' }} />
                        {/* <Column header="Tax%" body={Tax_Percentage} style={{ minWidth: '100px' }} />
                        <Column header="Disc" body={DiscAmount} style={{ minWidth: '100px' }} />
                        <Column header="Taxable Amount" body={Amount} style={{ minWidth: '130px' }} />
                        <Column header="#" body={action} style={{ minWidth: '80px' }} /> */}
                    </DataTable>
                </div>
                <div className="flex justify-between mt-3">
                    <button onClick={addRow} type='button'><i className="fi fi-rr-plus"></i> Add Row</button>
                    <div>QTY : {formdata?.Total_Quantity}</div>
                    <div>Total : {formdata?.Total_Amount}</div>
                </div>
                <div className="mt-2 text-center">
                    <button type="submit" className=" px-4 py-2 text-white bg-primary border rounded-md" >
                        {loading && <span className="animate-spin text-xl inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>} {formdata._id ? "Update" : "Save"}
                    </button>
                </div>
            </form>
        </Dialog>
    )
}
