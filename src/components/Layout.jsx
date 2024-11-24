import Navbar from "./navbar";
import Search from "./search";


function Layout({ children }) {

  return (
    <div className="main-container flex flex-col md:flex-row min-h-screen bg-black text-white">
      {/* Navbar */}
      <Navbar className="w-full md:w-16 h-auto md:h-screen" />
      <div className=" main-container flexing flex flex-col flex-1">
        {/* Search Component */}
        <Search className="padding flex-shrink-0 p-4" />
        {/* Page Content */}
        <div className="flexing flex-1 px-16 overflow-auto md:mt-8">
          {children}
        </div>
      </div>
    </div>
  )

}

export default Layout;