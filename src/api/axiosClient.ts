import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://upskilling-egypt.com:3006/api/v1/Users",
  withCredentials: true,
  timeout: 5000,
  headers: {},
});

export default axiosClient;
