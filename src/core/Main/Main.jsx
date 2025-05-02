
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


    // const location = useLocation();
    // const setCartType = useCart(state => state.setCartType);

    // useEffect(() => {
    //   const searchParams = new URLSearchParams(location.search);
    //   const isB2B = searchParams.get('showB2B') === 'true';
    //   setCartType(isB2B);
    // }, [location.search]);


    return (
        <>
            <HeaderFunction />
            {/* <div className="lg:hidden block">
                <Layout />
            </div> */}
            <Sidebar setTogSidecat={setTogSidecat} TogSidecat={TogSidecat} />
            <main className="md:pt-[101px] pt-[100px] lg:pt-[130px]">
                <Outlet />
                {!isProfilePage || window.innerWidth >= 1024 ? (
                    <Footer className="hidden md:block" setTogSidecat={setTogSidecat} TogSidecat={TogSidecat} />
                ) : null}
            </main>
        </>
    );
};

export default Main;



