import prisma from '../prisma.js';

export const getTest = async () => {
  /* 
  Bei der Verwendung von Prisma braucht man keine Destruktion
  */
  const rows = await prisma.$queryRaw`SELECT 'It works' as test`;
  return rows;
};

export const getProfilesFromUser = async (id) => {
  // uuid ist in js ein string aber in postgres nicht. (zwei verschiedene).
  // Da man als Paramter ein String gibt und Postgres aber eine UUID erwartet
  // kommt ein Fehler. Deshalb muss man im Select Statement den String zu einer
  // UUID casten.
  const rows = await prisma.$queryRaw`SELECT p.*
FROM profiles p
JOIN users ON p.user_id = users.user_id
WHERE users.user_id = ${id}::uuid;
`;
  return rows;
};
// #region Inserts
export const insertProfile = async (
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
) => {
  // uuid ist in js ein string aber in postgres nicht. (zwei verschiedene).
  // Da man als Paramter ein String gibt und Postgres aber eine UUID erwartet
  // kommt ein Fehler. Deshalb muss man im Select Statement den String zu einer
  // UUID casten.
  const rows = await prisma.$queryRaw`
  INSERT INTO profiles (
    profile_id,
    external_id,
    created_at,
    updated_at,
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
    user_id
) VALUES (
    gen_random_uuid(),
    gen_random_uuid(),
    now(),
    now(),
    ${gender},
     ${birthdate},
    ${last_name},
    ${first_name},
    ${height},
    ${weight},
    ${avatar_url},
      ${bloodtype},
    ${street},
     ${city},
    ${housenumber},
    ${postalcode},
    ${user_id}::uuid
) returning *;
`;
  return rows[0];
};
export const insertDoctor = async (
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
) => {
  // uuid ist in js ein string aber in postgres nicht. (zwei verschiedene).
  // Da man als Paramter ein String gibt und Postgres aber eine UUID erwartet
  // kommt ein Fehler. Deshalb muss man im Select Statement den String zu einer
  // UUID casten.
  const rows = await prisma.$queryRaw`
  INSERT INTO doctors (
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
    profile_id
) VALUES (
    gen_random_uuid(),
    ${first_name},
    ${last_name},
    ${street},
    ${city},
    ${housenumber},
    ${postalcode},
    ${specialty},
    ${phone_number},
    ${title},
    ${profile_id}::uuid
) returning *;
`;
  return rows[0];
};
export const insertEmergencyContact = async (
  first_name,
  last_name,
  phone_number,
  relationship,
  priority,
  note,
  profile_id,
) => {
  // uuid ist in js ein string aber in postgres nicht. (zwei verschiedene).
  // Da man als Paramter ein String gibt und Postgres aber eine UUID erwartet
  // kommt ein Fehler. Deshalb muss man im Select Statement den String zu einer
  // UUID casten.
  const rows = await prisma.$queryRaw`
  INSERT INTO emergency_contacts (
    contact_id,
    first_name,
    last_name,
    phone_number,
    relationship,
  	priority,
  	note,
    profile_id
) VALUES (
    gen_random_uuid(),
    ${first_name},
    ${last_name},
    ${phone_number},
    ${relationship},
    ${priority},
    ${note},
    ${profile_id}::uuid
) returning *;
`;
  return rows[0];
};

export const insertMedData = async (key_info, profile_id) => {
  // uuid ist in js ein string aber in postgres nicht. (zwei verschiedene).
  // Da man als Paramter ein String gibt und Postgres aber eine UUID erwartet
  // kommt ein Fehler. Deshalb muss man im Select Statement den String zu einer
  // UUID casten.
  const rows = await prisma.$queryRaw`
  INSERT INTO medical_datas (
    med_id,
    key_info,
    profile_id
) VALUES (
    gen_random_uuid(),
    ${key_info},
    ${profile_id}::uuid
) returning *;
`;
  return rows[0];
};

