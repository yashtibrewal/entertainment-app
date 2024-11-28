import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './components/Redux/MovieSlice';
import tvSeriesReducer from './components/Redux/TvSeriesSlice'; 

const Store = configureStore({
  reducer: {
    movies: movieReducer, 
    tvSeries: tvSeriesReducer,  
  },
});

export default Store;
