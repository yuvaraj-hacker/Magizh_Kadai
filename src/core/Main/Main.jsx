
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Sidebar from "../../shared/Components/Sidebar/Sidebar";
import { useState } from "react";
import HeaderFunction from "../Header/HeaderFunction";


const Main = () => {

    const isProfilePage = window.location.pathname === '/profile';
    const [TogSidecat, setTogSidecat] = useState(false);

    return (
        <>
            <HeaderFunction />
            <Sidebar setTogSidecat={setTogSidecat} TogSidecat={TogSidecat} />
            <main className="pt-[66px] lg:pt-[105px]">
                <Outlet />
                {!isProfilePage || window.innerWidth >= 1024 ? (
                    <Footer className="hidden md:block" setTogSidecat={setTogSidecat} TogSidecat={TogSidecat} />
                ) : null}
            </main>
        </>
    );
};

export default Main;



