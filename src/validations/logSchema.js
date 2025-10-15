import { z } from 'zod';

// Access Log Validation Schema 
export const createAccessLogSchema = z.object({
  access_id: z.uuid(), 
  access_time: z.date(),
  access_location: z.string().default('unkown'),
  profile_id: z.uuid()
});

export const updateAccessLogSchema = createAccessLogSchema.partial(); 

// Login Log Validation Schema 
export const createLoginLogSchema = z.object({
  log_id: z.uuid(), 
  attempt_time: z.date(),
  success: z.boolean(),
  failure_reason: z.string().default('none'),
  user_id: z.uuid()
});

export const updateLoginLogSchema = createLoginLogSchema.partial(); 