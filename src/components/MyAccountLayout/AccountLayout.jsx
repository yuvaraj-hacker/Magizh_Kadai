import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import useAuth from '../../shared/services/store/useAuth';

function AccountLayout() {
    const { isLoggedIn, userdetails } = useAuth();
    const location = useLocation();
    const navLinks = [
        { to: "/setting", label: "My Profile" },
        { to: "/myorder", label: "My Orders" },
        { to: "/help-center", label: "Help Center" },
    ];

    return (
        <>
            <div className="flex flex-col relative max-w-[80rem] px-3 mx-auto">
                <aside className="w-full  bg-white sticky lg:top-24 top-14 z-20">
                    <div className='flex justify-between items-center   md:py-10 py-5'>
                        <div className='flex gap-4 items-center justify-start'>
                            <div className="md:w-20 md:h-20 w-10 h-10 flex items-center justify-center bg-secondary rounded-full text-white text-lg font-bold">
                                {userdetails?.First_Name?.charAt(0).toUpperCase()}
                            </div>
                            {isLoggedIn && (
                                <div className='text-primary md:text-xl text-base'>
                                    <p className="">Hello, {userdetails?.First_Name}</p>
                                </div>
                            )}
                        </div>
                        <Link to='/setting'>
                            <div className='  text-white cursor-pointer rounded-xl flex justify-center items-center md:gap-2 bg-gray-300 p-2 gap-1'>
                                <i className="fi fi-rr-pencil flex text-blue-500  justify-center items-center text-xs"></i>
                                <p className="md:text-base text-xs text-blue-500">Edit Profile</p>
                            </div>
                        </Link>
                    </div>
                    {/* Nav Links with Active State */}
                    <ul className="flex bg-white gap-4 overflow-hidden w-full overflow-x-auto scrollbar-hide ">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.to;
                            return (
                                <li key={link.to} className=" md:text-base text-sm  ">
                                    <Link to={link.to} className={`relative md:px-4 px-2 py-2 block font-bold ${isActive ? 'text-primary  ' : 'text-gray-600'}`}  >
                                        {link.label}
                                        {isActive && (<div className="absolute top-0 left-0 w-full h-1 bg-secondary"></div>)}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </aside>
                <main className="flex-1">
                    <Outlet />
                </main>
            </div>
        </>
    );
}

export default AccountLayout;
