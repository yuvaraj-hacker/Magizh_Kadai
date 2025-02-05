
// // // import { Dialog } from "primereact/dialog";
// // // import apiurl from "../../services/apiendpoint/apiendpoint";
// import WriteProductReview from './WriteProductReview';

// // // export default function OrderItems(props) {
// // //   const {
// // //     ViewProduct,
// // //     setViewProduct,
// // //     ViewProductData = [],
// savedReviews,
// toggleReview,
// submitting,
// activeReviews,
// reviews,
// handleRatingChange,
// handleImageUpload,
// handleReviewTextChange,
// setSelectedImages,
// selectedImages,
// submitReview,
// setSavedReviews,
// // //   } = props;

// // //   // Calculate subtotal without tax or shipping
// // //   const calculateSubtotal = (items) => {
// // //     return items.reduce((total, item) => {
// // //       // Calculate original price before discount
// // //       const originalItemPrice = item.Sale_Price;

// // //       // Apply discount if exists
// // //       const discountedPrice = item.Discount > 0
// // //         ? originalItemPrice - (originalItemPrice * item.Discount / 100)
// // //         : originalItemPrice;

// // //       // Multiply by quantity
// // //       return total + (discountedPrice * item.Quantity);
// // //     }, 0);
// // //   };

// // //   // Calculate total discount
// // //   const calculateTotalDiscount = (items) => {
// // //     return items.reduce((totalDiscount, item) => {
// // //       const originalItemPrice = item.Sale_Price;
// // //       const discountAmount = item.Discount > 0
// // //         ? (originalItemPrice * item.Discount / 100) * item.Quantity
// // //         : 0;
// // //       return totalDiscount + discountAmount;
// // //     }, 0);
// // //   };

// // //   // Calculate total tax
// // //   const calculateTotalTax = (items) => {
// // //     return items.reduce((totalTax, item) => {
// // //       // If tax is applicable
// // //       if (item.Tax_Type === "Yes") {
// // //         // Calculate original price
// // //         const originalItemPrice = item.Sale_Price;

// // //         // Apply discount if exists
// // //         const discountedPrice = item.Discount > 0
// // //           ? originalItemPrice - (originalItemPrice * item.Discount / 100)
// // //           : originalItemPrice;

// // //         // Calculate tax on discounted price
// // //         const taxAmount = (discountedPrice * item.Quantity * parseFloat(item.Tax)) / 100;
// // //         return totalTax + taxAmount;
// // //       }
// // //       return totalTax;
// // //     }, 0);
// // //   };

// // //   // Get shipping cost (assuming it's available in the first item's order)
// // //   const shippingCost = ViewProductData.length > 0 ? parseFloat(ViewProductData[0].Shipping_Cost || 0) : 0;

// // //   return (
// // //     <Dialog
// // //       header="Order Items"
// // //       visible={ViewProduct}
// // //       onHide={() => setViewProduct(false)}
// // //       style={{ width: '50vw' }}
// // //       breakpoints={{ '960px': '75vw', '641px': '100vw' }}
// // //       maximizable
// // //       className="p-0"
// // //     >
// // //       <div className="flex flex-col">
// // //         <div className="grid grid-cols-12 gap-4 p-3 text-sm font-medium text-gray-600 border-b bg-gray-50">
// // //           <div className="col-span-5">Product</div>
// // //           <div className="col-span-2 text-center">Price</div>
// // //           <div className="col-span-2 text-center">Quantity</div>
// // //           <div className="col-span-3 text-right">Subtotal</div>
// // //         </div>

// // //         <div className="divide-y">
// // //           {ViewProductData && ViewProductData.length > 0 ? (
// // //             ViewProductData.map((item) => {
// // //               // Original price
// // //               const originalPrice = item.Sale_Price;

// // //               // Calculate discount
// // //               const discountPercentage = item.Discount || 0;
// // //               const discountAmount = originalPrice * (discountPercentage / 100);
// // //               const discountedPrice = originalPrice - discountAmount;

// // //               // Calculate subtotal
// // //               const itemSubtotal = discountedPrice * item.Quantity;

// // //               // Calculate tax
// // //               const taxAmount = item.Tax_Type === "Yes"
// // //                 ? (discountedPrice * item.Quantity * parseFloat(item.Tax)) / 100
// // //                 : 0;

// // //               return (
// // //                 <div key={item._id} className="p-4">
// // //                   <div className="grid items-center grid-cols-12 gap-4 mb-4">
// // //                     <div className="col-span-5">
// // //                       <div className="flex items-center gap-3">
// // //                         <div className="flex-shrink-0 w-12 h-12">
// // //                           <img
// // //                             src={`${apiurl()}/${Array.isArray(item.Images) ? item.Images[0] : item.Images}`}
// // //                             alt={item.Product_Name}
// // //                             className="object-cover w-full h-full rounded"
// // //                           />
// // //                         </div>
// // //                         <div>
// // //                           <h4 className="font-medium text-gray-900">{item.Product_Name}</h4>
// // //                           <p className="text-sm text-gray-500">Order by: {item.Username}</p>
// // //                         </div>
// // //                       </div>
// // //                     </div>

