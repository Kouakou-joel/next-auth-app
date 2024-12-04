import React from 'react'
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from '@/app/db/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import 'react-toastify/dist/ReactToastify.css';
import { emit } from 'process';
import Email from 'next-auth/providers/email';


interface formData {
    email: string;
    password: string;
    confirmpassword: string;
}
const formSchema = z.object({
    email: z.string().min(1, { message: "Ce champ est requis" }).email("email non valide").max(300, { message: "votre email doit faire au maximum 300 caractères ! " }),
    password: z.string().min(1, { message: "Ce champ est requis" }).min(6, { message: "votre mot de passe doit faire au minimum 6 caractères ! " }),
    confirmpassword: z.string().min(1, { message: "Ce champ est requis" }).min(6, { message: "votre mot de passe de confirmation doit faire au minimum 6 caractères ! " }),

}).refine(({ confirmpassword, password }) => {
    return confirmpassword === password;
}, {
    message: "les mots de passe ne correspondent pas",
    path: ["confirmpassword"]
})

async function addUserToFirestore(userId: string, email: string) {
    try {
        const userReed = doc(db, "users", userId)
        await setDoc(userReed, {
            email: email,
        })
    } catch (error) {
        console.error(error)
    }
}
export default function Formregister() {

    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<formData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmpassword: '',
        }
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const useCredential = await createUserWithEmailAndPassword(auth, values.email, values.password)

            const user = useCredential.user;
            await addUserToFirestore(user.uid, values.email)
            router.push('/dashboard');

            toast.success('votre compte créé avec succès')

        } catch (error: any) {
            toast.error(error.message)
        }
    }
    return (

        <>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 bg-slate-50 shadow-md p-5 rounded-md w-96'>
                <label  className='text-slate-900'>Email</label>
                <input {...register('email')} type="email" className="border-gray-600 p-5 border rounded-md h-10" />
                 {errors.email && <p className='text-red-500'>{errors.email.message}</p>}

                 <label  className='text-slate-900'>Mot de Passe</label>
                <input {...register('password')} type="password" className='border-slate-900 p-5 border rounded-md h-10' />
                {errors.password && <p className='text-red-500'>{errors.password.message}</p>}

                <label  className='text-slate-900'>Confirmer le Mot de Passe</label>
                <input {...register('confirmpassword')} type="password" className='border-slate-900 p-3 border rounded-md h-10' />
                {errors.confirmpassword && <p className='text-red-500'>{errors.confirmpassword.message}</p>}
                <button type='submit' className='flex justify-center items-center bg-gray-600 hover:bg-gray-700 my-3 px-2 py-1.5 rounded-md h-10 text-white'>Inscription</button>
                <a href='#' onClick={()=>router.push('/login')} className='text-gray-300 hover:text-red-500'>Deja un compte ? connectez vous</a>
            </form>
        </>
    )
}
