import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import * as userModel from '../models/userModel';
import { createError } from '../middleware/errorHandler';

export async function login(username: string, passwordPlain: string): Promise<{ token: string; user: { id: number; username: string } }> {
  const user = userModel.findUserByUsername(username);
  if (!user) {
    throw createError('Invalid credentials', 401);
  }

  const isValidPassword = await bcrypt.compare(passwordPlain, user.password_hash);
  if (!isValidPassword) {
    throw createError('Invalid credentials', 401);
  }

  const token = jwt.sign(
    { userId: user.id, username: user.username },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN as any }
  );

  return {
    token,
    user: {
      id: user.id,
      username: user.username
    }
  };
}

export async function seedAdminUser(): Promise<void> {
  if (userModel.userExists()) {
    return; // Already seeded
  }

  const hash = await bcrypt.hash(env.ADMIN_PASSWORD, 10);
  userModel.createUser(env.ADMIN_USERNAME, hash);
  console.log(`  ✅ Admin user seeded (username: ${env.ADMIN_USERNAME})`);
}
