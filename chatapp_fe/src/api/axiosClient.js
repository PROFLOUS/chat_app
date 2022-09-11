// api/axiosClient.js
import axios from "axios";
import queryString from "query-string";
import useToken from "../hooks/useToken";
// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-
//config` for the full list of configs

const axiosClient = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  // baseURL: 'https://ig-food-menus.herokuapp.com'
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

// axiosClient.interceptors.request.use(async (config) => {
//   // Handle token here ...
//   const { token, setToken } = useToken();
//   // neu co token -> dinh kem vao header
//   if (token) {
//     (config) => {
//       // Do something before request is sent

//       config.headers["Authorization"] = "bearer " + token;
//       return config;
//     };
//   }
//   return config;
// });

axiosClient.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    // Handle token here ...
    //const { token, setToken } = useToken();
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
      
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);

export default axiosClient;
