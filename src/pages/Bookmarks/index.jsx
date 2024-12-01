import { useEffect, useState } from "react";
import { getBookmarkedMovies, getBookmarkedTVSeries } from "./api";
import style from './../../components/common-media/content.module.css';
import Recommended from "../../components/Recommended/recommended";
import ContentCard from "../../components/Recommended/ContentCard";
import { useNavigate } from "react-router-dom";
import { getMovieApi } from "../movie/api";
import { getTvSeriesApi } from "../tv/api";
import { MEDIA_TYPE } from "../../constants";

function Bookmarks() {

  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);
  // TODO: handle for bookmarked tv series.
  // TODO: handle unbookmark and bookmark
  const [bookmarkedTvSeries, setBookmarkedTvSeries] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getContent = async () => {
      try {
        setLoading(true);

        const movies_promise = getBookmarkedMovies();
        const tv_serires_promise = getBookmarkedTVSeries();
        const [movieBookmarksResponse, tvSeriesBookmarksResponse] = await Promise.all([movies_promise, tv_serires_promise])

        const movieIds = [], tvSeriesIds = [];
        const bookmarkedMoviesPromises = [];
        const bookmarkedTVSeriesPromises = [];

        movieBookmarksResponse.result.forEach(movieBookmark => {
          movieIds.push(movieBookmark.movie_id);
        });
        movieIds.forEach(id => {
          bookmarkedMoviesPromises.push(getMovieApi(id));
        });
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
      <p>Bookmarks Page</p>
      <div className={style.content}>
        {bookmarkedMovies.map((movie, index) => (
          <div key={index} className="recommended-card">
            <Recommended card={[movie]} />
          </div>
        ))}
      </div>
    </div>

  );
}

export default Bookmarks;
