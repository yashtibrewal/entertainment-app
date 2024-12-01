import '../../App.css'
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from "react";
import TrendingSeries from '../TvSeries/TrendingSeries'
import { fetchAllTVSeries, fetchAllTVSeriesBookmarks } from '../../components/Redux/TvSeriesSlice';
import Series from './RestSeries/Series';
import styles from '../../components/common-media/content.module.css';
import { MEDIA_TYPE } from '../../constants';


export default function HomePage() {

  const dispatch = useDispatch();
  const { popular, trending, airingToday, onTheAir, tvSeriesBookmarks, loading, error } = useSelector((state) => state.tvSeries);
  const [popularTVSeries, setPopTVSeries] = useState([]);
  const [trendingTVSeries, setTrendingTVSeries] = useState([]);
  
  useEffect(() => {
    dispatch(fetchAllTVSeries());
    dispatch(fetchAllTVSeriesBookmarks());
  }, [dispatch]);

  /**
   * Takes in single tvSerieis and populates its bookmark.
   */
  const populateBookmark = useCallback((tvSeries) => {
    let bookmark = false;
    const searchedTvSeries = tvSeriesBookmarks.find((bookmarkObj) => bookmarkObj.series_id === tvSeries.id);
    if (searchedTvSeries) {
      bookmark = searchedTvSeries.bookmark;
    }
    const updatedTVSeries = { ...tvSeries, bookmark };
    return updatedTVSeries;
  }, [tvSeriesBookmarks])

  const setMediaAsTVSeries = series => { return { ...series, media_type: MEDIA_TYPE.TV_SERIES }; }

  useEffect(() => {
    const popularTVSeriesWithMedia = popular.map(setMediaAsTVSeries);
    const popularTVSeriesWithBookmark = popularTVSeriesWithMedia.map(populateBookmark);
    setPopTVSeries(popularTVSeriesWithBookmark);
  }, [popular, populateBookmark])

  useEffect(() => {
    const trendingTVSeriesWithMediaType = trending.map(setMediaAsTVSeries);
    const trendingTVSeriesWithBookmark = trendingTVSeriesWithMediaType.map(populateBookmark);
    setTrendingTVSeries(trendingTVSeriesWithBookmark);
  }, [trending, populateBookmark]);


  if (loading) return <p>Loading TV series...</p>;
  if (error) return <p>Error: {error}</p>;



  return (

    <div className="overflow-x-hidden">
      {/* Airing today section */}

      <div className="md:ml-4 p-4 max-w-[calc(100vw-120px)] home-width">
        <h1 className="mb-4 font-semibold text-2xl text-white">On-The-Air</h1>
        {/* Responsive grid layout for Recommended */}
        <div className={styles.content}>
          {airingToday.map((card, index) => (
            <div key={index}>
              <Series card={[card]} />
            </div>
          ))}

        </div>
      </div>

      {/* Popular Section  */}

      <div className="md:ml-4 p-4 max-w-[calc(100vw-120px)] home-width">
        <h1 className="mb-4 font-semibold text-2xl text-white">Popular</h1>
        {/* Responsive grid layout for Recommended */}
        <div className={styles.content}>
          {popularTVSeries.map((card, index) => (
            <div key={index}>
              <Series card={[card]} />
            </div>
          ))}

        </div>
      </div>

    </div>

  );
}