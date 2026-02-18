import * as model from '../../models/userModel.js';
import asyncHandler from 'express-async-handler';

export const getTest = asyncHandler(async (req, res) => {
  res.status(200).json(await model.getTest());
});

export const getProfilesFromUser = asyncHandler(async (req, res) => {
  try {
    const user_id = req.params.id;
    res.status(200).json(await model.getProfilesFromUser(user_id));
  } catch (error) {
    console.error('Fehler beim Abrufen der Profile:', error);
    res.status(500).json({
      error: 'Serverfehler',
      message: error.message,
    });
  }
});
export const insertProfile = asyncHandler(async (req, res) => {
  const user_id = req.params.id;
  const {
    first_name,
    last_name,
    birthdate,
    gender,
    street,
    housenumber,
    postalcode,
    city,
    weight,
    height,
    bloodtype,
    avatar_url,
  } = req.body;

  try {
    const result = await model.insertProfile(
      user_id,
      first_name,
      last_name,
      birthdate,
      gender,
      street,
      housenumber,
      postalcode,
      city,
      weight,
      height,
      bloodtype,
      avatar_url,
    );
    res.status(201).json(result);
  } catch (error) {
    console.error('Fehler beim Einfügen des Profils:', error);
    res.status(500).json({
      error: 'Serverfehler',
      message: error.message,
    });
  }
});
export const insertDoctor = asyncHandler(async (req, res) => {
  try {
    const profile_id = req.params.id;
    const {
      first_name,
      last_name,
      street,
      city,
      housenumber,
      postalcode,
      specialty,
      phone_number,
      title,
    } = req.body;
    res
      .status(200)
      .json(
        await model.insertDoctor(
          first_name,
          last_name,
          street,
          city,
          housenumber,
          postalcode,
          specialty,
          phone_number,
          title,
          profile_id,
        ),
      );
  } catch (error) {
    console.error('Fehler beim Einfügen des Arztes:', error);
    res.status(500).json({
      error: 'Serverfehler',
      message: error.message,
    });
  }
});
export const insertEmergencyContact = asyncHandler(async (req, res) => {
  try {
    const profile_id = req.params.id;
    const { first_name, last_name, phone_number, relationship, priority, note } = req.body;
    res
      .status(200)
      .json(
        await model.insertEmergencyContact(
          first_name,
          last_name,
          phone_number,
          relationship,
          priority,
          note,
          profile_id,
        ),
      );
  } catch (error) {
    console.error('Fehler beim Einfügen des Notfall Kontakts:', error);
    res.status(500).json({
      error: 'Serverfehler',
      message: error.message,
    });
  }
});
export const insertMedData = asyncHandler(async (req, res) => {
  try {
    const profile_id = req.params.id;
    const { key_info } = req.body;
    res.status(200).json(await model.insertMedData(key_info, profile_id));
  } catch (error) {
    console.error('Fehler beim Einfügen der medizinischen Daten:', error);
    res.status(500).json({
      error: 'Serverfehler',
      message: error.message,
    });
  }
});
export const insertMedications = asyncHandler(async (req, res) => {
  try {
    const med_id = req.params.id;
    const { med_name, dosage, frequency, note } = req.body;
    res.status(200).json(await model.insertMedications(med_name, dosage, frequency, note, med_id));
  } catch (error) {
    console.error('Fehler beim Einfügen der Medikamente:', error);
    res.status(500).json({
      error: 'Serverfehler',
      message: error.message,
    });
  }
});
export const insertMedConditions = asyncHandler(async (req, res) => {
  try {
    const med_id = req.params.id;
    const { condition_name, note, diagnosed_since } = req.body;
    res
      .status(200)
      .json(await model.insertMedConditions(condition_name, note, diagnosed_since, med_id));
  } catch (error) {
    console.error('Fehler beim Einfügen der Erkrankungen:', error);
    res.status(500).json({
      error: 'Serverfehler',
      message: error.message,
    });
  }
});
export const insertAllergies = asyncHandler(async (req, res) => {
  try {
    const med_id = req.params.id;
    const { allergy_name, note } = req.body;
    res.status(200).json(await model.insertAllergies(allergy_name, note, med_id));
  } catch (error) {
    console.error('Fehler beim Einfügen der Allergien:', error);
    res.status(500).json({
      error: 'Serverfehler',
      message: error.message,
    });
  }
});
export const insertDocuments = asyncHandler(async (req, res) => {
  try {
    const med_id = req.params.id;
    const { document_title, document_url, uploaded_at } = req.body;
    res
      .status(200)
      .json(await model.insertDocuments(document_title, document_url, uploaded_at, med_id));
  } catch (error) {
    console.error('Fehler beim Einfügen der Dokumente:', error);
    res.status(500).json({
      error: 'Serverfehler',
      message: error.message,
    });
  }
});
export const deleteProfileFromUser = asyncHandler(async (req, res) => {
  try {
    const profile_id = req.params.id;
    res.status(200).json(await model.deleteProfileFromUser(profile_id));
  } catch (error) {
    console.error('Fehler beim Löschen des Profils:', error);
    res.status(500).json({
      error: 'Serverfehler',
      message: error.message,
    });
  }
});

export const getProfilePdf = asyncHandler(async (req, res) => {
  try {
    const profile_id = req.params.id;
    res.status(200).json(await model.getProfilePdf(profile_id));
  } catch (error) {
    console.error('Fehler beim Abrufen des Profils als PDF:', error);
    res.status(500).json({
      error: 'Serverfehler',
      message: error.message,
    });
  }
});
