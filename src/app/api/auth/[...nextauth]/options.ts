import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/app/lib/dbConnect";
import bcrypt from "bcrypt";
import UserModel from "@/models/user";
import NextAuth from "next-auth/next";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials:any) {
                await dbConnect();
                try{
                const user = await UserModel.findOne({ username: credentials?.username });
                if (!user) {
                    throw new Error("Invalid username");
                }
                const passwordMatch = await bcrypt.compare(credentials?.password as string, user.password);
                if (!passwordMatch) {
                    throw new Error("Invalid  password");
                }
            }catch(error){
                console.log(error);
            }
                return user;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if(user){token._id=user._id?.toString();
                token.username=user.username;
            token.isVerified=user.isVerified;
            token.isAcceptingMsg=user.isAcceptingMsg;
            }
            return { ...token, ...user };
        },
        async session({ session, token }) {
            if(token){
                session.user._id=token._id;
                session.user.username=token.username;
                session.user.isVerified=token.isVerified;
                session.user.isAcceptingMsg=token.isAcceptingMsg;
            }
            return session;
        },
    }
    pages: {
        signIn: "/signin",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};