// // //                     <div className="col-span-2 text-center">
// // //                       {item.Discount > 0 ? (
// // //                         <div>
// // //                           <span className="mr-2 text-sm text-gray-500 line-through">
// // //                             ${originalPrice.toFixed(2)}
// // //                           </span>
// // //                           <span className="text-sm text-gray-900">
// // //                             ${discountedPrice.toFixed(2)}
// // //                           </span>
// // //                           <div className="text-xs text-green-500">
// // //                             {item.Discount}% off
// // //                           </div>
// // //                         </div>
// // //                       ) : (
// // //                         <span className="text-sm text-gray-500">
// // //                           ${originalPrice.toFixed(2)}
// // //                         </span>
// // //                       )}
// // //                     </div>
// // //                     <div className="col-span-2 text-center">{item.Quantity}</div>
// // //                     <div className="col-span-3 font-medium text-right">
// // //                       ${itemSubtotal.toFixed(2)}
// // //                     </div>
// // //                   </div>

// // //                   {/* Add Tax Information */}
// // //                   {item.Tax_Type === "Yes" && (
// // //                     <div className="grid items-center grid-cols-12 gap-4 mb-2">
// // //                       <div className="col-span-9 text-sm text-right text-gray-600">
// // //                         Tax ({item.Tax}%):
// // //                       </div>
// // //                       <div className="col-span-3 font-medium text-right">
// // //                         ${taxAmount.toFixed(2)}
// // //                       </div>
// // //                     </div>
// // //                   )}

//  <WriteProductReview
//   savedReviews={savedReviews}
//   item={item}
//   toggleReview={toggleReview}
//   submitting={submitting}
//   activeReviews={activeReviews}
//   reviews={reviews}
//   handleRatingChange={handleRatingChange}
//   handleImageUpload={handleImageUpload}
//   handleReviewTextChange={handleReviewTextChange}
//   selectedImages={selectedImages}
//   setSelectedImages={setSelectedImages}
//   submitReview={submitReview}
//   setSavedReviews={setSavedReviews}
// />
//         </div>
//       );
//     })
//   ) : (
//     <div className="p-8 text-center text-gray-500">No items found in this order</div>
//   )}
// </div>

// // //         {ViewProductData && ViewProductData.length > 0 && (
// // //           <div className="mt-auto border-t">
// // //             <div className="p-4 space-y-2">
// // //               {/* Original Subtotal */}
// // //               <div className="flex justify-between text-sm">
// // //                 <span className="text-gray-600">Original Subtotal</span>
// // //                 <span className="font-medium">
// // //                   ${ViewProductData.reduce((total, item) =>
// // //                     total + (item.Sale_Price * item.Quantity), 0
// // //                   ).toFixed(2)}
// // //                 </span>
// // //               </div>

// // //               {/* Total Discount */}
// // //               {calculateTotalDiscount(ViewProductData) > 0 && (
// // //                 <div className="flex justify-between text-sm">
// // //                   <span className="text-green-600">Total Discount</span>
// // //                   <span className="font-medium text-green-600">
// // //                     -${calculateTotalDiscount(ViewProductData).toFixed(2)}
// // //                   </span>
// // //                 </div>
// // //               )}

// // //               {/* Discounted Subtotal */}
// // //               <div className="flex justify-between text-sm">
// // //                 <span className="text-gray-600">Subtotal After Discount</span>
// // //                 <span className="font-medium">
// // //                   ${calculateSubtotal(ViewProductData).toFixed(2)}
// // //                 </span>
// // //               </div>

// // //               {/* Tax Total */}
// // //               {ViewProductData.some(item => item.Tax_Type === "Yes") && (
// // //                 <div className="flex justify-between text-sm">
// // //                   <span className="text-gray-600">Tax</span>
// // //                   <span className="font-medium">
// // //                     ${calculateTotalTax(ViewProductData).toFixed(2)}
// // //                   </span>
// // //                 </div>
// // //               )}

// // //               {/* Shipping Cost */}
// // //               <div className="flex justify-between text-sm">
// // //                 <span className="text-gray-600">Shipping</span>
// // //                 <span className="font-medium">${shippingCost.toFixed(2)}</span>
// // //               </div>

