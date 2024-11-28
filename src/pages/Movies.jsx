import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Recommended from "../components/recommended";
import { fetchAllMovies } from "../components/Redux/MovieSlice";

function Movies() {
const dispatch = useDispatch();
  const { popularMovies, trendingMovies, nowPlayingMovies, upcomingMovies, loading, error } = useSelector((state) => state.movies);
 console.log("popularMovies :",popularMovies);
  useEffect(() => {
    dispatch(fetchAllMovies());
  }, [dispatch]);

  const allMovies = useMemo(() => {
    const combinedMovies = [
      ...popularMovies,
      ...trendingMovies,
      ...nowPlayingMovies,
      ...upcomingMovies,
    ];

    const uniqueMovies = combinedMovies.reduce((acc, movie) => {
      if (!acc.some((m) => m.id === movie.id)) {
        acc.push(movie);
      }
      return acc;
    }, []);

    return uniqueMovies;
  }, [popularMovies, trendingMovies, nowPlayingMovies, upcomingMovies]);


  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className=" home-width max-w-[calc(100vw-120px)] md:ml-4 p-4">
    {/* <h1 className="text-white text-2xl font-semibold mb-4">Recommended for you</h1> */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {allMovies.map((card, index) => (
        <div key={index} className="recommended-card">
          <Recommended card={[card]} />
        </div>
      ))}
     
    </div>
  </div>
  );
}

export default Movies;
