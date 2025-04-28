import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function Sidebar() {

  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

  // Extract the last part of the URL and format it
  const getPageName = () => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    return pathSegments.length > 1 ? pathSegments[pathSegments.length - 1].replace(/-/g, " ") : "Dashboard";
  };

  return (
    <>
      {/* <div className="sticky inset-x-0 top-0 z-20 px-4   border-y sm:px-6 md:px-8   bg-primary text-white pl-[17.8rem]  w-full">
        <div className="flex items-center  py-4">
          <button type="button" className="text-white hover:text-white" data-hs-overlay="#application-sidebar" aria-controls="application-sidebar" aria-label="Toggle navigation">
            <span className="sr-only">Toggle Navigation</span>
            <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg>
          </button>
          <ol className="flex items-center ms-3 whitespace-nowrap " aria-label="Breadcrumb">
            <li className="flex items-center text-sm text-white">
              Admin
              <svg className="flex-shrink-0 mx-3 overflow-visible size-2.5 text-gray-400" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </li>
            <li className="text-sm font-semibold text-white truncate" aria-current="page">
              {getPageName()}
            </li>
          </ol>
        </div>
      </div> */}
      <div id="application-sidebar" className={`hs-overlay hs-overlay-open:translate-x-0 -translate-x-full  transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-64 bg-primary rounded-xl m-1  border pt-7 pb-10 overflow-y-auto 3xl:block 3xl:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 ${isOpen ? ' ' : ''}`}>
        <div className="px-6">
          <a className="flex text-xl font-semibold" href="#" aria-label="Brand">
            <img src="/images/Logo/Logo.png" alt="" className="object-cover p-2 bg-white rounded-lg " />
          </a>
        </div>
        <nav className="flex flex-col flex-wrap w-full p-6 hs-accordion-group" data-hs-accordion-always-open>
          <ul className="space-y-1.5">
            {/* <li>
              <NavLink to={'/admin/home'} className={({ isActive }) => (`flex items-center gap-x-3.5 py-2 px-2.5 ${isActive ? 'bg-gradient-to-tr from-[#fffffffd] to-[#fff] text-secondary shadow' : ' text-white'}  text-sm  hover:text-black rounded-lg hover:bg-gradient-to-tr hover:from-[#fffffffd] hover:to-[#fffffffd]  hover:shadow`)}>
                <i className="fi fi-sr-home flex justify-center items-center"></i>Home
              </NavLink>
            </li> */}
            <li  >
              <NavLink to={'/admin/dashboard'} className={({ isActive }) => (`flex items-center gap-x-3.5 py-2 px-2.5 ${isActive ? 'bg-gradient-to-tr from-[#fffffffd] to-[#fff] text-primary shadow' : ' text-white'}  text-sm  hover:text-black rounded-lg hover:bg-gradient-to-tr hover:from-[#fffffffd] hover:to-[#fffffffd]  hover:shadow`)}>
                <i className="fi fi-rr-dashboard flex justify-center items-center"></i> Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to={'/admin/category'} className={({ isActive }) => (`flex items-center gap-x-3.5 py-2 px-2.5 ${isActive ? ' bg-gradient-to-tr from-[#fffffffd] to-[#fff] text-primary shadow' : ' text-white'}  text-sm  hover:text-black rounded-lg hover:bg-gradient-to-tr hover:from-[#fffffffd] hover:to-[#fffffffd]  hover:shadow`)}>
                <i className="fi fi-br-category-alt flex justify-center items-center"></i> Category
              </NavLink>
            </li>
            <li>
              <NavLink to={'/admin/products'} className={({ isActive }) => (`flex items-center gap-x-3.5 py-2 px-2.5 ${isActive ? ' bg-gradient-to-tr from-[#fffffffd] to-[#fff] text-primary shadow' : ' text-white'}  text-sm  hover:text-black rounded-lg hover:bg-gradient-to-tr hover:from-[#fffffffd] hover:to-[#fffffffd]  hover:shadow`)}>
                <i className="fi fi-rr-box-open-full flex justify-center items-center"></i> Products
              </NavLink>
            </li>
            {/* <li>
              <NavLink to={'/admin/banner'} className={({ isActive }) => (`flex items-center gap-x-3.5 py-2 px-2.5 ${isActive ? ' bg-gradient-to-tr from-[#fffffffd] to-[#fff] text-primary shadow' : ' text-white'}  text-sm  hover:text-black rounded-lg hover:bg-gradient-to-tr hover:from-[#fffffffd] hover:to-[#fffffffd]  hover:shadow`)}>
              <i className="fi fi-sr-ad"></i> Banners
              </NavLink>
            </li> */}
            {/* <li>
              <NavLink to={'/admin/orders'} className={({ isActive }) => (`flex items-center gap-x-3.5 py-2 px-2.5 ${isActive ? ' bg-gradient-to-tr from-[#fffffffd] to-[#fff] text-primary shadow' : ' text-white'}  text-sm  hover:text-black rounded-lg hover:bg-gradient-to-tr hover:from-[#fffffffd] hover:to-[#fffffffd]  hover:shadow`)}>
                <i className="fi fi-sr-order-history flex justify-center items-center"></i>Orders
              </NavLink>
            </li>
            <li>
              <NavLink to={'/admin/customers'} className={({ isActive }) => (`flex items-center gap-x-3.5 py-2 px-2.5 ${isActive ? ' bg-gradient-to-tr from-[#fffffffd] to-[#fff] text-primary shadow' : ' text-white'}  text-sm  hover:text-black rounded-lg hover:bg-gradient-to-tr hover:from-[#fffffffd] hover:to-[#fffffffd]  hover:shadow`)}>
                <i className="fi fi-rr-target-audience flex justify-center items-center"></i> Customers
              </NavLink>
            </li> */}
            <li>
              <NavLink to={'/admin/purchase'} className={({ isActive }) => (`flex items-center gap-x-3.5 py-2 px-2.5 ${isActive ? ' bg-gradient-to-tr from-[#fffffffd] to-[#fff] text-primary shadow' : ' text-white'}  text-sm  hover:text-black rounded-lg hover:bg-gradient-to-tr hover:from-[#fffffffd] hover:to-[#fffffffd]  hover:shadow`)}>
                <i className="fi fi-ss-cart-shopping-fast flex justify-center items-center"></i> Purchase
              </NavLink>
            </li>
            <li>
              <NavLink to={'/admin/Return-Gift'} className={({ isActive }) => (`flex items-center gap-x-3.5 py-2 px-2.5 ${isActive ? ' bg-gradient-to-tr from-[#fffffffd] to-[#fff] text-primary shadow' : ' text-white'}  text-sm  hover:text-black rounded-lg hover:bg-gradient-to-tr hover:from-[#fffffffd] hover:to-[#fffffffd]  hover:shadow`)}>
                <i className="fi fi-ss-gift flex justify-center items-center"></i>
                Return Gift Request
              </NavLink>
            </li>
            {/*
           <li>
              <NavLink to={'/admin/offers'} className={({ isActive }) => (`flex items-center gap-x-3.5 py-2 px-2.5 ${isActive ? ' bg-gradient-to-tr from-[#fffffffd] to-[#fff] text-secondary shadow' : ' text-white'}  text-sm  hover:text-black rounded-lg hover:bg-gradient-to-tr hover:from-[#fffffffd] hover:to-[#fffffffd]  hover:shadow`)}>
              <i className="fi fi-br-badge-percent"></i> Offers
              </NavLink>
            </li>
             <li>
              <NavLink to={'/admin/location'} className={({ isActive }) => (`flex items-center gap-x-3.5 py-2 px-2.5 ${isActive ? ' bg-gradient-to-tr from-[#fffffffd] to-[#fff] text-secondary shadow' : ' text-white'}  text-sm  hover:text-black rounded-lg hover:bg-gradient-to-tr hover:from-[#fffffffd] hover:to-[#fffffffd]  hover:shadow`)}>
              <i className="fi fi-ss-marker"></i> Location
              </NavLink>
            </li>
            <li>
              <NavLink to={'/admin/ingredient'} className={({ isActive }) => (`flex items-center gap-x-3.5 py-2 px-2.5 ${isActive ? ' bg-gradient-to-tr from-[#fffffffd] to-[#fff] text-secondary shadow' : ' text-white'}  text-sm  hover:text-black rounded-lg hover:bg-gradient-to-tr hover:from-[#fffffffd] hover:to-[#fffffffd]  hover:shadow`)}>
              <i className="fi fi-rr-recipe"></i> Ingredient
              </NavLink>
            </li>
            <li>
              <NavLink to={'/admin/users'} className={({ isActive }) => (`flex items-center gap-x-3.5 py-2 px-2.5 ${isActive ? ' bg-gradient-to-tr from-[#fffffffd] to-[#fff] text-secondary shadow' : ' text-white'}  text-sm  hover:text-black rounded-lg hover:bg-gradient-to-tr hover:from-[#fffffffd] hover:to-[#fffffffd]  hover:shadow`)}>
                <i className="fi fi-sr-users-alt"></i> Users
              </NavLink>
            </li>
            <li>
              <NavLink to={'/admin/routetracking'} className={({ isActive }) => (`flex items-center gap-x-3.5 py-2 px-2.5 ${isActive ? ' bg-gradient-to-tr from-[#fffffffd] to-[#fff] text-secondary shadow' : ' text-white'}  text-sm  hover:text-black rounded-lg hover:bg-gradient-to-tr hover:from-[#fffffffd] hover:to-[#fffffffd]  hover:shadow`)}>
              <i className="fi fi-rs-route"></i> Deliveryroute
              </NavLink>
            </li>
            <li>
              <NavLink to={'/admin/feedback'} className={({ isActive }) => (`flex items-center gap-x-3.5 py-2 px-2.5 ${isActive ? ' bg-gradient-to-tr from-[#fffffffd] to-[#fff] text-secondary shadow' : ' text-white'}  text-sm  hover:text-black rounded-lg hover:bg-gradient-to-tr hover:from-[#fffffffd] hover:to-[#fffffffd]  hover:shadow`)}>
              <i className="fi fi-rr-feedback-cycle-loop"></i> Feedback
              </NavLink>
            </li>
            <li>
              <NavLink to={'/admin/product-request'} className={({ isActive }) => (`flex items-center gap-x-3.5 py-2 px-2.5 ${isActive ? ' bg-gradient-to-tr from-[#fffffffd] to-[#fff] text-secondary shadow' : ' text-white'}  text-sm  hover:text-black rounded-lg hover:bg-gradient-to-tr hover:from-[#fffffffd] hover:to-[#fffffffd]  hover:shadow`)}>
              <i className="fi fi-rr-code-pull-request"></i> Product Request
              </NavLink>
            </li> */}
          </ul>
        </nav>
      </div>
    </>
  )
}