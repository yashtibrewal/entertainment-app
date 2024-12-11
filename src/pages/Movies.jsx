import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "../components/Content/List";
import {
  fetchAllMovieBookmarks,
  fetchAllMovies,
} from "../store/Redux/MovieSlice";
import styles from "./../components/common-media/content.module.css";
import { SeriesSection } from "./TvSeries/SerieisSection";
import { MEDIA_TYPE } from "../constants";

function Movies() {
  const dispatch = useDispatch();
  const {
    searchedMovies,
    popularMovies,
    trendingMovies,
    nowPlayingMovies,
    upcomingMovies,
    loading,
    error,
  } = useSelector((state) => state.movies);
  const movieBookmarks = useSelector((state) => state.movies.movieBookmarks);
 
  useEffect(() => {
    dispatch(fetchAllMovies());
    dispatch(fetchAllMovieBookmarks());
  }, [dispatch]);

  const addMediaType = (movie) => ({ ...movie, media_type: MEDIA_TYPE.MOVIES });

  const populateBookmark = useCallback(
    (movie) => {
      let bookmark = false;
      const searchedMovie = movieBookmarks.find(
        (bookmark) => bookmark.movie_id === movie.id
      );
      if (searchedMovie) {
        bookmark = searchedMovie.bookmark;
      }
      return { ...movie, bookmark };
    },
    [movieBookmarks]
  );

  const processMovies = (movies) => {
    return movies.map((movie) => populateBookmark(addMediaType(movie)));
  };

  const processedPopularMovies = processMovies(popularMovies);
  const processedTrendingMovies = processMovies(trendingMovies);
  const processedNowPlayingMovies = processMovies(nowPlayingMovies);
  const processedUpcomingMovies = processMovies(upcomingMovies);

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>Error: {error}</p>;

  if (searchedMovies.length) {
    const processedSearchedMovies = searchedMovies.map((movie) =>
      populateBookmark(addMediaType(movie))
    );
    return (
      <div className="md:ml-4 p-4 max-w-[calc(100vw-120px)] home-width">
        <h1 className={styles.headings}>Movies</h1>
        <div className={styles.content}>
          {processedSearchedMovies.map((card, index) => (
            <div key={index}>
              <List cards={[{ ...card, media_type: "movie" }]} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="md:ml-4 p-4 max-w-[calc(100vw-120px)] gap-y-5 home-width">
      <h1 className={styles.headings}>Movies</h1>
      <hr />
      <SeriesSection
        title="Popular Movies"
        series={processedPopularMovies}
        emptyMessage="No Popular Movies"
      />
      <SeriesSection
        title="Upcoming Movies"
        series={processedUpcomingMovies}
        emptyMessage="No upcoming Movies"
      />
      <SeriesSection
        title="Trending Movies"
        series={processedTrendingMovies}
        emptyMessage="No trending Movies"
      />
      <SeriesSection
        title="Now Playing Movies"
        series={processedNowPlayingMovies}
        emptyMessage="No Playing Movies"
      />
    </div>
  );
}

export default Movies;
