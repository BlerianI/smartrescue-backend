import { z } from 'zod';

// Medication Validation Schema 
export const createMedicationSchema = z.object({
  medications_id: z.uuid(), 
  med_name: z.string(), 
  dosage: z.string(), 
  frequency: z.string(), 
  note: z.string().optional(), 
  med_id: z.uuid()
});

export const updateMedicationSchema = createMedicationSchema.partial(); 

// Medical Validation Schema
export const createMedicalSchema = z.object({
  med_id: z.uuid(), 
  key_info: z.string().optional(), 
  profile_id: z.uuid()
});

export const updateMedicalSchema = createMedicalSchema.partial();

// Condition Validation Schema 
export const createConditionSchema = z.object({
  condition_id: z.uuid(),
  condition_name: z.string(),
  note: z.string().optional(),
  diagnosed_since: z.string(), 
  med_id: z.uuid()
});

export const updateConditionSchema = createConditionSchema.partial(); 

// Contact Validation Schema
export const createContactSchema = z.object({
  contact_id: z.uuid(),
  last_name: z.string(),
  first_name: z.string(),
  phone_number: z.string(),
  relationship: z.string(),
  note: z.string().optional(),
  priority: z.number(), 
  profile_id: z.uuid()
});

export const updateContactSchema = createContactSchema.partial(); 

// Document Validation Schema
export const createDocumentSchema = z.object({
  document_id: z.uuid(), 
  document_title: z.string(), 
  document_url: z.url(), 
  uploaded_at: z.date(), 
  med_id: z.uuid()
});

export const updateDocumentSchema = createDocumentSchema.partial(); 

// Doctor Validation Schema 
export const createDoctorSchema = z.object({
  doctor_id: z.uuid(),
  title: z.string(),
  last_name: z.string(),
  first_name: z.string(),
  phone_number: z.string(),
  specialty: z.string(), 
  street: z.string(),
  city: z.string(), 
  house_number: z.string(), 
  postal_code: z.string(), 
  profile_id: z.uuid()
});

export const updateDoctorSchema = createDoctorSchema.partial(); 

// Allergy Validation Schema 
export const createAllergySchema = z.object({
  allergy_id: z.uuid(),
  allergy_name: z.string(),
  note: z.string().optional(),
  med_id: z.uuid()
});

export const updateAllergySchema = createAllergySchema.partial();

