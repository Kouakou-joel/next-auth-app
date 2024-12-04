import React from 'react'
import { HiHome } from "react-icons/hi2";
import { PiArticleFill } from "react-icons/pi";
import { MdDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";

import Link from 'next/link';
import path from 'path';

export default function Nav() {

    const menusNav = [
        { name: "Accueil", icon: HiHome, path: "/" },
        { name: "Blog", icon: PiArticleFill, path: "/blog" },
        { name: "Dashboard", icon: MdDashboard, path: "/dashboard" },
    ]
    return (


        <nav className='flex justify-between items-center gap-5 shadow-md p-5 h-20 text-2xl'>
            <ul className='flex items-center gap-10'>
                {menusNav.map((item) => (
                    <li key={item.name} className='' >

                        <Link href={item.path} className='flex items-center gap-2 text-gray-700 hover:text-orange-700'>
                            <item.icon />
                            <span >{item.name}</span>
                        </Link>

                    </li>
                ))}

            </ul>
            {/* <Link href="/login" className='bg-gray-500 rounded-full w-10 h-10'>
                <FaUsers className=''/>
            </Link> */}
        </nav>
    )
}
