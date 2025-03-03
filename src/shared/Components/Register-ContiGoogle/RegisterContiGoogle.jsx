import { useState } from 'react';
import { Tabs, Tab, Input, Button } from "@nextui-org/react";
import { apiGetGoogleUserInfo, apiGoogleRegister, apiGuestRegister, apiRegisterUser, apiSaveUserDetails, apiverifyotp } from '../../services/apiauthentication/apiregister';
import { useGoogleLogin } from '@react-oauth/google';
import { Dialog } from "primereact/dialog";
import OtpVerificationModal from './OtpVerification';
import SaveUserDetails from './SaveUserDetails';
import toast from 'react-hot-toast';
import useAuth from '../../services/store/useAuth';
import { apilogin } from '../../services/apiauthentication/apilogin';
import { useLocation, useNavigate } from 'react-router-dom';
import { savecartitems } from '../../services/cart/cart';
import useCart from '../../services/store/useCart';

const RegisterContinueGoogle = ({ visible, setVisible, checkoutlogin }) => {

  const { register, loginauth, userDetails, googleregister } = useAuth();
  const { getTotalCartItems } = useCart();
  const [formData, setFormData] = useState({ Email: '', Mobilenumber: '' });
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("Email");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [otp, setOtp] = useState('');
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [showGuestDialog, setShowGuestDialog] = useState(false); // Controls guest dialog visibility
  const [guestEmail, setGuestEmail] = useState('');
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();
  const location = useLocation();
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateMobile = (mobile) => {
    return /^\+?\d{1,4}[\s\-]?\(?\d{1,4}\)?[\s\-]?\d{1,4}[\s\-]?\d{1,4}$/.test(mobile);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const registe = () => {
    setActiveTab("register");
  };

  const registee = () => {
    setActiveTab("login");
  };


  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const dataToSubmit = {
        registrationType: selected === 'Email' ? 'email' : 'mobile',
        [selected === 'Email' ? 'Email' : 'Mobilenumber']:
          selected === 'Email' ? formData.Email : formData.Mobilenumber
      };

      const response = await apiRegisterUser(dataToSubmit);
      if (response.status.includes('already exists')) {
        const errorMessage = response.status.split(':')[1].trim();
        toast.error(`This ${errorMessage}. Please use a different one.`);
        return;
      }
      console.log('OTP request successful:', response);
      setVisible(false);
      setShowOtpModal(true);
    } catch (error) {
      console.error('OTP request failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setVerificationLoading(true);
    try {
      const verificationData = {
        Email: selected === 'Email' ? formData.Email : '',
        Mobilenumber: selected === 'mobile' ? formData.Mobilenumber : '',
        OTP: otp
      };

      const response = await apiverifyotp(verificationData);
      console.log('OTP verification response:', response);

      // Check if the response indicates successful verification
      if (response.status === 'OTP Verified for Mobile Number' ||
        response.status === 'OTP Verified for Email') {
        toast.success("OTP verification successful");
        setFormData({});
        setVisible(false);
        setShowOtpModal(false);
        setFormData({})
        setShowUserDetailsModal(true);
      } else {
        // Handle invalid OTP case
        toast.error(response.status || "Invalid OTP");
        setShowUserDetailsModal(false);
      }
    } catch (error) {
      console.error('OTP verification failed:', error);
      toast.error("OTP verification failed");
      setShowUserDetailsModal(false);
    } finally {
      setVerificationLoading(false);
    }
  };

  const saveCartData = async (userEmail) => {
    const localCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    console.log("User email:", userEmail);
    try {
      for (let item of localCart) {
        const cartData = { productId: item._id || item.productId, Email: userEmail, Quantity: item.Quantity };
        console.log("Cart Data to Save:", cartData);
        await savecartitems(cartData);
      }

      toast.success("Cart saved successfully!");
      navigate('/cart');
    } catch (error) {
      console.error("Error saving cart items:", error);
      toast.error("Failed to save cart items");
    }
  };

  const login = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      setLoading(true);
      try {
        const userInfo = await apiGetGoogleUserInfo(credentialResponse.access_token);
        const response = await apiGoogleRegister({
          Email: userInfo.email,
          googleId: userInfo.sub,
          profilePicture: userInfo.picture,
          registrationType: 'google',
          First_Name: userInfo.given_name,
          Last_Name: userInfo.family_name,
          accessToken: credentialResponse.access_token
        });
        loginauth(response.token)
        const email = userDetails()?.Email;
        if (response.status === "Google registration successful" || "User logged in successfully") {
          console.log('Response status is successful, proceeding to save cart data...');
          if (checkoutlogin) {
            await saveCartData(email);
            console.log('Cart data saved successfully!');
            navigate('/cart');
          } else if (response.Role === 'Admin' || response.Role === 'Employee') {
            navigate('/admin/home');
          } else {
            navigate('/');
          }

          setShowUserDetailsModal(false);
          setVisible(false);

          toast.success("Google signin  successfully!");
        } else {
          toast.error(response.message || "Failed to save user details.");
        }
        console.log('Google registration successful:', response);
        localStorage.removeItem('loginType');
        setVisible(false);
      } catch (error) {
        console.error('Google registration failed:', error);
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      console.log('Google Login Failed');
    },
  });

  const handleUserDetailsSubmit = async (userData) => {
    try {
      const response = await apiSaveUserDetails(userData);
      loginauth(response.token)
      const email = userDetails()?.Email;
      if (response.status === "Successfully registered") {
        console.log('Response status is successful, proceeding to save cart data...');
        if (checkoutlogin) {
          await saveCartData(email);
          console.log('Cart data saved successfully!');
          navigate('/cart');
        } else if (response.Role === 'Admin' || response.Role === 'Employee') {
          navigate('/admin/home');
        } else {
          navigate('/');
        }
        setShowUserDetailsModal(false);
        setFormData({})
        setVisible(false);

        toast.success("User details saved successfully!");
      } else {
        toast.error(response.message || "Failed to save user details.");
      }
    } catch (error) {
      console.error('Failed to save user details:', error);
      toast.error("An error occurred while saving user details.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate login input
      const isEmail = validateEmail(formData.loginIdentifier);
      const isMobile = validateMobile(formData.loginIdentifier);

      if (!isEmail && !isMobile) {
        toast.error("Please enter a valid email or mobile number");
        return;
      }

      if (!formData.loginPassword) {
        toast.error("Password is required");
        return;
      }

      const loginData = {
        [isEmail ? 'Email' : 'Mobilenumber']: formData.loginIdentifier,
        Password: formData.loginPassword
      };

      const response = await apilogin(loginData);
      loginauth(response.token);
      const email = userDetails()?.Email;
      console.log("Logged-in email:", email);
      if (response.status === "Success") {
        // if (location?.state?.status === "checkoutlogin") {
        console.log(response)
        getTotalCartItems(response.cartItemsCount)

        if (checkoutlogin) {
          await saveCartData(email);
          navigate('/cart');
        } else if (response.Role === 'Admin' || response.Role === 'Employee') {
          navigate('/admin/home');
        } else {
          navigate('/');
        }
        setFormData({})
        setVisible(false);
        localStorage.removeItem('loginType');
        toast.success("Login successful!");
      } else {
        toast.error(response.message || "Login failed");
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGuestSubmit = async (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();
    if (!validateEmail(guestEmail)) {
      toast.error("Please enter a valid email.");
      return;
    }

    setLoading(true);

    try {
      const response = await apiGuestRegister({ Email: guestEmail });

      if (response.status === "Success") {
        loginauth(response.token);
        const email = userDetails()?.Email;
        toast.success("Logged in as guest successfully!");
        setShowGuestDialog(false);
        setVisible(false);
        if (checkoutlogin) {
          await saveCartData(email);
          navigate('/cart');
        } else {
          navigate('/');
        }
      } else {
        if (response.message === "Email is already registered as a non-guest user.") {
          toast.error(response.message);
        } else {
          toast.error("Failed to register as guest. Please try again.");
        }
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to register as guest. Please try again.");
      }
      console.error("Error during guest registration:", error);
    } finally {
      setLoading(false);
    }
  };



  const forgotpassword = () => {
    setVisible(false)
    navigate("/forgotpassword")
  }


  return (
    <>
      <Dialog visible={visible} onHide={() => { if (!visible) return; setFormData(''); setVisible(false); }} style={{ width: "45vw" }} className="overflow-hidden h-[520px] px-5 dialog-dark"
        breakpoints={{ "960px": "75vw", "641px": "100vw" }} pt={{
          root: { className: 'dark:bg-gray-600' },
          content: { className: 'dark:bg-gray-600' },
          header: { className: 'dark:bg-gray-600 dark:text-white' }
        }}  >
        <div className="relative">
          {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <img src="/images/Logo/Logo.png" alt="" className="object-contain opacity-5" />
          </div> */}

          <div className="relative z-10">
            <Tabs selectedKey={activeTab} onSelectionChange={setActiveTab} variant="underlined" aria-label="Authentication options" classNames={{ tabList: "gap-6", cursor: "w-full bg-secondary", tab: "flex-1", tabContent: "group-data-[selected=true]:text-primary" }}  >
              <Tab key="register" title={<span className="dark:text-white">Register</span>} >
                {activeTab === "register" && (
                  <form onSubmit={handleManualSubmit} className=" ">
                    <div selectedKey={selected} onSelectionChange={setSelected} variant="underlined" aria-label="Registration options"
                      classNames={{ tabList: "gap-6", cursor: "w-full bg-secondary", tab: "flex-1", tabContent: "group-data-[selected=true]:text-primary" }}  >
                        <div key="Email" title={<span className="dark:text-white"> </span>} className="flex flex-col gap-4">
                        {selected === "Email" && (
                          <Input type="email" name="Email" label="Email Address" placeholder="Enter your email" value={formData.Email} onChange={handleInputChange} required
                            isDisabled={loading} variant="bordered" classNames={{ input: "text-base", inputWrapper: "border-2 focus-within:border-green-500 dark:border-white dark:text-white" }} />
                        )}
                      </div>
                      {/* <Tab key="mobile" title={<span className="dark:text-white">Mobile</span>} className="flex flex-col gap-4">
                        {selected === "mobile" && (
                          <Input type="tel" name="Mobilenumber" label="Mobile Number" placeholder="Enter your mobile number" value={formData.Mobilenumber}
                            onChange={handleInputChange} required isDisabled={loading} variant="bordered" classNames={{ input: "text-base", inputWrapper: "dark:border-white border-2 focus-within:border-green-500 dark:text-white" }} />
                        )}
                      </Tab> */}
                    </div>

                    <Button type="submit" className="w-full mt-6 text-white bg-primary" size="lg" isLoading={loading} >
                      {loading ? 'Sending OTP...' : 'Continue'}
                    </Button>
                    <div className='my-5 text-center'>
                      <p className="">Already Have an Account ? <span style={{ color: '#ff6600', fontWeight: 'bold', cursor: 'pointer' }} onClick={registee} > Login</span></p>
                    </div>
                    {/* <div className="flex items-center justify-center mt-6">
                      <div className="flex-1 border-t border-gray-300"></div>
                      <span className="px-4 text-gray-500 dark:text-white">OR</span>
                      <div className="flex-1 border-t border-gray-300"></div>
                    </div> */}
                    <div className='flex flex-col  gap-4  '>
                      <div className="flex items-center justify-center">
                        <button className="inline-flex items-center justify-center gap-2 p-2  dark:border-white" onClick={() => !loading && login()} isDisabled={loading} size="lg" >
                          <img src="/images/Design/google-final.png" alt="" className="w-5 h-5" />
                          <span className="font-semibold">
                            {loading ? 'Processing...' : 'Continue with Google'}
                          </span>
                        </button>
                      </div>
                      {/* <div className="flex justify-center py-6">
                      <Button
                        variant="bordered"
                        color="secondary"
                        className="inline-flex items-center justify-center gap-2 p-6"
                        onClick={() => handleGuestLogin()}
                      >
                        <i className="fi fi-rr-circle-user"></i> Continue as Guest
                      </Button>
                    </div> */}
                      <div className="flex justify-center items-center ">
                        <button color="secondary" className="inline-flex items-center justify-center gap-2  dark:border-white dark:text-white" auto onClick={() => setShowGuestDialog(true)} >
                          <i className="fi fi-rr-circle-user flex justify-center items-center "></i> Continue as Guest
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </Tab>

              <Tab key="login" title={<span className="dark:text-white">Login</span>}>
                {activeTab === "login" && (
                  <form onSubmit={handleLogin} className="mt-4 space-y-4 ">
                    <Input type="text" name="loginIdentifier" label="Email" placeholder="Enter your email" value={formData.loginIdentifier}
                      onChange={handleInputChange} required isDisabled={loading} variant="bordered" classNames={{ input: "text-base", inputWrapper: "dark:border-white border-2 focus-within:border-green-500 dark:text-white" }} />
                    <Input type="password" name="loginPassword" label="Password" placeholder="Enter your password" value={formData.loginPassword} onChange={handleInputChange}
                      required isDisabled={loading} variant="bordered" classNames={{ input: "text-base", inputWrapper: "border-2 focus-within:border-green-500 dark:border-white dark:text-white" }} />
                    <Button type="submit" className="w-full mt-6 text-white bg-primary" size="lg" isLoading={loading} >
                      {loading ? 'Logging in...' : 'Login'}
                    </Button>
                    <div className='text-center dark:text-white'>
                      <div role='button' onClick={forgotpassword}>Forgot Password?</div>
                    </div>
                    <div>
                      <p className=" text-center">New to MagizhKadai ? <span style={{ color: '#ff6600', fontWeight: 'bold', cursor: 'pointer' }} onClick={registe} > Register</span></p>
                    </div>
                    {/* <div className="flex items-center justify-center mt-6">
                      <div className="flex-1 border-t border-gray-300"></div>
                      <span className="px-4 text-gray-500 dark:text-white">OR</span>
                      <div className="flex-1 border-t border-gray-300"></div>
                    </div> */}

                    {/* <div className="flex items-center justify-center py-6">
                      <Button variant="bordered" className="inline-flex items-center justify-center gap-2 p-6 dark:border-white" onClick={() => !loading && login()} isDisabled={loading} size="lg" >
                        <img src="/images/google.png" alt="" className="w-10 h-10" />
                        <span className="font-semibold">
                          {loading ? 'Processing...' : 'Continue with Google'}
                        </span>
                      </Button>
                    </div> */}
                    {/* <div className="flex justify-center py-6">
                      <Button
                        variant="bordered"
                        color="secondary"
                        className="inline-flex items-center justify-center gap-2 p-6"
                        onClick={() => handleGuestLogin()}
                      >
                        <i className="fi fi-rr-circle-user"></i> Continue as Guest
                      </Button>
                    </div> */}
                    {/* <div className="flex justify-center py-6">
                      <Button variant="bordered" color="secondary" className="inline-flex items-center justify-center gap-2 p-6 dark:border-white dark:text-white" auto onClick={() => setShowGuestDialog(true)} >
                          <i className="fi fi-rr-circle-user"></i><p>Continue as Guest</p>
                      </Button>
                    </div> */}
                  </form>
                )}
              </Tab>
            </Tabs>
          </div>
        </div>
      </Dialog>

      {/* Guest Login Dialog */}
      <Dialog visible={showGuestDialog} onHide={() => setShowGuestDialog(false)} header="Continue as Guest" style={{ width: "30vw" }} breakpoints={{ "960px": "50vw", "641px": "100vw" }} >
        <form onSubmit={handleGuestSubmit} className="space-y-4">
          <Input type="email" label="Email Address" placeholder="Enter your email" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} required variant="bordered" classNames={{ input: "text-base", inputWrapper: "border-2 focus-within:border-green-500" }} />
          <Button type="submit" className="w-full text-white bg-primary" size="lg" isLoading={loading} >
            {loading ? 'Proceeding...' : 'Continue'}
          </Button>
        </form>
      </Dialog>

      <OtpVerificationModal loading={loading} showOtpModal={showOtpModal} setShowOtpModal={setShowOtpModal} handleVerifyOtp={handleVerifyOtp} formData={formData}
        selected={selected} otp={otp} handleOtpChange={handleOtpChange} verificationLoading={verificationLoading} handleManualSubmit={handleManualSubmit} />
      <SaveUserDetails visible={showUserDetailsModal} setVisible={setShowUserDetailsModal} initialEmail={formData.Email} initialPhone={formData.Mobilenumber} onSubmit={handleUserDetailsSubmit} />
    </>
  );
};

export default RegisterContinueGoogle;