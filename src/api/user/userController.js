import * as model from '../../models/userModel.js';
import asyncHandler from 'express-async-handler';
import { uploadProfilePicture } from '../../bucket/storageService.js';

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
// #region Inserts
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
// #endregion

// #region Deletes
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
// #endregion

// #endregion

// #region Selects
export const getProfileDetails = asyncHandler(async (req, res) => {
  try {
    const profile_id = req.params.id;
    const profileData = await model.getProfileDetails(profile_id);

    if (!profileData) {
      return res.status(404).json({ error: 'Profil nicht gefunden' });
    }

    res.status(200).json(profileData);
  } catch (error) {
    console.error('Fehler beim Abrufen der Profildetails:', error);
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
// #endregion

// #region Updates

// export const updateUser = asyncHandler(async (req, res) => {
//   try {
//     const user_id = req.params.id;
//     const {
//       last_login,
//       username,
//       email,
//       password,
//       birthdate,
//       role,
//       is_active,
//       avatar_url,
//     } = req.body;
//     res.status(200).json(
//       await model.updateUser(
//         user_id,
//         last_login,
//         username,
//         email,
//         password,
//         birthdate,
//         role,
//         is_active,
//         avatar_url,
//       ),
//     );
//   } catch (error) {
//     console.error('Fehler beim Aktualisieren des Users:', error);
//     res.status(500).json({
//       error: 'Serverfehler',
//       message: error.message,
//     });
//   }
// });

export const updateProfile = asyncHandler(async (req, res) => {
  try {
    const profile_id = req.params.id;
    const {
      gender,
      birthdate,
      last_name,
      first_name,
      height,
      weight,
      avatar_url,
      blood_type,
      street,
      city,
      house_number,
      postal_code,
    } = req.body;
    res.status(200).json(
      await model.updateProfile(
        profile_id,
        gender,
        birthdate,
        last_name,
        first_name,
        height,
        weight,
        avatar_url,
        blood_type,
        street,
        city,
        house_number,
        postal_code,
      ),
    );
  } catch (error) {
    console.error('Fehler beim Aktualisieren des Profils:', error);
    res.status(500).json({
      error: 'Serverfehler',
      message: error.message,
    });
  }
});

export const updateEmergencyContact = asyncHandler(async (req, res) => {
  try {
    const contact_id = req.params.id;
    const { first_name, last_name, phone_number, relationship, priority, note } = req.body;
    res.status(200).json(
      await model.updateEmergencyContact(
        contact_id,
        first_name,
        last_name,
        phone_number,
        relationship,
        priority,
        note,
      ),
    );
  } catch (error) {
    console.error('Fehler beim Aktualisieren des Notfallkontakts:', error);
    res.status(500).json({
      error: 'Serverfehler',
      message: error.message,
    });
  }
});

export const updateDoctor = asyncHandler(async (req, res) => {
  try {
    const doctor_id = req.params.id;
    const {
      first_name,
      last_name,
      street,
      city,
      house_number,
      postal_code,
      specialty,
      phone_number,
      title,
    } = req.body;
    res.status(200).json(
      await model.updateDoctor(
        doctor_id,
        first_name,
        last_name,
        street,
        city,
        house_number,
        postal_code,
        specialty,
        phone_number,
        title,
      ),
    );
  } catch (error) {
    console.error('Fehler beim Aktualisieren des Arztes:', error);
    res.status(500).json({
      error: 'Serverfehler',
      message: error.message,
    });
  }
});

export const updateMedData = asyncHandler(async (req, res) => {
  try {
    const med_id = req.params.id;
    const { key_info } = req.body;
    res.status(200).json(await model.updateMedData(med_id, key_info));
  } catch (error) {
    console.error('Fehler beim Aktualisieren der medizinischen Daten:', error);
    res.status(500).json({
      error: 'Serverfehler',
      message: error.message,
    });
  }
});

export const updateMedications = asyncHandler(async (req, res) => {
  try {
    const medication_id = req.params.id;
    const { med_name, dosage, frequency, note } = req.body;
    res.status(200).json(
      await model.updateMedications(medication_id, med_name, dosage, frequency, note),
    );
  } catch (error) {
    console.error('Fehler beim Aktualisieren der Medikamente:', error);
    res.status(500).json({
      error: 'Serverfehler',
      message: error.message,
    });
  }
});

export const updateMedConditions = asyncHandler(async (req, res) => {
  try {
    const condition_id = req.params.id;
    const { condition_name, note, diagnosed_since } = req.body;
    res.status(200).json(
      await model.updateMedConditions(condition_id, condition_name, note, diagnosed_since),
    );
  } catch (error) {
    console.error('Fehler beim Aktualisieren der Erkrankungen:', error);
    res.status(500).json({
      error: 'Serverfehler',
      message: error.message,
    });
  }
});

export const updateAllergies = asyncHandler(async (req, res) => {
  try {
    const allergy_id = req.params.id;
    const { allergy_name, note } = req.body;
    res.status(200).json(await model.updateAllergies(allergy_id, allergy_name, note));
  } catch (error) {
    console.error('Fehler beim Aktualisieren der Allergien:', error);
    res.status(500).json({
      error: 'Serverfehler',
      message: error.message,
    });
  }
});

export const updateDocuments = asyncHandler(async (req, res) => {
  try {
    const document_id = req.params.id;
    const { document_title, document_url, uploaded_at } = req.body;
    res.status(200).json(
      await model.updateDocuments(document_id, document_title, document_url, uploaded_at),
    );
  } catch (error) {
    console.error('Fehler beim Aktualisieren der Dokumente:', error);
    res.status(500).json({
      error: 'Serverfehler',
      message: error.message,
    });
  }
});

// #endregion
export const uploadAvatar = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'Keine Datei hochgeladen',
    });
  }

  const userId = req.body.userId;

  const imageUrl = await uploadProfilePicture(req.file.buffer, req.file.originalname, userId);

  res.status(200).json({
    success: true,
    message: 'Profilbild erfolgreich hochgeladen',
    data: { imageUrl },
  });
});
