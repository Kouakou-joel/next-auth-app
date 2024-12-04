import { collection, addDoc } from "firebase/firestore"
import { NextResponse } from "next/server"
import { db } from "@/app/db/firebaseConfig"

export async function POST(request: Request) {

    try {

        const { email, password } = await request.json()

        const bcrypt = require('bcrypt')

        const hashedPassword = await bcrypt.hashe(password, 10);
        const userccollection = collection(db, "user");
        const useRef = await addDoc(userccollection, {
            email: email,
            password: hashedPassword,
        })
        return NextResponse.json({ success: "compte ajute", userId: useRef.id })

    } catch (error: any) {
        
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}