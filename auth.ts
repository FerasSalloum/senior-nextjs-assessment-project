import NextAuth, { User } from "next-auth";
import { AuthService } from "./src/domain/service/AuthService";
import { PrismaUserRepository } from "./src/infrastructure/repositories/PrismaUserRepository";
import Credentials from "next-auth/providers/credentials";

const userRepository = new PrismaUserRepository();
const authService = new AuthService(userRepository);

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials.email || !credentials.password) {
          return null;
        }
        try {
          const user = await authService.Login({
            email: credentials.email as string,
            password: credentials.password as string,
          });
          if (user) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
            };
          }
          return null;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
});
