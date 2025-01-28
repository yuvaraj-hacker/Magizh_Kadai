import { useState } from "react";
import { Helmet } from "react-helmet";  // Import Helmet for SEO
import SignIn from "../../shared/Components/forms/SignIn";
import { apilogin } from "../../shared/services/apiauthentication/apilogin";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../shared/services/store/useAuth";

const SignInPage = () => {
  const { login } = useAuth();
  const location = useLocation();
  const [formdata, setFormdata] = useState({});
  const navigate = useNavigate();
  const handlechange = (e) => setFormdata({ ...formdata, [e.target.name]: e.target.value });

  const handlelogin = async (e) => {
    e.preventDefault();
    const res = await apilogin(formdata);
    if (res.status === "Success") {
      if (location?.state?.status === "checkoutlogin") {
        navigate('/checkout');
      } else if (res.Role === 'Admin' || res.Role === 'Employee') {
        navigate('/admin/home');
      } else {
        navigate('/');
      }
      login(res.token);
    } else {
      toast.error(res.status);
    }
  };

  return (
    <>
      <Helmet>
        <title>Log In | Kiranaa Bazaar</title>
        <meta name="description" content="Log in to your Kiranaa Bazaar account to access your shopping cart, wishlists, and account settings. Secure and fast login." />
        <meta name="keywords" content="Kiranaa Bazaar, login, sign in, user account, e-commerce, secure login, account access" />
        <meta name="robots" content="noindex, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Log In | Kiranaa Bazaar" />
        <meta property="og:description" content="Access your Kiranaa Bazaar account and manage your orders, wishlists, and more. Secure login to ensure your privacy." />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content="https://www.kiranaabazaar.com/images/og-image.jpg" /> 
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Log In | Kiranaa Bazaar" />
        <meta name="twitter:description" content="Log in to manage your orders, shopping cart, and more. Secure access to your Kiranaa Bazaar account." />
        <meta name="twitter:image" content="https://www.kiranaabazaar.com/images/og-image.jpg" /> 
      </Helmet>

     
      <SignIn handlechange={handlechange} handlelogin={handlelogin} />
    </>
  );
};

export default SignInPage;
