import { DefaultSession } from "next-auth";

declare module "next-aurh" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
    } & DefaultSession["user"];
  }
  interface User {
    id: string;
    name: string;
    email: string;
  }
}
