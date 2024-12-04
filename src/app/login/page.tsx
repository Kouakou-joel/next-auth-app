'use client';

import { signIn, useSession } from "next-auth/react";
import Formlogin from "@/component/formLogin";
import ButtonsProvider from "@/component/buttonsprovider";




export default function LoginPage() {


    return (
        <div className="flex flex-col justify-center items-center gap-8 w-full h-screen">
            <h1 className="font-black text-4xl text-gray-700 uppercas">Connexion</h1>


            <Formlogin />

            <ButtonsProvider></ButtonsProvider>

        </div>

    )
}
