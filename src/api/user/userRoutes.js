import express from 'express';
import { getTest } from './userController.js'

const router = express.Router(); 

router.get('/', getTest)

export default router; 