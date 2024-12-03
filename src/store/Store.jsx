import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './Redux/MovieSlice';
import tvSeriesReducer from './Redux/TvSeriesSlice'; 
import searchReducer from './Redux/searchSlice';

const Store = configureStore({
  reducer: {
    movies: movieReducer, 
    tvSeries: tvSeriesReducer,
    searchSlice:searchReducer,  
  },
});

export default Store;
