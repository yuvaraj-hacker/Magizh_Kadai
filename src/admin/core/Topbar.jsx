// // import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@nextui-org/react";
// // import useAuth from "../../shared/services/store/useAuth";
// // import { Link } from "react-router-dom";
// // export default function Topbar() {
// //   const { userDetails, logout } = useAuth()
// //   return (
// //     <header className="sticky top-0 inset-x-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-[48] w-full bg-white  text-sm py-2.5 sm:py-4 lg:ps-[17rem] ">
// //       <nav className="flex items-center w-full px-4 mx-auto basis-full sm:px-6 md:px-8" aria-label="Global">
// //         <div className="me-5 lg:me-0 lg:hidden">
// //           <a className="flex-none text-xl font-semibold " href="#" aria-label="Brand">Brand</a>
// //         </div>
// //         <div className="flex items-center justify-end w-full ms-auto sm:justify-between sm:gap-x-3 sm:order-3 lg:rounded-xl lg:border lg:p-5">
// //           <div className="sm:hidden">
// //             <button type="button" className="w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none ">
// //               <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
// //             </button>
// //           </div>
// //           <div className="hidden sm:block">
// //             <label htmlFor="icon" className="sr-only">Search</label>
// //             <div className="relative">
// //               {/* <div className="absolute inset-y-0 z-20 flex items-center pointer-events-none start-0 ps-4">
// //                 <svg className="flex-shrink-0 text-gray-400 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
// //               </div>
// //               <input type="text" id="icon" name="icon" className="block w-full px-4 py-2 text-sm border border-gray-200 outline-none ps-11 rounded-3xl disabled:opacity-50 disabled:pointer-events-none" placeholder="Search" /> */}
// //             </div>
// //           </div>
// //           <div className="flex flex-row items-center justify-end gap-2">
// //           <Link to="/" aria-label="Home" className="flex items-center mt-2 mr-4">
// //               <i className="text-xl text-gray-800 fi fi-rr-home hover:text-gray-600"></i>
// //             </Link>
// //             <Dropdown placement="bottom-end">
// //               <DropdownTrigger>
// //                 <Avatar
// //                   isBordered
// //                   as="button"
// //                   size="sm"
// //                   className="transition-transform "
// //                   src="/images/kb-favicon.png"
// //                 />
// //               </DropdownTrigger>
// //               <DropdownMenu aria-label="Profile Actions" variant="flat">
// //                 <DropdownItem key="profile" className="gap-2 h-14">
// //                   <p className="font-semibold">Signed in as</p>
// //                   <p className="font-semibold">{userDetails()?.Email}</p>
// //                 </DropdownItem>

// //                 <DropdownItem key="logout" onPress={logout}>
// //                   Log Out
// //                 </DropdownItem>
// //               </DropdownMenu>
// //             </Dropdown>
// //           </div>
// //         </div>
// //       </nav>
// //     </header>
// //   )
// // }

// import {
//   Dropdown,
//   DropdownTrigger,
//   DropdownMenu,
//   DropdownItem,
//   Avatar,
//   Badge
// } from "@nextui-org/react";
// import { Link } from "react-router-dom";
// import useAuth from "../../shared/services/store/useAuth";
// import { Bell } from "lucide-react";

// export default function Topbar() {
//   const { userDetails, logout } = useAuth();

//   return (
//     <header className="fixed top-0 right-0 z-50 w-full lg:w-[calc(100%-17rem)] bg-white/80 backdrop-blur-md shadow-sm">
//       <nav className="px-4 py-3 mx-auto lg:px-6">
//         <div className="flex items-center justify-between">
//           {/* Left side - Brand/Logo (visible only on mobile) */}
//           <div className="flex items-center lg:hidden">
//             <Link to="/" className="text-xl font-bold text-gray-800">
//               KB
//             </Link>
//           </div>

//           {/* Right side - Navigation and Profile */}
//           <div className="flex items-center gap-4 ml-auto">
//             {/* Home Icon */}
//             <Link
//               to="/"
//               className="p-2 text-gray-600 transition-colors rounded-full hover:bg-gray-100"
//             >
//               <i className="text-xl fi fi-rr-home"></i>
//             </Link>

//             {/* Notifications */}
//             <Badge content="5" color="danger" shape="circle">
//               <button className="p-2 text-gray-600 transition-colors rounded-full hover:bg-gray-100">
//                 <Bell size={20} />
//               </button>
//             </Badge>

