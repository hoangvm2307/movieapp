import { Box, Grid, Typography, TextField, MenuItem } from "@mui/material";
const movieTypes = [
  {
    value: "Phim bộ",
    label: "Phim bộ",
  },
  {
    value: "Phim lẻ",
    label: "Phim lẻ",
  },
  {
    value: "Tất cả",
    label: "Tất cả",
  },
];

export default function MovieFilter() {
  return (
    
    <Grid container spacing={2} className="movie-filter-container">
      <Grid item xs={2} className="filter">
        <Typography className="filter-label">Loại phim</Typography>
        <TextField
          className="filter-textfield"
          fullWidth
          select
          label="Select"
          defaultValue="Tất cả"
          variant="filled"
        >
          {movieTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid item xs={2} className="filter" direction={"column"}>
        <Typography className="filter-label">Thể loại</Typography>
        <TextField
          className="filter-textfield"
          fullWidth
          select
          label="Select"
          defaultValue="Tất cả"
          variant="filled"
        >
          {movieTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid item xs={2} className="filter" direction={"column"}>
        <Typography className="filter-label">Quốc gia</Typography>
        <TextField
          className="filter-textfield"
          fullWidth
          select
          label="Select"
          defaultValue="Tất cả"
          variant="filled"
        >
          {movieTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid item xs={2} className="filter" direction={"column"}>
        <Typography className="filter-label">Năm</Typography>
        <TextField
          className="filter-textfield"
          fullWidth
          select
          label="Select"
          defaultValue="Tất cả"
          variant="filled"
        >
          {movieTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid item xs={2} className="filter">
        <Typography className="filter-label">Thời lượng</Typography>
        <TextField
          className="filter-textfield"
          fullWidth
          select
          label="Select"
          defaultValue="Tất cả"
          variant="filled"
        >
          {movieTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid item xs={2} className="filter" direction={"column"}>
        <Typography className="filter-label">Sắp xếp</Typography>
        <TextField
          className="filter-textfield"
          fullWidth
          select
          label="Select"
          defaultValue="Tất cả"
          variant="filled"
        >
          {movieTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );
}
