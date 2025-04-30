/* eslint-disable @typescript-eslint/no-explicit-any */

import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

import { IUserRepository } from "../domain/repository/UserRepository";

export class PrismaUserRepository implements IUserRepository {
  public toDomain(raw: {
    id: string;
    name: string;
    email: string;
    role: { id: string; name: string };
    password: string;
  }) {
    return {
      id: raw.id,
      name: raw.name,
      email: raw.email,
      role: raw.role,
      password: raw.password,
    };
  }
  async logInUser(email: string, password: string) {
    try {
      const user = await db.user.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          password: true,
        },
      });

      if (!user) throw new Error("Email et/ou mot de passe invalide");

      const passwordMatch = await bcrypt.compare(
        password,
        user.password as string
      );

      if (!passwordMatch) throw new Error("Email et/ou mot de passe invalide");

      const userWithoutPassword = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
      return userWithoutPassword;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async registerUser(
    name: string,
    email: string,
    roleId: string,
    password: string
  ): Promise<void> {
    try {
      const userExists = await db.user.findUnique({ where: { email } });
      if (userExists)
        throw new Error("Un utilisateur avec cet email existe déjà");

      const hashedPassword = await bcrypt.hash(password, 10);
      await db.user.create({
        data: {
          name,
          email,
          roleId,
          password: hashedPassword,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
