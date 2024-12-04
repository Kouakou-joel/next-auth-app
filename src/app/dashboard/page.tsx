'use client'

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IoIosLogOut } from "react-icons/io";
import Image from "next/image";

export default function DashboardPage() {

    const router = useRouter();

    const { data: session } = useSession();

    return (
        <>
            {session ? (
                <div className="flex flex-col justify-center items-center gap-5 w-full h-screen">
                    {session.user?.image && <Image src={session.user?.image as string} width={100} height={100}
                     alt={session.user?.name as string} className="rounded-full w-14 h-14" />}
                    <h1 className="font-black text-4xl text-gray-600 uppercas">Bienvenue <b>{session.user?.name}</b></h1>
                    <p><b>Email:</b>{session.user?.email}</p>
                    <button onClick={() => signOut()} className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 p-3 rounded-md">
                        <IoIosLogOut />
                        <span>Deconnexion</span>
                    </button>
                </div>
            ) : (
                router.push('/login')
            )}
        </>
    );
}