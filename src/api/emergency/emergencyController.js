import * as model from '../../models/emergencyModel.js';
import asyncHandler from 'express-async-handler';
import { sendLoginNotification } from '../../utils/emailService.js';

export const getPersonInformation = asyncHandler(async (req, res) => {
  const external_id = req.params.id;
  res.status(200).json(await model.getPersonInformation(external_id));
});

export const logAccess = asyncHandler(async (req, res) => {
  const external_id = req.params.id;
  const { location } = req.body;
  const result = await model.logAccess(external_id, location);
  if (result) {
    sendLoginNotification({
      lastName: result.last_name,
      accessTime: result.access_time,
      accessLocation: result.access_location,
    });
  }
  res.status(200).json({ success: true });
});