import type { Password, User } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "~/db.server";

export type { User } from "@prisma/client";

export async function getUserById(id: User["id"]): Promise<User | null> {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(
  email: User["email"]
): Promise<User | null> {
  return prisma.user.findUnique({ where: { email } });
}

export async function getUserByUsername(
  username: User["username"]
): Promise<User | null> {
  return prisma.user.findUnique({ where: { username } });
}

interface UserDetails {
  email: User["email"];
  username: User["username"];
  firstName: User["firstName"];
  lastName: User["lastName"];
}

export async function createUser(
  userDetails: UserDetails,
  password: string
): Promise<User> {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      ...userDetails,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });
}

export async function deleteUserByEmail(email: User["email"]): Promise<User> {
  return prisma.user.delete({ where: { email } });
}

export async function verifyLogin(
  email: User["email"],
  password: Password["hash"]
): Promise<User | null> {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash
  );

  if (!isValid) {
    return null;
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}
