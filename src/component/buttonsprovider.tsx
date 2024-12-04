'use client';

import { FaGithub } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import { useRouter } from "next/dist/client/components/navigation";
import { useEffect } from "react";

export default function ButtonsProvider() {
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        if (session) {
            router.push('/dashboard')
        }

    }, [session, router])
    return (
        <div className="flex flex-col gap-8">
        <button onClick={()=> signIn('google')} className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 p-3 rounded-md">
            <FaGoogle />
            <span>Se connecter avec Google</span>
        </button>
        <button onClick={()=> signIn('github')} className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 p-3 rounded-md">
            <FaGithub />
            <span>Se connecter avec Github</span>
        </button>
    </div>
    )
}