export const insertMedications = async (med_name, dosage, frequency, note, med_id) => {
  // uuid ist in js ein string aber in postgres nicht. (zwei verschiedene).
  // Da man als Paramter ein String gibt und Postgres aber eine UUID erwartet
  // kommt ein Fehler. Deshalb muss man im Select Statement den String zu einer
  // UUID casten.
  const rows = await prisma.$queryRaw`
  INSERT INTO medications  (
    medication_id,
    med_name,
    dosage,
    frequency,
    note,
    med_id
) VALUES (
    gen_random_uuid(),
    ${med_name},
    ${dosage},
    ${frequency},
    ${note},
    ${med_id}::uuid
) returning *;
`;
  return rows[0];
};

export const insertMedConditions = async (condition_name, note, diagnosed_since, med_id) => {
  // uuid ist in js ein string aber in postgres nicht. (zwei verschiedene).
  // Da man als Paramter ein String gibt und Postgres aber eine UUID erwartet
  // kommt ein Fehler. Deshalb muss man im Select Statement den String zu einer
  // UUID casten.
  const rows = await prisma.$queryRaw`
  INSERT INTO med_conditions  (
    condition_id,
    condition_name,
    note,
    diagnosed_since,
    med_id
) VALUES (
    gen_random_uuid(),
    ${condition_name},
    ${note},
    ${diagnosed_since},
    ${med_id}::uuid
) returning *;
`;
  return rows[0];
};

export const insertAllergies = async (allergy_name, note, med_id) => {
  // uuid ist in js ein string aber in postgres nicht. (zwei verschiedene).
  // Da man als Paramter ein String gibt und Postgres aber eine UUID erwartet
  // kommt ein Fehler. Deshalb muss man im Select Statement den String zu einer
  // UUID casten.
  const rows = await prisma.$queryRaw`
  INSERT INTO allergies   (
    allergy_id,
    allergy_name,
    note,
    med_id
) VALUES (
    gen_random_uuid(),
    ${allergy_name},
    ${note},
    ${med_id}::uuid
) returning *;
`;
  return rows[0];
};
export const insertDocuments = async (document_title, document_url, uploaded_at, med_id) => {
  // uuid ist in js ein string aber in postgres nicht. (zwei verschiedene).
  // Da man als Paramter ein String gibt und Postgres aber eine UUID erwartet
  // kommt ein Fehler. Deshalb muss man im Select Statement den String zu einer
  // UUID casten.
  const rows = await prisma.$queryRaw`
  INSERT INTO documents    (
    document_id,
    document_title,
    document_url,
    uploaded_at,
    med_id
) VALUES (
    gen_random_uuid(),
    ${document_title},
    ${document_url},
    ${uploaded_at}::timestamp,
    ${med_id}::uuid
) returning *;
`;
  return rows[0];
};
// #endregion

// #region Deletes
export const deleteProfileFromUser = async (profile_id) => {
  // uuid ist in js ein string aber in postgres nicht. (zwei verschiedene).
  // Da man als Parameter ein String gibt und Postgres aber eine UUID erwartet
  // kommt ein Fehler. Deshalb muss man im DELETE Statement den String zu einer
  // UUID casten.

  // Durch CASCADE in der Datenbank werden automatisch alle verbundenen Daten gelöscht:
  // - medical_datas (und deren medications, med_conditions, allergies, documents)
  // - doctors
  // - emergency_contacts

  const rows = await prisma.$queryRaw`
    DELETE FROM profiles 
    WHERE profile_id = ${profile_id}::uuid
    RETURNING *;
  `;

  return rows[0];
};
// #endregion

// #region Selects

// #endregion

// #region Selects

