import dotenv from 'dotenv';

dotenv.config();

const config = {
  api: {
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV || 'development',
  },
  db: {
    dbUrl: process.env.DATABASE_URL,
  },
};

export default config;