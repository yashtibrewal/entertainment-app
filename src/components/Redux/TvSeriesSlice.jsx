import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { TMDB_BASE_URL } from '../../constants';

const BASE_URL = TMDB_BASE_URL;

export const fetchAllTVSeries = createAsyncThunk(
  'tvSeries/fetchAllTVSeries',
  async (_, thunkAPI) => {
    try {
      const tmdbToken = localStorage.getItem('tmdbToken');
      if (!tmdbToken) {
        return thunkAPI.rejectWithValue('TMDB token not found in local storage.');
      }

      const requests = [
        axios.get(`${BASE_URL}/tv/popular`, {
          headers: { Authorization: `Bearer ${tmdbToken}` },
        }),
        axios.get(`${BASE_URL}/trending/tv/week`, {
          headers: { Authorization: `Bearer ${tmdbToken}` },
        }),
        axios.get(`${BASE_URL}/tv/airing_today`, {
          headers: { Authorization: `Bearer ${tmdbToken}` },
        }),
        axios.get(`${BASE_URL}/tv/on_the_air`, {
          headers: { Authorization: `Bearer ${tmdbToken}` },
        }),
      ];

      const results = await Promise.allSettled(requests);

      const [popular, trending, airingToday, onTheAir] = results.map((result) =>
        result.status === 'fulfilled' ? result.value.data.results : []
      );

      return { popular, trending, airingToday, onTheAir };
    } catch (error) {
      console.error('Error fetching TV series:', error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.status_message || 'Failed to fetch TV series.'
      );
    }
  }
);

// Redux Slice for TV Series
const tvSeriesSlice = createSlice({
  name: 'tvSeries',
  initialState: {
    popular: [], // updated state key
    trending: [],
    airingToday: [],
    onTheAir: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTVSeries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTVSeries.fulfilled, (state, action) => {
        state.loading = false;
        state.popular = action.payload.popular;
        state.trending = action.payload.trending;
        state.airingToday = action.payload.airingToday;
        state.onTheAir = action.payload.onTheAir;
      })
      .addCase(fetchAllTVSeries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default tvSeriesSlice.reducer;
