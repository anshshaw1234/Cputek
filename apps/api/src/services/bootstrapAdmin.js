import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import logger from "../utils/logger.js";

export default async function bootstrapAdmin() {
  const username = process.env.ADMIN_USERNAME?.trim();
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    logger.warn("Admin bootstrap skipped: set ADMIN_USERNAME and ADMIN_PASSWORD to enable initial login.");
    return;
  }

  const normalizedUsername = username.toLowerCase();
  const existingAdmin = await Admin.findOne({ username: normalizedUsername });
  if (existingAdmin) {
    if (!existingAdmin.email) {
      existingAdmin.email = `${normalizedUsername}@local.invalid`;
      await existingAdmin.save();
    }
    return;
  }

  await Admin.create({
    name: username,
    username: normalizedUsername,
    email: `${normalizedUsername}@local.invalid`,
    password: await bcrypt.hash(password, 12),
  });
  logger.info(`Initial admin account created for username "${username}".`);
}
