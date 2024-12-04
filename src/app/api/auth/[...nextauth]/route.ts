import NextAuth from "next-auth";
import { AuthOptions } from "../../../../../lib/authOptions";
import nextAuth from "next-auth";

const handler = nextAuth(AuthOptions);

export {handler as GET, handler as POST}