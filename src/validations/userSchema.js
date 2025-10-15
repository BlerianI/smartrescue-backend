import { z } from 'zod';

export const RoleEnum = z.enum(["user", "admin"])

export const createUserSchema = z.object({
  user_id: z.uuid(),
  last_login: z.date().default(() => new Date()),
  created_at: z.date(),
  // Optional, weil Funktion Implementierung noch nicht fix
  updated_at: z.date().default(() => new Date()).optional(),
  first_name: z.string().length(50),
  last_name: z.string().length(50),
  email: z.email(),
  password: z.string(),
  role: RoleEnum, 
  is_active: z.boolean(), 
  avatar_url: z.url()
}); 

// Partial macht alle Felder von createUserSchema optional 
export const updateUserSchema = createUserSchema.partial();

