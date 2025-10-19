import asyncHandler from 'express-async-handler';
import * as model from '../../models/authModel.js';

export const signUp = asyncHandler(async(req, res) => {
  const { lastName, firstName, email, password } = req.body; 

  if (!lastName || !firstName || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Alle Felder sind erforderlich',
    });
  }

  const result = await model.createUser({ lastName, firstName, email, password })

  res.status(201).json({
    success: true,
    message: 'Benutzer erfolgreich erstellt',
    data: {
      user: result.user,
      token: result.token,
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

  res.status(200).json({
    success: true,
    message: 'Erfolgreich angemeldet',
    data: {
      user: result.user, 
      token: result.token
    }
  });
}); 

export const googleCallback = asyncHandler(async (req, res) => {
  //const result = await model.handleOAuthLogin(req.user); 

  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  res.redirect(`${frontendUrl}/profile`);
}); 

export const logout = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Erfolgreich abgemeldet',
  });
})

export const getCurrentUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      user: req.user,
    },
  });
});