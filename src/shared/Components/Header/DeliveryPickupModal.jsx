
// import React, { useState, useEffect } from 'react';
// import { Truck, ShoppingBag, CheckCircle, Clock, MapPin, CreditCard } from 'lucide-react';

// const DeliveryPickupModal = ({ isOpen, onClose, onSelectOption }) => {
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [animateSuccess, setAnimateSuccess] = useState(false);
//   useEffect(() => {
//     const savedPurchaseType = localStorage.getItem('purchaseType');
//     if (savedPurchaseType) {
//       setSelectedOption(savedPurchaseType);
//     }
//   }, []);

//   const handleOptionSelect = (type) => {
//     setSelectedOption(type);
//     localStorage.setItem('purchaseType', type);
//     if (type === 'delivery') {
//       localStorage.removeItem('selectedPickupDateTime');
//       localStorage.setItem('dateVisible', 'true');
//       localStorage.removeItem('timeVisible');
//     } else if (type === 'pickup') {
//       localStorage.removeItem('selectedDeliveryDate');
//       localStorage.setItem('timeVisible', 'true');
//       localStorage.removeItem('dateVisible');
//     }
//   };

//   const handleContinue = () => {
//     if (selectedOption) {
//       setAnimateSuccess(true);
//       onSelectOption(selectedOption);
//       setTimeout(() => {
//         setAnimateSuccess(false);
//         onClose();
//       }, 1000);
//     }
//   };

//   const renderDeliveryDetails = () => {
//     if (selectedOption === 'pickup') {
//       return (
//         <div className="mt-6 bg-[#F4F4F4] rounded-2xl p-4 space-y-3">
//           <div className="flex items-center space-x-3">
//             <CreditCard className="text-green-600" size={24} />
//             <span className="text-sm font-medium text-gray-700">
//               No Pickup Charges
//             </span>
//           </div>
//           <div className="flex items-center space-x-3">
//             <MapPin className="text-green-600" size={24} />
//             <span className="text-sm font-medium text-gray-700">
//               No Minimum Order Required
//             </span>
//           </div>
//         </div>
//       );
//     }

//     if (selectedOption === 'delivery') {
//       return (
//         <div className="mt-6 bg-[#F4F4F4] rounded-2xl p-4 space-y-3">
//           <div className="flex items-center space-x-3">
//             <Clock className="text-blue-600" size={24} />
//             <div>
//               <p className="text-sm font-semibold text-gray-800">
//                 Delivery Timings
//               </p>
//             </div>
//           </div>
//           <div className="pl-8 space-y-2">
//             <p className="text-xs text-gray-700">
//               <span className="font-bold">Orders placed before 3 PM</span> will be delivered by 9 PM on the same day.
//             </p>
//             <p className="text-xs text-gray-700">
//               <span className="font-bold">Orders placed after 3 PM</span> will be delivered by 9 PM the following day.
//             </p>
//           </div>
//         </div>
//       );
//     }

//     return null;
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
//       <div className={`relative w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl transform transition-all duration-500 ${
//         animateSuccess ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
//       }`}>
//         {animateSuccess ? (
//           <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
//             <CheckCircle
//               size={80}
//               className="text-green-500 animate-ping"
//             />
//             <p className="mt-4 text-xl font-bold text-green-600">
//               {selectedOption === 'delivery' ? 'Delivery Selected' : 'Pickup Selected'}
//             </p>
//           </div>
//         ) : (
//           <>
//             {/* <button
//               onClick={onClose}
//               className="absolute text-gray-500 transition-colors top-4 right-4 hover:text-gray-700"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <line x1="18" y1="6" x2="6" y2="18"></line>
//                 <line x1="6" y1="6" x2="18" y2="18"></line>
//               </svg>
//             </button> */}

//             <div className="mb-6 text-center">
//               <h2 className="text-3xl font-extrabold text-gray-800 mb-3 bg-gradient-to-r from-[#CA2E43] to-pink-600 bg-clip-text text-transparent">
//                 Choose Your Preference
//               </h2>
//               <p className="text-sm text-gray-600">Select how you want to receive your order</p>
//             </div>