export const getProfileDetails = async (profile_id) => {
  const profile = await prisma.$queryRaw`
    SELECT * FROM profiles WHERE profile_id = ${profile_id}::uuid
  `;

  if (!profile.length) return null;

  const doctor = await prisma.$queryRaw`
    SELECT * FROM doctors WHERE profile_id = ${profile_id}::uuid
  `;

  const emergencyContacts = await prisma.$queryRaw`
    SELECT * FROM emergency_contacts WHERE profile_id = ${profile_id}::uuid
  `;

  const medData = await prisma.$queryRaw`
    SELECT * FROM medical_datas WHERE profile_id = ${profile_id}::uuid
  `;

  let medications = [];
  let conditions = [];
  let allergies = [];
  let documents = [];

  if (medData.length > 0) {
    const med_id = medData[0].med_id;
    medications = await prisma.$queryRaw`
      SELECT * FROM medications WHERE med_id = ${med_id}::uuid
    `;
    conditions = await prisma.$queryRaw`
      SELECT * FROM med_conditions WHERE med_id = ${med_id}::uuid
    `;
    allergies = await prisma.$queryRaw`
      SELECT * FROM allergies WHERE med_id = ${med_id}::uuid
    `;
    documents = await prisma.$queryRaw`
      SELECT * FROM documents WHERE med_id = ${med_id}::uuid
    `;
  }

  return {
    personal: profile[0],
    doctor: doctor[0] || {},
    emergencyContacts: emergencyContacts,
    medical: {
      med_id: medData[0]?.med_id || null,
      key_info: medData[0]?.key_info || '',
      medications,
      conditions,
      allergies,
      documents,
    },
  };
};

export const getProfilePdf = async (profile_id) => {
  /* 
  Bei der Verwendung von Prisma braucht man keine Destruktion
  */
  const rows = await prisma.$queryRaw`SELECT
    p.updated_at,
    p.gender,
    p.birthdate,
    p.first_name,
    p.last_name,
    p.height,
    p.weight,
    p.avatar_url,
    p.blood_type,
    p.street,
    p.city,
    p.house_number,
    p.postal_code,

    ec.first_name AS emergency_first_name,
    ec.last_name AS emergency_last_name,
    ec.phone_number,
    ec.relationship,

    STRING_AGG(DISTINCT m.med_name, ', ') AS medications,
    STRING_AGG(DISTINCT mc.condition_name, ', ') AS conditions,
    STRING_AGG(DISTINCT a.allergy_name, ', ') AS allergies

FROM profiles p

LEFT JOIN LATERAL (
    SELECT *
    FROM emergency_contacts ec
    WHERE ec.profile_id = p.profile_id
    ORDER BY ec.priority ASC NULLS LAST
    LIMIT 1
) ec ON true

LEFT JOIN medical_datas md 
    ON md.profile_id = p.profile_id

LEFT JOIN medications m 
    ON m.med_id = md.med_id

LEFT JOIN med_conditions mc 
    ON mc.med_id = md.med_id

LEFT JOIN allergies a 
    ON a.med_id = md.med_id

WHERE p.profile_id = ${profile_id}::uuid

GROUP BY
    p.profile_id,
    p.updated_at,
    p.gender,
    p.birthdate,
    p.first_name,
    p.last_name,
    p.height,
    p.weight,
    p.avatar_url,
    p.blood_type,
    p.street,
    p.city,
    p.house_number,
    p.postal_code,
    ec.first_name,
    ec.last_name,
    ec.phone_number,
    ec.relationship;`;
  return rows[0];
};
// #endregion


// #region Updates

export const updateUser = async (
  user_id,
  last_login,
  username,
  email,
  password,
  birthdate,
  role,
  is_active,
  avatar_url,
) => {
  const rows = await prisma.$queryRaw`
  UPDATE users
  SET
    last_login = COALESCE(${last_login}::timestamp, last_login),
    username = COALESCE(${username}, username),
    email = COALESCE(${email}, email),
    password = COALESCE(${password}, password),
    birthdate = COALESCE(${birthdate}::date, birthdate),
    role = COALESCE(${role}, role),
    is_active = COALESCE(${is_active}, is_active),
    avatar_url = COALESCE(${avatar_url}, avatar_url)
  WHERE user_id = ${user_id}::uuid
  RETURNING *;
`;
  return rows[0];
};

