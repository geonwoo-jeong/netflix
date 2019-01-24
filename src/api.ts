import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_MOVIE_URL,
  params: {
    api_key: process.env.REACT_APP_MOVIE_API_KEY,
    language: "ja-JP"
  }
});

export default api;
