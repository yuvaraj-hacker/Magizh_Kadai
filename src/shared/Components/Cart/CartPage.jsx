import { Minus, Plus, ShoppingCart } from "lucide-react";
import apiurl from "../../services/apiendpoint/apiendpoint";
import RegisterContinueGoogle from "../Register-ContiGoogle/RegisterContiGoogle";
import { Link } from "react-router-dom";
import DeliveryDate from "../Header/DeliveryDate";
import PickupTimeModal from "../Header/PickupTimeModal";

export default function CartPage(props) {
  const { cartItems, renderDeliveryPrompt, deliveryType, handleDeliveryTypeChange, handleDeliveryDateClick, formattedDate, formattedPickupTime, navigate, updatingItems,
    handleQuantityChange, handleRemoveItem, subtotal, totalDiscount, goToCheckout, finalTotal, timevisible, setTimevisible, handlePickupTimeChange, isPickupTimeSelected,
    datevisible, setDatevisible, thisWeekDates, nextWeekDates, handleDateClick, isSelected, showLoginModal, setShowLoginModal, checkoutlogin,
  } = props;

  return (
    <>
      {cartItems.length === 0 ? (
        <div className="px-5   ">
          <div className="flex flex-col items-center justify-center rounded-lg min-h-[60vh] my-5 ">
            <div className="text-center">
              <div className="mb-2 text-gray-400">
                <i className="fi fi-bs-person-dolly-empty text-2xl"></i>
              </div>
              <p className="mb-2 text-lg text-gray-500 dark:text-white">No cart Items To Show</p>
              <Link to="/products">
                <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors">Find Your Favourites</button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-[100rem] mx-auto md:px-5 md:my-10 my-5 min-h-[60vh]">
          <div className="grid grid-cols-1 ">
            {/* <div className="flex items-center justify-between max-w-2xl p-2 mb-5 shadow-lg lg:p-4 bg-gradient-to-r from-primary/70 to-primary rounded-2xl">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white rounded-full">
                <ShoppingCart size={24} className="text-orange-700" />
              </div>
              <div>
                <p className="text-lg font-bold text-gray-100">Free Delivery</p>
                <p className="text-sm text-gray-300 ">On orders of ₹35 or more</p>
              </div>
            </div>
            <Link to="/">
              <button className="flex items-center px-6 py-2 space-x-2 transition-colors duration-300 bg-secondary border-black border text-black rounded-full hover:bg-orange-700 group">
                <span className="text-sm lg:text-lg font-semibold">Shop Now</span>
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </button>
            </Link>
          </div> */}
            {/* {renderDeliveryPrompt()} */}
            <div className="grid xl:grid-cols-12  items-start   relative gap-5">
              <div className="xl:col-span-9 space-y-4">
                <div className=" border rounded-md  bg-gray-50 ">
                  <div className="md:text-2xl text-center text-base text-white py-4 rounded-t-md bg-primary">Your Cart ({cartItems.length} items)</div>
                  <div className=" space-y-2 p-2 ">
                    {/* <div className="justify-between lg:flex">
                     <div className="flex gap-3">
                    <i className="inline-flex items-center justify-center w-5 h-5 p-5 mt-2 rounded-full fi fi-rs-shipping-timed bg-danger-50 dark:bg-gray-500"></i>
                    <div className="space-y-2">
                      <p className="font-bold">Delivery Options</p>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <input type="radio" name="deliveryType" id="pickup" value="pickup" checked={deliveryType === "pickup"} onChange={() => handleDeliveryTypeChange("pickup")}
                            className="form-radio text-primary"
                          />
                          <label htmlFor="pickup" className="ml-2 text-sm font-semibold">Pickup</label>
                        </div>

                        <div className="flex items-center">
                          <input type="radio" name="deliveryType" id="delivery" value="delivery" checked={deliveryType === "delivery"}
                            onChange={() => handleDeliveryTypeChange("delivery") } className="form-radio text-primary"
                          />
                          <label htmlFor="delivery" className="ml-2 text-sm font-semibold">Delivery</label>
                        </div>
                      </div>
                    </div>
                   </div>
                   <div className="mt-5 space-y-1 lg:text-end lg:mt-0">
                    {deliveryType === "delivery" && (
                      <p>
                        <span className="font-bold" onClick={handleDeliveryDateClick} >
                          <span className="px-2 py-1 font-bold bg-yellow-200 rounded-md cursor-pointer lg:px-4 lg:py-2 dark:bg-yellow-600">
                            Choose your delivery date
                          </span>
                          :{" "}
                        </span>
                        {formattedDate}
                      </p>
                    )}
                    {deliveryType === "pickup" && (
                      <p>
                        <span className="font-bold" onClick={handleDeliveryDateClick} >
                          <span className="px-2 py-1 font-bold bg-yellow-200 rounded-md cursor-pointer lg:px-4 lg:py-2 dark:bg-yellow-600">
                            Choose your Pickup Time
                          </span>
                          :{" "}
                        </span>
                        {formattedPickupTime}
                      </p>
                    )}
                    <p>
                      <span className="text-gray-400">
                        {cartItems.length} items total
                      </span>
                    </p>
                    {/* {deliveryType === 'delivery' && (
                                    <p><span className="text-gray-400">Delivery fee <s>$6.95</s></span> ${deliveryFee?.toFixed(2)}</p>
                                )} */}
                    {/* {deliveryType === 'pickup' && (
                                <p><span className="text-gray-400">Delivery fee <s>$6.95</s></span> ${deliveryFee.toFixed(2)}</p>
                            )} */}
                    {/*   </div>
                   </div> */}

                    {cartItems
                      .filter(
                        (item) =>
                          item.productId?.Category !==
                          "Fresh Flowers & Leaves" &&
                          item.Category !== "Fresh Flowers & Leaves"
                      )
                      .map((item) => (
                        <div key={item._id} className=" ">
                          <div className="bg-white p-2  rounded-md ">
                            <div className="flex justify-end">
                              {/* <button className="flex items-center gap-2 text-gray-500">  <i className="flex items-center fi fi-rs-bookmark"></i> <span>
                                </span></button> */}
                              <button className={`  text-third   flex items-center gap-2 ${updatingItems.has(item._id) ? "opacity-50 cursor-not-allowed" : ""}`} onClick={() => !updatingItems.has(item._id) && handleRemoveItem(item._id)}
                                disabled={updatingItems.has(item._id)}  >
                                <i className="fi fi-sr-trash text-2xl"></i>{" "}
                                {/* <span className="hidden md:block dark:text-red-400"> Remove </span> */}
                              </button>
                            </div>
                            <div className=" grid 2xl:grid-cols-4 grid-cols-1 gap-4">
                              <div className="flex gap-3 col-span-3 flex-wrap md:flex-nowrap">
                                <div className=" min-w-28">
                                  <img src={`${apiurl()}/${item?.productId?.Images[0] || item?.Images[0]}`} alt={item.productId?.Product_Name || item?.Product_Name} className="object-cover w-32 cursor-pointer h-28 rounded-xl" onClick={() => navigate(`/product-details/${item.productId?._id || item._id}`)} />
                                </div>
                                <div className="space-y-2">
                                  <h3 className="text-sm font-medium md:text-lg dark:text-white line-clamp-1">
                                    {item.productId?.Product_Name || item.Product_Name}
                                  </h3>
                                  <div className="flex items-center gap-3">
                                    {item.productId?.Discount > 0 ||
                                      item.Discount > 0 ? (
                                      <>
                                        <h3 className="text-sm font-semibold text-primary md:text-lg dark:text-white">
                                          ₹
                                          {(
                                            item.productId?.Sale_Price *
                                            (1 - item.productId?.Discount / 100) || item.Sale_Price *
                                            (1 - item.Discount / 100)
                                          ).toFixed(2)}
                                        </h3>
                                        <span className="text-xs   text-third line-through dark:text-white"> ₹
                                          {item.productId?.Sale_Price?.toFixed(2) || item.Sale_Price?.toFixed(2)}
                                        </span>
                                        <span className="text-xs font-semibold text-white bg-secondary rounded-3xl px-2 py-1 dark:text-white">
                                          {(item.productId?.Discount || item.Discount) && (
                                            <>
                                              {Math.round(item.productId?.Discount || item.Discount)}% off
                                            </>
                                          )}
                                        </span>
                                      </>
                                    ) : (
                                      <h3 className="text-sm font-semibold text-black md:text-lg dark:text-white">
                                        ₹
                                        {item.productId?.Sale_Price?.toFixed(2) || item.Sale_Price?.toFixed(2)}
                                      </h3>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-10 col-span-1">
                                <div className="flex items-center gap-3 border rounded-lg shadow-sm">
                                  <button
                                    className={`text-gray-500 hover:text-gray-700 p-2   hover:bg-gray-200  bg-gray-100 dark:hover:text-black ${updatingItems.has(item._id) ? "opacity-50 cursor-not-allowed" : ""}`}
                                    onClick={() => !updatingItems.has(item._id) && handleQuantityChange(item._id, "decrease")} disabled={updatingItems.has(item._id)}  >
                                    {item.Quantity == 1 ? (
                                      <i className="fi fi-sr-trash  flex items-center text-third "></i>
                                    ) : (
                                      <Minus size={16} className="dark:text-white dark:hover:text-black" />
                                    )}
                                  </button>
                                  <span className="w-8 text-center">
                                    {updatingItems.has(item._id)
                                      ? "..."
                                      : item.Quantity}
                                  </span>
                                  <button
                                    onClick={() =>
                                      !updatingItems.has(item._id) &&
                                      handleQuantityChange(item._id, "increase")
                                    }
                                    disabled={
                                      (updatingItems.has(item._id) ||
                                        !updatingItems.has(item._id)) &&
                                      (item?.Quantity >= item.productId?.QTY ||
                                        item?.Quantity >= item?.QTY)
                                    }
                                    className={`text-gray-500 hover:text-gray-700 p-2    hover:bg-gray-200  bg-gray-100 dark:hover:text-black ${updatingItems.has(item._id)
                                      ? "opacity-50 cursor-not-allowed"
                                      : ""
                                      }`}
                                  >
                                    <Plus size={16} className="dark:text-white dark:hover:text-black" />
                                  </button>
                                </div>
                                <div className="w-32 text-sm font-medium text-center md:text-lg">
                                  ₹
                                  {item.productId?.Discount || item.Discount > 0
                                    ? // Discounted price calculation
                                    (
                                      (item.productId?.Sale_Price
                                        ? item.productId.Sale_Price -
                                        (item.productId.Sale_Price *
                                          item.productId.Discount) /
                                        100
                                        : item.Sale_Price -
                                        (item.Sale_Price * item.Discount) /
                                        100) * (item.Quantity || 0)
                                    ).toFixed(2)
                                    : // Regular price calculation
                                    (
                                      (item.productId?.Sale_Price ||
                                        item.Sale_Price ||
                                        0) * (item.Quantity || 0)
                                    ).toFixed(2)}
                                </div>
                              </div>
                            </div>
                          </div>

                        </div>
                      ))}
                    {/* Flower Products Section */}
                    {cartItems.some(
                      (item) =>
                        item.productId?.Category ===
                        "Fresh Flowers & Leaves" ||
                        item.Category === "Fresh Flowers & Leaves") && (
                        <div className="p-4 mt-5 mb-6 border-2 border-pink-200 rounded-lg dark:border-zinc-400 bg-pink-50 dark:bg-zinc-500">
                          <div className="flex items-center mb-4">
                            <i className="mr-3 text-2xl text-pink-600 fi fi-rs-flower dark:text-pink-300"></i>
                            <h3 className="text-lg font-bold text-pink-800 dark:text-white">
                              Fresh Flowers & Leaves
                            </h3>
                          </div>

                          <div className="space-y-4">
                            <div className="p-3 bg-white rounded-lg shadow-sm">
                              <p className="mb-2 text-sm text-pink-700">
                                <strong>Special Delivery Note:</strong> Fresh flowers are delivered one week from order date.
                              </p>
                              <p className="text-xs text-gray-500">
                                We ensure the freshest flowers by scheduling delivery after careful preparation.
                              </p>
                            </div>
                          </div>

                          {cartItems
                            .filter((item) => {
                              const category = item.productId?.Category || item.Category;
                              return category === "Fresh Flowers & Leaves";
                            })
                            .map((item) => (
                              <div key={item._id} className="pt-4 mt-4 border-t">
                                <div className="flex flex-wrap items-center justify-between gap-5">
                                  <div className="flex gap-3">
                                    <div className="p-2 border rounded-lg shadow-md">
                                      <img src={`${apiurl()}/${item?.productId?.Images[0] || item?.Images[0]}`}
                                        alt={item.productId?.Product_Name || item?.Product_Name}
                                        className="object-cover w-32 rounded cursor-pointer h-28"
                                        onClick={() => navigate(`/product-details/${item.productId?._id || item._id}`)}
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <h3 className="text-base font-medium md:text-xl dark:text-white">
                                        {item.productId?.Product_Name || item.Product_Name}
                                      </h3>
                                      <div className="flex items-center gap-3">
                                        {item.productId?.Discount > 0 ||
                                          item.Discount > 0 ? (
                                          <>
                                            <h3 className="text-sm font-semibold text-green-600 md:text-lg">
                                              $
                                              {(item.productId?.Sale_Price * (1 - item.productId?.Discount / 100) || item.Sale_Price * (1 - item.Discount / 100)).toFixed(2)}
                                            </h3>
                                            <span className="text-sm text-gray-400 line-through">
                                              $ {item.productId?.Sale_Price?.toFixed(2) || item.Sale_Price?.toFixed(2)}
                                            </span>
                                            <span className="text-xs font-semibold text-white bg-[#F29D36] rounded-3xl px-2 py-1">
                                              {item.productId?.Discount ||
                                                item.Discount}
                                              % off
                                            </span>
                                          </>
                                        ) : (
                                          <h3 className="text-sm font-semibold text-black md:text-lg dark:text-white">
                                            $
                                            {item.productId?.Sale_Price?.toFixed(2) ||
                                              item.Sale_Price?.toFixed(2)}
                                          </h3>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-10">
                                    <div className="flex items-center gap-3 border rounded-lg shadow-sm">
                                      <button
                                        className={`text-gray-500 hover:text-gray-700  p-2 rounded-lg hover:bg-gray-100  ${updatingItems.has(item._id) ? "opacity-50 cursor-not-allowed" : ""}`}
                                        onClick={() => !updatingItems.has(item._id) && handleQuantityChange(item._id, "decrease")}
                                        disabled={updatingItems.has(item._id)} >
                                        {item.Quantity == 1 ? (
                                          <i className="fi fi-br-trash flex items-center text-[#CA2E43] hover:text-[#ca4557]"></i>
                                        ) : (
                                          <Minus size={16} className="dark:text-white dark:hover:text-black" />
                                        )}
                                      </button>
                                      <span className="w-8 text-center">
                                        {updatingItems.has(item._id) ? "..." : item.Quantity}
                                      </span>
                                      <button
                                        onClick={() =>
                                          !updatingItems.has(item._id) &&
                                          handleQuantityChange(item._id, "increase")
                                        }
                                        disabled={
                                          (updatingItems.has(item._id) ||
                                            !updatingItems.has(item._id)) &&
                                          (item?.Quantity >= item.productId?.QTY ||
                                            item?.Quantity >= item?.QTY)
                                        }
                                        className={`text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 ${updatingItems.has(item._id)
                                          ? "opacity-50 cursor-not-allowed"
                                          : ""
                                          }`}
                                      >
                                        <Plus size={16} className="dark:text-white dark:hover:text-black" />
                                      </button>
                                    </div>
                                    <div className="w-32 text-sm font-medium text-center md:text-lg">
                                      $
                                      {item.productId?.Discount > 0
                                        ? (
                                          (item.productId?.Sale_Price -
                                            (item.productId?.Sale_Price *
                                              item.productId?.Discount) /
                                            100) *
                                          item.Quantity
                                        ).toFixed(2)
                                        : (
                                          (item.productId?.Sale_Price ||
                                            item.Sale_Price ||
                                            0) * (item.Quantity || 0)
                                        ).toFixed(2)}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex justify-end gap-10 mt-3">
                                  <button className={`text-[#CA2E43] border p-1 rounded-lg hover:border-[#CA2E43] dark:hover:border-gray-400 flex items-center gap-2 ${updatingItems.has(item._id) ? "opacity-50 cursor-not-allowed" : ""}`}
                                    onClick={() => !updatingItems.has(item._id) && handleRemoveItem(item._id)}
                                    disabled={updatingItems.has(item._id)}
                                  >
                                    <i className="flex items-center fi fi-sr-circle-xmark dark:text-white"></i>
                                    <i className="fi fi-sr-circle-xmark text-xl text-red-600"></i>
                                    <span className="hidden md:block dark:text-white"> Remove </span>
                                  </button>
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                  </div>
                </div>
                <div className="w-full  sticky lg:bottom-0  bottom-[60px] bg-gray-100  p-4">
                  <div className="flex justify-between items-center">
                    <div className="font-bold md:text-base text-sm">
                      Subtotal ({cartItems.length} items) : ₹{finalTotal.toFixed(2)}
                    </div>
                    <div className="bg-primary p-2 cursor-pointer px-4  rounded-3xl md:text-base sm:text-sm text-xs text-white" onClick={goToCheckout}>
                      Proceed To Checkout
                    </div>
                  </div>
                </div>
              </div>
              <div className="xl:col-span-3  px-1  xl:sticky xl:top-28 h-fit space-y-4 ">
                <div className=" h-full bg-gray-100 rounded-md" >
                  <div>
                    <div className="p-3">
                      <div>
                        <p className="text-base font-semibold md:text-lg ">Price Details</p>
                        {/* <div className="xl:flex justify-between mt-3  ">
                          <p className="text-sm md:text-base">Items total</p>

                          <p className="text-xs md:text-sm">{cartItems.length}</p>
                        </div> */}
                        <hr className="mt-3 text-primary  " />
                        <div className="xl:flex justify-between mt-3 ">
                          <p className="text-sm md:text-base">Price</p>
                          <p className="text-xs md:text-sm"> ₹{subtotal?.toFixed(2)} </p>
                        </div>
                        <hr className="mt-3 " />
                        <div className="xl:flex justify-between mt-3 ">
                          <p className="text-sm md:text-base">Discount Price</p>
                          <p className="text-xs text-third md:text-sm">- ₹{totalDiscount.toFixed(2)} </p>
                        </div>
                        <hr className="mt-3 " />
                        {/* <div className="flex justify-between mt-3">
                                        <p className="text-sm md:text-base">Delivery fee</p>
                                        <p className="text-xs md:text-sm">${deliveryFee?.toFixed(2)}</p>
                                    </div> */}
                        <div className="flex justify-between xl:mt-3 font-bold">
                          <p className="text-sm md:text-base flex gap-1">Subtotal ({cartItems.length} items) <span className="xl:hidden block "> ({cartItems.length})</span></p>
                          <p className="text-primary">₹{finalTotal.toFixed(2)}</p>
                        </div>
                        <div className="text-center mt-3">
                          <Link to='/products'>
                            <button className="bg-primary md:text-base text-sm text-white rounded-3xl px-4 p-2">
                              Continue Shopping
                            </button>
                          </Link>
                        </div>
                        {/* <div className="flex items-center justify-end mt-3">
                          <button className="bg-primary hover:bg-secondary rounded-xl  text-white p-2 text-base px-3 font-semibold md:text-lg duration-300" onClick={goToCheckout}>
                            Checkout
                          </button>
                        </div> */}
                      </div>
                    </div>
                    {/* <div>
                    <Link to="/">
                      <div className="flex items-center justify-end">
                        <button className="p-1 px-3 mt-5 text-sm font-semibold text-white transition-colors bg-secondary hover:bg-[#ffc445] md:text-base">
                          Continue Shopping
                        </button>
                      </div>
                    </Link>
                  </div> */}
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      <PickupTimeModal timevisible={timevisible} setTimevisible={setTimevisible} handleTimeClick={handlePickupTimeChange} isSelected={isPickupTimeSelected} />

      <DeliveryDate datevisible={datevisible} setDatevisible={setDatevisible} thisWeekDates={thisWeekDates} nextWeekDates={nextWeekDates} handleDateClick={handleDateClick}
        isSelected={isSelected}
      />
      <RegisterContinueGoogle visible={showLoginModal} setVisible={setShowLoginModal} checkoutlogin={checkoutlogin} />
    </>
  );
}
