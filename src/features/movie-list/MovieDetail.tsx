import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import apiKey from "../../api/apiConfig";
import { useEffect } from "react";
import { fetchMovieDetailAsync, movieSelectors } from "./movieSlice";
import { Box, Grid, Paper, Typography } from "@mui/material";
import "./MovieDetail.Module.scss";
import CastList from "./CastList";
import VideoList from "./VideoList";
export default function MovieDetal() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { movieDetail, movieDetails } = useAppSelector((state) => state.movie);
  const movie = useAppSelector((state) => movieSelectors.selectById(state, id!));
  const params = {
    language: "en-US",
    api_key: apiKey,
  };
  useEffect(() => {
    if (!movie && id) {
      const movieId = parseInt(id!);
      dispatch(fetchMovieDetailAsync({ movieId, params }));
    }
  }, [dispatch, id, movie]);
  if (!movie) return <></>;
  return (
    <>
      <div
        className="banner"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
        }}
      ></div>

      <div className="movie-content container">
        <div className="movie-content__poster">
          <div
            className="movie-content__poster__img"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.poster_path})`,
            }}
          ></div>
        </div>
        <div className="movie-content__info">
          <div className="title">{movie.title}</div>
          <div className="genres">
            {movie.genres &&
              movie.genres.slice(0, 5).map((genre, i) => (
                <span key={i} className="genres__item">
                  {genre.name}
                </span>
              ))}
          </div>
          <p className="overview">{movie.overview}</p>

          <CastList id={movie.id} />
          <VideoList id={movie.id} />
        </div>
      </div>
    </>
  );
}