// // //               {/* Total Amount */}
// // //               <div className="flex justify-between pt-2 text-base font-medium border-t">
// // //                 <span className="text-gray-900">Total Amount</span>
// // //                 <span className="text-[#540045]">
// // //                   ${parseFloat(ViewProductData[0].Total_Amount).toFixed(2)}
// // //                 </span>
// // //               </div>

// // //               {/* Comparison with Original Total Amount from data */}
// // //               {ViewProductData[0]?.Total_Amount && (
// // //                 <div className="mt-2 text-sm text-right text-gray-500">
// // //                   Original Total: ${parseFloat(ViewProductData[0].Total_Amount).toFixed(2)}
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </Dialog>
// // //   );
// // // }

// // import { Dialog } from "primereact/dialog";
// // import apiurl from "../../services/apiendpoint/apiendpoint";
// // import WriteProductReview from './WriteProductReview';

// // export default function OrderItems(props) {
// //   const {
// //     ViewProduct,
// //     setViewProduct,
// //     ViewProductData = [],
// //     savedReviews,
// //     toggleReview,
// //     submitting,
// //     activeReviews,
// //     reviews,
// //     handleRatingChange,
// //     handleImageUpload,
// //     handleReviewTextChange,
// //     setSelectedImages,
// //     selectedImages,
// //     submitReview,
// //     setSavedReviews,
// //   } = props;

// //   // Calculate subtotal without tax or shipping
// //   const calculateSubtotal = (items) => {
// //     return items.reduce((total, item) => {
// //       // Calculate original price before discount
// //       const originalItemPrice = item.Sale_Price;

// //       // Apply item-specific discount if exists
// //       const discountedPrice = item.Discount > 0
// //         ? originalItemPrice - (originalItemPrice * item.Discount / 100)
// //         : originalItemPrice;

// //       // Multiply by quantity
// //       return total + (discountedPrice * item.Quantity);
// //     }, 0);
// //   };

// //   // Calculate total item-specific discount
// //   const calculateTotalDiscount = (items) => {
// //     return items.reduce((totalDiscount, item) => {
// //       const originalItemPrice = item.Sale_Price;
// //       const discountAmount = item.Discount > 0
// //         ? (originalItemPrice * item.Discount / 100) * item.Quantity
// //         : 0;
// //       return totalDiscount + discountAmount;
// //     }, 0);
// //   };

// //   // Calculate overall discount amount
// //   const calculateOverallDiscount = (items) => {
// //     if (items.length > 0 && items[0].Overall_Discount > 0) {
// //       const subtotalAfterItemDiscount = calculateSubtotal(items);
// //       return (subtotalAfterItemDiscount * items[0].Overall_Discount) / 100;
// //     }
// //     return 0;
// //   };

// //   // Calculate total tax
// //   const calculateTotalTax = (items) => {
// //     return items.reduce((totalTax, item) => {
// //       if (item.Tax_Type === "Yes") {
// //         // Calculate original price
// //         const originalItemPrice = item.Sale_Price;

// //         // Apply item-specific discount
// //         const discountedPrice = item.Discount > 0
// //           ? originalItemPrice - (originalItemPrice * item.Discount / 100)
// //           : originalItemPrice;

// //         // Apply overall discount to the item proportionally
// //         const overallDiscountRate = item.Overall_Discount > 0 ? item.Overall_Discount / 100 : 0;
// //         const finalPrice = discountedPrice * (1 - overallDiscountRate);

// //         // Calculate tax on final discounted price
// //         const taxAmount = (finalPrice * item.Quantity * parseFloat(item.Tax)) / 100;
// //         return totalTax + taxAmount;
// //       }
// //       return totalTax;
// //     }, 0);
// //   };

// //   // Get shipping cost
// //   const shippingCost = ViewProductData.length > 0 ? parseFloat(ViewProductData[0].Shipping_Cost || 0) : 0;

// //   return (
// //     <Dialog
// //       header="Order Items"
// //       visible={ViewProduct}
// //       onHide={() => setViewProduct(false)}
// //       style={{ width: '50vw' }}
// //       breakpoints={{ '960px': '75vw', '641px': '100vw' }}
// //       maximizable
// //       className="p-0"
// //     >
// //       <div className="flex flex-col">
// //         <div className="grid grid-cols-12 gap-4 p-3 text-sm font-medium text-gray-600 border-b bg-gray-50">
// //           <div className="col-span-5">Product</div>
// //           <div className="col-span-2 text-center">Price</div>
// //           <div className="col-span-2 text-center">Quantity</div>
// //           <div className="col-span-3 text-right">Subtotal</div>
// //         </div>

// //         <div className="divide-y">
// //           {ViewProductData && ViewProductData.length > 0 ? (
// //             ViewProductData.map((item) => {
// //               // Original price
// //               const originalPrice = item.Sale_Price;

