import axios, { AxiosError, AxiosResponse } from "axios";
import { router } from "../app/router/Routes";
const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
axios.defaults.withCredentials = false;

const responseBody = (response) => response.data
;

axios.interceptors.response.use(
  async (response) => {
    await sleep();

    return response;
  },
  (error) => {
    const { data, status } = error.response;
    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(data.errors[key]);
            }
          }
          throw modelStateErrors.flat();
        }
        break;
      case 401:
        break;
      case 500:
        router.navigate("/server-error", { state: { error: data } });
        break;
      default:
        break;
    }

    return Promise.reject(error.response);
  }
);

const requests = {
  get: (url, params) => axios.get(url, { params }).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
  del: (url) => axios.delete(url).then(responseBody),
};

const Movie = {
  popularList: (params) => requests.get("movie/popular", params),
  nowplayingList: (params) => requests.get("movie/now_playing", params),
  topratedList: (params) => requests.get("movie/top_rated", params),
  upcomingList: (params) => requests.get("movie/upcoming", params),
  details: (id, params) => requests.get(`movie/${id}`, params),
  movieVideo: (id, params) => requests.get(`movie/${id}/videos`, params),
  trendingTVs: (params) => requests.get("trending/tv/day", params)
};

const Credits = {
  creditList: (id, params) => requests.get(`movie/${id}/credits`, params),
  personDetail: (id, params) => requests.get(`person/${id}`, params),
};
const agent = {
  Movie,
  Credits,
};

export default agent;
