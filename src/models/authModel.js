import prisma from '../prisma.js';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { generateAccessToken, generateRefreshToken } from '../utils/tokenUtils.js';

export const createUser = async ({ lastName, firstName, email, password }) => {
  const existingUser = await prisma.users.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error('Benutzer existiert bereits');
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
      is_active: true,
    },
  });

  const accessToken = generateAccessToken(user.user_id, user.email, user.role);
  const refreshToken = generateRefreshToken(user.user_id);

  return {
    user: {
      user_id: user.user_id,
      email: user.email,
      last_name: user.last_name,
      first_name: user.first_name,
      role: user.role,
      is_active: user.is_active,
    },
    accessToken,
    refreshToken,
  };
};

export const loginUser = async ({ email, password }) => {
  const user = await prisma.users.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('Ungültige Anmeldedaten');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Ungültige Anmeldedaten');
  }

  if (!user.is_active) {
    throw new Error('Benutzer ist deaktiviert');
  }

  await prisma.users.update({
    where: { user_id: user.user_id },
    data: { last_login: new Date() },
  });

  const accessToken = generateAccessToken(user.user_id, user.email, user.role);
  const refreshToken = generateRefreshToken(user.user_id);

  return {
    user: {
      user_id: user.user_id,
      email: user.email,
      role: user.role,
      last_name: user.last_name,
      first_name: user.first_name,
      is_active: user.is_active,
    },
    accessToken,
    refreshToken,
  };
};

export const handleOAuthLogin = async (user) => {
  await prisma.users.update({
    where: { user_id: user.user_id },
    data: { last_login: new Date() },
  });

  const accessToken = generateAccessToken(user.user_id, user.email, user.role);
  const refreshToken = generateRefreshToken(user.user_id);

  return {
    user: {
      user_id: user.user_id,
      email: user.email,
      last_name: user.last_name,
      first_name: user.first_name,
      role: user.role,
      is_active: user.is_active,
      avatar_url: user.avatar_url,
    },
    accessToken,
    refreshToken,
  };
};

export const refreshUserToken = async (userId) => {
  const user = await prisma.users.findUnique({
    where: { user_id: userId },
    select: {
      user_id: true,
      email: true,
      role: true,
      is_active: true,
    },
  });

  if (!user || !user.is_active) {
    throw new Error('Benutzer nicht gefunden oder deaktiviert');
  }

  const accessToken = generateAccessToken(user.user_id, user.email, user.role);
  const refreshToken = generateRefreshToken(user.user_id);

  return {
    accessToken,
    refreshToken,
  };
};
