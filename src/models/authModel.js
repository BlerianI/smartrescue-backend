import prisma from '../prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config.js';
import { randomUUID } from 'crypto';

export const createUser = async ({ lastName, firstName, email, password }) => {
  const existingUser = await prisma.users.findUnique({
    where: { email }
  });

  if (existingUser) {
    throw new Error('Benutzer exestiert breits schon'); 
  }

  const hashedPassword = await bcrypt.hash(password, 10); 
  const userId = randomUUID(); 

  const user = await prisma.users.create({
    data: {
      user_id: userId, 
      email, 
      password: hashedPassword, 
      last_name: lastName, 
      first_name: firstName,
      last_login: new Date(), 
      role: 'user', 
      is_active: true
    }
  }); 

  const token = jwt.sign(
    {
      userId: user.user_id, 
      email: user.email, 
      role: user.role
    }, 
    config.jwt.secret, 
    { expiresIn: config.jwt.expiresIn }
  ); 

  return {
    user: {
      user_id: user.user_id, 
      email: user.email,
      last_name: user.last_name, 
      first_name: user.firstName, 
      role: user.role, 
      is_active: user.is_active
    }, 
    token  
  }; 
}; 

export const loginUser = async ({ email, password }) => {
  const user = await prisma.users.findUnique({
    where: { email }
  });

  if (!user) {
    throw new Error('Ungültige Anmeldedaten'); 
  }

  const isPasswordValid = await bcrypt.compare(password, user.password); 

  if (!isPasswordValid) {
    throw new Error('Ungültige Anmeldedaten')
  }

  if (!user.is_active) {
    throw new Error('Benutzer ist deaktiviert'); 
  }

  await prisma.users.update({
    where: { user_id: user.user_id }, 
    data: { last_login: new Date() }
  }); 

  const token = jwt.sign(
    {
      userId: user.user_id, 
      email: user.email, 
      role: user.role
    }, 
    config.jwt.secret, 
    { expiresIn: config.jwt.expiresIn }
  ); 

  return {
    user: {
      user_id: user.user_id, 
      email: user.email, 
      role: user.role, 
      last_name: user.last_name, 
      first_name: user.first_name, 
      is_active: user.is_active
    }, 
    token
  }
}