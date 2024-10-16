import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers } = NextAuth({
    providers: [
    Credentials({
        credentials: {
            email: {
                label: "Email",
                type: "Email",
                placeholder: "email@example.com",
            },
            password: {
                label: "Password",
                type: "Password",
            },
        },
        async authorize(credentials) {
            const guest = {email: "guest@example.com"}
            const admin = {email: "admin@example.com"}
            // check if user exists
            if (credentials.email === guest.email && credentials.password === "guest") {
                return guest
            } else if (credentials.email === admin.email && credentials.password === "admin") {
                return admin
            }
        }
    }),
    GitHub({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
    }),
    Google({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
    })
    ],
})