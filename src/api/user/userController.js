import * as model from '../../models/userModel.js';
import asyncHandler from 'express-async-handler';
import { uploadProfilePicture } from '../../bucket/storageService.js';

export const getTest = asyncHandler(async (req, res) => {
  res.status(200).json(await model.getTest());
});

export const uploadAvatar = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'Keine Datei hochgeladen',
    });
  }

  const userId = req.body.userId;

  const imageUrl = await uploadProfilePicture(req.file.buffer, req.file.originalname, userId);

  res.status(200).json({
    success: true,
    message: 'Profilbild erfolgreich hochgeladen',
    data: { imageUrl },
  });
});
