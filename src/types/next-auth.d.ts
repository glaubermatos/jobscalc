import NextAuth from "next-auth"
import { Profile } from "../pages/profile/me";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
     
    } & DefaultSession["user"],
    activeProfile: Profile
  }
}