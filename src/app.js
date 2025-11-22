/* eslint-disable */
import express from 'express';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import config from './config.js';
import cookieParser from 'cookie-parser';

import adminRoute from './api/admin/adminRoutes.js';
import emergencyRoute from './api/emergency/emergencyRoutes.js';
import userRoute from './api/user/userRoutes.js';
import authRoute from './api/auth/authRoutes.js';

const dirname = path.resolve();

const app = express();

if (config.api.env === 'development') {
  app.use(morgan('dev'));
}

app.use(
  cors({
    origin: ['https://localhost:9000', 'http://localhost:9000'],
    credentials: true,
  }),
);

app.set('trust proxy', 1);

app.use(cookieParser());
app.use(express.static(path.join(dirname, '/public')));
app.use(express.json());

app.use('/api/v1/admin', adminRoute);
app.use('/api/v1/emergency', emergencyRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/auth', authRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Interner Serverfehler',
  });
});

export default app;
