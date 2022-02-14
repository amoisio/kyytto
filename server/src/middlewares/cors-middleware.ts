import { Settings } from '../configuration/settings.js';
import cors from 'cors';

const corsOptions = { 
  origin: async (origin, callback) => {
    const settings = await Settings.openContext();
    console.log(origin, settings);
    callback(null, settings.cors);
  }, // 'Access-Control-Allow-Origin'
  methods: ['GET','POST','PUT','DELETE'], // 'Access-Control-Allow-Methods'
  allowedHeaders: [
    'Access-Control-Allow-Headers',
    'Origin', 
    'Accept', 
    'X-Requested-With', 
    'Content-Type', 
    'Access-Control-Request-Method', 
    'Access-Control-Request-Headers'], // 'Access-Control-Allow-Headers'
  credentials: true // 'Access-Control-Allow-Credentials'
} as cors.CorsOptions;

export const handler = cors(corsOptions);
