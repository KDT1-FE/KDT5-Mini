import axios, { AxiosError } from 'axios';

const apiIP = process.env.NEXT_PUBLIC_API_IP;
const clientPort = process.env.NEXT_PUBLIC_API_CLIENT_PORT;

const clientUrl = `https://${apiIP}:${clientPort}`;

export const clientInstance = axios.create({
  baseURL: `${clientUrl}`
});

clientInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);

clientInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error: AxiosError) {
    return Promise.reject(error.response?.data);
  }
);
