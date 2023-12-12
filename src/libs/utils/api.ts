import axios, { AxiosError, isAxiosError } from "axios";
axios.defaults.baseURL = `${process.env.REACT_APP_API_BASE_URL}/api`;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.timeout = 7000;

const handleAxiosError = (err: AxiosError) => {
  throw new Error(`${err.status} :: ${err.message}`);
};

export const api = axios.create();

api.interceptors.request.use(
  (req) => {
    req.headers["token"] = localStorage.getItem("token");
    if (req.data && req.data instanceof FormData) {
      req.headers["Content-Type"] = "multipart/form-data";
    }
    return req;
  },
  (err) => {
    if (isAxiosError(err)) {
      handleAxiosError(err);
    }
  }
);

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (isAxiosError(err)) {
      handleAxiosError(err);
    }
  }
);
