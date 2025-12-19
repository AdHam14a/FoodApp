import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://upskilling-egypt.com:3006/api/v1/",
  withCredentials: true,
  timeout: 5000,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
