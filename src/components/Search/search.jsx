import { FaSearch } from "react-icons/fa";
import "../../App.css"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchMovies, searchTVSeries, clearSearchResults } from "../Redux/searchSlice";

export default function Search () {
  const[input,setInput]=useState('');
  const dispatch = useDispatch();
  const { movies, tvSeries, loading, error } = useSelector((state) => state.search);


  useEffect(() => {
    const handler = setTimeout(() => {
      if (input.trim()) {
        dispatch(searchMovies(input));
        dispatch(searchTVSeries(input));
        setInput("")
      } else {
        dispatch(clearSearchResults());
      }
    }, 300);

    return () => {
      clearTimeout(handler); 
    };
  }, [input, dispatch]);




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
  onChange={(e)=>setInput(e.target.value)}
  value={input}
  placeholder="Search for movies or TV series" 
  className="h-10 w-full sm:w-96 min-w-[200px] text-xl bg-black text-white outline-none px-3"
/>

     </div>


    </div>
  )
}