import express from 'express';
import { generatePDF } from './pdfController.js';

const router = express.Router();

// Accept PDF generation requests via POST with JSON body { name, ...data }
router.post('/generate', generatePDF);

export default router;
