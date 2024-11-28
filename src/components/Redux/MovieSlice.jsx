import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const BASE_URL = 'https://api.themoviedb.org/3';


export const fetchAllMovies = createAsyncThunk(
  'movies/fetchAllMovies',
  async (_, thunkAPI) => {
    try {
      const tmdbToken = localStorage.getItem('tmdbToken'); 
      //const tmdbToken ="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NTFlMmY5ODc3NTlhNjk2MzZiYzc1ZDYwYjhhZjg1OCIsIm5iZiI6MTczMjc3NDE2NC44OTI5MjMsInN1YiI6IjY3MjY0NjhmZTcyNTg0OGExOTNhYmY5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.U0wXCRM3yfU6BMgn-nnFI9RW3m04vmlOFMoYaTSlZkw";
      if (!tmdbToken) {
        return thunkAPI.rejectWithValue('TMDB token not found in local storage.');
      }
      console.log(tmdbToken);

      const requests = [
        axios.get(`${BASE_URL}/movie/popular`, {
          headers: { Authorization: `Bearer ${tmdbToken}` },
        }),
        axios.get(`${BASE_URL}/trending/movie/week`, {
          headers: { Authorization: `Bearer ${tmdbToken}` },
        }),
        axios.get(`${BASE_URL}/movie/now_playing`, {
          headers: { Authorization: `Bearer ${tmdbToken}` },
        }),
        axios.get(`${BASE_URL}/movie/upcoming`, {
          headers: { Authorization: `Bearer ${tmdbToken}` },
        }),
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
      .addCase(fetchAllMovies.rejected, (state, action) => {
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
