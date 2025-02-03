import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import { prisma } from "@/lib/prisma"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email) return false
      var UserExists = false
      try {
        // Check if user exists
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email }
        })

        if (existingUser) {
          UserExists = true
        }

        if (!existingUser) {
          // Create new user if they don't exist
          const newUser = await prisma.user.create({
            data: {
              email: user.email,
              name: user.name,
              image: user.image,
            }
          })

          if (newUser) {
            UserExists = true
          }

        }
        return UserExists
      } catch (error) {
        console.error("Error checking/creating user:", error)
        return false
      }
    },



    async jwt({ token, user }) {
      if (user) {
        // Get the user from database
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
          select: { id: true }
        })

        // Add the database ID to the token
        token.id = dbUser?.id
      }
      return token
    },
    async redirect({ url, baseUrl }) {
      // Always redirect to dashboard after sign in
      if (url.includes('/login')) {
        return `${baseUrl}/dashboard`
      }
      // Allow relative callback URLs
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`
      }
      // Allow callback URLs on the same origin
      if (new URL(url).origin === baseUrl) {
        return url
      }
      return baseUrl
    },
  },
})

export { handler as GET, handler as POST }

