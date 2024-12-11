import { FaSearch } from "react-icons/fa";
import "../App.css"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { clearSearchResults, searchMovies, searchTVSeries } from "../store/Redux/SearchSlice";
import { setSearchedMovies } from "../store/Redux/MovieSlice";
import { setSearchedTVSeries } from "../store/Redux/TvSeriesSlice";

export default function Search ({ onSearchChange }) {
  const[input,setInput]=useState('');
  // const dispatch = useDispatch();
  const location = useLocation();

  const { movies, tvSeries, loading, error } = useSelector(state => state.search );

  // useEffect(()=> {
  //   dispatch(setSearchedMovies(movies));
  // }, [movies]);

  // useEffect(()=> {
  //   dispatch(setSearchedTVSeries(tvSeries));
  // }, [tvSeries]);

  // useEffect(() => {
  //   const handler = setTimeout(() => {
  //     if (input.trim()) {
  //       dispatch(searchMovies(input));
  //       dispatch(searchTVSeries(input));
  //     } else {
  //       const path = location.pathname;
  //       switch (path) {

  //         case '/':
  //           dispatch(clearSearchResults())
           
  //           break;
          
  //         // TODO: implement search for bookmarks.
  //         case '/bookmark':
            
  //           break;
         
  //         case '/movies':
  //           dispatch(clearSearchResults())
            
  //           break;
      
  //         case '/tv-series':
  //           dispatch(clearSearchResults())
            
  //           break;

  //         default:
  //           console.error('Route not handled');
  //           break;
  //       }

  //     }
  //   }, 1000);

  //   return () => {
  //     clearTimeout(handler); 
  //   };
  // }, [input, dispatch, location.pathname]);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setInput(query);
    onSearchChange(query); 
    
  };

  useEffect(() => {
    setInput(""); 
  }, [location.pathname]);




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
        onChange={handleInputChange}
        value={input}
        placeholder="Search for movies or TV series" 
        className="h-10 w-full sm:w-96 min-w-[200px] text-xl bg-black text-white outline-none px-3"
      />

     </div>


    </div>
  )
}