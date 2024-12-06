import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "../components/Content/List";
import { fetchAllMovieBookmarks, fetchAllMovies } from "../store/Redux/MovieSlice"
import styles from './../components/common-media/content.module.css';

function Movies() {
  const dispatch = useDispatch();
  const { searchedMovies, popularMovies, trendingMovies, nowPlayingMovies, upcomingMovies, loading, error } = useSelector((state) => state.movies);
  const movieBookmarks = useSelector((state) => state.movies.movieBookmarks);

  useEffect(() => {
    dispatch(fetchAllMovies());
    dispatch(fetchAllMovieBookmarks());

  }, [dispatch]);

  const addMediaType = (movie) => {
    return { ...movie, media_type: 'movie' };
  }

  const populateBookmark = useCallback((movie) => {
    let bookmark = false;
    const searchedMovie = movieBookmarks.find((bookmark) => bookmark.movie_id === movie.id);
    if (searchedMovie) {
      bookmark = searchedMovie.bookmark;
    }
    const updatedMovie = { ...movie, bookmark };
    return updatedMovie;
  }, [movieBookmarks]);

  const allMovies = useMemo(() => {
    let combinedMovies = [
      ...popularMovies,
      ...trendingMovies,
      ...nowPlayingMovies,
      ...upcomingMovies,
    ];

    // Setting media type to movie since this is a movie's page
    combinedMovies = combinedMovies.map((movie) => addMediaType(movie));

    let uniqueMovies = combinedMovies.reduce((acc, movie) => {
      if (!acc.some((m) => m.id === movie.id)) {
        acc.push(movie);
      }
      return acc;
    }, []);

    if (movieBookmarks?.length) {
      //  console.log('movieBookmarks', movieBookmarks)
      uniqueMovies = uniqueMovies.map(populateBookmark)
    }

    return uniqueMovies;
  }, [popularMovies, trendingMovies, nowPlayingMovies, upcomingMovies, movieBookmarks, populateBookmark]);


  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>Error: {error}</p>;

  if(searchedMovies.length){
    return (
      <div className="md:ml-4 p-4 max-w-[calc(100vw-120px)] home-width">
      <h1 className={styles.headings}>Movies</h1>
      <div className={styles.content}>
        {searchedMovies.map((card, index) => (
          <div key={index}>
            <List cards={[{ ...card, media_type: 'movie' }]} />
          </div>
        ))}
      </div>
    </div>
    )
  }

  return (
    <div className="md:ml-4 p-4 max-w-[calc(100vw-120px)] home-width">
      <h1 className={styles.headings}>Movies</h1>
      <div className={styles.content}>
        {allMovies.map((card, index) => (
          <div key={index}>
            <List cards={[{ ...card, media_type: 'movie' }]} />
          </div>
        ))}

      </div>
    </div>
  );
}

export default Movies;
