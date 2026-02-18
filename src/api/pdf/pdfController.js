import asyncHandler from 'express-async-handler';
import { buildPDF } from '../../middleware/pdf-service.js';

export const generatePDF = asyncHandler(async (req, res) => {
  const payload = req.body || {};
  const rawName = (payload.first_name || 'report').toString();
  const safeName = rawName.replace(/[^a-z0-9\-_.]/gi, '_');

  res.writeHead(200, {
    'Content-Type': 'application/pdf',
    'Content-Disposition': `attachment; filename=report-${safeName}.pdf`,
  });

  // buildPDF writes into the response stream and ends it
  buildPDF(res, payload);
});
