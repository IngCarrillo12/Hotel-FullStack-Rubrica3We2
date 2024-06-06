import React, { useContext } from 'react'
import { AuthContext } from "../context/Auth/AuthContext"
import { Link } from "react-router-dom"
import {useForm} from 'react-hook-form'
export const Register = () => {
  const {signUp} = useContext(AuthContext)
  const {register, handleSubmit} = useForm()

  return (
    <>
   <div className=' w-full md:w-3/4 flex flex-col justify-center items-center p-4 md:p-6 md:mb-4 gap-2 md:gap-4 border-2 border-white/80 rounded-md backdrop-blur-[2px] shadow-[15px_8px_50px_rgba(255,255,255,0.8)]'>
      <p className="font-bold text-3xl md:text-4xl text-center text-white  ">Sign Up</p>
      <form action="POST" onSubmit={handleSubmit((values)=>{
        signUp(values)
      })} className='flex w-full flex-col gap-4'>
        <div className='flex justify-center w-full gap-4'>
        <div className='flex w-[45%] flex-col'>
        <label htmlFor="name" className='font-semibold text-lg text-white'>Name:</label>
        <input  type="text" className="p-2 rounded-lg  h-8 border border-white bg-transparent text-white placeholder:text-white" {...register('name',{required:true})} placeholder="Juan"/>
        </div>
        <div className='flex w-[45%] flex-col gap-1'>
        <label htmlFor="lastname" className='font-semibold text-lg text-white'>Lastname:</label>
        <input  type="text" className="p-2 rounded-lg  h-8 border border-white bg-transparent text-white placeholder:text-white" {...register('lastname',{required:true})} placeholder="Carrillo"/>
        </div>
        </div>
        <div className='flex justify-center gap-4'>
        <div className='flex w-[45%] flex-col gap-1'>
        <label htmlFor="email" className='font-semibold text-lg text-white'>Email:</label>
        <input  type="email" className="p-2 rounded-lg  h-8 border border-white bg-transparent text-white placeholder:text-white" {...register('email',{required:true})} placeholder="YourEmail@company.com"/>
        </div>
        <div className='flex w-[45%] flex-col gap-1'>
        <label htmlFor="telefono" className='font-semibold text-lg text-white'>Tel:</label>
        <input  type="tel" className="p-2 rounded-lg  h-8 border border-white bg-transparent text-white placeholder:text-white" {...register('telefono',{required:true})} placeholder="3105540952"/>
        </div>
        </div>
        
        <div className='flex flex-col gap-1'>
        <label htmlFor="birthday" className='font-semibold text-lg text-white'>Birthday:</label>
        <input  type="date"  min="1950-01-01" max="2006-12-31" className="p-2 rounded-lg  h-8 border border-white bg-transparent text-white placeholder:text-white" {...register('birthday',{required:true})}/>
        </div>
        <div className='flex flex-col gap-1'>
        <label htmlFor="password" className='font-semibold text-lg text-white'>Password:</label>
        <input type="password" className="p-2 rounded-lg  h-8 border border-white bg-transparent text-white placeholder:text-white" {...register('password',{required:true})} placeholder="*******"/>
        </div>
        <button className="border border-white h-8 bg-transparent rounded-md text-white" type='submit'>Sign Up</button>     
        </form>
      <p className="text-white text-xl">
      Do you already have an account?<Link to={"/login"} className="pl-2 text-blue-600 font-bold underline">Log In</Link>
      </p>
      </div>

    </>
  )
}
