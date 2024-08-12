import NextAuth, { AuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { getUser_ } from "@/app/actions/userAction"
import bcrypt from "bcrypt";
import { log, profileEnd } from "console";
import { Registerschema } from "@/app/actions/schemas";
import { registerUser } from "@/app/actions/userAction";

export const authoptions: AuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || "",
        }),
        //
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials, req) {
                console.log("somebody authenticating....")
                if (credentials != null) {
                    const user = await getUser_(credentials.email)
                    if (user != null && user.password != undefined) {
                        const result = await bcrypt.compare(credentials.password, user.password);
                        if (result) {
                            return (user)
                        }
                    }
                    return null
                }

                return (null)
            },
        })
    ],

    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60, // 24 hours
        updateAge: 24 * 60 * 60, // 24 hours
    },

    callbacks: {
        //ovverd callbas
        async jwt({ token, account }) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        },

        async session({ session, token, user }) {
            // Send properties to the clien
            //session.user=user
            return session
        },

        async signIn({ user, account, profile, email, credentials }) {
            console.log(account);
            if (account?.provider == "github") {
                const newu = {
                    email: profile?.email,
                    name: profile?.name
                }

                registerUser("A0", undefined, newu)

            }
            const isAllowedToSignIn = true
            if (isAllowedToSignIn) {
                return true
            } else {
                return false
            }
        }
    },
    pages: {
        signIn: '/login',
        //signOut: 'api/auth/signout',
        //error: '/auth/error',
        //verifyRequest: '/auth/verify-request',
    },

    secret: process.env.NEXTAUTH_SECRET,

}

const handler = NextAuth(authoptions);

export { handler as GET, handler as POST }