import { useCallback, useEffect, useRef, useState } from 'react'
import Checkout from '../../shared/Components/CheckOut/Checkout'
import { apigetallShipping, deleteShipping, saveShipping, updateShipping } from '../../shared/services/apishipping/apishipping';
import ShippingForm from '../../shared/Components/CheckOut/ShippingForm';
import toast from 'react-hot-toast';
import { apigenerateToken, apiSaveorder } from '../../shared/services/APIOrder/apiorder';
import useCart from '../../shared/services/store/useCart';
import { deleteAllcartItems } from '../../shared/services/cart/cart';
import useAuth from '../../shared/services/store/useAuth';
import { useNavigate } from 'react-router-dom';
import ElavonPaymentModal from '../../shared/Components/CheckOut/ElavonPaymentModal';
import { getalllocation, getLocationbyCity } from '../../admin/shared/services/apilocation/apilocation';
import moment from 'moment-timezone';

function CheckoutPage() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [TotalValue, SetTotalValue] = useState(0);
    const [Total, setTotal] = useState(0);
    const [finaltotal, setFinaltotal] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedPaymentmethod, setSelectedPaymentmethod] = useState(null);
    const [shippingdata, setshippingdata] = useState([]);
    const [location,setLocation] = useState([])
    const [cityOptions, setCityOptions] = useState([]);
    const [availableZipcodes, setAvailableZipcodes] = useState([]);
    const [showNewAddressModal, setShowNewAddressModal] = useState(false);
    const [formdata, setFormdata] = useState({});
    const [FeesandTax, setFeesandTax] = useState({});
    const [loading, setLoading] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const detailsRef = useRef(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    const paymentRef = useRef(null);
    const [isCouponOpen, SetIsCouponOpen] = useState(false);
    const couponRef = useRef(null);
    const { deleteAllItems } = useCart();
    const { userDetails,userdetails } = useAuth();
    const navigate = useNavigate();
    const [isElavonModalOpen, setIsElavonModalOpen] = useState(false);
    const purchaseType = localStorage.getItem('purchaseType') || '';  
    const purchaseDateandTime = localStorage.getItem('purchaseDateandTime') || new Date().toISOString(); 

    const overallDiscountPercentage = FeesandTax?.Overall_Discount || 0;
    const discountAmount = (finaltotal * (overallDiscountPercentage / 100)).toFixed(2);

    const calculateDeliveryFee = () => {
        const amountAfterDiscount = finaltotal - discountAmount;
        
        if (purchaseType === 'pickup') {
            return 0;
        } else {
            return amountAfterDiscount >= Number(FeesandTax?.Order_Price_Free_Delivery) 
                ? 0 
                : Number(FeesandTax?.DeliveryFee || 0);
        }
    };

    const deliveryFee = calculateDeliveryFee();
    const calculateFinalPaymentAmount = () => {
        const amountAfterDiscount = finaltotal - discountAmount;
        console.log(amountAfterDiscount)
        
        if (purchaseType === 'pickup') {
            return (Number(Total) - discountAmount).toFixed(2);
        } else {
            return (Number(Total) - discountAmount).toFixed(2);
            // return (Number(Total) + 
            //     (amountAfterDiscount >= Number(FeesandTax?.Order_Price_Free_Delivery) 
            //         ? 0 
            //         : Number(FeesandTax?.DeliveryFee)) - 
            //     discountAmount).toFixed(2);
        }
    };

    const finalPaymentAmount = calculateFinalPaymentAmount();

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const storedSubtotal = JSON.parse(localStorage.getItem('subtotal')) || 0;
        const storedFinalTotal = JSON.parse(localStorage.getItem('finalTotal')) || 0;
        const storedTotalItems = JSON.parse(localStorage.getItem('totalItems')) || 0;
        if(storedCartItems.length ==0){
            navigate('/')
        }
        setCartItems(storedCartItems);
        setSubtotal(storedSubtotal);
        setFinaltotal(storedFinalTotal);
        setTotalItems(storedTotalItems);
    }, []);

    const couponOpen = () => {
        SetIsCouponOpen(!isCouponOpen);
    };

    const loginType = localStorage.getItem('loginType');
    
    const getLocationdata = useCallback(async()=>{
        const response = await getalllocation({});
        setLocation(response.resdata||[])
    } ,[])

    var isMounted = true;
    useEffect(()=>{
        if(isMounted){
            getLocationdata();
        }
        return ()=>(isMounted = false);
    },[getLocationdata])

