export default function Dashboardcard() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div className="relative p-5 overflow-hidden border border-b-3 border-b-primary rounded-xl">
        <div className="flex items-center justify-center mb-5 border rounded-full shadow size-12 bg-slate-100">
          <i className="mt-2 text-2xl text-primary fi fi-sr-user-tag"></i>
        </div>
        <div>
          <h1 className="text-xl font-semibold">30</h1>
          <h3 className="text-sm">No of Customers</h3>
        </div>
      </div>
      <div className="relative p-5 overflow-hidden border border-b-3 border-b-primary rounded-xl">
        <div className="flex items-center justify-center mb-5 border rounded-full shadow size-12 bg-slate-100">
          <i className="mt-2 text-2xl text-primary fi fi-sr-inbox-in"></i>
        </div>
        <div>
          <h1 className="text-xl font-semibold">250</h1>
          <h3 className="text-sm">Orders Received</h3>
        </div>
      </div>
      <div className="relative p-5 overflow-hidden border border-b-3 border-b-primary rounded-xl">
        <div className="flex items-center justify-center mb-5 border rounded-full shadow size-12 bg-slate-100">
          <i className="mt-2 text-2xl text-primary fi fi-ss-process"></i>
        </div>
        <div>
          <h1 className="text-xl font-semibold">150</h1>
          <h3 className="text-sm">Order Processing</h3>
        </div>
      </div>
      <div className="relative p-5 overflow-hidden border border-b-3 border-b-primary rounded-xl">
        <div className="flex items-center justify-center mb-5 border rounded-full shadow size-12 bg-slate-100">
          <i className="mt-2 text-2xl text-primary fi fi-ss-shipping-fast"></i>
        </div>
        <div>
          <h1 className="text-xl font-semibold">30</h1>
          <h3 className="text-sm">Total Delivery</h3>
        </div>
      </div>
    </div>
  )
}
