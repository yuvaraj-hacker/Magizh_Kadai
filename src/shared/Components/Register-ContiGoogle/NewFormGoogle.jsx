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

const NewForm = ({ visible, setVisible, checkoutlogin }) => {
    const [isLogin, setLogin] = useState(false);

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
    const [activeTab, setActiveTab] = useState("register");
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
            {visible && (
                <section className='flex items-center fixed z-50 justify-center bg-black/50 inset-0'>
                    <div className="flex justify-center items-center   dark:bg-gray-800 ">
                        <div className="   w-[30rem] p-3 bg-white dark:bg-gray-700 rounded-md shadow-md">
                            <Tabs selectedKey={activeTab} onSelectionChange={setActiveTab} variant="underlined" classNames={{ tabList: "gap-6", cursor: "w-full bg-secondary", tab: "flex-1", tabContent: "group-data-[selected=true]:text-primary" }}>
                                <Tab key="register" title={<span className="dark:text-white">Register</span>}>
                                    <form onSubmit={handleManualSubmit} className="mt-4">
                                        <Tabs selectedKey={selected} onSelectionChange={setSelected} variant="underlined" classNames={{ tabList: "gap-6", cursor: "w-full bg-secondary", tab: "flex-1", tabContent: "group-data-[selected=true]:text-primary" }}>
                                            <Tab key="Email" title={<span className="dark:text-white">Email</span>}>
                                                <Input type="email" name="Email"  placeholder="Enter your email" value={formData.Email}   onChange={handleInputChange} required isDisabled={loading} variant="bordered" classNames={{ input: "text-base", inputWrapper: "border-2 focus-within:border-green-500 dark:border-white dark:text-white" }} />
                                            </Tab>
                                            {/* <Tab key="mobile" title={<span className="dark:text-white">Mobile</span>}>
                                                <Input type="tel" name="Mobilenumber" label="Mobile Number" placeholder="Enter your mobile number" value={formData.Mobilenumber} onChange={handleInputChange} required isDisabled={loading} variant="bordered" classNames={{ input: "text-base", inputWrapper: "border-2 focus-within:border-green-500 dark:border-white dark:text-white" }} />
                                            </Tab> */}
                                        </Tabs>
                                        <Button type="submit" className="w-full   text-white bg-secondary" size="lg" isLoading={loading}>{loading ? "Sending OTP..." : "Continue"}</Button>

                                        <p className="text-center">Already have an account ? <span onClick={() => setLogin(true)}> Login</span></p>

                                    </form>
                                </Tab>

                                {isLogin && (
                                    <Tab key="login" title={<span className="dark:text-white">Log in</span>}>
                                        <form onSubmit={handleLogin} className="mt-4 space-y-4">
                                            <Input type="text" name="loginIdentifier" label="Email" placeholder="Enter your email" value={formData.loginIdentifier} onChange={handleInputChange} required isDisabled={loading} variant="bordered" classNames={{ input: "text-base", inputWrapper: "border-2 focus-within:border-green-500 dark:border-white dark:text-white" }} />
                                            <Input type="password" name="loginPassword" label="Password" placeholder="Enter your password" value={formData.loginPassword} onChange={handleInputChange} required isDisabled={loading} variant="bordered" classNames={{ input: "text-base", inputWrapper: "border-2 focus-within:border-green-500 dark:border-white dark:text-white" }} />
                                            <Button type="submit" className="w-full mt-6 text-white bg-secondary" size="lg" isLoading={loading}>{loading ? "Logging in..." : "Login"}</Button>
                                            <div className="text-center dark:text-white"><div role="button" onClick={() => alert("Reset Password Flow")}>Forgot Password?</div></div>
                                        </form>
                                    </Tab>
                                )}

                            </Tabs>
                        </div>
                    </div>
                </section>
            )}





            <Dialog visible={showGuestDialog} onHide={() => setShowGuestDialog(false)} header="Continue as Guest" style={{ width: "30vw" }} breakpoints={{ "960px": "50vw", "641px": "100vw" }} >
                <form onSubmit={handleGuestSubmit} className="space-y-4">
                    <Input type="email" label="Email Address" placeholder="Enter your email" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} required variant="bordered" classNames={{ input: "text-base", inputWrapper: "border-2 focus-within:border-green-500" }} />
                    <Button type="submit" className="w-full text-white bg-secondary" size="lg" isLoading={loading} >
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

export default NewForm;