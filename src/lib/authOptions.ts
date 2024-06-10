import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { comparePassword } from "@/lib/utils";
import prisma from "../../lib/prisma";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: {
            label: "email",
            type: "email",
          },
          password: {
            label: "password",
            type: "password",
          },
        },
        async authorize(credentials, req) {
          const user = await prisma.company.findFirst({
            where: {
              email: credentials?.email,
            },
          });
  
          if (!user) {
            return null;
          }
  
          const isMatch = await comparePassword(
            credentials?.password!!,
            user.password
          );
  
          if (isMatch) {
            return user;
          }
  
          return null;
        },
      }),
    ],
    pages: {
      signIn: "/auth/signin",
      newUser: "/auth/signUp",
    },
    callbacks: {
      jwt({ token, account, user }) {
        if (account) {
          token.id = user.id;
        }
        return token;
      },
      async session({ session, token, user }) {
        session.user.id = token.id;
  
        return session;
      },
    },
  };
  