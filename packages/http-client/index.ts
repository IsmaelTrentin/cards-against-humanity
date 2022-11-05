import axios, { CreateAxiosDefaults } from 'axios';

export * from 'axios';

export const Axios = (config?: CreateAxiosDefaults<any> | undefined) =>
  axios.create(config);
