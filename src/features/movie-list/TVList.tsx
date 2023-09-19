import { Box, Button, Grid, Link, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { Movie } from "../../app/models/movie";
import StarIcon from "@mui/icons-material/Star";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { fetchTrendingTVsAsync } from "./movieSlice";
import apiKey from "../../api/apiConfig";

export default function TVList() {
  const { trendingTVs, trendingTVsLoaded } = useAppSelector((state) => state.movie);
  const dispatch = useAppDispatch();

  const params = {
 
    language: "en-US",
    api_key: apiKey,
  };

  useEffect(() => {
    if (!trendingTVsLoaded) {
      dispatch(fetchTrendingTVsAsync(params));
    }
  }, [dispatch, trendingTVsLoaded]);
  const formatIMDbRating = (rating: number | null) => {
    return rating ? `${rating.toFixed(1)}` : "N/A";
  };

  if (!trendingTVs) return <></>;
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} className="movie-list">
        <Typography className="movie-list__title">TV Show</Typography>
        <Box sx={{ borderBottom: "2px solid #1B3C5D", mb: "10px" }}></Box>
        <Grid container spacing={3}>
          {trendingTVs!.map((movie: Movie) => (
            <Grid key={movie.id} item xs={12 / 5} className="movie-list__item">
              <Box className="movie-list__item-content">
                <Link component={NavLink} to={`/movie-list/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    className="movie-list__item-image"
                  />
                </Link>
                <Box className="movie-list__item-rating">
                  <StarIcon sx={{ color: "#F5C518", mb: "5px" }} />
                  <Typography sx={{ color: "white" }}>
                    {formatIMDbRating(movie.vote_average)}
                  </Typography>
                </Box>
                <Typography className="movie-list__item-title">{movie.title}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