//             <div className="grid grid-cols-2 gap-5">
//               <div
//                 onClick={() => handleOptionSelect('delivery')}
//                 className={`cursor-pointer border-2 rounded-2xl p-6 text-center transition-all duration-300 ease-in-out transform hover:scale-105 group ${
//                   selectedOption === 'delivery'
//                     ? 'border-[#CA2E43] bg-gradient-to-br from-[#FFF6F4] to-white shadow-lg'
//                     : 'border-gray-200 hover:border-gray-300'
//                 }`}
//               >
//                 <Truck
//                   size={56}
//                   className={`mx-auto mb-4 transition-all duration-300 group-hover:rotate-6 ${
//                     selectedOption === 'delivery' ? 'text-[#CA2E43] scale-110' : 'text-gray-400'
//                   }`}
//                 />
//                 <h3 className={`text-xl font-bold mb-2 transition-colors ${
//                   selectedOption === 'delivery' ? 'text-[#CA2E43]' : 'text-gray-700'
//                 }`}>
//                   Delivery
//                 </h3>
//                 <p className="text-xs text-gray-500">
//                   Fresh groceries right to your doorstep
//                 </p>
//               </div>

//               <div
//                 onClick={() => handleOptionSelect('pickup')}
//                 className={`cursor-pointer border-2 rounded-2xl p-6 text-center transition-all duration-300 ease-in-out transform hover:scale-105 group ${
//                   selectedOption === 'pickup'
//                     ? 'border-[#CA2E43] bg-gradient-to-br from-[#FFF6F4] to-white shadow-lg'
//                     : 'border-gray-200 hover:border-gray-300'
//                 }`}
//               >
//                 <ShoppingBag
//                   size={56}
//                   className={`mx-auto mb-4 transition-all duration-300 group-hover:-rotate-6 ${
//                     selectedOption === 'pickup' ? 'text-[#CA2E43] scale-110' : 'text-gray-400'
//                   }`}
//                 />
//                 <h3 className={`text-xl font-bold mb-2 transition-colors ${
//                   selectedOption === 'pickup' ? 'text-[#CA2E43]' : 'text-gray-700'
//                 }`}>
//                   Pickup
//                 </h3>
//                 <p className="text-xs text-gray-500">
//                   Quick and convenient store pickup
//                 </p>
//               </div>
//             </div>

//             {/* Conditional Details Section */}
//             {selectedOption && renderDeliveryDetails()}

//             <div className="mt-8 text-center">
//               <button
//                 onClick={handleContinue}
//                 disabled={!selectedOption}
//                 className={`w-full py-3.5 rounded-full font-bold text-lg uppercase tracking-wider transition-all duration-300 shadow-md ${
//                   selectedOption
//                     ? 'bg-[#CA2E43] text-white hover:bg-[#a71f36] hover:shadow-xl'
//                     : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                 }`}
//               >
//                 Continue
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DeliveryPickupModal;





import { useState, useEffect } from 'react';
import { Truck, ShoppingBag, CheckCircle, Clock, MapPin, CreditCard } from 'lucide-react';
// import { getalllocation } from "../../../admin/shared/services/apilocation/apilocation";
import toast from 'react-hot-toast';
import { useCallback } from 'react';

