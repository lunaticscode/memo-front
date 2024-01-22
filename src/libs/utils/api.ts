import axios, { AxiosError, HttpStatusCode, isAxiosError } from "axios";
import { API_BASE_URL } from "../constants/api";

axios.defaults.baseURL = `${API_BASE_URL}/api`;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.timeout = 7000; //

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
      if (err.status === HttpStatusCode.NotFound) {
        alert("존재하지않는 api 주소 입니다.");
      }

      // handleAxiosError(err);
    } else {
      throw new Error(err);
    }
  }
);

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (isAxiosError(err)) {
      if (err.status === HttpStatusCode.BadRequest) {
        console.log("잘못된 파라미터입니다.");
      }
      if (err.status === HttpStatusCode.NotFound) {
      }
      if (err.status === HttpStatusCode.Unauthorized) {
      }
      if (err.status === HttpStatusCode.Forbidden) {
      }
      handleAxiosError(err);
    }
  }
);
