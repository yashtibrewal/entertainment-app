import Trending from "../components/Trending/trending";
import Recommended from '../components/Recommended/recommended'
import '../App.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllMovieBookmarks, fetchAllMovies } from '../components/Redux/MovieSlice';
import { useEffect, useState } from "react";

export default function HomePage() {
  console.log('home page')

  const dispatch = useDispatch();
  const { popularMovies, trendingMovies, loading, error } = useSelector((state) => state.movies);

  console.log("popularMovies :", popularMovies);

  const [popMovies, setPopMovies] = useState([]);

  useEffect(() => {
    dispatch(fetchAllMovies());
    dispatch(fetchAllMovieBookmarks());
  }, [dispatch]);

  const setMediaAsMovie = movie => { return { ...movie, media_type: 'movie' }; }

  useEffect(() => {
    setPopMovies(popularMovies.map(setMediaAsMovie));
  }, [popularMovies])

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
          {popMovies.map((card, index) => (
            <div key={index} className="recommended-card">
              <Recommended card={[card]} />
            </div>
          ))}
        </div>
      </div>
    </div>

  );
}