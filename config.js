/* eslint-disable */
import 'dotenv/config.js';


const config = {
  ENV: process.env.NODE_ENV || "development",
  MONGO_USER: process.env.MONGO_USERNAME || '',
  MONGO_PASS: process.env.MONGO_PASSWORD || '',
  MONGO_HOST: process.env.MONGO_HOST || 'localhost',
  MONGO_PORT: process.env.MONGO_PORT || 27017,
  MONGO_DB: process.env.MONGO_DB || 'hea-food',
  MONGO_URL: process.env.MONGO_URL ||  'mongodb://localhost:27017/hea-food',
  SECRET_KEY_JWT: process.env.SECRET_KEY_JWT || 'secretkeyjwt',
}

export default config;