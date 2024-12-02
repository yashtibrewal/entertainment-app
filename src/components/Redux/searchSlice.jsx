import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { TMDB_BASE_URL } from '../../constants';

const BASE_URL = TMDB_BASE_URL;

//searching movies
export const searchMovies = createAsyncThunk(
  'search/searchMovies',
  async (query, thunkAPI) => {
    try {
      const tmdbToken = localStorage.getItem('tmdbToken');
      if (!tmdbToken) {
        return thunkAPI.rejectWithValue('TMDB token not found in local storage.');
      }

      const response = await axios.get(`${BASE_URL}/search/movie`, {
        headers: { Authorization: `Bearer ${tmdbToken}` },
        params: { query },
      });

      return response.data.results;
    } catch (error) {
      console.error('Error searching movies:', error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.status_message || 'Failed to search movies.'
      );
    }
  }
);
//Tv Series
export const searchTVSeries = createAsyncThunk(
  'search/searchTVSeries',
  async (query, thunkAPI) => {
    try {
      const tmdbToken = localStorage.getItem('tmdbToken');
      if (!tmdbToken) {
        return thunkAPI.rejectWithValue('TMDB token not found in local storage.');
      }

      const response = await axios.get(`${BASE_URL}/search/tv`, {
        headers: { Authorization: `Bearer ${tmdbToken}` },
        params: { query },
      });

      return response.data.results;
    } catch (error) {
      console.error('Error searching TV series:', error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.status_message || 'Failed to search TV series.'
      );
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    movies: [],
    tvSeries: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearSearchResults: (state) => {
      state.movies = [];
      state.tvSeries = [];
    },
  },
  extraReducers: (builder) => {
    builder

      // Search Movies
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Search TV Series
      .addCase(searchTVSeries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchTVSeries.fulfilled, (state, action) => {
        state.loading = false;
        state.tvSeries = action.payload;
      })
      .addCase(searchTVSeries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
