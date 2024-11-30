import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_LOCAL_URL } from '../../constants';


const BASE_TMDB_URL = 'https://api.themoviedb.org/3';
const BASE_ENTERTAINMENT_APP_URL = BASE_LOCAL_URL;


export const fetchAllMovies = createAsyncThunk(
  'movies/fetchAllMovies',
  async (_, thunkAPI) => {
    try {
      console.info('fetchAllMovies called');
      const tmdbToken = localStorage.getItem('tmdbToken');

      if (!tmdbToken) {
        return thunkAPI.rejectWithValue('TMDB token not found in local storage.');
      }
      //  console.log(tmdbToken);

      const requests = [
        axios.get(`${BASE_TMDB_URL}/movie/popular`, {
          headers: { Authorization: `Bearer ${tmdbToken}` },
        }),
        axios.get(`${BASE_TMDB_URL}/trending/movie/week`, {
          headers: { Authorization: `Bearer ${tmdbToken}` },
        }),
        axios.get(`${BASE_TMDB_URL}/movie/now_playing`, {
          headers: { Authorization: `Bearer ${tmdbToken}` },
        }),
        axios.get(`${BASE_TMDB_URL}/movie/upcoming`, {
          headers: { Authorization: `Bearer ${tmdbToken}` },
        })
      ];

      const results = await Promise.allSettled(requests);

      const [popular, trending, nowPlaying, upcoming] = results.map((result) =>
        result.status === 'fulfilled' ? result.value.data.results : []
      );

      return { popular, trending, nowPlaying, upcoming };
    } catch (error) {
      console.error('Error fetching movies:', error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.status_message || 'Failed to fetch movies.'
      );
    }
  }
);

export const fetchAllMovieBookmarks = createAsyncThunk(
  'movies/fetchAllMovieBookmarks',
  async (_, thunkAPI) => {
    try {
      console.info('fetchAllMovieBookmarks called');
      const entertainmentAppToken = localStorage.getItem('entertainmentAppToken');

      if (!entertainmentAppToken) {
        return thunkAPI.rejectWithValue('entertainmentAppToken token not found in local storage.');
      }
      //  console.log(entertainmentAppToken);

      const result = await axios.get(`${BASE_ENTERTAINMENT_APP_URL}movie/bookmarks`, {
        headers: { Authorization: `Bearer ${entertainmentAppToken}` },
      })
      return result.data;

    } catch (error) {
      console.error('Error fetching bookmarks:', error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.status_message || "Failed to fetch movies' bookmarks."
      );
    }

  }
)

// Search for movies based on a query

/**
 * Slice 
 */

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    popularMovies: [],
    trendingMovies: [],
    nowPlayingMovies: [],
    upcomingMovies: [],
    movieBookmarks: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Reducer to clear search results
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Movies
      .addCase(fetchAllMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.popularMovies = action.payload.popular;
        state.trendingMovies = action.payload.trending;
        state.nowPlayingMovies = action.payload.nowPlaying;
        state.upcomingMovies = action.payload.upcoming;
      })
      .addCase(fetchAllMovieBookmarks.fulfilled, (state, action) => {
        //  console.log('action payload data', action.payload)
        state.movieBookmarks = action.payload;
      })
      .addCase(fetchAllMovieBookmarks.rejected || fetchAllMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

/**
 * Exports
 */

export const { clearSearchResults } = movieSlice.actions;
export default movieSlice.reducer;
