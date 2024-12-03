import { FaSearch } from "react-icons/fa";
import "../App.css"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { searchMovies, searchTVSeries } from "../store/Redux/SearchSlice";

export default function Search () {
  const[input,setInput]=useState('');
  const dispatch = useDispatch();
  const location = useLocation();

  const { movies, tvSeries, loading, error } = useSelector(state => state.search );

  useEffect(() => {
    const handler = setTimeout(() => {
      if (input.trim()) { // if empty
        dispatch(searchMovies(input));
        dispatch(searchTVSeries(input));
      } else {
        // dispatch(clearSearchResults());
        // Depending on which page we are on, dispatch functions respectively.
        // clearSearchResults();
        const path = location.pathname;
        
        // TODO:
        switch (path) {

          case '/':
            break;
          
          case '/bookmark':
            break;
         
          case '/movies':
            break;
      
          case '/tv-series':
            break;

          default:
            console.error('Route not handled');
            break;
        }

      }
    }, 1000);

    return () => {
      clearTimeout(handler); 
    };
  }, [input, dispatch, location.pathname]);




  return (
    <div className="flex gap-2 justify-center  mt-4 ml-4 sm:justify-start sm:ml-8">
     <div>
      <FaSearch className="w-7 h-5 mt-3 text-white "/>
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