export const updateProfile = async (
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
) => {
  const rows = await prisma.$queryRaw`
  UPDATE profiles
  SET
    updated_at = now(),
    gender = COALESCE(${gender}, gender),
    birthdate = COALESCE(${birthdate}, birthdate),
    last_name = COALESCE(${last_name}, last_name),
    first_name = COALESCE(${first_name}, first_name),
    height = COALESCE(${height}, height),
    weight = COALESCE(${weight}, weight),
    avatar_url = COALESCE(${avatar_url}, avatar_url),
    blood_type = COALESCE(${blood_type}, blood_type),
    street = COALESCE(${street}, street),
    city = COALESCE(${city}, city),
    house_number = COALESCE(${house_number}, house_number),
    postal_code = COALESCE(${postal_code}, postal_code)
  WHERE profile_id = ${profile_id}::uuid
  RETURNING *;
`;
  return rows[0];
};

export const updateEmergencyContact = async (
  contact_id,
  first_name,
  last_name,
  phone_number,
  relationship,
  priority,
  note,
) => {
  const rows = await prisma.$queryRaw`
  UPDATE emergency_contacts
  SET
    first_name = COALESCE(${first_name}, first_name),
    last_name = COALESCE(${last_name}, last_name),
    phone_number = COALESCE(${phone_number}, phone_number),
    relationship = COALESCE(${relationship}, relationship),
    priority = COALESCE(${priority}, priority),
    note = COALESCE(${note}, note)
  WHERE contact_id = ${contact_id}::uuid
  RETURNING *;
`;
  return rows[0];
};

export const updateDoctor = async (
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
) => {
  const rows = await prisma.$queryRaw`
  UPDATE doctors
  SET
    first_name = COALESCE(${first_name}, first_name),
    last_name = COALESCE(${last_name}, last_name),
    street = COALESCE(${street}, street),
    city = COALESCE(${city}, city),
    house_number = COALESCE(${house_number}, house_number),
    postal_code = COALESCE(${postal_code}, postal_code),
    specialty = COALESCE(${specialty}, specialty),
    phone_number = COALESCE(${phone_number}, phone_number),
    title = COALESCE(${title}, title)
  WHERE doctor_id = ${doctor_id}::uuid
  RETURNING *;
`;
  return rows[0];
};

export const updateMedData = async (med_id, key_info) => {
  const rows = await prisma.$queryRaw`
  UPDATE medical_datas
  SET
    key_info = COALESCE(${key_info}, key_info)
  WHERE med_id = ${med_id}::uuid
  RETURNING *;
`;
  return rows[0];
};

export const updateMedications = async (medication_id, med_name, dosage, frequency, note) => {
  const rows = await prisma.$queryRaw`
  UPDATE medications
  SET
    med_name = COALESCE(${med_name}, med_name),
    dosage = COALESCE(${dosage}, dosage),
    frequency = COALESCE(${frequency}, frequency),
    note = COALESCE(${note}, note)
  WHERE medication_id = ${medication_id}::uuid
  RETURNING *;
`;
  return rows[0];
};

export const updateMedConditions = async (condition_id, condition_name, note, diagnosed_since) => {
  const rows = await prisma.$queryRaw`
  UPDATE med_conditions
  SET
    condition_name = COALESCE(${condition_name}, condition_name),
    note = COALESCE(${note}, note),
    diagnosed_since = COALESCE(${diagnosed_since}, diagnosed_since)
  WHERE condition_id = ${condition_id}::uuid
  RETURNING *;
`;
  return rows[0];
};

export const updateAllergies = async (allergy_id, allergy_name, note) => {
  const rows = await prisma.$queryRaw`
  UPDATE allergies
  SET
    allergy_name = COALESCE(${allergy_name}, allergy_name),
    note = COALESCE(${note}, note)
  WHERE allergy_id = ${allergy_id}::uuid
  RETURNING *;
`;
  return rows[0];
};

export const updateDocuments = async (document_id, document_title, document_url, uploaded_at) => {
  const rows = await prisma.$queryRaw`
  UPDATE documents
  SET
    document_title = COALESCE(${document_title}, document_title),
    document_url = COALESCE(${document_url}, document_url),
    uploaded_at = COALESCE(${uploaded_at}::timestamp, uploaded_at)
  WHERE document_id = ${document_id}::uuid
  RETURNING *;
`;
  return rows[0];
};

// #endregion