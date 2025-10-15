import { z } from 'zod';

export const createProfileSchema = z.object({
  profile_id: z.uuid,
  external_id: z.uuid,
  created_at: z.date(),
  updated_at: z.date().default(() => new Date()),
  gender: z.string(),
  birthdate: z.string(),
  last_name: z.string(),
  first_name: z.string(),
  height: z.string(), 
  weight: z.string(), 
  avatar_url: z.string(), 
  blood_type: z.string(), 
  street: z.string(),
  city: z.string(), 
  house_number: z.string(),
  postal_code: z.string(), 
  user_id: z.uuid()
});

export const updateProfileSchema = createProfileSchema.partial();
