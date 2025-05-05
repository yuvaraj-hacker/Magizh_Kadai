
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";
import Sidebar from "../../shared/Components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import HeaderFunction from "../Header/HeaderFunction";
import useCart from "../../shared/services/store/useCart";
// import Layout from "../../components/MyAccountLayout/Layout";


const Main = () => {
    const isProfilePage = window.location.pathname === '/profile';
    const [TogSidecat, setTogSidecat] = useState(false);

        // useEffect(() => {
        //     const handleClick = (e) => {
        //       const anchor = e.target.closest("a");
        //       if (
        //         anchor &&
        //         anchor.href &&
        //         anchor.target !== "_blank" &&
        //         !anchor.href.includes("/cart") // 👈 Skip refresh for /cart
        //       ) {
        //         e.preventDefault(); // Prevent default client-side nav
        //         window.location.href = anchor.href; // Force full page reload
        //       }
        //     };
        //     // Attach event listener
        //     document.addEventListener("click", handleClick);
        //     // Cleanup on unmount
        //     return () => {
        //         document.removeEventListener("click", handleClick);
        //     };
        // }, []);

    return (
        <>
            <HeaderFunction />
            {/* <div className="lg:hidden block">
                <Layout />
            </div> */}
            <Sidebar setTogSidecat={setTogSidecat} TogSidecat={TogSidecat} />
            <main className="md:pt-[101px] pt-[150px]   lg:pt-[130px]">
                <Outlet />
                {!isProfilePage || window.innerWidth >= 1024 ? (
                    <Footer className="hidden md:block" setTogSidecat={setTogSidecat} TogSidecat={TogSidecat} />
                ) : null}
            </main>
        </>
    );
};

export default Main;



