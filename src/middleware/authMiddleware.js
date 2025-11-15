/* eslint-disable */
import config from '../config.js';
import prisma from '../prisma.js';
import { verifyAccessToken } from '../utils/tokenUtils.js';

export const authenticateToken = async (req, res, next) => {
  const token = req.cookies[config.cookies.accessTokenName];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Kein Token vorhanden',
    });
  }

  try {
    const decoded = verifyAccessToken(token);

    if (decoded.type !== 'access') {
      return res.status(403).json({
        success: false,
        message: 'Falscher Token-Typ',
      });
    }

    const user = await prisma.users.findUnique({
      where: { user_id: decoded.userId },
      select: {
        user_id: true,
        email: true,
        first_name: true,
        last_name: true,
        role: true,
        is_active: true,
        avatar_url: true,
      },
    });

    if (!user || !user.is_active) {
      return res.status(403).json({
        success: false,
        message: 'Benutzer nicht gefunden oder deaktiviert',
      });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: 'Ungültiger oder abgelaufener Token',
    });
  }
};

export const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Keine Berechtigung für diese Aktion',
      });
    }
    next();
  };
};
