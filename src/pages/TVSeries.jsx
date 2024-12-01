import Trending from "../components/Trending/trending";
import Recommended from '../components/Recommended/recommended'
import '../App.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { fetchAllTVSeries } from "../components/Redux/TvSeriesSlice";



export default function TVSeries() {

  const dispatch = useDispatch();
  const { popular, trending, airingToday, onTheAir, loading, error } = useSelector((state) => state.tvSeries);
////  console.log("trending :",trending);
console.log("popular:",popular);//giving me as undefined?

  useEffect(() => {
    dispatch(fetchAllTVSeries());
  }, [dispatch]);

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>Error: {error}</p>;
 
  return (

      <div className="overflow-x-hidden">
      {/* Trending Section */}
      <div className="md:ml-4 p-4 max-w-[calc(100vw-120px)]">
        <Trending trendingMovies={trending} />
      </div>

      {/* Recommended Section  */}
      <div className="md:ml-4 p-4 max-w-[calc(100vw-120px)] home-width">
        <h1 className="mb-4 font-semibold text-2xl text-white">Recommended for you</h1>
        {/* Responsive grid layout for Recommended */}
        <div className={styles.content}>
          {popular.map((card, index) => (
            <div key={index}>
              <Recommended card={[card]} />
            </div>
          ))} 
        </div>
      </div>
    </div>
 
  );
}
