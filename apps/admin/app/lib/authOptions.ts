import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { PrismaClient } from "@repo/db/client";

const prisma = new PrismaClient();

export const adminAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "admin@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          const admin = await prisma.admin.findUnique({
            where: { email: credentials.email },
          });

          if (!admin || admin.password !== credentials.password) {
            throw new Error("Invalid email or password");
          }

          return {
            id: String(admin.id),
            name: admin.name,
            email: admin.email,
            role: "admin",
          };
        } catch (error) {
          console.error("Admin Login Error:", error);
          throw new Error("Something went wrong");
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};
