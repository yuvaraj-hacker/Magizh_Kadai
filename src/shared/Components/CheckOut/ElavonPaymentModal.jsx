import { useEffect, useState } from 'react';
import { CreditCard, Check, XIcon, ChevronRightIcon } from 'lucide-react';
import PaymentMethodLoading from './PaymentLoading';

const ElavonPaymentModal = (props) => {
  const { isOpen, onClose, onPayNow, totalAmount, paymentStatus, setPaymentStatus, isProcessing, setIsElavonModalOpen, selectedPaymentmethod, purchaseType } = props;
  const [cardDetails, setCardDetails] = useState({ cardNumber: '', cardHolderName: '', expiryDate: '', cvv: '', Payment_id: '', Payment_Mobile: '' });
  const [cardType, setCardType] = useState(null);
  const [dateError, setdateError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const detectCardType = (number) => {
    const cleanNumber = number.replace(/\s/g, '');
    if (/^4/.test(cleanNumber)) return 'visa';
    if (/^5[1-5]/.test(cleanNumber)) return 'mastercard';
    if (/^3[47]/.test(cleanNumber)) return 'amex';
    if (/^6[0]/.test(cleanNumber)) return 'discover';
    return null;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'cardNumber') {
      const formattedValue = value.replace(/\s+/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setCardDetails(prev => ({ ...prev, [name]: formattedValue }));
      setCardType(detectCardType(formattedValue));
      return;
    }

    if (name === 'expiryDate') {
      let formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 2) {
        formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2, 4)}`;
      }

      !validateExpiryDate(formattedValue) ? setdateError(true) : setdateError(false);

      setCardDetails(prev => ({ ...prev, [name]: formattedValue }));
      return;
    }

    setCardDetails(prev => ({ ...prev, [name]: value }));
  };

  const handlePayNow = async () => {
    await onPayNow(cardDetails);
    //resetModal();
  };

  const resetModal = () => {
    setPaymentStatus(null);
    setCardDetails({ cardNumber: '', cardHolderName: '', expiryDate: '', cvv: '', Payment_id: '', Payment_Mobile: '' });
    onClose();
  };

  const isFormValid = () => {
    const { cardNumber, cardHolderName, expiryDate, cvv, Payment_id, Payment_Mobile } = cardDetails;
    if (selectedPaymentmethod == "Online Payment") {
      return (cardNumber.replace(/\s/g, '').length === 16 && cardHolderName.trim().length > 3 && validateExpiryDate(expiryDate) && cvv.length === 3);
    }
    else {
      return (Payment_id.trim().length >= 4 && Payment_Mobile.trim().length >= 10);
    }

  };

  const renderCardIcon = () => {
    switch (cardType) {
      case 'visa':
        return <img src="/images/Cards/visa-logo.png" alt="Visa" className="object-contain w-12 h-8" />;
      case 'mastercard':
        return <img src="/images/Cards/mastercard-logo.png" alt="Mastercard" className="w-12 h-8" />;
      case 'amex':
        return <img src="/images/Cards/amex-logo.png" alt="American Express" className="w-12 h-8" />;
      case 'discover':
        return <img src="/images/Cards/discover-logo.png" alt="American Express" className="w-12 " />;
      default:
        return <CreditCard className="w-12 h-8 text-gray-400" />;
    }
  };

  if (!isOpen) return null;

  const validateExpiryDate = (expiryDate) => {
    // Validate MM/YY format using regex
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      return false;
    }

    // Extract month and year from the input
    const [month, year] = expiryDate.split('/').map(Number);

    // Check if month is valid (01 to 12)
    if (month < 1 || month > 12) {
      return false;
    }

    // Get the current month and year
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-indexed
    const currentYear = currentDate.getFullYear() % 100; // Get last two digits of the year

    // Compare the entered expiry date with the current date
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return false; // The expiry date is in the past
    }

    return true;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-lg">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all duration-300 scale-100 hover:scale-[1.02]">
        {isLoading ? (
          <PaymentMethodLoading selectedPaymentmethod={selectedPaymentmethod} />
        ) : paymentStatus === null ? (
          <>
            {selectedPaymentmethod == "Online Payment" && (
              <div className="gap-0 md:grid md:grid-cols-12">
                <div className="relative flex flex-col justify-between col-span-5 p-6 overflow-hidden bg-[#EEEEEF] border border-white">
                  <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-pattern"></div>

                  <div className="z-10 flex flex-col items-center justify-center space-y-4 text-black">
                    <div className="inline-block px-4 py-3 rounded-lg bg-white/80">
                      <img src="/images/Checkout/logo-elavon-na.svg" alt="Elavon Payment" className="h-8 mx-auto" />
                    </div>
                    <h2 className="text-3xl font-bold text-center">Secure Payment</h2>
                    <p className="text-center text-black/80">Complete your transaction with peace of mind</p>
                  </div>
                </div>

                <div className="col-span-7 p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-gray-800">Payment Details</h3>
                    <button onClick={() => setIsElavonModalOpen(false)} className="p-2 text-gray-500 rounded-full hover:text-gray-800 hover:bg-gray-100" >
                      <XIcon />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* Card Number */}
                    <div className="relative">
                      <div className="absolute transform -translate-y-1/2 left-3 top-1/2">
                        {renderCardIcon()}
                      </div>
                      <input type="text" name="cardNumber" placeholder="Card Number" value={cardDetails.cardNumber} onChange={handleInputChange} maxLength="19" className="w-full p-3.5 pl-16 border-2 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition" />
                    </div>

                    {/* Cardholder Name */}
                    <input type="text" name="cardHolderName" placeholder="Cardholder Name" value={cardDetails.cardHolderName} onChange={handleInputChange} className="w-full p-3.5 border-2 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition" />

                    {/* Expiry and CVV */}
                    <div className="grid items-start grid-cols-2 gap-4">
                      <div>
                        <input type="text" name="expiryDate" placeholder="MM/YY" value={cardDetails.expiryDate} onChange={handleInputChange} maxLength="5" className="w-full p-3.5 border-2 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition" />
                        {dateError && <span className='text-red-400 text-small'>Invalid Date</span>}
                      </div>

                      <input type="password" name="cvv" placeholder="CVV" value={cardDetails.cvv} onChange={handleInputChange} maxLength="3" className="w-full p-3.5 border-2 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition" />
                    </div>

                    {/* Pay Button */}
                    <button onClick={handlePayNow} disabled={!isFormValid() || isProcessing} className={`w-full py-4 rounded-lg text-white font-semibold text-lg flex items-center justify-center space-x-2 transition-all duration-300 ${isFormValid() && !isProcessing ? 'bg-gradient-to-r from-green-600 to-green-400 hover:from-red-700 hover:to-red-300 hover:shadow-xl' : 'bg-gray-400 cursor-not-allowed'}`} >
                      <span>{isProcessing ? 'Processing...' : `Pay $${Number(totalAmount).toFixed(2)}`}</span>
                      {!isProcessing && <ChevronRightIcon />}
                    </button>
                  </div>
                </div>
              </div>
            )}
            {selectedPaymentmethod == "Zelle" && (
              <>
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-gray-800">Payment Details</h3>
                    <button onClick={() => setIsElavonModalOpen(false)} className="p-2 text-gray-500 rounded-full hover:text-gray-800 hover:bg-gray-100" >
                      <XIcon />
                    </button>
                  </div>

                  <div className='flex justify-center'>
                    <img src="/assets/Payment/Zelle.png" className='h-96' alt="" />
                  </div>
                  <div>
                    <input type="text" name="Payment_id" placeholder="Transaction_ID" value={cardDetails.Payment_id} onChange={handleInputChange} className="w-full p-3.5 border-2 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition" />
                  </div>
                  <input type="number" name="Payment_Mobile" placeholder="Payment Mobile Number" value={cardDetails.Payment_Mobile} onChange={handleInputChange} className="w-full p-3.5 border-2 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition" />
                </div>

                {/* Pay Button */}
                <button onClick={handlePayNow} disabled={!isFormValid() || isProcessing} className={`w-full py-4 rounded-lg text-white font-semibold text-lg flex items-center justify-center space-x-2 transition-all duration-300 ${isFormValid() && !isProcessing ? 'bg-gradient-to-r from-green-600 to-green-400 hover:from-red-700 hover:to-red-300 hover:shadow-xl' : 'bg-gray-400 cursor-not-allowed'}`} >
                  <span>{isProcessing ? 'Processing...' : `Pay $${Number(totalAmount).toFixed(2)}`}</span>
                  {!isProcessing && <ChevronRightIcon />}
                </button>
              </>
            )}
          </>
        ) : (
          <div className="p-12 text-center">
            {paymentStatus === 'success' ? (
              <div className="space-y-6">
                <div className="flex justify-center mb-4">
                  <div className="p-6 bg-green-100 rounded-full animate-bounce animate-once">
                    <Check className="text-green-600" size={64} />
                  </div>
                </div>
                <h3 className="text-4xl font-bold text-primary">{["Pay on Pickup", "Cash on Delivery"].includes(selectedPaymentmethod) ? "Order Placed Successfully!" : "Payment Successful!"}</h3>
                <p className="text-xl text-gray-600">Your order has been confirmed.</p>
                <button onClick={onClose} className="flex items-center justify-center w-full py-4 mt-6 space-x-2 text-lg text-white transition rounded-lg bg-gradient-to-r from-primary to-secondary" >
                  <span>Close</span>
                  <ChevronRightIcon />
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-center mb-4">
                  <div className="p-6 bg-red-100 rounded-full animate-shake">
                    <XIcon className="text-red-600" size={64} />
                  </div>
                </div>
                <h3 className="text-4xl font-bold text-red-600">Payment Failed</h3>
                <p className="text-xl text-gray-600">Please check your card details and try again.</p>
                <button onClick={() => setPaymentStatus(null)} className="flex items-center justify-center w-full py-4 mt-6 space-x-2 text-lg text-white transition rounded-lg bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700" >
                  <span>Try Again</span>
                  <ChevronRightIcon />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ElavonPaymentModal;