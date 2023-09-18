import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layout/App";
import RequireAuth from "./RequireAuth";
import HomePage from "../../features/home/HomePage";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import MovieList from "../../features/movie-list/Movies";
import Movies from "../../features/movie-list/Movies";
import MovieDetal from "../../features/movie-list/MovieDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { element: <RequireAuth />, children: [] },
      { path: "", element: <Movies /> },

      { path: "server-error", element: <ServerError /> },
      { path: "not-found", element: <NotFound /> },
      { path: "movie-list", element: <Movies /> },
      { path: "movie-list/:id", element: <MovieDetal /> },
      // {path: 'login', element: <Login />},
      // {path: 'register', element: <Register />},
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
]);
