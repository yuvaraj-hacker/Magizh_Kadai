
import { Routes,Route, Navigate } from "react-router-dom";
import Adminmain from "../core/Adminmain";
import Dashboard from "../components/Dashboard/Dashboard";
import Product from "../components/Product/Product";
import Customers from "../components/Customers/Customers";
import Category from "../components/Category/Category";
import Orders from "../components/Orders/Orders";
import Banner from "../components/Banner/Banner";
import PurchasePage from "../components/PurchasePage/PurchasePage";
import OfferPage from "../components/OfferPage/OfferPage";
import Location from "../components/Location/Location";
import Ingredient from "../components/Ingredients/Ingredient";
import UserPage from "../components/Userpage/UserPage";
import Home from "../components/Home/Home";
import RouteTracking from "../components/Routetracking/Routetracking";
import Feedback from "../components/Feedback/Feedback";
import Productrequests from "../components/Productrequests/Productrequests";



const AdminRouter = () => {
  return (
    <>
       <Routes>
          <Route element={<Adminmain/>}>
          <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Product />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/category" element={<Category />} />
            <Route path="/banner" element={<Banner />} />
            <Route path="/purchase" element={<PurchasePage />} />
            <Route path="/offers" element={<OfferPage />} />
            <Route path="/location" element={<Location />} />
            <Route path="/ingredient" element={<Ingredient />} />
            <Route path="/users" element={<UserPage/>} />
            <Route path="/routetracking" element={<RouteTracking/>} />
            <Route path="/feedback" element={<Feedback/>} />
            <Route path="/product-request" element={<Productrequests/>} />



            
            <Route path="/" element={<Navigate to="/admin/home" />} />
          </Route>
      </Routes>
    </>
  )
}
export default AdminRouter;