//             {/* Profile Dropdown */}
//             <Dropdown placement="bottom-end">
//               <DropdownTrigger>
//                 <div className="flex items-center gap-2 cursor-pointer">
//                   <Avatar
//                     isBordered
//                     size="sm"
//                     src="/images/kb-favicon.png"
//                     className="transition-transform"
//                   />
//                   <div className="hidden text-sm font-medium lg:block">
//                     {userDetails()?.Email?.split('@')[0]}
//                     <i className="ml-2 fi fi-rr-angle-small-down"></i>
//                   </div>
//                 </div>
//               </DropdownTrigger>
//               <DropdownMenu
//                 aria-label="Profile Actions"
//                 className="w-60"
//               >
//                 <DropdownItem
//                   key="profile"
//                   className="gap-2 h-14"
//                   textValue="profile">
//                   <div className="flex flex-col">
//                     <p className="text-xs text-gray-500">Signed in as</p>
//                     <p className="text-sm font-semibold text-gray-700">
//                       {userDetails()?.Email}
//                     </p>
//                   </div>
//                 </DropdownItem>
//                 <DropdownItem
//                   key="settings"
//                   startContent={<i className="fi fi-rr-settings"></i>}
//                   textValue="settings"
//                 >
//                   Settings
//                 </DropdownItem>
//                 {/* <DropdownItem
//                   key="help"
//                   startContent={<i className="fi fi-rr-interrogation"></i>}
//                   textValue="help"
//                 >
//                   Help & Feedback
//                 </DropdownItem> */}
//                 <DropdownItem
//                   key="logout"
//                   onPress={logout}
//                   className="text-danger"
//                   color="danger"
//                   startContent={<i className="fi fi-rr-sign-out-alt"></i>}
//                   textValue="logout"
//                 >
//                   Log Out
//                 </DropdownItem>
//               </DropdownMenu>
//             </Dropdown>
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// }

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, Button } from "@nextui-org/react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../shared/services/store/useAuth";
import { Bell, Home, Search, Menu } from "lucide-react";

export default function Topbar() {
  const { userDetails, logout } = useAuth();
  const location = useLocation();

  // Extract the last part of the URL and format it
  const getPageName = () => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    return pathSegments.length > 1 ? pathSegments[pathSegments.length - 1].replace(/-/g, " ") : "Dashboard";
  };


  return (
    <header className=" inset-x-0 z-50  sticky top-0">
      <div className="sticky inset-x-0 top-0 z-20       w-full">
      </div>
      <div className="absolute inset-0   bg-white/70 backdrop-blur-lg border-gray-200/80" />
      <nav className="relative flex items-center justify-between h-16  ">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-5  py-4">
            <button type="button" className=" 3xl:hidden block" data-hs-overlay="#application-sidebar" aria-controls="application-sidebar" aria-label="Toggle navigation">
              <span className="sr-only">Toggle Navigation</span>
              <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg>
            </button>
            <ol className="flex items-center  whitespace-nowrap" aria-label="Breadcrumb">
              <li className="flex items-center  md:text-xl  ">
                Admin
                <svg className="flex-shrink-0 mx-3 overflow-visible size-2.5 text-gray-400" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </li>
              <li className="md:text-xl  font-semibold  truncate" aria-current="page">
                {getPageName().charAt(0).toUpperCase() + getPageName().slice(1)}
              </li>
            </ol>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/" className="p-2 text-gray-700 transition-colors rounded-full hover:text-gray-900 hover:bg-gray-100/80"  >
            <i className="fi fi-sr-home text-primary flex items-center "></i>
          </Link>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="py-1 border rounded-full px-3 bg-primary">
                  <p className="text-white">A</p>
                </div>
                <div className="flex-col items-end hidden md:flex">
                  <span className="text-sm font-medium text-gray-900">
                    {userDetails()?.Email?.split('@')[0]}
                  </span>
                  <span className="text-xs text-gray-500">Administrator</span>
                </div>
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="gap-2 h-14">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold text-gray-500">{userDetails()?.Email}</p>
              </DropdownItem>
              <DropdownItem
                key="logout"
                className="text-danger"
                color="danger"
                onPress={logout}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </nav>
    </header>
  );
}