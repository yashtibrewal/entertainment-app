import { useEffect, useState } from "react";

import { MEDIA_TYPE, UI_MESSAGES } from "../../constants";
import { getBookmarkedMovies, getBookmarkedTVSeries } from "./api";
import style from './../../components/common-media/content.module.css';
import List from "../../components/Content/List";
import { getMovieApi } from "../movie/api";
import { getTvSeriesApi } from "../../components/tv/api.js";
import styles from '../../components/common-media/content.module.css';
import LoaderSpinner from "../../components/LoaderSpinner";
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
        const moviesWithMediaTypeAndBookmark = bookmarkedMovies.map(movie => ({
          ...movie.result,
          media_type: MEDIA_TYPE.MOVIES,
          bookmark: true,
        }));
        const tvSeriesWithMediaTypeAndBookmark = bookmarkedTVSeries.map(tvSeries => ({
          ...tvSeries.result,
          media_type: MEDIA_TYPE.TV_SERIES,
          bookmark: true,
        }));

        return [moviesWithMediaTypeAndBookmark, tvSeriesWithMediaTypeAndBookmark];

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getContent()
      .then(([movies, tvSeries]) => {
        setBookmarkedMovies(movies);
        setBookmarkedTvSeries(tvSeries);
      })
      .finally(() => setLoading(false));
  }, [])

  if (loading)<LoaderSpinner/>

  const noBookmarkMessage = () => {

    if(!bookmarkedMovies.length && !bookmarkedTvSeries.length)
    {   
      return <div className="md:ml-4 p-4 max-w-[calc(100vw-120px)] gap-y-5 home-width">
            <h1 className={styles.headings + ' mt-10'}>No Movies or T.V. Series Bookmarked.</h1>
          </div>
    }else {
      return (
        <div className="ml-4 Bookmarks">
          <h1 className={styles.headings + ' mt-10'}>Bookmarked Movies and T.V. Series</h1>
          <div className={style.content}>
            <List cards={[...bookmarkedMovies, ...bookmarkedTvSeries]}></List>
          </div>
        </div>
      );
    }

  }


  return noBookmarkMessage();

}

export default Bookmarks;
