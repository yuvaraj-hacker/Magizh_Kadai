import { form } from 'framer-motion/m';
import { Dialog } from 'primereact/dialog';

export default function Addandeditform(props) {
    const { visible, setVisible, handlesave, handlechange, loading, formdata, handleupdate } = props;
    return (
        <Dialog header="Product Details" visible={visible} onHide={() => setVisible(false)} className="!w-full lg:!w-[40rem]">
            <form onSubmit={ handleupdate }>
                <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                    <div className="mb-2">
                        <div className="mb-2">
                            <label>Payment Status</label>
                        </div>
                        <select name="Payment_Status" value={formdata?.Payment_Status} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required >
                            <option value="" >Select a status</option>
                            <option value="Not Paid">Not Paid</option>
                            <option value="Paid">Paid</option>
                        </select>
                    </div>
                    <div className="mb-2">
                        <div className="mb-2">
                            <label>Order Status</label>
                        </div>
                        <select name="Order_Status" value={formdata?.Order_Status} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required >
                            <option value="" >Select a status</option>
                            <option value="Payment Pending">Payment Pending</option>
                            <option value="Payment Confirmed">Payment Confirmed</option>
                            <option value="Order Placed">Order Placed</option>
                            <option value="Order Processing">Order Processing</option>
                            <option value="Order Dispatched">Order Dispatched</option>
                            <option value="Order Delivered">Order Delivered</option>
                            <option value="Order Returned">Order Returned</option>
                            <option value="Order Cancel">Order Cancel</option>
                            <option value="Order Replacement">Order Replacement</option>
                        </select>
                    </div>
                </div>
                <div className="mb-2">
                    <button type="submit" className="w-full px-4 py-2 text-white bg-green-400 border rounded-md" >
                        {loading && <span className="animate-spin text-xl inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>}  {formdata._id ? "Update":"Save" }
                    </button>
                </div>
            </form>
        </Dialog>
    )
}
