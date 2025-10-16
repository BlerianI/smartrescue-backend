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
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
};

export default config;