// //               // Calculate item-specific discount
// //               const discountPercentage = item.Discount || 0;
// //               const discountAmount = originalPrice * (discountPercentage / 100);
// //               const discountedPrice = originalPrice - discountAmount;

// //               // Calculate subtotal
// //               const itemSubtotal = discountedPrice * item.Quantity;

// //               // Calculate tax
// //               const taxAmount = item.Tax_Type === "Yes"
// //                 ? (discountedPrice * item.Quantity * parseFloat(item.Tax)) / 100
// //                 : 0;

// //               return (
// //                 <div key={item._id} className="p-4">
// //                   <div className="grid items-center grid-cols-12 gap-4 mb-4">
// //                     <div className="col-span-5">
// //                       <div className="flex items-center gap-3">
// //                         <div className="flex-shrink-0 w-12 h-12">
// //                           <img
// //                             src={`${apiurl()}/${Array.isArray(item.Images) ? item.Images[0] : item.Images}`}
// //                             alt={item.Product_Name}
// //                             className="object-cover w-full h-full rounded"
// //                           />
// //                         </div>
// //                         <div>
// //                           <h4 className="font-medium text-gray-900">{item.Product_Name}</h4>
// //                           <p className="text-sm text-gray-500">Order by: {item.Username}</p>
// //                         </div>
// //                       </div>
// //                     </div>

// //                     <div className="col-span-2 text-center">
// //                       {item.Discount > 0 ? (
// //                         <div>
// //                           <span className="mr-2 text-sm text-gray-500 line-through">
// //                             ${originalPrice.toFixed(2)}
// //                           </span>
// //                           <span className="text-sm text-gray-900">
// //                             ${discountedPrice.toFixed(2)}
// //                           </span>
// //                           <div className="text-xs text-green-500">
// //                             {item.Discount}% off
// //                           </div>
// //                         </div>
// //                       ) : (
// //                         <span className="text-sm text-gray-500">
// //                           ${originalPrice.toFixed(2)}
// //                         </span>
// //                       )}
// //                     </div>
// //                     <div className="col-span-2 text-center">{item.Quantity}</div>
// //                     <div className="col-span-3 font-medium text-right">
// //                       ${itemSubtotal.toFixed(2)}
// //                     </div>
// //                   </div>

// //                   {/* Add Tax Information */}
// //                   {item.Tax_Type === "Yes" && (
// //                     <div className="grid items-center grid-cols-12 gap-4 mb-2">
// //                       <div className="col-span-9 text-sm text-right text-gray-600">
// //                         Tax ({item.Tax}%):
// //                       </div>
// //                       <div className="col-span-3 font-medium text-right">
// //                         ${taxAmount.toFixed(2)}
// //                       </div>
// //                     </div>
// //                   )}
// //                 </div>
// //               );
// //             })
// //           ) : (
// //             <div className="p-8 text-center text-gray-500">No items found in this order</div>
// //           )}
// //         </div>

// //         {ViewProductData && ViewProductData.length > 0 && (
// //           <div className="mt-auto border-t">
// //             <div className="p-4 space-y-2">
// //               {/* Original Subtotal */}
// //               <div className="flex justify-between text-sm">
// //                 <span className="text-gray-600">Original Subtotal</span>
// //                 <span className="font-medium">
// //                   ${ViewProductData.reduce((total, item) =>
// //                     total + (item.Sale_Price * item.Quantity), 0
// //                   ).toFixed(2)}
// //                 </span>
// //               </div>

// //               {/* Item-specific Discount */}
// //               {calculateTotalDiscount(ViewProductData) > 0 && (
// //                 <div className="flex justify-between text-sm">
// //                   <span className="text-green-600">Item Discounts</span>
// //                   <span className="font-medium text-green-600">
// //                     -${calculateTotalDiscount(ViewProductData).toFixed(2)}
// //                   </span>
// //                 </div>
// //               )}

// //               {/* Subtotal After Item Discounts */}
// //               <div className="flex justify-between text-sm">
// //                 <span className="text-gray-600">Subtotal After Item Discounts</span>
// //                 <span className="font-medium">
// //                   ${calculateSubtotal(ViewProductData).toFixed(2)}
// //                 </span>
// //               </div>

// //               {/* Overall Discount */}
// //               {ViewProductData[0]?.Overall_Discount > 0 && (
// //                 <div className="flex justify-between text-sm">
// //                   <span className="text-green-600">
// //                     Overall Discount ({ViewProductData[0].Overall_Discount}%)
// //                   </span>
// //                   <span className="font-medium text-green-600">
// //                     -${calculateOverallDiscount(ViewProductData).toFixed(2)}
// //                   </span>
// //                 </div>
// //               )}

