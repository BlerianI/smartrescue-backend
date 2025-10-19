/* eslint-disable */
import jwt from 'jsonwebtoken';
import config from '../config.js';
import prisma from '../prisma.js';

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Kein Token vorhanden',
    });
  }

  try {
    const decoded = jwt.verify(token, config.jwt.secret);

    // Optional: Prüfe ob User noch existiert und aktiv ist
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
