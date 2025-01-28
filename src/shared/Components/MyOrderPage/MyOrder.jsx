
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OrderReviewModal from './OrderReviewModal';


function MyOrder({dropdownRef, toggleDropdown, isLastOpen, activeStatus, orderDetails = [], downloadPDF, downloadingPDF, viewProducts, viewReorderProducts,
  onRatingChange, onReviewTextChange, onImageUpload, onSubmitReview, orderReviews, orderReviewImages
}) {
  const [selectedTimeRange, setSelectedTimeRange] = useState('Last 30 days');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filterOrdersByTimeRange = (orders) => {
    const now = new Date();
    return orders.filter(order => {
      const orderDate = new Date(order.Order_Date);
      const diffInDays = (now - orderDate) / (1000 * 60 * 60 * 24);

      switch (selectedTimeRange) {
        case 'Last 30 days':
          return diffInDays <= 30;
        case 'Last 6 months':
          return diffInDays <= 180;
        case 'Last year':
          return diffInDays <= 365;
        default:
          return true;
      }
    });
  };

  const ordersData = {
    All: filterOrdersByTimeRange(orderDetails),
    Pending: filterOrdersByTimeRange(orderDetails).filter(order => order.Order_Status === "Payment Pending"),
    Delivered: filterOrdersByTimeRange(orderDetails).filter(order => order.Order_Status === "Order Delivered"),
    Dispatched: filterOrdersByTimeRange(orderDetails).filter(order => order.Order_Status === "Order Dispatched"),
    Cancelled: filterOrdersByTimeRange(orderDetails).filter(order => order.Order_Status === "Order Cancelled"),
  };

  const currentOrders = ordersData[activeStatus] || [];
  const hasOrders = currentOrders.length > 0;

  // Handle time range selection
  const handleTimeRangeSelect = (range) => {
    setSelectedTimeRange(range);
    toggleDropdown(); // Close dropdown after selection
  };

  return (
    <>
      <section className="md:my-10">
        <div className="px-4">
          <div className="my-5">
            <div className="flex items-center gap-3">
              <Link to="/profile">
                <i className="block mt-1 fi fi-rr-angle-left lg:hidden"></i>
              </Link>
              <h2 className="text-lg font-semibold md:text-2xl">My orders</h2>
            </div>
            <div className="relative flex items-center gap-2" ref={dropdownRef}>
              <p className="mt-2 text-xs md:text-base">
                {currentOrders.length} Order{currentOrders.length !== 1 ? 's' : ''} Placed In
              </p>
              <button onClick={toggleDropdown} className="flex items-center gap-3 bg-[#FFF6F4] dark:bg-gray-500 text-black px-3 py-1 mt-2 rounded-md" >
                <i className="mt-1 fi fi-sr-clock"></i>
                <p className="text-xs md:text-base dark:text-white">{selectedTimeRange}</p>
                <i className="fi fi-rr-angle-small-down"></i>
              </button>
              {isLastOpen && (
                <div className="absolute z-10 w-48 bg-white border border-gray-200 rounded-md shadow-lg dark:bg-gray-600 lg:left-36 md:left-28 top-10">
                  <ul className="py-1">
                    {['Last 30 days', 'Last 6 months', 'Last year'].map((range) => (
                      <li key={range} onClick={() => handleTimeRangeSelect(range)} className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-400" >
                        {range}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="border border-gray-300 rounded-lg min-h-[500px] overflow-auto ">
            {hasOrders ? (
              <div className="p-4 ">
                {currentOrders.map((order) => (
                  <div
                    key={order.Order_id}
                    className="mb-6 overflow-hidden transition-shadow duration-300 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md "
                  >
                    {/* Order Header */}
                    <div className="items-center justify-between block p-4 border-b md:flex flex-warp bg-gray-50 dark:bg-gray-700">
                      <div className="items-center block gap-4 md:flex">
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-500 dark:text-white">Order Placed</span>
                          <span className="font-medium">{formatDate(order.Order_Date)}</span>
                        </div>
                        <div className="w-px h-8 bg-gray-300"></div>
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-500 dark:text-white">Order ID</span>
                          <span className="font-medium">#{order.Order_id}</span>
                        </div>
                        <div className="w-px h-8 bg-gray-300"></div>
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-500 dark:text-white">Purchase Type</span>
                          <span className="px-2 py-1 font-medium bg-green-300 rounded-2xl bg-opacity-40">#{order.purchaseType}</span>
                        </div>
                        <div className="w-px h-8 bg-gray-300"></div>
                        <div className=''>
                          <button className='p-2 text-sm font-semibold text-white bg-red-500 rounded-3xl' onClick={() => viewReorderProducts(order?.Order_id)}>Reorder</button>
                        </div>
                      </div>
                      <div className='flex gap-4 mt-2 md:mt-0'>
                        <button title="Download PDF" onClick={() => downloadPDF(order.Order_id)} className="flex items-center px-3 py-1 text-red-600 border border-red-200 rounded-full hover:bg-red-50"
                          disabled={downloadingPDF[order.Order_id]}
                        >
                          {downloadingPDF[order.Order_id] ? (
                            <i className="mr-2 fa-solid fa-spinner animate-spin"></i>
                          ) : (
                            <i className="mr-2 text-red-500 fi fi-rr-file-pdf"></i>
                          )}
                          <span className="text-sm">Invoice</span>
                        </button>
                        <button
                          onClick={() => viewProducts(order?.Order_id)}
                          className="flex items-center px-3 py-1 text-green-600 border border-green-200 rounded-full hover:bg-green-50"
                        >
                          <i className="mr-2 fi fi-rr-shopping-bag"></i>
                          <span className="text-sm">View Products</span>
                        </button>
                      </div>
                    </div>

                    {/* Order Content */}
                    <div className="p-4 dark:bg-gray-600">
                      <div className="grid gap-6 md:grid-cols-3">
                        {/* Status and Amount */}
                        <div className="md:col-span-1">
                          <div className="flex flex-col gap-2">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm w-fit font-semibold ${order.Order_Status === "Payment Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : order.Order_Status === "Delivered"
                                  ? "bg-green-100 text-green-800"
                                  : order.Order_Status === "Cancelled"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-blue-100 text-blue-800"
                              }`}>
                              <span className="w-2 h-2 mr-2 bg-current rounded-full"></span>
                              {order.Order_Status}
                            </span>
                            <div className="mt-2">
                              <span className="text-lg font-semibold text-[#540045] dark:text-white"> ${Number(order.Total_Amount || 0).toFixed(2)}
                              </span>
                              <p className="text-sm text-gray-500 dark:text-white">Total Amount</p>
                            </div>
                          </div>
                        </div>

                        {/* Delivery Details */}
                        <div className="md:col-span-1">
                          <h4 className="mb-2 text-sm font-medium text-gray-500 dark:text-white">DELIVERY DETAILS</h4>
                          <div className="space-y-1">
                            <p className="font-medium dark:text-white">{order.Billing_Name}</p>
                            <p className="text-sm text-gray-600 dark:text-white">{order.Delivery_Address}</p>
                            <p className="text-sm text-gray-600 dark:text-white">{order.Mobilenumber}</p>
                          </div>
                        </div>

                        {/* Payment Info */}
                        <div className="md:col-span-1">
                          <h4 className="mb-2 text-sm font-medium text-gray-500 dark:text-white">PAYMENT INFO</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600 dark:text-white">Invoice ID</span>
                              <span className="text-sm font-medium">{order.Invoice_ID}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600 dark:text-white">Payment Status</span>
                              <span className="text-sm font-medium">{order.Payment_Status}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600 dark:text-white">Shipping Cost</span>
                              <span className="text-sm font-medium">${order.Shipping_Cost}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Order Footer with Review Button */}
                    {/* <div className="p-4 border-t bg-gray-50 dark:bg-gray-700">
                      <div className="flex justify-end">
                        <OrderReviewModal
                          order={order}
                          onRatingChange={onRatingChange || (() => { })}
                          onReviewTextChange={onReviewTextChange || (() => { })}
                          onImageUpload={onImageUpload || (() => { })}
                          onSubmit={onSubmitReview || (() => { })}
                          orderReviews={orderReviews || {}}
                          orderReviewImages={orderReviewImages || {}}
                        />
                      </div>
                    </div> */}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[500px]">
                <p className="mb-2 text-lg text-gray-500 dark:text-white">No {activeStatus.toLowerCase()} orders to show</p>
                <Link to="/">
                  <button className="bg-[#540045] text-white px-4 py-2 rounded-md">Start shopping</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default MyOrder;