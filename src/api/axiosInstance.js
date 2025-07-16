import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com",
});

axiosInstance.interceptors.request.use(
  (config) => {
    document.body.classList.add("loading-indicator");
    return config;
  },
  (error) => {
    document.body.classList.remove("loading-indicator");
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    document.body.classList.remove("loading-indicator");
    return response;
  },
  (error) => {
    document.body.classList.remove("loading-indicator");
    return Promise.reject(error);
  }
);

export default axiosInstance;
