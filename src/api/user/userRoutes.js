import express from 'express';
import {
  getTest,
  getProfilesFromUser,
  insertProfile,
  insertDoctor,
  insertEmergencyContact,
  insertMedData,
  insertMedications,
  insertMedConditions,
  insertAllergies,
  insertDocuments,
  deleteProfileFromUser,
  getProfilePdf,
} from './userController.js';

const router = express.Router();

router.get('/', getTest);
router.get('/profiles/:id', getProfilesFromUser);
router.post('/profiles/:id', insertProfile);
router.post('/doctor/:id', insertDoctor);
router.post('/emergency_contacts/:id', insertEmergencyContact);
router.post('/meddata/:id', insertMedData);
router.post('/medications/:id', insertMedications);
router.post('/med_conditions/:id', insertMedConditions);
router.post('/allergies/:id', insertAllergies);
router.post('/documents/:id', insertDocuments);
router.delete('/profiles/:id', deleteProfileFromUser);
router.get('/pdf/:id', getProfilePdf);

export default router;
