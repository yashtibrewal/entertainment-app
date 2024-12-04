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
  const [popularTVSeries, setPopularTVSeries] = useState([]);
  const [trendingTVSeries, setTrendingTVSeries] = useState([]);
  const [airingTodaySeries, setAiringTodaySeries] = useState([]);
  const [onTheAirSeries, setOnTheAirSeries] = useState([]);


  useEffect(() => {
    dispatch(fetchAllTVSeries());
    dispatch(fetchAllTVSeriesBookmarks());
  }, [dispatch]);

  /**
   * Takes in single tvSerieis and populates its bookmark.
   */
  const populateBookmark = useCallback((tvSeries) => {
    let bookmark = false;
    const updatedTVSeries = { ...tvSeries, bookmark };
    const searchedTvSeriesLocal = tvSeriesBookmarks
      .find((bookmarkObj) => bookmarkObj.series_id === tvSeries.id);
    if (searchedTvSeriesLocal) {
      updatedTVSeries.bookmark = searchedTvSeriesLocal.bookmark;
    }
    return updatedTVSeries;
  }, [tvSeriesBookmarks]);

  const setMediaAsTVSeries = series => { 
    return { ...series, media_type: MEDIA_TYPE.TV_SERIES }; }

  const setMediaAndBookmarkFields = useCallback((tvSeries, setterFunction) => {
    const tvSeriesWithMedia = tvSeries.map(setMediaAsTVSeries);
    const tvSerieisWithBookmark = tvSeriesWithMedia.map(populateBookmark);
    setterFunction(tvSerieisWithBookmark);
  },[populateBookmark]);

  useEffect(() => {
    setMediaAndBookmarkFields(popular, setPopularTVSeries);
  },[popular, setMediaAndBookmarkFields]);

  useEffect(() => {
    setMediaAndBookmarkFields(trending, setTrendingTVSeries);
  },[trending, setMediaAndBookmarkFields]);

  useEffect(() => {
    setMediaAndBookmarkFields(airingToday, setAiringTodaySeries);
  },[airingToday, setMediaAndBookmarkFields]);

  useEffect(() => {
    setMediaAndBookmarkFields(onTheAir, setOnTheAirSeries);
  },[onTheAir, setMediaAndBookmarkFields]);
  
  if (loading) return <p>Loading TV series...</p>;
  if (error) return <p>Error: {error}</p>;

  if(searchedTVSeries.length > 0) {
    return (
      <div className="md:ml-4 p-4 max-w-[calc(100vw-120px)] home-width">
        <h1 className={styles.headings}>Searched Results</h1>
        <div className={styles.content}>
          <List cards={searchedTVSeries} />
        </div>
      </div>
    )
  }

  return (
    <div className="md:ml-4 p-4 max-w-[calc(100vw-120px)] gap-y-5 home-width">
      <h1 className={styles.headings}>Trending</h1>
      <div className={styles.content}>
        <List cards={trendingTVSeries} />
      </div>
      <h1 className={styles.headings}>Popular</h1>
      <div className={styles.content}>
        <List cards={popularTVSeries} />
      </div>
      <h1 className={styles.headings}>Airing Today</h1>
      <div className={styles.content}>
        <List cards={airingTodaySeries} />
      </div>
      <h1 className={styles.headings}>On The Air</h1>
      <div className={styles.content}>
        <List cards={onTheAirSeries} />
      </div>
    </div>
  );
}