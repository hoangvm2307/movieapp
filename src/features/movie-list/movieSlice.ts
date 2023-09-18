import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store/configureStore";
import agent from "../../api/agent";
import apiKey from "../../api/apiConfig";
import { Movie } from "../../app/models/movie";

interface MovieState {
  popularMovies: Movie[] | null;
  upcomingMovies: Movie[] | null;
  topratedMovies: Movie[] | null;
  nowplayingMovies: Movie[] | null;

  movieDetail: Movie | null;
  status: string;
  popularMoviesLoaded: boolean;
  topratedMoviesLoaded: boolean;
  upcomingMoviesLoaded: boolean;
  nowplayingMoviesLoaded: boolean;

  pageNumber: number;
}
const initialState: MovieState = {
  popularMovies: null,
  topratedMovies: null,
  upcomingMovies: null,
  nowplayingMovies: null,

  movieDetail: null,
  status: "idle",
  popularMoviesLoaded: false,
  topratedMoviesLoaded: false,
  upcomingMoviesLoaded: false,
  nowplayingMoviesLoaded: false,
  pageNumber: 1,
};

export const fetchPopularMoviesAsync = createAsyncThunk<[], any>(
  "tickets/fetchPopularMoviesAsync",
  async (params, thunkAPI) => {
    try {
      const response = await agent.Movie.popularList(params);
      return response.results;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchNowPlayingMoviesAsync = createAsyncThunk<[], any>(
  "tickets/fetchNowPlayingMoviesAsync",
  async (params, thunkAPI) => {
    try {
      const response = await agent.Movie.nowplayingList(params);
      return response.results;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchTopRatedMoviesAsync = createAsyncThunk<[], any>(
  "tickets/fetchTopRatedMoviesAsync",
  async (params, thunkAPI) => {
    try {
      const response = await agent.Movie.topratedList(params);
      return response.results;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchUpcomingMoviesAsync = createAsyncThunk<[], any>(
  "tickets/fetchUpcomingMoviesAsync",
  async (params, thunkAPI) => {
    try {
      const response = await agent.Movie.upcomingList(params);
      return response.results;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchMovieDetailAsync = createAsyncThunk<Movie, { movieId: number; params: any }>(
  "tickets/fetchMovieDetailAsync",
  async ({ movieId, params }, thunkAPI) => {
    try {
      const response = await agent.Movie.details(movieId, params);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPopularMoviesAsync.pending, (state) => {
      state.status = "pendingFetchMovies";
    });
    builder.addCase(fetchPopularMoviesAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.popularMovies = action.payload;
      state.popularMoviesLoaded = true;
    });
    builder.addCase(fetchPopularMoviesAsync.rejected, (state, action) => {
      state.status = "idle";
    });

    builder.addCase(fetchUpcomingMoviesAsync.pending, (state) => {
      state.status = "pendingFetchUpcomingMovies";
    });
    builder.addCase(fetchUpcomingMoviesAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.upcomingMovies = action.payload;
      state.upcomingMoviesLoaded = true;
    });
    builder.addCase(fetchUpcomingMoviesAsync.rejected, (state, action) => {
      state.status = "idle";
    });

    builder.addCase(fetchTopRatedMoviesAsync.pending, (state) => {
      state.status = "pendingFetchTopRatedMovies";
    });
    builder.addCase(fetchTopRatedMoviesAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.topratedMovies = action.payload;
      state.topratedMoviesLoaded = true;
    });
    builder.addCase(fetchTopRatedMoviesAsync.rejected, (state, action) => {
      state.status = "idle";
    });

    builder.addCase(fetchNowPlayingMoviesAsync.pending, (state) => {
      state.status = "pendingFetchNowPlayingMovies";
    });
    builder.addCase(fetchNowPlayingMoviesAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.nowplayingMovies = action.payload;
      state.nowplayingMoviesLoaded = true;
    });
    builder.addCase(fetchNowPlayingMoviesAsync.rejected, (state, action) => {
      state.status = "idle";
    });

    builder.addCase(fetchMovieDetailAsync.pending, (state) => {
      state.status = "pendingiFetchMovieDetailAsync";
    });
    builder.addCase(fetchMovieDetailAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.movieDetail = action.payload;
    });
    builder.addCase(fetchMovieDetailAsync.rejected, (state, action) => {
      state.status = "idle";
    });
  },
});
