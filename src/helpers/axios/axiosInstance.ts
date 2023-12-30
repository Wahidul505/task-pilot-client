import { authKey } from "@/constants/authToken";
import { IResponseError, IResponseSuccess } from "@/types/common";
import { getFromLocalStorage } from "@/utils/localStorage";
import axios from "axios";

export const instance = axios.create();

instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

instance.interceptors.request.use(
  function (config) {
    const accessToken = getFromLocalStorage(authKey);
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  // @ts-ignore
  function (response) {
    const responseObject: IResponseSuccess = {
      data: response?.data?.data,
      meta: response?.data?.meta,
    };
    return responseObject;
  },
  function (error) {
    const errorResponseObject: IResponseError = {
      statusCode: error?.response?.data?.statusCode,
      message: error?.response?.data?.message,
      errorMessages: error?.response?.data?.errorMessages,
    };
    return errorResponseObject;
  }
);
