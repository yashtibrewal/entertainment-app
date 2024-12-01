import '../../App.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import TrendingSeries from '../TvSeries/TrendingSeries'
import { fetchAllTVSeries } from '../../components/Redux/TvSeriesSlice';
import Series from './RestSeries/Series';
import styles from '../../components/common-media/content.module.css';


export default function HomePage() {

  const dispatch = useDispatch();
  const { popular, trending, airingToday, onTheAir, loading, error } = useSelector((state) => state.tvSeries);
  // console.log("trending:", trending);
  useEffect(() => {
    dispatch(fetchAllTVSeries());
  }, [dispatch]);

  if (loading) return <p>Loading TV series...</p>;
  if (error) return <p>Error: {error}</p>;



  return (

    <div className="overflow-x-hidden">
      {/* Trending Section */}
      <div className="md:ml-4 p-4 max-w-[calc(100vw-120px)]">
        <TrendingSeries trending={trending} popular={popular} />
      </div>
      {/* on Air Today Section */}

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
        <h1 className="mb-4 font-semibold text-2xl text-white">Airing Today</h1>
        {/* Responsive grid layout for Recommended */}
        <div className={styles.content}>
          {airingToday.map((card, index) => (
            <div key={index}>
              <Series card={[card]} />
            </div>
          ))}

        </div>
      </div>

      {/* Airing Today Section  */}

      <div className="md:ml-4 p-4 max-w-[calc(100vw-120px)] home-width">
        <h1 className="mb-4 font-semibold text-2xl text-white">Popular</h1>
        {/* Responsive grid layout for Recommended */}
        <div className={styles.content}>
          {popular.map((card, index) => (
            <div key={index}>
              <Series card={[card]} />
            </div>
          ))}

        </div>
      </div>

    </div>

  );
}