// //               {/* Tax Total */}
// //               {ViewProductData.some(item => item.Tax_Type === "Yes") && (
// //                 <div className="flex justify-between text-sm">
// //                   <span className="text-gray-600">Tax</span>
// //                   <span className="font-medium">
// //                     ${calculateTotalTax(ViewProductData).toFixed(2)}
// //                   </span>
// //                 </div>
// //               )}

// //               {/* Shipping Cost */}
// //               <div className="flex justify-between text-sm">
// //                 <span className="text-gray-600">Shipping</span>
// //                 <span className="font-medium">${shippingCost.toFixed(2)}</span>
// //               </div>

// //               {/* Total Amount */}
// //               <div className="flex justify-between pt-2 text-base font-medium border-t">
// //                 <span className="text-gray-900">Total Amount</span>
// //                 <span className="text-[#540045]">
// //                   ${parseFloat(ViewProductData[0].Total_Amount).toFixed(2)}
// //                 </span>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </Dialog>
// //   );
// // }

// import { Dialog } from "primereact/dialog";
// import apiurl from "../../services/apiendpoint/apiendpoint";

// export default function OrderItems(props) {
//   const {
//     ViewProduct,
//     setViewProduct,
//     ViewProductData = [],
//   } = props;

//   // Calculate original subtotal
//   const calculateOriginalSubtotal = (items) => {
//     return items.reduce((total, item) => {
//       return total + (item.Sale_Price * item.Quantity);
//     }, 0);
//   };

//   // Calculate item discounts
//   const calculateItemDiscounts = (items) => {
//     return items.reduce((total, item) => {
//       const originalPrice = item.Sale_Price;
//       const discountAmount = item.Discount > 0
//         ? (originalPrice * (item.Discount / 100)) * item.Quantity
//         : 0;
//       return total + discountAmount;
//     }, 0);
//   };

//   // Calculate subtotal after item discounts
//   const calculateSubtotalAfterItemDiscounts = (items) => {
//     return items.reduce((total, item) => {
//       const originalPrice = item.Sale_Price;
//       const discountedPrice = item.Discount > 0
//         ? originalPrice - (originalPrice * (item.Discount / 100))
//         : originalPrice;
//       return total + (discountedPrice * item.Quantity);
//     }, 0);
//   };

//   // Calculate overall discount
//   const calculateOverallDiscount = (items) => {
//     if (items.length > 0 && items[0].Overall_Discount > 0) {
//       const subtotalAfterItemDiscounts = calculateSubtotalAfterItemDiscounts(items);
//       return (subtotalAfterItemDiscounts * items[0].Overall_Discount) / 100;
//     }
//     return 0;
//   };

//   // Calculate tax for an item
//   const calculateItemTax = (item, priceAfterAllDiscounts) => {
//     if (item.Tax_Type === "Yes") {
//       return (priceAfterAllDiscounts * parseFloat(item.Tax)) / 100;
//     }
//     return 0;
//   };

//   // Calculate total tax
//   const calculateTotalTax = (items) => {
//     const subtotalAfterItemDiscounts = calculateSubtotalAfterItemDiscounts(items);
//     const overallDiscountPercentage = items[0]?.Overall_Discount || 0;
//     const subtotalAfterAllDiscounts = subtotalAfterItemDiscounts -
//       (subtotalAfterItemDiscounts * overallDiscountPercentage / 100);

//     return items.reduce((totalTax, item) => {
//       const originalPrice = item.Sale_Price;
//       const itemSubtotal = originalPrice * item.Quantity;
//       const itemDiscountedSubtotal = item.Discount > 0
//         ? itemSubtotal - (itemSubtotal * (item.Discount / 100))
//         : itemSubtotal;

//       // Calculate this item's proportion of the total
//       const proportion = itemDiscountedSubtotal / subtotalAfterItemDiscounts;
//       const itemFinalPrice = subtotalAfterAllDiscounts * proportion;

//       if (item.Tax_Type === "Yes") {
//         return totalTax + (itemFinalPrice * parseFloat(item.Tax) / 100);
//       }
//       return totalTax;
//     }, 0);
//   };

//   const shippingCost = ViewProductData.length > 0 ? parseFloat(ViewProductData[0].Shipping_Cost || 0) : 0;

//   return (
//     <Dialog
//       header="Order Items"
//       visible={ViewProduct}
//       onHide={() => setViewProduct(false)}
//       style={{ width: '50vw' }}
//       breakpoints={{ '960px': '75vw', '641px': '100vw' }}
//       maximizable
//       className="p-0 dialog-dark"
//       pt={{
//         root: { className: 'dark:bg-gray-600' },
//         content: { className: 'dark:bg-gray-600' },
//         header: { className: 'dark:bg-gray-600 dark:text-white' }
//       }}
//     >
//       <div className="flex flex-col bg-white">
//         {/* Header */}
//         <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium text-gray-600 border-b bg-gray-50">
//           <div className="col-span-5">Product</div>
//           <div className="col-span-2 text-center">Price</div>
//           <div className="col-span-2 text-center">Quantity</div>
//           <div className="col-span-3 text-right">Subtotal</div>
//         </div>

