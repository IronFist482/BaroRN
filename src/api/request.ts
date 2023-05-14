import axios, { AxiosError, AxiosInstance } from "axios";

import { store } from "@store/index";
import CONFIG from "@utils/config/config";

axios.defaults.withCredentials = true;

type PATHS = "gastos" | "frecuentes" | "users";

const getRequestInstance = (path: PATHS): AxiosInstance => {
  const request: AxiosInstance = axios.create({
    baseURL: `${CONFIG.API_URL}${path}`,
    timeout: 5000,
    withCredentials: true,
  });

  request.interceptors.request.use(
    (config) => {
      const token = store.getState().session.token;
      if (config.headers && token) {
        config.headers.token = token ?? "";
      }
      return config;
    },
    async (error: AxiosError) => {
      return await Promise.reject(error);
    }
  );

  return request;
};

export default getRequestInstance;
