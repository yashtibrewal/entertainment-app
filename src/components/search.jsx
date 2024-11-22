import { FaSearch } from "react-icons/fa";
import "../App.css"


export default function Search () {
  return (
    <div className="flex gap-2 justify-center  mt-4 ml-4 sm:justify-start sm:ml-8">
     <div>
     <FaSearch
     className="w-7 h-5 mt-3 text-white "
      />

     </div>
     <div>
     <input 
  type="search" 
  name="search" 
  id="search" 
  autoFocus 
  placeholder="Search for movies or TV series" 
  className="h-10 w-full sm:w-96 min-w-[200px] text-xl bg-black text-white outline-none px-3"
/>
     </div>
    </div>
  )
}