//         {/* Items List */}
//         <div className="divide-y">
//           {ViewProductData && ViewProductData.length > 0 ? (
//             ViewProductData.map((item) => {
//               const originalPrice = item.Sale_Price;
//               const discountedPrice = item.Discount > 0
//                 ? originalPrice - (originalPrice * (item.Discount / 100))
//                 : originalPrice;
//               const itemSubtotal = discountedPrice * item.Quantity;

//               return (
//                 <div key={item._id} className="p-4">
//                   <div className="grid items-center grid-cols-12 gap-4 mb-2">
//                     <div className="col-span-5">
//                       <div className="flex items-center gap-3">
//                         <div className="flex-shrink-0 w-12 h-12">
//                           <img
//                             src={`${apiurl()}/${Array.isArray(item.Images) ? item.Images[0] : item.Images}`}
//                             alt={item.Product_Name}
//                             className="object-cover w-full h-full rounded"
//                           />
//                         </div>
//                         <div>
//                           <h4 className="font-medium text-gray-900 dark:text-white">{item.Product_Name}</h4>
//                           <p className="text-sm text-gray-500 dark:text-white">Order by: {item.Username}</p>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="col-span-2 text-center">
//                       {item.Discount > 0 ? (
//                         <div>
//                           <span className="mr-2 text-sm text-gray-500 line-through dark:text-white">
//                             ${originalPrice.toFixed(2)}
//                           </span>
//                           <span className="text-sm text-gray-900 dark:text-white">
//                             ${discountedPrice.toFixed(2)}
//                           </span>
//                           <div className="text-xs text-green-500 dark:text-white">
//                             {item.Discount}% off
//                           </div>
//                         </div>
//                       ) : (
//                         <span className="text-sm text-gray-900">
//                           ${originalPrice.toFixed(2)}
//                         </span>
//                       )}
//                     </div>

//                     <div className="col-span-2 text-center">{item.Quantity}</div>
//                     <div className="col-span-3 font-medium text-right">
//                       ${itemSubtotal.toFixed(2)}
//                     </div>
//                   </div>

//                   {item.Tax_Type === "Yes" && (
//                     <div className="grid items-center grid-cols-12 gap-4">
//                       <div className="col-span-9 text-sm text-right text-gray-600">
//                         Tax ({item.Tax}%):
//                       </div>
//                       <div className="col-span-3 font-medium text-right">
//                         ${((itemSubtotal * parseFloat(item.Tax)) / 100).toFixed(2)}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               );
//             })
//           ) : (
//             <div className="p-8 text-center text-gray-500 dark:text-white">No items found in this order</div>
//           )}
//         </div>

//         {/* Order Summary */}
//         {ViewProductData && ViewProductData.length > 0 && (
//           <div className="mt-auto border-t">
//             <div className="p-4 space-y-2">
//               {/* Original Subtotal */}
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-600">Original Subtotal</span>
//                 <span className="font-medium">
//                   ${calculateOriginalSubtotal(ViewProductData).toFixed(2)}
//                 </span>
//               </div>

//               {/* Item Discounts */}
//               {calculateItemDiscounts(ViewProductData) > 0 && (
//                 <div className="flex justify-between text-sm">
//                   <span className="text-green-600">Item Discounts</span>
//                   <span className="font-medium text-green-600">
//                     -${calculateItemDiscounts(ViewProductData).toFixed(2)}
//                   </span>
//                 </div>
//               )}

//               {/* Subtotal After Item Discounts */}
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-600">Subtotal After Item Discounts</span>
//                 <span className="font-medium">
//                   ${calculateSubtotalAfterItemDiscounts(ViewProductData).toFixed(2)}
//                 </span>
//               </div>

//               {/* Overall Discount */}
//               {ViewProductData[0]?.Overall_Discount > 0 && (
//                 <div className="flex justify-between text-sm">
//                   <span className="text-green-600">
//                     Overall Discount ({ViewProductData[0].Overall_Discount}%)
//                   </span>
//                   <span className="font-medium text-green-600">
//                     -${calculateOverallDiscount(ViewProductData).toFixed(2)}
//                   </span>
//                 </div>
//               )}

//               {/* Tax */}
//               {ViewProductData.some(item => item.Tax_Type === "Yes") && (
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600 dark:text-white">Tax</span>
//                   <span className="font-medium dark:text-white">
//                     ${calculateTotalTax(ViewProductData).toFixed(2)}
//                   </span>
//                 </div>
//               )}

