import express from 'express';
import passport from '../../passport.js';
import {
  signUp,
  signIn,
  googleCallback,
  logout,
  getCurrentUser,
  refreshToken,
} from './authController.js';
import { authenticateToken } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signUp);

router.post('/signin', signIn);

router.post('/refresh', refreshToken);

router.post('/logout', authenticateToken, logout);

router.get('/me', authenticateToken, getCurrentUser);

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  }),
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/api/v1/auth/error',
  }),
  googleCallback,
);

router.get('/error', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'Authentifizierung fehlgeschlagen',
  });
});

export default router;
