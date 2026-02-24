import prisma from '../prisma.js';

export const getPersonInformation = async (external_id) => {
  const rows = await prisma.$queryRaw`SELECT json_build_object(
    'profile', json_build_object(
        'name', CONCAT(p.first_name, ' ', p.last_name),
        'birthdate', to_char(p.birthdate::date, 'DD/MM/YYYY'),
        'age', DATE_PART('year', AGE(p.birthdate::date)),
        'blood', p.blood_type,
        'weight', p.weight::int,
        'height', p.height::int,
        'gender', p.gender,
        'address', CONCAT(
            p.street, ' ', p.house_number, ', ',
            p.postal_code, ' ', p.city, ', Österreich'
        )
    ),

    'importantInfo', COALESCE(
        (SELECT md.key_info
        FROM medical_datas md
        WHERE md.profile_id = p.profile_id),
    ''),

    'contactNumbers', COALESCE(
        (SELECT json_agg(
            json_build_object(
                'name', ec.first_name || ' ' || ec.last_name,
                'rolle', ec.relationship,
                'nummer', ec.phone_number
            )
        )
        FROM emergency_contacts ec
        WHERE ec.profile_id = p.profile_id),
    '[]'::json),

    'doctors', COALESCE(
        (SELECT json_agg(
            json_build_object(
                'name', d.title || ' ' || d.first_name || ' ' || d.last_name,
                'richtung', d.specialty,
                'nummer', d.phone_number,
                'adresse', CONCAT(d.street, ' ', d.house_number, ', ',
                                  d.postal_code, ' ', d.city, ', Österreich')
            )
        )
        FROM doctors d
        WHERE d.profile_id = p.profile_id),
    '[]'::json),

    'medications', COALESCE(
        (SELECT json_agg(
            json_build_object(
                'name', m.med_name,
                'dosage', m.dosage,
                'frequency', m.frequency,
                'note', m.note
            )
        )
        FROM medical_datas md
        JOIN medications m ON m.med_id = md.med_id
        WHERE md.profile_id = p.profile_id),
    '[]'::json),

    'diseases', COALESCE(
        (SELECT json_agg(mc.condition_name)
        FROM medical_datas md
        JOIN med_conditions mc ON mc.med_id = md.med_id
        WHERE md.profile_id = p.profile_id),
    '[]'::json),

    'allergies', COALESCE(
        (SELECT json_agg(a.allergy_name)
        FROM medical_datas md
        JOIN allergies a ON a.med_id = md.med_id
        WHERE md.profile_id = p.profile_id),
    '[]'::json),

    'documents', COALESCE(
        (SELECT json_agg(
            json_build_object(
                'title', doc.document_title,
                'url', doc.document_url,
                'uploaded_at', doc.uploaded_at
            )
        )
        FROM medical_datas md
        JOIN documents doc ON doc.med_id = md.med_id
        WHERE md.profile_id = p.profile_id),
    '[]'::json)
)
AS personInfo
FROM profiles p
WHERE p.external_id = CAST(${external_id} AS uuid);`;
  return rows;
};
