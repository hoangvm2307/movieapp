import { Box, Button, Card, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import "./MovieList.Module.scss";
import MovieFilter from "./MovieFilter";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { db } from "../..";
import MovieDetailSkeleton from "./MovieDetailSkeleton";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { useEffect, useRef, useState } from "react";
import {
  fetchMovieDetailAsync,
  fetchNowPlayingMoviesAsync,
  fetchPopularMoviesAsync,
  fetchTopRatedMoviesAsync,
  fetchUpcomingMoviesAsync,
} from "./movieSlice";
import axios from "axios";
import apiKey from "../../api/apiConfig";
import MovieList from "./MovieList";
import { useParams } from "react-router-dom";
function writeActorData() {
  const reference = ref(db, "actors");
  const newReference = push(reference);
  set(newReference, {
    name: "Nguyen The Anh",
    birthdate: "30-07-2003",
    country: "VN",
  });
}

export default function Movies() {
  const {
    popularMovies,
    topratedMovies,
    upcomingMovies,
    nowplayingMovies,
    popularMoviesLoaded,
    topratedMoviesLoaded,
    nowplayingMoviesLoaded,
    upcomingMoviesLoaded,
    status,
  } = useAppSelector((state) => state.movie);
  const dispatch = useAppDispatch();

  const params = {
    language: "en-US",
    page: 2,
    api_key: apiKey,
  };

  useEffect(() => {
    if (!popularMoviesLoaded) {
      dispatch(fetchPopularMoviesAsync(params));
    }
  }, [dispatch, popularMoviesLoaded]);

  useEffect(() => {
    if (!nowplayingMoviesLoaded) {
      dispatch(fetchNowPlayingMoviesAsync(params));
    }
  }, [dispatch, nowplayingMoviesLoaded]);

  useEffect(() => {
    if (!upcomingMoviesLoaded) {
      dispatch(fetchUpcomingMoviesAsync(params));
    }
  }, [dispatch, upcomingMoviesLoaded]);

  useEffect(() => {
    if (!topratedMoviesLoaded) {
      dispatch(fetchTopRatedMoviesAsync(params));
    }
  }, [dispatch, topratedMoviesLoaded]);

  const categories = [
    { title: "TOP RATED MOVIES", movies: topratedMovies },
    { title: "UPCOMING MOVIES", movies: upcomingMovies },
    { title: "POPULAR MOVIES", movies: popularMovies },
    { title: "NOW PLAYING MOVIES", movies: nowplayingMovies },
  ];
  if (!topratedMovies || !upcomingMovies || !nowplayingMovies || !popularMovies) return <></>;
  return (
    <Grid container columnSpacing={4}>
      <Grid item xs={12}>
        <MovieFilter />
      </Grid>
      <Grid item xs={12}>
        <MovieList categories={categories} />
      </Grid>
    </Grid>
  );
}