//               {/* Shipping */}
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-600 dark:text-white">Shipping</span>
//                 <span className="font-medium dark:text-white">${shippingCost.toFixed(2)}</span>
//               </div>

//               {/* Total Amount */}
//               <div className="flex justify-between pt-2 text-base font-medium border-t">
//                 <span className="text-gray-900 dark:text-white">Total Amount</span>
//                 <span className="text-[#540045] dark:text-white">
//                   ${parseFloat(ViewProductData[0].Total_Amount).toFixed(2)}
//                 </span>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </Dialog>
//   );
// }

import { Dialog } from "primereact/dialog";
import apiurl from "../../services/apiendpoint/apiendpoint";
import WriteProductReview from './WriteProductReview';

export default function OrderItems(props) {
  const {
    ViewProduct,
    setViewProduct,
    ViewProductData = [],
    savedReviews,
    toggleReview,
    submitting,
    activeReviews,
    reviews,
    handleRatingChange,
    handleImageUpload,
    handleReviewTextChange,
    setSelectedImages,
    selectedImages,
    submitReview,
    setSavedReviews,
  } = props;

  const formatQuantity = (item) => {
    const isFreshProduce = item.Category === "Fresh Produce";
    if (isFreshProduce) {
      return `${item.Quantity.toFixed(1)} lb`;
    }
    return item.Quantity;
  };
  // Calculate original subtotal
  const calculateOriginalSubtotal = (items) => {
    return items.reduce((total, item) => {
      return total + (item.Sale_Price * item.Quantity);
    }, 0);
  };

  // Calculate item discounts
  const calculateItemDiscounts = (items) => {
    return items.reduce((total, item) => {
      const originalPrice = item.Sale_Price;
      const discountAmount = item.Discount > 0
        ? (originalPrice * (item.Discount / 100)) * item.Quantity
        : 0;
      return total + discountAmount;
    }, 0);
  };

  // Calculate subtotal after item discounts
  const calculateSubtotalAfterItemDiscounts = (items) => {
    return items.reduce((total, item) => {
      const originalPrice = item.Sale_Price;
      const discountedPrice = item.Discount > 0
        ? originalPrice - (originalPrice * (item.Discount / 100))
        : originalPrice;
      return total + (discountedPrice * item.Quantity);
    }, 0);
  };

  // Calculate tax for an item - before overall discount
  const calculateItemTax = (item) => {
    if (item.Tax_Type === "Yes") {
      // Start with original price
      const itemPrice = item.Sale_Price;

      // Apply item-specific discount if any
      const itemDiscount = item.Discount > 0
        ? (itemPrice * (item.Discount / 100))
        : 0;
      const priceAfterItemDiscount = itemPrice - itemDiscount;

      // Multiply by quantity
      const subtotalAfterItemDiscount = priceAfterItemDiscount * item.Quantity;

      // Calculate tax on price after item discount but before overall discount
      return Number((subtotalAfterItemDiscount * (parseFloat(item.Tax) / 100)).toFixed(2));
    }
    return 0;
  };

  // Calculate total tax for items with Tax_Type="Yes"
  const calculateTotalTax = (items) => {
    return items.reduce((total, item) => {
      if (item.Tax_Type === "Yes") {
        return total + calculateItemTax(item);
      }
      return total;
    }, 0);
  };

  // Calculate overall discount
  const calculateOverallDiscount = (items) => {
    if (items.length > 0 && items[0].Overall_Discount > 0) {
      const subtotalAfterItemDiscounts = calculateSubtotalAfterItemDiscounts(items);
      return (subtotalAfterItemDiscounts * items[0].Overall_Discount) / 100;
    }
    return 0;
  };

  const shippingCost = ViewProductData.length > 0 ? parseFloat(ViewProductData[0].Shipping_Cost || 0) : 0;

  return (
    <Dialog
      header="Order Items"
      visible={ViewProduct}
      onHide={() => setViewProduct(false)}
      style={{ width: '50vw' }}
      breakpoints={{ '960px': '75vw', '641px': '100vw' }}
      maximizable
      className="p-0 dialog-dark"
      pt={{
        root: { className: 'dark:bg-gray-600' },
        content: { className: 'dark:bg-gray-600' },
        header: { className: 'dark:bg-gray-600 dark:text-white' }
      }}
    >
      <div className="flex flex-col bg-white">
        {/* Header */}
        <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium text-gray-600 border-b bg-gray-50 dark:bg-gray-500 dark:text-white">
          <div className="col-span-5">Product</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-2 text-center">Quantity</div>
          <div className="col-span-3 text-right">Subtotal</div>
        </div>

        {/* Items List */}
        <div className="divide-y dark:bg-gray-500">
          {ViewProductData && ViewProductData.length > 0 ? (
            ViewProductData.map((item) => {
              const originalPrice = item.Sale_Price;
              const discountedPrice = item.Discount > 0
                ? originalPrice - (originalPrice * (item.Discount / 100))
                : originalPrice;
              const itemSubtotal = discountedPrice * item.Quantity;

              return (
                <div key={item._id} className="p-4">
                  <div className="grid items-center grid-cols-12 gap-4 mb-2 ">
                    <div className="col-span-5">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-12 h-12">
                          <img src={`${apiurl()}/${Array.isArray(item.Images) ? item.Images[0] : item.Images}`} alt={item.Product_Name} className="object-cover w-full h-full rounded" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">{item.Product_Name}</h4>
                          <p className="text-sm text-gray-500 dark:text-white">Order by: {item.Username}</p>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-2 text-center ">
                      {item.Discount > 0 ? (
                        <div>
                          <span className="mr-2 text-sm text-gray-500 line-through dark:text-white">
                            ${originalPrice.toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-900 dark:text-white">
                            ${discountedPrice.toFixed(2)}
                          </span>
                          <div className="text-xs text-green-500 dark:text-white">
                            {item.Discount}% off
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-900 dark:text-white">
                          ${originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <div className="col-span-2 text-center dark:text-white">
                      {item.Quantity}{item.Category === "Fresh Produce" ? "/lb" : ""}
                    </div>
                    <div className="col-span-3 font-medium text-right dark:text-white">
                      ${itemSubtotal.toFixed(2)}
                    </div>
                  </div>

                  {/* Show tax for items with Tax_Type="Yes" */}
                  {item.Tax_Type === "Yes" && (
                    <div className="grid items-center grid-cols-12 gap-4">
                      <div className="col-span-9 text-sm text-right text-gray-600 dark:text-white">
                        Tax ({item.Tax}%):
                      </div>
                      <div className="col-span-3 font-medium text-right dark:text-white">
                        ${calculateItemTax(item).toFixed(2)}
                      </div>
                    </div>
                  )}
                  {/* <WriteProductReview
                    savedReviews={savedReviews}
                    item={item}
                    toggleReview={toggleReview}
                    submitting={submitting}
                    activeReviews={activeReviews}
                    reviews={reviews}
                    handleRatingChange={handleRatingChange}
                    handleImageUpload={handleImageUpload}
                    handleReviewTextChange={handleReviewTextChange}
                    selectedImages={selectedImages}
                    setSelectedImages={setSelectedImages}
                    submitReview={submitReview}
                    setSavedReviews={setSavedReviews}
                  />  */}
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-gray-500 dark:text-white">No items found in this order</div>
          )}
        </div>


        {/* {ViewProductData && ViewProductData.length > 0 && (
          <div className="mt-auto border-t dark:bg-gray-500">
            <div className="p-4 space-y-2">

              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-white">Original Subtotal</span>
                <span className="font-medium dark:text-white">
                  ${calculateOriginalSubtotal(ViewProductData).toFixed(2)}
                </span>
              </div>


              {calculateItemDiscounts(ViewProductData) > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-600 dark:text-green-300">Item Discounts</span>
                  <span className="font-medium text-green-600 dark:text-green-300">
                    -${calculateItemDiscounts(ViewProductData).toFixed(2)}
                  </span>
                </div>
              )}


              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-white">Subtotal After Item Discounts</span>
                <span className="font-medium dark:text-white">
                  ${calculateSubtotalAfterItemDiscounts(ViewProductData).toFixed(2)}
                </span>
              </div>


              {ViewProductData[0]?.Overall_Discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-600 dark:text-green-300">
                    Overall Discount ({ViewProductData[0].Overall_Discount}%)
                  </span>
                  <span className="font-medium text-green-600 dark:text-green-300">
                    -${calculateOverallDiscount(ViewProductData).toFixed(2)}
                  </span>
                </div>
              )}

              {ViewProductData.some(item => item.Tax_Type === "Yes") && (
                <div className="flex justify-between text-sm dark:text-white">
                  <span className="text-gray-600 dark:text-white">Tax</span>
                  <span className="font-medium">
                    ${calculateTotalTax(ViewProductData).toFixed(2)}
                  </span>
                </div>
              )}


              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-white">Shipping</span>
                <span className="font-medium dark:text-white">${shippingCost.toFixed(2)}</span>
              </div>


              <div className="flex justify-between pt-2 text-base font-medium border-t">
                <span className="text-gray-900 dark:text-white">Total Amount</span>
                <span className="text-[#540045] dark:text-amber-300">
                  ${parseFloat(ViewProductData[0].Total_Amount).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </Dialog>
  );
}