// const Otpform=(props)=>{

//   const {otp,handleOtpChange,userregister} = props;

//   return(
//     <div className="relative flex flex-col justify-center min-h-screen py-12 overflow-hidden bg-white ">
//        <div className="absolute top-20 right-20"> <img src="/images/design/icon.png" alt="" className="h-[200px]  " /></div>
//             <div className="absolute bottom-20 right-20"> <img src="/images/design/store.png" alt="" className="h-[200px]  " /></div>
//             <div className="absolute top-20 left-[8%]"> <img src="/images/design/mobile.png" alt="" className="h-[300px] " /></div>
//             <div className="absolute bottom-8 left-[8%] hidden xl:block">  <img className="h-[300px] " src="/images/design/laptop.png" alt=""  /></div>
//       <div className="relative w-full max-w-lg px-6 pt-10 mx-auto border shadow-xl bg-secondary pb-9 rounded-2xl">
//         <div className="flex flex-col w-full max-w-md mx-auto space-y-16">
//           <div className="flex flex-col items-center justify-center space-y-2 text-center">
//             <div className="text-3xl font-bold text-primary">
//               <p>Email Verification</p>
//             </div>
//             <div className="flex flex-row text-sm font-medium text-white">
//               <p>We have sent a code to your email</p>
//             </div>
//           </div>
//           <div>
//             <form onSubmit={userregister}>
//               <div className="flex flex-col space-y-16">
//                 <div className="flex flex-row items-center justify-between w-full max-w-xs mx-auto">
//                   <div className="w-16 h-16 ">
//                     <input type="number" onChange={handleOtpChange} name="otp1" id="otp1" maxlength="1" className="flex flex-col items-center justify-center w-full h-full px-5 text-lg text-center bg-white border border-gray-200 shadow-xl outline-none rounded-xl focus:bg-gray-50 focus:ring-1 ring-blue-700" required/>
//                   </div>
//                   <div className="w-16 h-16 ">
//                     <input type="number" onChange={handleOtpChange} name="otp2" id="otp2" maxlength="1" className="flex flex-col items-center justify-center w-full h-full px-5 text-lg text-center bg-white border border-gray-200 shadow-xl outline-none rounded-xl focus:bg-gray-50 focus:ring-1 ring-blue-700" required/>
//                   </div>
//                   <div className="w-16 h-16 ">
//                     <input type="number" onChange={handleOtpChange} name="otp3" id="otp3" maxlength="1" className="flex flex-col items-center justify-center w-full h-full px-5 text-lg text-center bg-white border border-gray-200 shadow-xl outline-none rounded-xl focus:bg-gray-50 focus:ring-1 ring-blue-700" required/>
//                   </div>
//                   <div className="w-16 h-16 ">
//                     <input type="number" onChange={handleOtpChange} name="otp4" id="otp4" maxlength="1" className="flex flex-col items-center justify-center w-full h-full px-5 text-lg text-center bg-white border border-gray-200 shadow-xl outline-none rounded-xl focus:bg-gray-50 focus:ring-1 ring-blue-700" required/>
//                   </div>
//                 </div>
//                 <div className="flex flex-col space-y-5">
//                   <div>
//                     <button type='submit' className="flex flex-row items-center justify-center w-full py-5 text-xl font-semibold text-center text-white border border-none shadow-sm outline-none bg-primary rounded-xl">
//                       Confirm OTP
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
    
// };
// export default Otpform;


const Otpform = (props) => {
  const { handleOtpChange, userregister } = props; // otp

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (value.length > 1) {
      e.target.value = value.slice(0, 1);  // Ensure only 1 digit is entered
    }

    handleOtpChange(e); // Pass the value to parent handler

    // Auto focus to the next input
    const nextInput = document.getElementById(`otp${index + 1}`);
    if (nextInput && value) {
      nextInput.focus();
    }
  };

  const handleKeyUp = (e, index) => {
    if (e.key === 'Backspace') {
      const prevInput = document.getElementById(`otp${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen py-12 overflow-hidden bg-white ">
      <div className="absolute hidden md:block top-20 right-20"> 
        <img src="/images/design/icon.png" alt="" className="h-[200px]" />
      </div>
      <div className="absolute hidden md:block bottom-20 right-20"> 
        <img src="/images/design/store.png" alt="" className="h-[200px]" />
      </div>
      <div className="absolute hidden md:block top-20 left-[8%]"> 
        <img src="/images/design/mobile.png" alt="" className="h-[300px]" />
      </div>
      <div className="absolute hidden md:block bottom-8 left-[8%] ">  
        <img className="h-[300px]" src="/images/design/laptop.png" alt="" />
      </div>
      <div className="relative w-full max-w-lg px-2 pt-10 mx-auto border shadow-xl lg:px-6 bg-secondary pb-9 rounded-2xl">
        <div className="flex flex-col w-full max-w-md mx-auto space-y-16">
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <div className="text-3xl font-bold text-primary">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-white">
              <p>We have sent a code to your email</p>
            </div>
          </div>
          <div>
            <form onSubmit={userregister}>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between w-full max-w-xs mx-auto">
                  {[1, 2, 3, 4].map((_, index) => (
                    <div key={index} className="w-16 h-16">
                      <input
                        type="number"
                        onChange={(e) => handleChange(e, index + 1)}
                        onKeyUp={(e) => handleKeyUp(e, index + 1)}
                        name={`otp${index + 1}`}
                        id={`otp${index + 1}`}
                        maxLength="1"
                        className="flex flex-col items-center justify-center w-full h-full px-5 text-lg text-center bg-white border border-gray-200 shadow-xl outline-none rounded-xl focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        required
                      />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col space-y-5">
                  <div>
                    <button type="submit" className="flex flex-row items-center justify-center w-full py-5 text-xl font-semibold text-center text-white border border-none shadow-sm outline-none bg-primary rounded-xl">
                      Confirm OTP
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otpform;
