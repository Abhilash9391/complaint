import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions, User } from "next-auth";
import { PrismaClient } from "@repo/db/client";

const prisma = new PrismaClient();

export const adminAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        try {
          const admin = await prisma.admin.findUnique({
            where: { email: credentials.email },
          });

          if (!admin) {
            throw new Error("Admin not found");
          }

          return {
            id: String(admin.id), 
            name: admin.name,
            role: "admin",
          };
        } catch (error) {
          console.error("Admin Login Error:", error);
          throw new Error("Something went wrong");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};
