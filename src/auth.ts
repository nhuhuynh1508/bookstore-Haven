import NextAuth from "next-auth";
import type { Provider } from "next-auth/providers";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

// Define the authentication providers
export const providers: Provider[] = [
    Credentials({
        id: "credentials",
        credentials: {
            email: {
                label: "Email",
                type: "email",
                placeholder: "email@example.com",
            },
            password: {
                label: "Password",
                type: "password",
            },
        },
        async authorize(credentials) {
            const guest = { email: "guest@example.com" };
            const admin = { email: "admin@example.com" };
            // check if user exists
            if (credentials?.email === guest.email && credentials?.password === "guest") {
                return guest;
            } else if (credentials?.email === admin.email && credentials?.password === "admin") {
                return admin;
            }
            return null;
        }
    }),
    GitHub({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
        id: "github",
    }),
    Google({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        id: "google",
    })
];

export const providerMap = [
    { id: "credentials", name: "Credentials" },
    { id: "github", name: "GitHub" },
    { id: "google", name: "Google" }
];

// Set up NextAuth with providers
export const { handlers, auth, signIn, signOut } = NextAuth({
    providers,
    pages: {
        signIn: "/auth/signin",
    },
});
