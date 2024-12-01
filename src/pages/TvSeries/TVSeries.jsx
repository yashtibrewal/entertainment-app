import '../../App.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import TrendingSeries from '../TvSeries/TrendingSeries'
import { fetchAllTVSeries } from '../../components/Redux/TvSeriesSlice';
import Series from './RestSeries/Series';



export default function HomePage() {

    const dispatch = useDispatch();
    const { popular,trending , airingToday, onTheAir, loading, error } = useSelector((state) => state.tvSeries);
  console.log("trending:",trending);
    useEffect(() => {
      dispatch(fetchAllTVSeries());
    }, [dispatch]);
  
    if (loading) return <p>Loading TV series...</p>;
    if (error) return <p>Error: {error}</p>;


 
  return (

      <div className="overflow-x-hidden">
      {/* Trending Section */}
      <div className="max-w-[calc(100vw-120px)] md:ml-4 p-4">
        <TrendingSeries trending={trending} popular={popular} />
      </div>
 {/* on Air Today Section */}
     
      <div className=" home-width max-w-[calc(100vw-120px)] md:ml-4 p-4">
        <h1 className="text-white text-2xl font-semibold mb-4">On-The-Air</h1>
        {/* Responsive grid layout for Recommended */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
         {airingToday.map((card, index) => (
            <div key={index} className="recommended-card">
              <Series card={[card]} />
            </div>
          ))} 
           
        </div>
      </div>

      {/* Popular Section  */}

      <div className=" home-width max-w-[calc(100vw-120px)] md:ml-4 p-4">
        <h1 className="text-white text-2xl font-semibold mb-4">Airing Today</h1>
        {/* Responsive grid layout for Recommended */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
         {airingToday.map((card, index) => (
            <div key={index} className="recommended-card">
              <Series card={[card]} />
            </div>
          ))} 
           
        </div>
      </div>

       {/* Airing Today Section  */}

       <div className=" home-width max-w-[calc(100vw-120px)] md:ml-4 p-4">
        <h1 className="text-white text-2xl font-semibold mb-4">Popular</h1>
        {/* Responsive grid layout for Recommended */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
         {popular.map((card, index) => (
            <div key={index} className="recommended-card">
              <Series card={[card]} />
            </div>
          ))} 
           
        </div>
      </div>
      
    </div>
 
  );
}