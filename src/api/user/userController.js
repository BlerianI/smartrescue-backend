import * as model from '../../models/userModel.js';
import asyncHandler from 'express-async-handler'; 

export const getTest = asyncHandler(async (req, res) => {
  res.status(200).json(await model.getTest());
})
