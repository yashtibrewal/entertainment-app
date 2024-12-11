import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "../components/Content/List";
import { fetchAllMovieBookmarks, fetchAllMovies } from "../store/Redux/MovieSlice";
import styles from './../components/common-media/content.module.css';
import { useOutletContext } from 'react-router-dom';
import { clearSearchResults, searchMovies } from "../store/Redux/SearchSlice";

function Movies() {
  const dispatch = useDispatch();
  const { searchQuery } = useOutletContext();

  const {
    searchedMovies,
    popularMovies,
    trendingMovies,
    nowPlayingMovies,
    upcomingMovies,
    movieBookmarks,
    loading,
    error,
  } = useSelector((state) => ({...state.movies,searchedMovies:state.search.movies}));
console.log("searchedMovies:",searchedMovies);
  useEffect(() => {
    // Fetch all movies and bookmarks on component mount
    dispatch(fetchAllMovies());
    dispatch(fetchAllMovieBookmarks());
  }, [dispatch]);

  useEffect(() => {
// debouncing implemented
    const id=setTimeout(()=>{
      if (searchQuery) {
        dispatch(searchMovies(searchQuery));
      }else{
        // clearing search result when iput is empty
        dispatch(clearSearchResults());
      }
    },1000)
    return function(){
      clearTimeout(id)
    }
  }, [searchQuery, dispatch]);

  const addMediaType = useCallback(
    (movie) => ({ ...movie, media_type: 'movie' }),
    []
  );

  const populateBookmark = useCallback(
    (movie) => {
      const bookmarked = movieBookmarks.find((bookmark) => bookmark.movie_id === movie.id);
      return { ...movie, bookmark: !!bookmarked };
    },
    [movieBookmarks]
  );

  const allMovies = [
    ...popularMovies,
    ...trendingMovies,
    ...nowPlayingMovies,
    ...upcomingMovies,
  ]
    .map(addMediaType)
    .filter((movie, index, self) => self.findIndex((m) => m.id === movie.id) === index) // Remove duplicates
    .map(populateBookmark);

  const processedSearchedMovies = searchedMovies.map((movie) =>
    populateBookmark(addMediaType(movie))
  );

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>Error: {error}</p>;

  // Render search results if a search query exists and results are available
  if (searchQuery && searchedMovies.length > 0) {
    return (
      <div className="md:ml-4 p-4 max-w-[calc(100vw-120px)] home-width">
        <h1 className={styles.headings}>Search Results</h1>
        <div className={styles.content}>
          <List cards={processedSearchedMovies} />
        </div>
      </div>
    );
  }

  // Render no search results message if a query exists but no results
  if (searchQuery && searchedMovies.length === 0) {
    return (
      <div className="md:ml-4 p-4 max-w-[calc(100vw-120px)] home-width">
        <h1 className={styles.headings}>Search Results</h1>
        <p>No results found for "{searchQuery}"</p>
      </div>
    );
  }

  // Render all movies by default
  return (
    <div className="md:ml-4 p-4 max-w-[calc(100vw-120px)] gap-y-5 home-width">
      <h1 className={styles.headings}>Movies</h1>
      <div className={styles.content}>
        <List cards={allMovies} />
      </div>
    </div>
  );
}

export default Movies;
