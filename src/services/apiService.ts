import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const axiosPost = async <D, R>(
  endpoint: string,
  data: D,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<R| null> | any> => {
  const response = await apiClient.post<D, R>(endpoint, data, config);
  return response;
};



export default apiClient;
