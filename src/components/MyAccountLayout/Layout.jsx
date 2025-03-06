// import React, { useEffect, useRef, useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Outlet } from 'react-router-dom';
// import useAuth from '../../shared/services/store/useAuth';
// import { Home, LifeBuoy, Package, User } from 'lucide-react';
// import { useSidebar } from '../../Router/SidebarProvider';

// function Layout() {
//     const { isLoggedIn, userdetails } = useAuth();
//     // const { sideOpen, toggleSidebar } = useSidebar();
//     const location = useLocation();
//     const navLinks = [
//         { to: "/dashboard", label: "DashBoard", icon: <Home size={20} /> },
//         { to: "/setting", label: "My Profile", icon: <User size={20} /> },
//         { to: "/myorder", label: "My Orders", icon: <Package size={20} /> },
//         { to: "/help-center", label: "Help Center", icon: <LifeBuoy size={20} /> },
//     ];
//     // const handleNavClick = () => {
//     //     // Close the sidebar on nav link click in smaller screens
//     //     if (window.innerWidth <= 1024) {
//     //         toggleSidebar();
//     //     }
//     // };
//     return (
//         <>
//             <div className="flex  relative   mx-auto">
//                 {/* Sidebar */}
//                 <aside className={`h-screen lg:sticky lg:top-[97px]    fixed  w-72  top-0  lg:z-20 z-50 bg-primary text-white shadow-lg p-5    `}>
//                     {/* Profile Section */}
//                     <div className="flex flex-col items-center py-5 relative ">
//                         <div className="w-16 h-16 flex items-center justify-center bg-white text-[#DBA737] rounded-full text-lg font-bold">
//                             {userdetails?.First_Name?.charAt(0).toUpperCase()}
//                         </div>
//                         {isLoggedIn && (
//                             <p className="text-lg font-semibold mt-3">Hello, {userdetails?.First_Name}</p>
//                         )}
//                         <i className="fi fi-ts-circle-xmark absolute top-0 right-0 cursor-pointer text-2xl lg:hidden block" ></i>
//                     </div>
//                     {/* Navigation Links */}
//                     <ul className="flex flex-col gap-3 mt-5">
//                         {navLinks.map((link) => {
//                             const isActive = location.pathname === link.to;
//                             return (
//                                 <li key={link.to} className="rounded-lg overflow-hidden">
//                                     <Link to={link.to} onClick={handleNavClick} className={`flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${isActive ? 'bg-white text-[#DBA737] shadow-md' : 'text-white hover:bg-[#c9952f]'
//                                         }`}  >
//                                         <div className="flex items-center gap-3">
//                                             {link.icon} {/* Render Icon */}
//                                             <span className="font-medium">{link.label}</span>
//                                         </div>
//                                         <i className="fi fi-sr-angle-circle-right flex justify-center items-center"></i>
//                                     </Link>
//                                 </li>
//                             );
//                         })}
//                     </ul>
//                 </aside>
//                 {/* Main Content */}
//             </div>
//         </>
//     );
// }

// export default Layout;
