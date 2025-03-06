import { Outlet } from "react-router-dom"
import Topbar from "./Topbar"
import Sidebar from "./Sidebar"

const Adminmain = () => {
  return (
    <>

      <Sidebar />
      <main className="w-full px-4 sm:px-6 md:px-4 3xl:ps-[17rem]  h-screen  ">
        <Topbar />
        <Outlet />
      </main>
    </>
  )
}
export default Adminmain