import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { auth } from "../src/app/db/firebaseConfig"
import { signInWithEmailAndPassword } from "firebase/auth";
import Email from "next-auth/providers/email";
import { Session } from "inspector";

export const AuthOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
              async authorize(credentials: Record<"email" | "password", string> | undefined, req: any) {
                if (!credentials) {
                    return null;
                }
                try {
                    const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password)
                    const user = userCredential.user

                    if (user) {
                        return {
                            id: user.uid,
                            email: user.email
                        };
                    } else {
                        return null
                    }
                }
                catch (error: any) {
                    console.error(error.message);
                    return null
                }
            }
        })
    ],

    callbacks: {
        jwt: async ({user, token, trigger, session})=>{
            if (trigger === 'update') {
                return {...token, ...session.user}
            }
            return {...token, ...user}
        }
    }

}

