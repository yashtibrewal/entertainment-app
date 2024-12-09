import List from '../../components/Content/List'
import '../../App.css'
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from "react";
import { fetchAllTVSeries, fetchAllTVSeriesBookmarks } from "../../store/Redux/TvSeriesSlice";
import { MEDIA_TYPE } from '../../constants';
import styles from '../../components/common-media/content.module.css';
import { SeriesSection } from './SerieisSection';


export default function TVSeriesPage() {

  const dispatch = useDispatch();
  const { searchedTVSeries, popular, trending, airingToday, onTheAir, tvSeriesBookmarks, loading, error } = useSelector((state) => state.tvSeries);
  const [popularTVSeries, setPopularTVSeries] = useState([]);
  const [trendingTVSeries, setTrendingTVSeries] = useState([]);
  const [airingTodaySeries, setAiringTodaySeries] = useState([]);
  const [onTheAirSeries, setOnTheAirSeries] = useState([]);
  const [uniqueSet, setUniqueSet] = useState(new Set());

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
    const tempSet = new Set();
    trending.forEach(trend => tempSet.add(trend.id));
    setUniqueSet(trending);
    setMediaAndBookmarkFields(trending, setTrendingTVSeries);
  },[trending, setMediaAndBookmarkFields]);

  useEffect(() => {
    const tempSet = new Set(uniqueSet);
    const uniquePopular = popular.filter((pop) => !tempSet.has(pop.id) && tempSet.add(pop.id));
    setUniqueSet(tempSet);
    setMediaAndBookmarkFields(uniquePopular, setPopularTVSeries);
  },[popular, setMediaAndBookmarkFields, setTrendingTVSeries]);

  useEffect(() => {
    const tempSet = new Set(uniqueSet);
    const uniqueAiringToday = airingToday.filter((pop) => !tempSet.has(pop.id) && tempSet.add(pop.id));
    setUniqueSet(tempSet);
    setMediaAndBookmarkFields(uniqueAiringToday, setAiringTodaySeries);
  },[airingToday, setMediaAndBookmarkFields, setPopularTVSeries]);

  useEffect(() => {
    const tempSet = new Set(uniqueSet);
    const uniqueOnTheAir = onTheAir.filter((pop) => !tempSet.has(pop.id) && tempSet.add(pop.id));
    setUniqueSet(tempSet);
    setMediaAndBookmarkFields(uniqueOnTheAir, setOnTheAirSeries);
  },[onTheAir, setMediaAndBookmarkFields, setAiringTodaySeries]);

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
      <h1 className={styles.headings}>T.V. Series</h1>
      <hr />
      <SeriesSection
        title="Trending TV Series"
        series={trendingTVSeries}
        emptyMessage="No Trending Series"
      />
      <SeriesSection
        title="Popular TV Series"
        series={popularTVSeries}
        emptyMessage="No Popular Series"
      />
      <SeriesSection
        title="Airing Today"
        series={airingTodaySeries}
        emptyMessage="No Series Airing Today"
      />
      <SeriesSection
        title="On the Air Series"
        series={onTheAirSeries}
        emptyMessage="No On the Air Series"
      />
    </div>
  );
  
}