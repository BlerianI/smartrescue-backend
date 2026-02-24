import express from 'express';
import { getPersonInformation } from './emergencyController.js'; 

const router = express.Router(); 

router.get('/:id', getPersonInformation);

export default router; 