'use client';

import { signIn, useSession } from "next-auth/react";

import ButtonProvider from "@/component/buttonsprovider";
import Formregister from "@/component/formRegister";


export default function LoginPage() {

   

    return (
        <div className="flex flex-col justify-center items-center gap-8 w-full h-screen">
            <h1 className="font-black text-4xl text-gray-700 uppercas">Inscripttion</h1>
            <Formregister />

            <ButtonProvider />
        </div>

    )
}
