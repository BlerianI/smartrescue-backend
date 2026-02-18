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
  updateProfile,
  updateDoctor,
  updateEmergencyContact,
  updateMedData,
  updateMedications,
  updateMedConditions,
  updateAllergies,
  updateDocuments,
  getProfileDetails,
} from './userController.js';

const router = express.Router();

router.get('/', getTest);
router.get('/profiles/:id', getProfilesFromUser);
router.get('/profiles/:id/details', getProfileDetails);
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

router.patch('/profiles/:id', updateProfile);
router.patch('/doctor/:id', updateDoctor);
router.patch('/emergency_contacts/:id', updateEmergencyContact);
router.patch('/meddata/:id', updateMedData);
router.patch('/medications/:id', updateMedications);
router.patch('/med_conditions/:id', updateMedConditions);
router.patch('/allergies/:id', updateAllergies);
router.patch('/documents/:id', updateDocuments);

export default router;
