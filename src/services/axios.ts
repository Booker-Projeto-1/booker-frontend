import axios, { AxiosInstance } from "axios";
import { parseCookies } from "nookies";

export function getAPIClient(ctx?: any): AxiosInstance {
  const { "nextauth.token": token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  if (token) {
    api.defaults.headers.common["Authorization"] = `${token}`;
  }

  return api;
}