useEffect(() => {
    if (location && location.resdata) {
        const formattedCities = (location.resdata || []).map(loc => ({
            ...loc,
            displayName: loc.Status === "Active" 
                ? loc.City 
                : `${loc.City} (Coming Soon)`
        }));
        setCityOptions(formattedCities);
    } else if (Array.isArray(location)) {
        const formattedCities = location.map(loc => ({
            ...loc,
            displayName: loc.Status === "Active" 
                ? loc.City 
                : `${loc.City} (Coming Soon)`
        }));
        setCityOptions(formattedCities);
    }
}, [location]);

const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    const matchedLocation = cityOptions.find(loc => 
        loc.City.toLowerCase() === selectedCity.toLowerCase()
    );

    if (matchedLocation) {
        if (matchedLocation.Status !== "Active") {
            e.preventDefault();
            return;
        }

        const zipcodes = matchedLocation.Zipcode.split(',').map(zip => zip.trim());
        setAvailableZipcodes(zipcodes);
        
        setFormdata(prevData => ({
            ...prevData,
            City: matchedLocation.City,
            State: matchedLocation.State,
            Zipcode: zipcodes.length === 1 ? zipcodes[0] : '',
            Country: "United States of America"
        }));
        setSelectedLocation(null);
        setAvailableZipcodes([]);
    }
    handlechange(e);
};
    const handleZipcodeChange = (e) => {
        setFormdata(prevData => ({ ...prevData, Zipcode: e.target.value }));
    };

    const getShippingdata = useCallback(async () => {
        const products = await apigetallShipping({purchaseType});
        if(purchaseType === 'delivery'){
            setshippingdata(products);
            if (products && products.length > 0 && !selectedAddress) {
                setSelectedAddress(products[0]);
            }
        }
        else{
            setshippingdata(products);
        }
    }, []);


    useEffect(() => {
        if (isMounted) {
            getShippingdata();
        }
        return () => (isMounted = false);
    }, []);


    const handleAddressChange = (e) => {
        if (!formdata.Country) {
            formdata.Country = "United States of America";
        }
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
    };

    // const getLocationByCity = useCallback(async () => {
    //     const products = await getLocationbyCity({City:selectedAddress?.City});
    //     setFeesandTax(products)
    //     var res = cartItems.reduce((sum, item) => sum + (item?.productId.Tax_Type =="Yes"? (((((item?.Quantity*1) * (item?.productId.Sale_Price*1))-(((item?.Quantity*1) * (item?.productId.Sale_Price*1))*(item?.productId.Discount*1))/100))*(products.Local_Tax*1)/100)+(((((item?.Quantity*1) * (item?.productId.Sale_Price*1))-(((item?.Quantity*1) * (item?.productId.Sale_Price*1))*(item?.productId.Discount*1))/100))):(((item?.Quantity*1) * (item?.productId.Sale_Price*1))-(((item?.Quantity*1) * (item?.productId.Sale_Price*1))*(item?.productId.Discount*1))/100)), 0)
    //     setTotal(res);
    //     if (purchaseType === 'pickup') {
    //         SetTotalValue(
    //             Number(res) - (finaltotal * ((products?.Overall_Discount || 0) / 100)).toFixed(2)
    //         );
    //     } else {
    //         SetTotalValue(
    //             Number(res) + 
    //             (Number(res) >= Number(products?.Order_Price_Free_Delivery) ? 
    //                 0 : 
    //                 Number(products?.DeliveryFee)
    //             ) - 
    //             (finaltotal * ((products?.Overall_Discount || 0) / 100)).toFixed(2)
    //         );
    //     }


    // }, [selectedAddress,Total,finaltotal]);
    const getLocationByCity = useCallback(async () => {
        const products = await getLocationbyCity({City: selectedAddress?.City});
        setFeesandTax(products);
        
        // Calculate tax with proper decimal precision
        const res = cartItems.reduce((sum, item) => {
            if (item?.productId.Tax_Type === "Yes") {
                // Break down the calculation steps for better precision
                const basePrice = Number(item?.Quantity) * Number(item?.productId.Sale_Price);
                const discountAmount = (basePrice * Number(item?.productId.Discount)) / 100;
                const priceAfterDiscount = basePrice - discountAmount;
                
                // Calculate tax amount with proper rounding
                const taxRate = Number(products.Local_Tax) / 100;
                const taxAmount = Number((priceAfterDiscount * taxRate).toFixed(2));
                
                return Number((sum + priceAfterDiscount + taxAmount).toFixed(2));
            } else {
                const basePrice = Number(item?.Quantity) * Number(item?.productId.Sale_Price);
                const discountAmount = (basePrice * Number(item?.productId.Discount)) / 100;
                return Number((sum + (basePrice - discountAmount)).toFixed(2));
            }
        }, 0);
    
        setTotal(Number(res.toFixed(2)));
        
        // Calculate amount after discount for free delivery threshold check
        const amountAfterDiscount = Number((finaltotal - (finaltotal * ((products?.Overall_Discount || 0) / 100))).toFixed(2));
        
        if (purchaseType === 'pickup') {
            SetTotalValue(
                Number((res - (finaltotal * ((products?.Overall_Discount || 0) / 100))).toFixed(2))
            );
        } else {
            // Only apply free delivery if amount after discount meets threshold
            SetTotalValue(
                Number((
                    res + 
                    (amountAfterDiscount >= Number(products?.Order_Price_Free_Delivery) ? 
                        0 : 
                        Number(products?.DeliveryFee)
                    ) - 
                    (finaltotal * ((products?.Overall_Discount || 0) / 100))
                ).toFixed(2))
            );
        }
    }, [selectedAddress, Total, finaltotal]);

    useEffect(() => {
        getLocationByCity();
    }, [selectedAddress,Total,finaltotal]);
    
    const handleEditAddress = (address) => {
        setFormdata(address);
        setIsEditMode(true);
        setShowNewAddressModal(true);
    };

    const handleDeleteAddress = (_id) => {
        deleteShipping(_id).then(() => {
            toast.success("Address deleted successfully");
            return getShippingdata();
        }).catch(() => {
            // toast.error("Error deleting address");
        });
    };

    const handlesave = async (e) => {
        e.preventDefault();
        setLoading(true);
        const action = isEditMode ? updateShipping : saveShipping;
        const successMessage = isEditMode ? "Address updated successfully" : "Address saved successfully"
        try {
            await action(formdata);
            toast.success(successMessage);
            await getShippingdata();
            setShowNewAddressModal(false);
            setLoading(false);
        } catch (error) {
            // toast.error("Error saving address");
        }
    };

    const handlePlaceOrder = async (data) => {
        if (purchaseType !== 'pickup') {
            if (!selectedAddress) {
                toast('Please provide an address and select a payment method.', { icon: '📢' });
                return;
            }
        }
        if (!selectedAddress) {
            toast('Please provide an address and select a payment method.', { icon: '📢' });
            return;
        }
        if (!selectedPaymentmethod) {
            toast('Please select a payment method.', { icon: '📢' });
            return;
        }

        if ( ['Online Payment','Zelle'].includes(selectedPaymentmethod)&&!isElavonModalOpen) {
            setIsElavonModalOpen(true);
        }
        else{
            const userFirstName = userdetails?.First_Name || '';
            const userLastName = userdetails?.Last_Name || '';
            const userEmail = userdetails?.Email || '';
            const userMobileNumber = userdetails?.Mobilenumber || '';
            
            var orderdata = {
                Billing_Name: `${userFirstName} ${userLastName}`.trim(),
                Username: userFirstName,
                Email: userEmail,
                Mobilenumber: userMobileNumber,
                Delivery_Address: `${selectedAddress.Address}, ${selectedAddress.City}, ${selectedAddress.State}, ${selectedAddress.Zipcode}`,
                // Total_Amount: (Total+FeesandTax?.DeliveryFee).toFixed(2),
                // Total_Amount: (parseFloat(Total || 0) + parseFloat(FeesandTax?.DeliveryFee || 0)).toFixed(2),
                // Total_Amount: TotalValue.toFixed(2),
                Total_Amount: finalPaymentAmount,
                // Shipping_Cost: TotalValue >= FeesandTax.Order_Price_Free_Delivery ? 0: FeesandTax?.DeliveryFee,
                Shipping_Cost: deliveryFee,
                Tax: FeesandTax?.Local_Tax,
                Overall_Discount: FeesandTax.Overall_Discount,
                Overall_Discount_Amount: discountAmount,
                City: selectedAddress.City,
                Delivery_Address_id: selectedAddress._id,
                Description: 'Order placed through website',
                purchaseType: purchaseType, 
                purchaseDateandTime: purchaseDateandTime,
                Payment_Type: selectedPaymentmethod,
            };

            var ordermasterdata = cartItems.map(item => ({
                Product_id: item.productId._id,
                Product_Name: item.productId.Product_Name,
                Images: item.productId.Images || [],
                Sale_Price: item.productId.Sale_Price,
                Regular_Price: item.productId.Regular_Price,
                Discount: item.productId.Discount || 0,
                Quantity: item.Quantity,
                Category: item.productId.Category,
                Sub_Category: item.productId.Sub_Category,
                Measurement_Units: item.productId.Measurement_Units,
                Unit_of_Measurements: item.productId.Unit_of_Measurements,
                Tax_Type: item.productId.Tax_Type,
                QTY: item.productId.QTY,
                Tax: FeesandTax?.Local_Tax,
                // Total_Amount: TotalValue.toFixed(2),
                Total_Amount: finalPaymentAmount,
                // Shipping_Cost: TotalValue >= FeesandTax.Order_Price_Free_Delivery ? 0: FeesandTax?.DeliveryFee,
                Shipping_Cost: deliveryFee,
                Overall_Discount: FeesandTax.Overall_Discount,
                Overall_Discount_Amount: discountAmount,
            }));

            if(selectedPaymentmethod === 'Online Payment'){
                var token = await apigenerateToken("orderdata78Order_ID",Number(orderdata?.Total_Amount*1))
                pay(orderdata,ordermasterdata, data,token)
            }
            else{
                if(selectedPaymentmethod === 'Zelle'){
                    orderdata = {...data,...orderdata,Order_Status:"Admin Payment Confirmation Pending",Payment_Type:"Zelle"}
                    setIsElavonModalOpen(true);
                    setLoading(true);
                    setIsProcessing(true)
                    var response = await apiSaveorder({orderdata,  ordermasterdata});
                    setPaymentStatus('success');
                    setIsProcessing(false)
                    toast.success('Order placed successfully!');
                    deleteAllItems();
                    await deleteAllcartItems(userDetails().Email);
                    // navigate('/myorder');
                    localStorage.removeItem('cartItems');
                    localStorage.removeItem('subtotal');
                }
                else{
                    var orderdata = {...orderdata,Order_Status:"Order Placed",Payment_Type:purchaseType == 'pickup'?"Pay on Pickup":"Cash on Delivery"}
                    setLoading(true);
                    setIsProcessing(true)
                    setIsElavonModalOpen(true);
                    var response = await apiSaveorder({orderdata, ordermasterdata}); 
                    setLoading(false);
                    setPaymentStatus('success');
                    setIsProcessing(false)
                    toast.success('Order placed successfully!');
                    deleteAllItems();
                    await deleteAllcartItems(userDetails().Email);
                    // navigate('/myorder');
                    localStorage.removeItem('cartItems');
                    localStorage.removeItem('subtotal');
                }
            }
        }

    };

    const pay = async (orderdatas,ordermasterdata, data,token)=> {
        setIsProcessing(true)
        const paymentData = {
          ssl_txn_auth_token: token.token,
          ssl_card_number: data.cardNumber,
          ssl_exp_date:  data.expiryDate.replace("/", ""),
          ssl_get_token: "y",
          ssl_add_token: "y",
          ssl_invoice_number:  moment().format("YYMMDDHHmmss")+orderdatas.Total_Amount,
          ssl_first_name:  orderdatas.userFirstName,
          ssl_last_name:  orderdatas.userLastName,
          ssl_cvv2cvc2:  data.cvv,
          ssl_avs_address:  selectedAddress.Address,
          ssl_city:  selectedAddress.City,
          ssl_state:  selectedAddress.State,
          ssl_avs_zip:  selectedAddress.Zipcode
        };
  
        const callback = {
          onError: function (error) {
            //console.log("error", error);
            setPaymentStatus('failed')
            setLoading(false);
            setIsProcessing(false);
           },
          onDeclined: function (response) {
            //console.log(response)
            //console.log("Result Message=" + response['ssl_result_message']);
            setLoading(false);
            setPaymentStatus('failed')
            setIsElavonModalOpen(true);
          },
          onApproval: async function (response) {
            //console.log(response,"Approval Code=" , response['ssl_approval_code']);
            var orderdata = {...orderdatas,Payment_ID:response['ssl_approval_code'],Payment_Status:"Paid",Order_Status:"Order Placed", Payment_Type:"Credit Card"}
            const responses = await apiSaveorder({orderdata, ordermasterdata});
            if (responses) {
                toast.success('Order placed successfully!');
                deleteAllItems();
                await deleteAllcartItems(userDetails().Email);
                // navigate('/myorder');
                localStorage.removeItem('cartItems');
                localStorage.removeItem('subtotal');
            }
            setLoading(false);
            setPaymentStatus('success');
            setIsProcessing(false)
          }
        };
  
        try {
          ConvergeEmbeddedPayment.pay(paymentData, callback);
        } catch (error) {
          console.error('Error processing payment:', error);
          showResult("error", "Payment processing failed.");
        }
        return false;
    }

    const handleOpenElavonModal = () => {
        setIsElavonModalOpen(true);
    };

    const handleCloseElavonModal = () => {
        setIsElavonModalOpen(false);
        navigate('/myorder')
    };
 
    
    const handlePaymentChange = (e) => {
        const selectedPayment = e.target.value;
        setSelectedPaymentmethod(selectedPayment);
    };
    
    // Format price with 2 decimal places
    const formatPrice = (price) => {
        return price ? price.toFixed(2) : "0.00";
    };

    return (
        <>
            <Checkout shippingdata={shippingdata} Openform={() => { setFormdata({}); setIsEditMode(false); setShowNewAddressModal(true); }} handleEditAddress={handleEditAddress}
                handleDeleteAddress={handleDeleteAddress} selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} selectedPaymentmethod={selectedPaymentmethod}
                setSelectedPaymentmethod={setSelectedPaymentmethod} handlePlaceOrder={handlePlaceOrder} detailsRef={detailsRef} paymentRef={paymentRef} isDetailsOpen={isDetailsOpen}
                isCouponOpen={isCouponOpen} setIsEditing={setIsEditing} couponOpen={couponOpen} isEditing={isEditing} isPaymentOpen={isPaymentOpen} totalItems={totalItems}
                setIsPaymentOpen={setIsPaymentOpen} couponRef={couponRef} setIsDetailsOpen={setIsDetailsOpen} cartItems={cartItems} subtotal={subtotal} FeesandTax={FeesandTax}
                handleOpenElavonModal={handleOpenElavonModal} formatPrice={formatPrice} handlePaymentChange={handlePaymentChange} purchaseType={purchaseType} Total={Total}
                finaltotal={finaltotal} loading={loading} overallDiscountPercentage={overallDiscountPercentage} discountAmount={discountAmount} TotalValue={TotalValue} finalPaymentAmount={finalPaymentAmount} deliveryFee={deliveryFee} />

            <ShippingForm  availableZipcodes ={availableZipcodes } handleZipcodeChange={handleZipcodeChange }cityOptions={cityOptions}  handleCityChange ={handleCityChange} location={location} loginType={loginType} visible={showNewAddressModal} setVisible={setShowNewAddressModal} loading={loading} formdata={formdata} setFormdata={setFormdata}
                handlechange={handleAddressChange} handlesave={handlesave} />

            <ElavonPaymentModal isOpen={isElavonModalOpen} onClose={handleCloseElavonModal} onPayNow={handlePlaceOrder} setIsElavonModalOpen={setIsElavonModalOpen}
                totalAmount={finalPaymentAmount} isProcessing={isProcessing}
                paymentStatus={paymentStatus} setPaymentStatus={setPaymentStatus} selectedPaymentmethod={selectedPaymentmethod} purchaseType={purchaseType}
            />
        </>
    )
}

export default CheckoutPage
