/* eslint-disable */
import jwt from 'jsonwebtoken';
import config from '../config.js';

export const generateAccessToken = (userId, email, role) => {
  return jwt.sign({ userId, email, role, type: 'access' }, config.jwt.accessSecret, {
    expiresIn: config.jwt.accessExpiresIn,
  });
};

export const generateRefreshToken = (userId) => {
  return jwt.sign({ userId, type: 'refresh' }, config.jwt.refreshSecret, {
    expiresIn: config.jwt.refreshExpiresIn,
  });
};

export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, config.jwt.accessSecret);
  } catch (error) {
    throw new Error('Ungültiger Access Token');
  }
};

export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, config.jwt.refreshSecret);
  } catch (error) {
    throw new Error('Ungültiger Refresh Token');
  }
};

export const setAuthCookies = (res, accessToken, refreshToken) => {

  res.cookie(config.cookies.accessTokenName, accessToken, {
    httpOnly: config.cookies.httpOnly,
    secure: config.cookies.secure,
    sameSite: config.cookies.sameSite,
    maxAge: config.cookies.maxAge.access,
    path: '/',
  });

  res.cookie(config.cookies.refreshTokenName, refreshToken, {
    httpOnly: config.cookies.httpOnly,
    secure: config.cookies.secure,
    sameSite: config.cookies.sameSite,
    maxAge: config.cookies.maxAge.refresh,
    path: '/',
  });
};

// Cookies löschen beim Logout
export const clearAuthCookies = (res) => {
  res.clearCookie(config.cookies.accessTokenName);
  res.clearCookie(config.cookies.refreshTokenName);
};
