import { useEffect, useState } from "react";

import { MEDIA_TYPE, UI_MESSAGES } from "../../constants";
import { getBookmarkedMovies, getBookmarkedTVSeries } from "./api";
import style from './../../components/common-media/content.module.css';
import List from "../../components/Content/List";
import { getMovieApi } from "../movie/api";
import { getTvSeriesApi } from "../tv/api";

function Bookmarks() {

  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);
  // TODO: handle for bookmarked tv series.
  // TODO: handle unbookmark and bookmark
  const [bookmarkedTvSeries, setBookmarkedTvSeries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getContent = async () => {
      try {
        setLoading(true);

        // Getting bookmared Movies and TV Series parellely
        const movies_promise = getBookmarkedMovies();
        const tv_serires_promise = getBookmarkedTVSeries();
        const [movieBookmarksResponse, tvSeriesBookmarksResponse] = await Promise.all([movies_promise, tv_serires_promise])

        const movieIds = [], tvSeriesIds = [];
        const bookmarkedMoviesPromises = [];
        const bookmarkedTVSeriesPromises = [];

        // Fetching all movies which are bookmarked
        movieBookmarksResponse.result.forEach(movieBookmark => {
          movieIds.push(movieBookmark.movie_id);
        });
        movieIds.forEach(id => {
          bookmarkedMoviesPromises.push(getMovieApi(id));
        });

        // Fetching all tv series which are bookmarked.
        tvSeriesBookmarksResponse.result.forEach(tvSeriesDataResponse => {
          tvSeriesIds.push(tvSeriesDataResponse.tv_series_id);
        });
        tvSeriesIds.forEach(id => {
          bookmarkedTVSeriesPromises.push(getTvSeriesApi(id));
        });

        // Waiting for all requests to complete
        const [bookmarkedMovies, bookmarkedTVSeries] = await Promise.all([
          Promise.all(bookmarkedMoviesPromises),
          Promise.all(bookmarkedTVSeriesPromises),
        ]);

        // Setting media_types
        const moviesWithMediaType = bookmarkedMovies.map(movie => ({
          ...movie.result,
          media_type: MEDIA_TYPE.MOVIES,
        }));
        const tvSeriesWithMediaType = bookmarkedTVSeries.map(tvSeries => ({
          ...tvSeries.result,
          media_type: MEDIA_TYPE.TV_SERIES,
        }));

        return [moviesWithMediaType, tvSeriesWithMediaType];

      } catch (error) {
        console.log(error);
      }
    }

    getContent()
      .then(([movies, tvSeries]) => {
        setBookmarkedMovies(movies);
        setBookmarkedTvSeries(tvSeries);
      })
      .finally(() => setLoading(false));
  }, [])

  if (loading) {
    return <>Loading</>
  }

  return (
    <div className="ml-4 Bookmarks">
      <div className={style.content + ' mt-10'}>
      {bookmarkedMovies.length > 0 ? (
        bookmarkedMovies.map((movie, index) => (
          <div key={index}>
            <List card={[movie]} />
          </div>
        ))
      ) : (
        <>No Movies has been found.</>
      )}
      {bookmarkedTvSeries.length > 0 ? (
        bookmarkedTvSeries.map((movie, index) => (
          <div key={index}>
            <List card={[movie]} />
          </div>
        ))
      ) : (
        <>No TV Series Found.</>
      )}
      </div>
    </div>
  );
}

export default Bookmarks;
