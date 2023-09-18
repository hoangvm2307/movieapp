import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import apiKey from "../../api/apiConfig";
import { useEffect } from "react";
import { fetchMovieDetailAsync } from "./movieSlice";
import { Box, Grid, Paper, Typography } from "@mui/material";
import "./MovieDetail.Module.scss";
import CastList from "./CastList";
import VideoList from "./VideoList";
export default function MovieDetal() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { movieDetail } = useAppSelector((state) => state.movie);

  const params = {
    language: "en-US",
    api_key: apiKey,
  };

  useEffect(() => {
    if (!movieDetail || id) {
      const movieId = parseInt(id!);
      dispatch(fetchMovieDetailAsync({ movieId, params }));
    }
  }, [dispatch, id, movieDetail]);
  if (!movieDetail) return <></>;
  return (
    <>
      <div
        className="banner"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieDetail.backdrop_path})`,
        }}
      ></div>

      <div className="movie-content container">
        <div className="movie-content__poster">
          <div
            className="movie-content__poster__img"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieDetail.poster_path})`,
            }}
          ></div>
        </div>
        <div className="movie-content__info">
          <div className="title">{movieDetail.title}</div>
          <div className="genres">
            {movieDetail.genres &&
              movieDetail.genres.slice(0, 5).map((genre, i) => (
                <span key={i} className="genres__item">
                  {genre.name}
                </span>
              ))}
          </div>
          <p className="overview">{movieDetail.overview}</p>

          <CastList id={movieDetail.id} />
          <VideoList id={movieDetail.id} />
        </div>
      </div>
    </>
  );
}
