import { CorsOptions } from 'cors';

export const corsConfig: CorsOptions = {
  origin: ['*'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
};
