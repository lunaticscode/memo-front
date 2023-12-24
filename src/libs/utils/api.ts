import axios, { AxiosError, HttpStatusCode, isAxiosError } from "axios";
import { API_BASE_URL } from "../constants/api";

// 1) Base Config (공통 설정)
axios.defaults.baseURL = `${API_BASE_URL}/api`;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.timeout = 7000; //

const handleAxiosError = (err: AxiosError) => {
  throw new Error(`${err.status} :: ${err.message}`);
};

// 2) Instance (상속을 받을 수 있는  생성자);
export const api = axios.create();
export const api2 = axios.create({ baseURL: "http://localhost:3002" });

// 3) Interceptor
// [Client] ----- [ Interceptor ] -----> [Server]
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

      handleAxiosError(err);
    } else {
      throw new Error(err);
    }
  }
);

// [Client] <----- [Interceptor] ----- [Server]
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (isAxiosError(err)) {
      if (err.status === HttpStatusCode.BadRequest) {
        console.log("잘못된 파라미터입니다.");
      }
      if (err.status === HttpStatusCode.NotFound) console.log("asdasd");
      if (err.status === HttpStatusCode.Unauthorized) {
        console.log("asdasd");
      }
      if (err.status === HttpStatusCode.Forbidden) {
        console.log("asdasd");
      }
      handleAxiosError(err);
    }
  }
);
