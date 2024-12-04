import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Search from "./search";


function Layout() {

  return (
    <div className="flex md:flex-row flex-col bg-black py-5 min-h-screen text-white main-container">
      <Navbar className="w-full md:w-16 h-auto md:h-screen" />
      <div className="flex flexing flex-col flex-1 main-container">
        <Search className="flex-shrink-0 p-4 padding" />
        <div className="flexing flex-1 md:mt-8 px-16 overflow-auto">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  )

}

export default Layout;