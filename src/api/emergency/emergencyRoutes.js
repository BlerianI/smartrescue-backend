import express from 'express';
import { getPersonInformation, logAccess } from './emergencyController.js';

const router = express.Router();

router.get('/:id', getPersonInformation);
router.post('/:id/log', logAccess);

export default router;