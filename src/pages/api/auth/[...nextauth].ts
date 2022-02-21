import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

import { api } from "../../../services/api"

import { Profile } from "../../profile/me"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    //   scope: 'read:user'
    }),
    // ...add more providers here
  ],
  callbacks: {    
    async session({session, user, token}) {

      try {
        //chamada a api para verificar se existe um usuário com o email do github
        const response = await api.get(`/profiles/${session.user.email}`)

        const profile: Profile = response.data

        return {
          ...session,
          activeProfile: profile
        }

      } catch (error) {
        return {
          ...session,
          activeProfile: null
        }
      }
    },
    async signIn({ user, account, profile, }) {
      return true
    },
}
})