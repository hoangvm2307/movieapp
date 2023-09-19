import { Box, Button, Grid, Link, Typography } from "@mui/material";
import { useAppSelector } from "../../app/store/configureStore";
import { Movie } from "../../app/models/movie";
import StarIcon from "@mui/icons-material/Star";
import { NavLink } from "react-router-dom";
interface Props {
  categories: any;
}

export default function MovieList({ categories }: Props) {
  const { popularMoviesLoaded } = useAppSelector((state) => state.movie);

  const formatIMDbRating = (rating: number | null) => {
    return rating ? `${rating.toFixed(1)}` : "N/A";
  };
  return (
    <Grid container spacing={3}>
      {categories.map((category: any) => (
        <Grid item xs={12} key={category.title} className="movie-list">
          <div className="category-header">
            <Typography className="movie-list__title">{category.title}</Typography>
            {category.movies!.length > 10 && (
              <Button className="movie-list__button" variant="outlined">
                See all
              </Button>
            )}
          </div>
          <Box sx={{ borderBottom: "2px solid #1B3C5D", mb: "10px" }}></Box>
          <Grid container spacing={3}>
            {category.movies!.slice(0, 10).map((movie: Movie) => (
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
          {category.movies!.length > 10 && (
            <Button className="movie-list__button" variant="outlined" color="primary">
              Xem thêm
            </Button>
          )}
        </Grid>
      ))}
    </Grid>
  );
}
