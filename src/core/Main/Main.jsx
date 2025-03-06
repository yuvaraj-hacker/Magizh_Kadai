
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Sidebar from "../../shared/Components/Sidebar/Sidebar";
import { useState } from "react";
import HeaderFunction from "../Header/HeaderFunction";
// import Layout from "../../components/MyAccountLayout/Layout";


const Main = () => {

    const isProfilePage = window.location.pathname === '/profile';
    const [TogSidecat, setTogSidecat] = useState(false);

    return (
        <>
            <HeaderFunction />
            {/* <div className="lg:hidden block">
                <Layout />
            </div> */}
            <Sidebar setTogSidecat={setTogSidecat} TogSidecat={TogSidecat} />
            <main className="md:pt-[41px] pt-[50px] lg:pt-[130px]">
                <Outlet />
                {!isProfilePage || window.innerWidth >= 1024 ? (
                    <Footer className="hidden md:block" setTogSidecat={setTogSidecat} TogSidecat={TogSidecat} />
                ) : null}
            </main>
        </>
    );
};

export default Main;



