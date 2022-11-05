import axios, { CreateAxiosDefaults } from 'axios';

export * from 'axios';

export const Axios = (config?: CreateAxiosDefaults | undefined) =>
  axios.create(config);
