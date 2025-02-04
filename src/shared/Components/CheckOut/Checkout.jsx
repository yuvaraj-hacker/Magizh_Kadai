import { Button } from "@nextui-org/react";
import { div } from "framer-motion/m";
import { Link } from "react-router-dom";

export default function Checkout(props) {
    const {
        handlePaymentChange, purchaseType, selectedPaymentmethod, handlePlaceOrder, shippingdata, Openform, handleEditAddress, handleDeleteAddress, setSelectedAddress,
        selectedAddress, setIsDetailsOpen, setIsPaymentOpen, isDetailsOpen, detailsRef, couponRef, couponOpen, isCouponOpen, paymentRef, isPaymentOpen, cartItems, FeesandTax,
        Total, finaltotal, loading, overallDiscountPercentage, discountAmount, finalPaymentAmount, deliveryFee
    } = props


    return (
        <>
            <section className=' max-w-[90rem] mx-auto   min-h-[60vh]'>
                <div className="flex flex-col gap-6 p-4 lg:flex-row lg:p-8 relative">
                    <div className='flex-1 space-y-6'>
                        <div className="space-y-4">
                            <div className=' dark:bg-gray-700'>
                                <div className="bg-gray-100 rounded-md">
                                    <div className="flex items-center justify-between  p-3 cursor-pointer   " onClick={() => setIsDetailsOpen(!isDetailsOpen)}>
                                        <h2 className="text-sm font-semibold md:text-base text-gray-700">{purchaseType === 'pickup' ? 'Pickup Address' : 'Shipping Address'}</h2>
                                        <div className="rounded-full">
                                            {isDetailsOpen ? <i className="text-sm text-primary fi fi-rs-angle-down"></i> : <i className="text-sm text-primary fi fi-rr-angle-up"></i>}
                                        </div>
                                    </div>
                                    <div ref={detailsRef} className={`transition-height     ${isDetailsOpen ? 'h-0 ' : 'h-auto'}`}
                                        style={{ height: isDetailsOpen ? ` ` : '${paymentRef.current.scrollHeight}px' }}>
                                        <div className="px-3 space-y-4 ">
                                            {shippingdata && shippingdata.length > 0 ? (
                                                <>
                                                    {shippingdata.map((address, index) => (
                                                        <div role="button" key={index} onClick={() => setSelectedAddress(address)} className={`flex items-center bg-white justify-between rounded-md gap-2 p-4 w-full    ${selectedAddress?._id === address._id ? 'bg-gray-400 border  border-secondary' : ' bg-gray-400 border '}`} >
                                                            <div className="flex items-center">
                                                                <div className="p-2  rounded-full">
                                                                    <i class="fi fi-bs-marker"></i>
                                                                </div>
                                                                <div className="ml-3">
                                                                    <p className="font-semibold dark:text-white">{address.First_Name} {address.Last_Name}</p>
                                                                    <p className="dark:text-white">
                                                                        {address.Address}, {address.City}, {address.State}, {address.Country}, {address.Zipcode}.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="flex gap-2">
                                                                <div className=" cursor-pointer hover:scale-105" onClick={(e) => { e.stopPropagation(); handleEditAddress(address); }} >
                                                                    <i className="fi fi-rr-pen-circle dark:text-black"></i>
                                                                </div>
                                                                <div className=" cursor-pointer hover:scale-105" onClick={(e) => { e.stopPropagation(); handleDeleteAddress(address._id); }}  >
                                                                    <i className="fi fi-rr-trash dark:text-black"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </>
                                            ) : (
                                                <div className="py-6 text-center rounded-lg bg-gray-50">
                                                    <p className="text-gray-500 dark:text-black">No addresses available</p>
                                                </div>
                                            )}

                                        </div>
                                        {/* {purchaseType === 'delivery' && <button className="mt-2 px-3 py-2 bg-[#2E1216] md:text-base text-sm text-white rounded-md" onClick={Openform}> + Add  Address</button>} */}
                                        <div className="py-5 text-end">
                                            <button className=" text-primary md:text-base text-sm  px-3" onClick={Openform}> + Add  Address</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=" dark:bg-gray-700 bg-gray-100 rounded-md">
                                <div className="flex items-center justify-between cursor-pointer  p-3" onClick={() => setIsPaymentOpen(!isPaymentOpen)}>
                                    <h2 className="text-sm font-semibold md:text-base">Payment Method</h2>
                                    <div className=" ">
                                        {isPaymentOpen ? <i className="text-primary fi fi-rs-angle-down"></i> : <i className="text-primary fi fi-rr-angle-up"></i>}
                                    </div>
                                </div>
                                <div ref={paymentRef}
                                    className={`transition-height ${isPaymentOpen ? 'h-0 ' : 'h-auto'}`}
                                    style={{ height: isPaymentOpen ? `` : '${paymentRef.current.scrollHeight}px' }}>
                                    <div>
                                        {/* {purchaseType === 'delivery' && (
                                            <label className="flex items-center space-x-2">
                                                <input type="radio" name="paymentMethod" value="Cash on Delivery" checked={selectedPaymentmethod === 'Cash on Delivery'}
                                                    onChange={handlePaymentChange}
                                                    className="form-radio"
                                                />
                                                <span>Cash on Delivery</span>
                                            </label>
                                        )}
                                        {purchaseType === 'pickup' && (
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="Pay on Pickup"
                                                    checked={selectedPaymentmethod === 'Pay on Pickup'}
                                                    onChange={handlePaymentChange}
                                                    className="form-radio"
                                                />
                                                <span>Pay on Pickup</span>
                                            </label>
                                        )} */}

                                        {/* <label className="flex items-center space-x-2">
                                            <input type="radio" name="paymentMethod" value="Cash on Delivery" checked={selectedPaymentmethod === 'Cash on Delivery'}
                                                onChange={handlePaymentChange}
                                                className="form-radio"
                                            />
                                            <span>Cash on Delivery</span>
                                        </label> */}
                                    </div>
                                    <div className=" p-3 space-y-3">
                                        <label className="flex items-center space-x-2">
                                            <input type="radio" name="paymentMethod" value="Online Payment" checked={selectedPaymentmethod === 'Online Payment'} onChange={handlePaymentChange} className="form-radio" />
                                            <span>Pay Now</span>
                                        </label>
                                        <label className="flex items-center space-x-2">
                                            <input type="radio" name="paymentMethod" value="Cash on Delivery" checked={selectedPaymentmethod === 'Cash on Delivery'}
                                                onChange={handlePaymentChange}
                                                className="form-radio"
                                            />
                                            <span>Cash on Delivery</span>
                                        </label>
                                    </div>
                                    {/* <div>

                                        <label className="flex items-center space-x-2">
                                            <input type="radio" name="paymentMethod" value="Zelle" checked={selectedPaymentmethod === 'Zelle'} onChange={handlePaymentChange} className="form-radio" />
                                            <span>Zelle</span>
                                        </label>
                                    </div> */}
                                </div>
                            </div>
                            <div className=' flex justify-end mt-5 text-end  flex-col space-y-3'>
                                <p className='text-sm md:text-base '>Explore More Products ?
                                </p>
                                <div>
                                    <Link to='/products'> <button className='font-bold text-white p-3 text-sm rounded-3xl bg-primary'>Continue Shopping</button> </Link>
                                    {/* <p className="">${(
                                    Total * 1 +
                                    (purchaseType !== 'pickup' &&
                                        (finaltotal + (Total - finaltotal)) < FeesandTax?.Order_Price_Free_Delivery ?
                                        FeesandTax?.DeliveryFee * 1 :
                                        0
                                    )-
                                    discountAmount
                                )?.toFixed(2)}</p> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" max-w-[25rem] border p-4 rounded-md shadow-sm h-fit bg-gray-100 dark:bg-gray-700  sticky top-28">
                        {/* <button className="w-full py-2 font-semibold text-white bg-red-500 rounded-full" onClick={handleOpenElavonModal}>Place Order</button> */}
                        <div className=" space-y-2 ">
                            {/* <div className={`border-t-1 border-b-1  py-3  ${isCouponOpen ? ' space-y-2' : ''}`}>
                                <div className='flex justify-between '>
                                    <p className="text-[#6C6C6C] dark:text-white">Coupon</p>
                                    <button className="text-red-500 dark:text-red-200" onClick={couponOpen}>
                                        {isCouponOpen ? '- Remove coupon' : '+ Add coupon'}
                                    </button>
                                </div>
                                <div ref={couponRef}
                                    className={`transition-height space-y-4  ${isCouponOpen ? ' space-y-2 h-auto' : 'h-0'}`}
                                    style={{ height: isCouponOpen ? `${couponRef.current.scrollHeight}px` : '0px' }}>
                                    <div className='flex justify-between gap-2'>
                                        <input type="text" placeholder='Enter Coupon Code' className='p-2 border rounded-md focus:outline-[#00B75E] w-36 sm:w-auto' />
                                        <button className='bg-[#00B75E] px-2 rounded-md text-white text-sm' >Apply Coupon</button>
                                    </div>
                                </div>
                            </div> */}
                            <div>
                                <p className="text-[#6C6C6C] dark:text-white  ">Purchase Summary</p>
                            </div>
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between">
                                    <p className="text-[#6C6C6C] dark:text-white">Subtotal ({cartItems.length} items): </p>
                                    <p className="">₹{finaltotal.toFixed(2)}</p>
                                </div>

                                {Number(overallDiscountPercentage) > 0 && (
                                    <div className="flex items-center justify-between p-2 rounded-md bg-green-50 dark:bg-green-900">
                                        <div>
                                            <p className="font-semibold text-green-600 dark:text-green-400">
                                                Special Discount ({overallDiscountPercentage}% OFF)
                                            </p>
                                            <p className="text-xs text-green-500 dark:text-green-300">Limited time offer!</p>
                                        </div>
                                        <p className="font-semibold text-green-600 dark:text-green-400">-₹{discountAmount}</p>
                                    </div>
                                )}

                                {/* <div className="flex justify-between">
                                <p className="text-[#6C6C6C] dark:text-white">Taxes:</p>
                                <p className="">₹{(Total - finaltotal)?.toFixed(2) || 0.00}</p>
                            </div> */}

                                {/* {purchaseType !== 'pickup' && (
                                <div className="flex justify-between">
                                <p className="text-[#6C6C6C] dark:text-white">
                                    Delivery fee:
                                    {finaltotal - discountAmount >= FeesandTax?.Order_Price_Free_Delivery && (
                                        <span className="ml-1 text-xs text-green-500">
                                            (Free over ₹{FeesandTax?.Order_Price_Free_Delivery})
                                        </span>
                                    )}
                                </p>
                                <p className="">
                                    {deliveryFee === 0 ? "FREE" : `$${deliveryFee}`}
                                </p>
                            </div>
                            )} */}

                                {/* <div className="flex justify-between">
                        <p className="font-semibold">Total: </p>
                        <p className="">
                            ${purchaseType === 'pickup'
                            ? (Number(Total) - discountAmount).toFixed(2)
                            : (Number(Total) +
                                (Number(TotalValue) >= Number(FeesandTax?.Order_Price_Free_Delivery)
                                    ? 0
                                    : Number(FeesandTax?.DeliveryFee)) -
                                discountAmount).toFixed(2)
                            }
                        </p>
                        </div> */}
                                <hr />
                                <div className="flex justify-between">
                                    <p className="font-semibold">Final Payment Amount </p>
                                    <p className="">
                                        ₹{finalPaymentAmount}
                                    </p>
                                </div>
                            </div>
                            {/* <p className="text-xs  mt-4 text-[#6C6C6C] dark:text-white">To guarantee the quality of your food, please store food indoors or refrigerate if needed.</p> */}
                            <p className="text-xs  text-[#6C6C6C] dark:text-white" >By placing this order, you are agreeing to Magizh Kadai Terms and Conditions.</p>
                            <button className="flex items-center justify-center w-full py-2 gap-2  font-semibold text-white bg-primary   rounded-3xl"
                                onClick={handlePlaceOrder}
                                disabled={loading}  >
                                {loading ? 'Placing Order...' : 'Place Order'}
                                {loading ? (
                                    <i className="mr-2 fa-solid fa-spinner animate-spin"></i>
                                ) : (
                                    // <i className="mr-2 flex items-center   text-red-500 fi fi-rr-file-pdf"></i>
                                    <>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </section >
        </>
    );
}
