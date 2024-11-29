import Trending from "../components/Trending/trending";
import Recommended from '../components/Recommended/recommended'
import '../App.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllMovieBookmarks, fetchAllMovies } from '../components/Redux/MovieSlice';
import { useCallback, useEffect, useState } from "react";

export default function HomePage() {
  console.log('home page')

  const dispatch = useDispatch();
  const { popularMovies, trendingMovies, loading, error } = useSelector((state) => state.movies);
  const movieBookmarks = useSelector((state) => state.movies.movieBookmarks);
  const [popMovies, setPopMovies] = useState([]);
  const [trendingMoviesLocal, setTrendingMoviesLocal] = useState([]);

  useEffect(() => {
    dispatch(fetchAllMovies());
    dispatch(fetchAllMovieBookmarks());
  }, [dispatch]);

  const populateBookmark = useCallback((movie) => {
    let bookmark = false;
    const searchedMovie = movieBookmarks.find((bookmarkObj) => bookmarkObj.movie_id === movie.id);
    console.log(searchedMovie);
    if (searchedMovie) {
      bookmark = searchedMovie.bookmark;
    }
    const updatedMovie = { ...movie, bookmark };
    return updatedMovie;
  }, [movieBookmarks])

  const setMediaAsMovie = movie => { return { ...movie, media_type: 'movie' }; }

  useEffect(() => {
    const popularMoviesWithMedia = popularMovies.map(setMediaAsMovie);
    const popularMoviesWithBookmark = popularMoviesWithMedia.map(populateBookmark);
    setPopMovies(popularMoviesWithBookmark);
  }, [popularMovies, populateBookmark])

  useEffect(() => {
    const trendingMoviesWithMediaType = trendingMovies.map(setMediaAsMovie);
    const trendingMoviesWithBookmark = trendingMoviesWithMediaType.map(populateBookmark);
    setTrendingMoviesLocal(trendingMoviesWithBookmark);
  }, [trendingMovies, populateBookmark]);

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>Error: {error}</p>;

  return (

    <div className="overflow-x-hidden">
      {/* Trending Section */}
      <div className="md:ml-4 p-4 max-w-[calc(100vw-120px)]">
        <Trending trendingMovies={trendingMoviesLocal} />
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