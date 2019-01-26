import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_MOVIE_URL,
  params: {
    api_key: process.env.REACT_APP_MOVIE_API_KEY,
    language: navigator.language || "ja-JP"
  }
});

export const movieApi = {
  nowPlaying: () => api.get("movie/now_playing"),
  upcoming: () => api.get("movie/upcoming"),
  topRated: () => api.get("movie/top_rated"),
  popular: () => api.get("movie/popular"),
  movieDetail: (id: string) =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: "videos"
      }
    }),
  search: (term: string) =>
    api.get("search/movie", {
      params: {
        query: encodeURIComponent(term)
      }
    })
};

export const tvApi = {
  topRated: () => api.get("tv/top_rated"),
  popular: () => api.get("tv/popular"),
  airingToday: () => api.get("tv/airing_today"),
  showDetail: (id: string) =>
    api.get(`tv/${id}`, {
      params: {
        append_to_response: "videos"
      }
    }),
  search: (term: string) =>
    api.get("search/tv", {
      params: {
        query: encodeURIComponent(term)
      }
    })
};
