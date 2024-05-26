import React, { useContext } from 'react'
import { AuthContext } from "../context/Auth/AuthContext"
import {useForm} from 'react-hook-form'

export const EditProfile = () => {
    const {editProfile, user} = useContext(AuthContext)
    const formatDate = (dateString) => {
        if (!dateString) return ''; 
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
        const day = date.getDate().toString().padStart(2, '0'); 
        return `${year}-${month}-${day}`;
    };
    const { register, handleSubmit } = useForm({
        defaultValues: {
            name: user.name,  
            lastname: user.lastname, 
            telefono: user.telefono,
            email: user.email,
            birthday: formatDate(user.birthday)
        }
    })
  
    return (
      <>
      <div className=" w-11/12 md:w-2/3 h-auto flex flex-col justify-center  p-6 my-8 gap-4 border-2 border-white/80 rounded-md backdrop-blur-[2px] shadow-[15px_8px_50px_rgba(255,255,255,0.8)]">
        <p className="font-bold text-4xl text-center text-white shadow-md drop-shadow-md">Editar Perfil</p>
        <form action="POST" onSubmit={handleSubmit((values)=>{
          editProfile(values)
        })} className='flex flex-col gap-4'>
        <div className='flex flex-col gap-1'>
          <label className='font-semibold text-lg text-white ' htmlFor="name">Name:</label>
          <input  type="text" className="pl-2 rounded-lg h-8 border border-white bg-transparent text-white placeholder:text-white" {...register('name',{required:true})}/>
          </div>
          <div className='flex flex-col gap-1'>
          <label className='font-semibold text-lg text-white ' htmlFor="lastname">Lastname:</label>
          <input  type="text" className="pl-2 rounded-lg h-8 border border-white bg-transparent text-white placeholder:text-white" {...register('lastname',{required:true})} />
          </div>
          <div className='flex flex-col gap-1'>
          <label className='font-semibold text-lg text-white ' htmlFor="email">Email:</label>
          <input type="email" className="pl-2 rounded-lg h-8 border border-white bg-transparent text-white placeholder:text-white"{...register('email',{required:true, disabled:true})} />
          </div>
          <div className='flex flex-col gap-1'>
          <label className='font-semibold text-lg text-white ' htmlFor="birthday">Birthday:</label>
          <input   type="date" className="pl-2 rounded-lg h-8 border border-white bg-transparent text-white placeholder:text-white" {...register('birthday',{required:true})}/>
          </div>
          <div className='flex flex-col gap-1'>
          <label className='font-semibold text-lg text-white ' htmlFor="password">Password:</label>
          <input className="pl-2 rounded-lg h-8 border border-white bg-transparent text-white placeholder:text-white" type="password"  {...register('password')} placeholder="*******"/>
          </div>
          <button className="border-2 border-white rounded-md font-semibold text-white text-xl" type='submit'>Guardar Cambios</button>
          </form>

        </div>
      </>
    )
}
