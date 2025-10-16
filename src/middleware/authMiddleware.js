import jwt from 'jsonwebtoken';
import config from '../config.js';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Kein Token vorhanden',
    });
  }

  jwt.verify(token, config.jwt.secret, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Ungültiger oder abgelaufener Token',
      });
    }

    req.user = user; 
    next(); 
  });
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