const DeliveryPickupModal = ({ isOpen, onClose, onSelectOption }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [animateSuccess, setAnimateSuccess] = useState(false);
  const [allowedCities, setAllowedCities] = useState([]);
  const [inactiveCities, setInactiveCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(localStorage.getItem('selectedLocation') || '');

  useEffect(() => {
    const savedPurchaseType = localStorage.getItem('purchaseType');
    if (savedPurchaseType) {
      setSelectedOption(savedPurchaseType);
    }
  }, []);

  // const fetchCities = useCallback(async () => {
  //   try {
  //     const response = await getalllocation();
  //     const cities = response.resdata.filter((location) => location.Status === "Active").map((location) => location.City);
  //     setAllowedCities(cities);
  //   } catch (error) {
  //     console.error("Error fetching cities:", error);
  //     // toast.error("Failed to load cities. Please try again.");
  //   }
  // }, []);
  // const fetchCities = useCallback(async () => {
  //   try {
  //     const response = await getalllocation();
  //     const active = response.resdata.filter((location) => location.Status === "Active").map((location) => location.City);
  //     const inactive = response.resdata.filter((location) => location.Status === "Inactive").map((location) => location.City);

  //     setAllowedCities(active);
  //     setInactiveCities(inactive);
  //   } catch (error) {
  //     console.error("Error fetching cities:", error);
  //   }
  // }, []);


  var isMounted = true;

  useEffect(() => {
    if (isMounted) {
      fetchCities();
    }
    return () => (isMounted = false)
  }, [fetchCities])



  const handleOptionSelect = (type) => {
    setSelectedOption(type);
    localStorage.setItem('purchaseType', type);

    if (type === 'delivery') {
      localStorage.removeItem('selectedPickupDateTime');
      localStorage.setItem('dateVisible', 'true');
      localStorage.removeItem('timeVisible');
    } else if (type === 'pickup') {
      localStorage.removeItem('selectedDeliveryDate');
      localStorage.removeItem('selectedLocation');
      localStorage.setItem('timeVisible', 'true');
      localStorage.removeItem('dateVisible');
    }
  };

  const handleContinue = () => {
    if (selectedOption === 'pickup') {
      setAnimateSuccess(true);
      localStorage.setItem('selectedLocation', 'Sacramento');
      onSelectOption({
        option: selectedOption,
        location: 'Sacramento',
      });
      setTimeout(() => {
        setAnimateSuccess(false);
        onClose();
      }, 1000);
      window.location.reload()
    } else if (selectedOption === 'delivery' && selectedCity) {
      setAnimateSuccess(true);
      onSelectOption({
        option: selectedOption,
        location: selectedCity,
      });
      setTimeout(() => {
        setAnimateSuccess(false);
        onClose();
      }, 1000);
      window.location.reload()
    }
  };


  const handleCityChange = (city) => {
    if (allowedCities.includes(city)) {
      setSelectedCity(city);
      localStorage.setItem('selectedLocation', city);
    } else {
      toast.error("Sorry, we do not deliver to that location yet.");
    }
  };

  const renderDeliveryDetails = () => {
    if (selectedOption === 'pickup') {
      return (
        <div className="mt-6 bg-[#F4F4F4] rounded-2xl p-4 space-y-3">
          <div className="flex items-center space-x-3">
            <MapPin className="text-green-600" size={24} />
            <span className="text-sm font-medium text-gray-700">
              Pickup Location: Sacramento
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <CreditCard className="text-green-600" size={24} />
            <span className="text-sm font-medium text-gray-700">
              No Pickup Charges
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="text-green-600" size={24} />
            <span className="text-sm font-medium text-gray-700">
              No Minimum Order Required
            </span>
          </div>
        </div>
      );
    }

  //   if (selectedOption === 'delivery') {
  //     return (
  //       <>
  //         <div className="mt-6 bg-[#F4F4F4] rounded-2xl p-4 space-y-3">
  //           <div className="mt-4">
  //             <label className="block mb-2 text-sm font-medium text-gray-700">
  //               Select Delivery City
  //             </label>
  //             <select
  //               className="w-full p-3 border border-gray-300 rounded-lg"
  //               value={selectedCity}
  //               onChange={(e) => handleCityChange(e.target.value)}
  //             >
  //               <option value="">Select a city</option>
  //               {allowedCities.map((city) => (
  //                 <option key={city} value={city}>
  //                   {city}
  //                 </option>
  //               ))}
  //             </select>
  //           </div>
  //           <div className="flex items-center space-x-3">
  //             <Clock className="text-blue-600" size={24} />
  //             <div>
  //               <p className="text-sm font-semibold text-gray-800">
  //                 Delivery Timings
  //               </p>
  //             </div>
  //           </div>
  //           <div className="pl-8 space-y-2">
  //             <p className="text-xs text-gray-700">
  //               <span className="font-bold">Orders placed before 3 PM</span> will be delivered by 9 PM on the same day.
  //             </p>
  //             <p className="text-xs text-gray-700">
  //               <span className="font-bold">Orders placed after 3 PM</span> will be delivered by 9 PM the following day.
  //             </p>
  //           </div>
  //         </div>

  //       </>
  //     );
  //   }

  //   return null;
  // };

  if (selectedOption === 'delivery') {
    return (
      <>
        <div className="mt-6 bg-[#F4F4F4] rounded-2xl p-4 space-y-3">
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Select Delivery City
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-600"
              value={selectedCity}
              onChange={(e) => handleCityChange(e.target.value)}
            >
              <option value="">Select a city</option>
              {allowedCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
              {inactiveCities.map((city) => (
                <option
                  key={city}
                  value={city}
                  disabled
                  className="text-gray-400"
                >
                  {city} (Coming Soon)
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="text-blue-600" size={24} />
            <div>
              <p className="text-sm font-semibold text-gray-800">
                Delivery Timings
              </p>
            </div>
          </div>
          <div className="pl-8 space-y-2">
            <p className="text-xs text-gray-700">
              <span className="font-bold">Orders placed before 3 PM</span> will be delivered by 9 PM on the same day.
            </p>
            <p className="text-xs text-gray-700">
              <span className="font-bold">Orders placed after 3 PM</span> will be delivered by 9 PM the following day.
            </p>
          </div>
        </div>
      </>
    );
  }

  return null;
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className={`relative w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl transform transition-all dark:bg-gray-600 duration-500 ${animateSuccess ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
        }`}>
        {animateSuccess ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <CheckCircle
              size={80}
              className="text-green-500 animate-ping"
            />
            <p className="mt-4 text-xl font-bold text-green-600">
              {selectedOption === 'delivery' ? 'Delivery Selected' : 'Pickup Selected'}
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 text-center">
              <h2 className="lg:text-3xl text-xl font-extrabold text-gray-800 dark:text-white mb-3 bg-gradient-to-r from-[#CA2E43] to-pink-600 bg-clip-text text-transparent">
                Choose Your Preference
              </h2>
              <p className="text-sm text-gray-600 dark:text-white">Select how you want to receive your order</p>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div
                onClick={() => handleOptionSelect('delivery')}
                className={`cursor-pointer border-2 rounded-2xl lg:p-6 p-2 text-center transition-all duration-300 ease-in-out transform hover:scale-105 group ${selectedOption === 'delivery'
                    ? 'border-[#CA2E43] bg-gradient-to-br from-[#FFF6F4] to-white shadow-lg'
                    : 'border-gray-200 hover:border-gray-300'
                  }`}
              >
                <Truck
                  size={56}
                  className={`mx-auto mb-4 transition-all duration-300 group-hover:rotate-6 ${selectedOption === 'delivery' ? 'text-[#CA2E43] scale-110' : 'text-gray-400'
                    }`}
                />
                <h3 className={`text-xl font-bold mb-2 transition-colors dark:text-gray-400 ${selectedOption === 'delivery' ? 'text-[#CA2E43] dark:text-gray-700' : 'text-gray-700 dark:text-white'
                  }`}>
                  Delivery
                </h3>
                <p className={`text-xs text-gray-500 ${selectedOption === 'delivery' ? ' dark:text-gray-700' : 'text-gray-500 dark:text-white'}`}>
                  Fresh groceries right to your doorstep
                </p>
              </div>

              <div
                onClick={() => handleOptionSelect('pickup')}
                className={`cursor-pointer border-2 rounded-2xl lg:p-6 p-2 text-center transition-all duration-300 ease-in-out transform hover:scale-105 group ${selectedOption === 'pickup'
                    ? 'border-[#CA2E43] bg-gradient-to-br from-[#FFF6F4] to-white shadow-lg'
                    : 'border-gray-200 hover:border-gray-300'
                  }`}
              >
                <ShoppingBag
                  size={56}
                  className={`mx-auto mb-4 transition-all duration-300 group-hover:-rotate-6 ${selectedOption === 'pickup' ? 'text-[#CA2E43] scale-110' : 'text-gray-400'
                    }`}
                />
                <h3 className={`text-xl font-bold mb-2 transition-colors dark:text-gray-400 ${selectedOption === 'pickup' ? 'text-[#CA2E43] dark:text-gray-700' : 'text-gray-700 dark:text-white'
                  }`}>
                  Pickup
                </h3>
                <p className={`text-xs text-gray-500 ${selectedOption === 'pickup' ? ' dark:text-gray-700' : 'text-gray-500 dark:text-white'}`}>
                  Quick and convenient store pickup
                </p>
              </div>
            </div>

            {/* Conditional Details Section */}
            {selectedOption && renderDeliveryDetails()}

            <div className="mt-8 text-center">
              <button
                onClick={handleContinue}
                disabled={!selectedOption || (selectedOption === 'delivery' && !selectedCity)}
                className={`w-full py-3.5 rounded-full font-bold lg:text-lg text-base uppercase tracking-wider transition-all duration-300 shadow-md ${selectedOption && (selectedOption !== 'delivery' || selectedCity)
                    ? 'bg-[#CA2E43] text-white hover:bg-[#a71f36] hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
              >
                Continue
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DeliveryPickupModal;