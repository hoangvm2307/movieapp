import axios, { AxiosError, AxiosResponse } from "axios";
import { router } from "../app/router/Routes";
const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
axios.defaults.withCredentials = false;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(
  async (response: any) => {
    await sleep();

    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateErrors: string[] = [];
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
  get: (url: string, params?: any) => axios.get(url, { params }).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
};

const Movie = {
  popularList: (params: any) => requests.get("movie/popular", params),
  nowplayingList: (params: any) => requests.get("movie/now_playing", params),
  topratedList: (params: any) => requests.get("movie/top_rated", params),
  upcomingList: (params: any) => requests.get("movie/upcoming", params),
  details: (id: number, params: any) => requests.get(`movie/${id}`, params),
  movieVideo: (id: number, params: any) => requests.get(`movie/${id}/videos`, params),
  trendingTVs: (params: any) => requests.get("trending/tv/day", params)
};

const Credits = {
  creditList: (id: number, params: any) => requests.get(`movie/${id}/credits`, params),
  personDetail: (id: number, params: any) => requests.get(`person/${id}`, params),
};
const agent = {
  Movie,
  Credits,
};

export default agent;
