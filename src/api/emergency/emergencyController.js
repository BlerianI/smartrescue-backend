import * as model from '../../models/emergencyModel.js';
import asyncHandler from 'express-async-handler';

export const getPersonInformation = asyncHandler(async (req, res) => {
  const external_id = req.params.id;
  res.status(200).json(await model.getPersonInformation(external_id));
});