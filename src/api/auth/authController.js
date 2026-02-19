/* eslint-disable */
import asyncHandler from 'express-async-handler';
import * as model from '../../models/authModel.js';
import config from '../../config.js';
import { setAuthCookies, clearAuthCookies, verifyRefreshToken } from '../../utils/tokenUtils.js';

export const signUp = asyncHandler(async (req, res) => {
  const { lastName, firstName, email, password } = req.body;

  if (!lastName || !firstName || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Alle Felder sind erforderlich',
    });
  }

  const result = await model.createUser({ lastName, firstName, email, password });

  setAuthCookies(res, result.accessToken, result.refreshToken);

  res.status(201).json({
    success: true,
    message: 'Benutzer erfolgreich erstellt',
    data: {
      user: result.user,
    },
  });
});

export const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email und Passwort sind erforderlich',
    });
  }

  const result = await model.loginUser({ email, password });

  setAuthCookies(res, result.accessToken, result.refreshToken);

  res.status(200).json({
    success: true,
    message: 'Erfolgreich angemeldet',
    data: {
      user: result.user,
    },
  });
});

export const googleCallback = asyncHandler(async (req, res) => {
  const result = await model.handleOAuthLogin(req.user);

  setAuthCookies(res, result.accessToken, result.refreshToken);

  res.send(`
    <html>
      <body>
        <h2>Login erfolgreich!</h2>
        <script>
          setTimeout(() => {
            window.location.href = '${config.frontend.url}/profile';
          }, 500);
        </script>
      </body>
    </html>
  `);
});

export const logout = asyncHandler(async (req, res) => {
  clearAuthCookies(res);

  res.status(200).json({
    success: true,
    message: 'Erfolgreich abgemeldet',
  });
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      user: req.user,
    },
  });
});

export const refreshToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies[config.cookies.refreshTokenName];

  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: 'Kein Refresh Token vorhanden',
    });
  }

  try {
    const decoded = verifyRefreshToken(refreshToken);

    if (decoded.type !== 'refresh') {
      return res.status(403).json({
        success: false,
        message: 'Falscher Token-Typ',
      });
    }

    const result = await model.refreshUserToken(decoded.userId);

    setAuthCookies(res, result.accessToken, result.refreshToken);

    res.status(200).json({
      success: true,
      message: 'Token erfolgreich erneuert',
    });
  } catch (error) {
    clearAuthCookies(res);
    return res.status(403).json({
      success: false,
      message: 'Ungültiger Refresh Token',
    });
  }
});