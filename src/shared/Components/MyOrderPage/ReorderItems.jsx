import { Dialog } from "primereact/dialog";
import apiurl from "../../services/apiendpoint/apiendpoint";
import { savecartitems, updatecartItem } from "../../services/cart/cart";
import useAuth from "../../services/store/useAuth";
import useCart from "../../services/store/useCart";
import toast from "react-hot-toast";

export default function ReorderItems(props) {
  const { setViewProduct1, ViewProduct1, ViewProductData1 = [] } = props;

  const { addToCart, cartItems, increaseQuantity} = useCart();
  const { userdetails } = useAuth();

  // const handleReorder = async () => {
  //   if (!ViewProductData1 || ViewProductData1.length === 0) {
  //     toast.error("No items to reorder!");
  //     return;
  //   }

  //   try {
  //     for (const prod of ViewProductData1) {
  //       const existingCartItem = cartItems.find(item => item._id === prod.productId);

  //       if (existingCartItem) {
  //         const updatedQuantity = existingCartItem.Quantity + prod.Quantity;

  //         if (userdetails?.Email) {
  //           await updatecartItem(existingCartItem._id, prod.productId, updatedQuantity, userdetails.Email);
  //         }
  //         increaseQuantity(prod.productId);
  //       } else {
  //         if (userdetails?.Email) {
  //           const cartData = { productId: prod.productId, Email: userdetails.Email, Quantity: prod.Quantity };
  //           await savecartitems(cartData);
  //         }
  //         addToCart({ ...prod, Quantity: prod.Quantity });
  //       }
  //     }

  //     toast.success("Reordered items successfully added to the cart!");
  //     setViewProduct1(false);
  //   } catch (error) {
  //     console.error("Error during reorder:", error);
  //     toast.error("Failed to reorder items. Please try again.");
  //   }
  // };

  const handleReorder = async () => {
    if (!ViewProductData1 || ViewProductData1.length === 0) {
        toast.error("No items to reorder!");
        return;
    }

    try {
        for (const prod of ViewProductData1) {
            const existingCartItem = cartItems.find(item => item._id === prod.productId);
            const isFreshProduce = prod.Category === "Fresh Produce";
            const reorderQuantity = isFreshProduce ? Math.max(0.5, prod.Quantity) : prod.Quantity;

            if (existingCartItem) {
                const updatedQuantity = existingCartItem.Quantity + reorderQuantity;

                if (userdetails?.Email) {
                    await updatecartItem(existingCartItem._id, prod.productId, updatedQuantity, userdetails.Email);
                }
                increaseQuantity(prod.productId);
            } else {
                if (userdetails?.Email) {
                    const cartData = {
                        productId: prod.productId,
                        Email: userdetails.Email,
                        Quantity: reorderQuantity
                    };
                    await savecartitems(cartData);
                }
                addToCart({ ...prod, Quantity: reorderQuantity });
            }
        }

        toast.success("Reordered items successfully added to the cart!");
        setViewProduct1(false);
    } catch (error) {
        console.error("Error during reorder:", error);
        toast.error("Failed to reorder items. Please try again.");
    }
};

  return (
    <>
      <Dialog header="Reorder Items" visible={ViewProduct1} onHide={() => setViewProduct1(false)} style={{ width: "50vw" }} breakpoints={{ "960px": "75vw", "641px": "100vw" }} 
      maximizable className="p-0 dialog-dark" pt={{
        root: { className: 'dark:bg-gray-600' },
        content: { className: 'dark:bg-gray-600' },
        header: { className: 'dark:bg-gray-600 dark:text-white' }
      }} >
        <div className="divide-y">
          {ViewProductData1 && ViewProductData1.length > 0 ? (
            ViewProductData1.map(item => (
              <div key={item._id} className="p-4">
                <div className="grid items-center grid-cols-12 gap-4 mb-4">
                  <div className="col-span-5">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-12 h-12">
                        <img src={`${apiurl()}/${Array.isArray(item.Images) ? item.Images[0] : item.Images}`} alt={item.Product_Name} className="object-cover w-full h-full rounded"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{item.Product_Name}</h4>
                        <p className="text-sm text-gray-500 dark:text-white">Order by: {item.Username}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="text-sm text-gray-900 dark:text-white">${item.Sale_Price?.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">No items found in this order</div>
          )}
        </div>
        <div className="flex justify-end">
          <button onClick={handleReorder} className="p-3 text-white bg-green-600 rounded-lg">Reorder</button>
        </div>
      </Dialog>
    </>
  );
}
