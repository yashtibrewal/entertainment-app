import List from '../../components/Content/List'
import '../../App.css'
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from "react";
import { fetchAllTVSeries, fetchAllTVSeriesBookmarks } from "../../store/Redux/TvSeriesSlice";
import { MEDIA_TYPE } from '../../constants';
import styles from '../../components/common-media/content.module.css';


export default function TVSeriesPage() {

  const dispatch = useDispatch();
  const { searchedTVSeries, popular, trending, airingToday, onTheAir, tvSeriesBookmarks, loading, error } = useSelector((state) => state.tvSeries);
  const [popularTVSeries, setPopTVSeries] = useState([]);
  const [trendingTVSeries, setTrendingTVSeries] = useState([]);
  const [airingTodaySeries, setAiringTodaySeries] = useState([]);
  
  useEffect(() => {
    dispatch(fetchAllTVSeries());
    dispatch(fetchAllTVSeriesBookmarks());
  }, [dispatch]);

  /**
   * Takes in single tvSerieis and populates its bookmark.
   */
  const populateBookmark = useCallback((tvSeries) => {
    let bookmark = false;
    const searchedTvSeriesLocal = tvSeriesBookmarks
      .find((bookmarkObj) => bookmarkObj.series_id === tvSeries.id);
    if (searchedTvSeriesLocal) {
      bookmark = searchedTvSeriesLocal.bookmark;
    }
    const updatedTVSeries = { ...tvSeries, bookmark };
    return updatedTVSeries;
  }, [tvSeriesBookmarks])

  const setMediaAsTVSeries = series => { 
    return { ...series, media_type: MEDIA_TYPE.TV_SERIES }; }

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

  useEffect(() => {
    const airingTodaySeriesWithMediaType = airingToday.map(setMediaAsTVSeries);
    const airtingTodaySeriesWithBookmark = airingTodaySeriesWithMediaType.map(populateBookmark);
    setAiringTodaySeries(airtingTodaySeriesWithBookmark);
    console.log(airingToday);
  }, [airingToday, populateBookmark]);

  if (loading) return <p>Loading TV series...</p>;
  if (error) return <p>Error: {error}</p>;

  if(searchedTVSeries.length > 0) {
    return (
      <div className="overflow-x-hidden">
        {/* Airing today section */}
        <div className="md:ml-4 p-4 max-w-[calc(100vw-120px)] home-width">
          <h1 className="mb-4 font-semibold text-2xl text-white">Searched Results</h1>
          {/* Responsive grid layout for Recommended */}
          <div className={styles.content}>
            <List cards={searchedTVSeries} />
          </div>
        </div>
      </div>
    )
  }


  return (

    <div className="overflow-x-hidden">
      {/* Airing today section */}
      <div className="md:ml-4 p-4 max-w-[calc(100vw-120px)] home-width">
        <h1 className="mb-4 font-semibold text-2xl text-white">On-The-Air</h1>
        {/* Responsive grid layout for Recommended */}
        <div className={styles.content}>
          <List cards={airingTodaySeries} />
        </div>
      </div>
    </div>

  );
}