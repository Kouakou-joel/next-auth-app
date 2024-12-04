import { getServerSession } from "next-auth";
import { AuthOptions } from "../../../../../lib/authOptions";
import { NextResponse } from "next/server";
import { error } from "console";

export async function GET() {

    const session = await getServerSession(AuthOptions)
 if (!session) {
    return NextResponse.json({error: "Non autoriser"}, {status: 400})
 }
 return NextResponse.json({success: session}, {status: 200})
}