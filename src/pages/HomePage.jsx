import Trending from "../components/trending";
import Recommended from '../components/recommended'
import '../App.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllMovies } from '../components/Redux/MovieSlice';
import { useEffect } from "react";

export default function HomePage() {
  console.log('home page')
  const dispatch = useDispatch();
  const { popularMovies, trendingMovies, loading, error } = useSelector((state) => state.movies);
  console.log("popularMovies :", popularMovies);
  useEffect(() => {
    console.log('calling dispatch')
    dispatch(fetchAllMovies());
  }, [dispatch]);


  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>Error: {error}</p>;

  return (

    <div className="overflow-x-hidden">
      {/* Trending Section */}
      <div className="md:ml-4 p-4 max-w-[calc(100vw-120px)]">
        <Trending trendingMovies={trendingMovies} />
      </div>

      {/* Recommended Section  */}
      <div className="md:ml-4 p-4 max-w-[calc(100vw-120px)] home-width">
        <h1 className="mb-4 font-semibold text-2xl text-white">Recommended for you</h1>
        
        {/* Responsive grid layout for Recommended */}
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {popularMovies.map((card, index) => (
            <div key={index} className="recommended-card">
              <Recommended card={[card]} />
            </div>
          ))}
        </div>
      </div>
    </div>

  );
}