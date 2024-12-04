import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import React from 'react'
import { z } from 'zod';
import { toast } from 'react-toastify';

interface formData {
  email: string;
  password: string;

}
const formSchema = z.object({
  email: z.string().min(1, { message: "Ce champ est requis" }),
  password: z.string().min(1, { message: "Ce champ est requis" }),


})



export default function Formlogin() {

  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<formData>({

    resolver: zodResolver(formSchema),
    defaultValues: {

      email: '',
      password: '',

    }
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      }
      );
      if (!response?.error) {
        router.push('/dashboard');
      }
      toast.success('vous etes connecter')

    } catch (error: any) {

      toast.error(error.message)
    }
  }
  return (
    <div className="flex">
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 bg-slate-50 shadow-md p-5 rounded-md w-96'>

        <label className='text-slate-900'>Email</label>
        <input {...register('email')} type="email" className="border-gray-600 p-5 border rounded-md h-10" />
        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}

        <label className='text-slate-900'>Mot de Passe</label>
        <input {...register('password')} type="password" className='border-slate-900 p-5 border rounded-md h-10' />
        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}

        <button type='submit' className='flex items-center bg-gray-600 hover:bg-gray-700 my-3 px-2 py-1.5 rounded-md h-10 text-white'>connexion</button>

        <a href='#' onClick={() => router.push('/register')} className='text-gray-300 hover:text-red-500'>Pas de compte  ? Inscriver vous</a>
      </form>

    </div>

  )
}
