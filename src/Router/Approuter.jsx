import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../core/Main/Main";
import Home from "../components/Home/Home";
import SignInPage from "../components/SignIn/SignInPage";
// import RegisterPage from "../components/RegisterPage/RegisterPage";
import AdminRouter from "../admin/Router/AdminRouter";
import ScrollToTop from "./ScrollToTop";
import ProtectedRoute from "../shared/services/Token/ProtectedRoute";
import Forgotpassword from "../components/forgotpassword/forgotpassword";
import PrivacyPolicy from "../components/Policies/PrivacyPolicy";
// import Refundpolicy from "../components/Policies/Refundpolicy";
import TermsandConditions from "../components/Policies/Termsandconditions";
// import ShippingPolicy from "../components/Policies/ShippingPolicy";
import Products from "../components/Products/Products";
import CheckoutPage from "../components/Checkout/CheckoutPage";
import CartPageFunctions from "../components/CartFunction/CartFunctions";
import ProfilePage from "../components/ProfilePage/ProfilePage";
import MyOrderPage from "../components/MyOrder/MyOrderPage";
import SavedItemPage from "../components/SavedItemPage/SavedItemPage";
import SettingPage from "../components/SettingPage/SettingPage";
import WishListPage from "../components/WishListPage/WishListPage";
import PrelineScript from "../PrelineScript";
import HelpCenter from "../shared/Components/Helpcenter/Help-center";
import ReturnRefundpolicy from "../components/Policies/ReturnRedundPolicy";
import ProductViewFunctions from "../components/ProductViewFunctions/ProductViewFunctions";
import AccountLayout from "../components/MyAccountLayout/AccountLayout";
import Dashboard from "../shared/Components/Dashboard/DFashboard";
import { SidebarProvider } from "./SidebarProvider";
import NewForm from "../shared/Components/Register-ContiGoogle/NewFormGoogle";
import Loginn from "../core/Header/Loginn";
import RegisterContinueGoogle from "../shared/Components/Register-ContiGoogle/RegisterContiGoogle";

const Approuter = () => {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <SidebarProvider>
                <Routes>
                    <Route element={<Main />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<SignInPage />} />
                        {/* <Route path="/register" element={<RegisterPage />} /> */}
                        <Route path="/forgotpassword" element={<Forgotpassword />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="/return-and-refund-policy" element={<ReturnRefundpolicy />} />
                        {/* <Route path="/Refund-Policy" element={<Refundpolicy />} />
                             <Route path="/Shipping-Policy" element={<ShippingPolicy />} /> */}
                        <Route path="terms-and-conditions" element={<TermsandConditions />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/product-details/:id" element={<ProductViewFunctions />} />
                        <Route path="/checkout" element={<ProtectedRoute allowedRoles={['Admin', "Customer", "Guest"]}><CheckoutPage /></ProtectedRoute>} />
                        <Route path="/wishlist" element={<ProtectedRoute allowedRoles={['Admin', "Customer", "Guest"]}><SavedItemPage /></ProtectedRoute>} />
                        {/* <Route path="/wishlist" element={<ProtectedRoute allowedRoles={['Admin', "Customer", "Guest"]}><WishListPage /></ProtectedRoute>} /> */}
                          <Route path="/cart" element={<CartPageFunctions />} />
                        <Route path="/new" element={<NewForm />} />
                        <Route path="/login" element={<RegisterContinueGoogle />} />
                        <Route element={<AccountLayout />}>
                            <Route path="/myorder" element={<ProtectedRoute allowedRoles={['Admin', "Customer", "Guest"]}><MyOrderPage /></ProtectedRoute>} />
                            <Route path="/profile" element={<ProtectedRoute allowedRoles={['Admin', "Customer", "Guest"]}><ProfilePage /></ProtectedRoute>} />
                            <Route path="/setting" element={<ProtectedRoute allowedRoles={['Admin', "Customer", "Guest"]}><SettingPage /></ProtectedRoute>} />
                            <Route path="/help-center" element={<HelpCenter />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                        </Route>
                    </Route>
                    <Route path="/admin/*" element={<ProtectedRoute allowedRoles={['Admin']}><AdminRouter /></ProtectedRoute>} />
                </Routes>
            </SidebarProvider>
            <PrelineScript />
        </BrowserRouter>
    );
};
export default Approuter;
