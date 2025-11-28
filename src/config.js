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
    accessSecret: process.env.JWT_ACCESS_SECRET || 'access-secret-change-me',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'refresh-secret-change-me',
    accessExpiresIn: '15m',
    refreshExpiresIn: '7d',
  },
  cookies: {
    accessTokenName: 'accessToken',
    refreshTokenName: 'refreshToken',
    httpOnly: true,
    secure: true, 
    sameSite: 'none',
    domain: undefined,
    maxAge: {
      access: 15 * 60 * 1000,
      refresh: 7 * 24 * 60 * 60 * 1000,
    },
  },
  oauth: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackUrl:
        process.env.GOOGLE_CALLBACK_URL ||
        (process.env.NODE_ENV === 'production'
          ? 'https://sm-api-eb6z6.ondigitalocean.app/api/v1/auth/google/callback'
          : 'http://localhost:3000/api/v1/auth/google/callback'),
    },
  },
  frontend: {
    url: process.env.FRONTEND_URL || 'http://localhost:9000',
  },
};

export default config;
