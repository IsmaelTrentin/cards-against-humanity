import { Axios as HttpClient } from 'http-client';

type ImportMeta_Workaround = {
  env: {
    VITE_API_URL: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

export const Axios = HttpClient({
  baseURL: (import.meta as unknown as ImportMeta_Workaround).env.VITE_API_URL,
});
