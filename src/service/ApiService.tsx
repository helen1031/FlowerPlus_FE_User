import axios, { AxiosRequestConfig } from "axios";
import { API_BASE_URL } from "../config/api-config";

export function call<T>(
  api: string,
  method: string,
  request?: any
): Promise<T> {
  console.log(request);
  let headers: { [key: string]: string } = {
    "Content-Type": "application/json",
  };

  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  if (accessToken && accessToken !== null) {
    headers["Authorization"] = "Bearer " + accessToken;
  }

  let options: AxiosRequestConfig = {
    headers: headers,
    url: API_BASE_URL + api,
    method: method,
  };
  if (request) {
    options.data = JSON.stringify(request);
  }

  return axios(options)
    .then((response) => {
      console.log("Response:", response.data);
      if (response.status === 200) {
        return response.data as T;
      } else if (response.status === 403) {
        window.location.href = "/login";
        throw new Error("Unauthorized");
      } else {
        Promise.reject(response);
        throw new Error("Request failed");
      }
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}
