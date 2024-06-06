import React, { useContext} from 'react'
import { AuthContext } from "../context/Auth/AuthContext"
import { Link} from "react-router-dom"
import {useForm} from 'react-hook-form'
export const Login = () => {
  const {signIn} = useContext(AuthContext)
  const {register, handleSubmit} = useForm()

  return (
    <div className=" w-full md:w-2/3 h-[400px] flex flex-col justify-center p-6 my-8 gap-4 border-2 border-white/80 rounded-md backdrop-blur-[2px] shadow-[15px_8px_50px_rgba(255,255,255,0.8)]">
      <p className="font-bold text-4xl text-center text-white shadow-md drop-shadow-md">Welcome back</p>
      <form action="POST" onSubmit={handleSubmit((values)=>{
        signIn(values)
      })} className='flex flex-col gap-4'>
        <div className='flex flex-col gap-1'>
        <label htmlFor="email" className='font-semibold text-lg text-white '>Email:</label>
        <input type="email" className="pl-2 rounded-lg h-8 border border-white bg-transparent text-white placeholder:text-white" {...register('email',{required:true})} placeholder="Juan@company.com"/>
        </div>
        <div className='flex flex-col'>
        <label htmlFor="password" className='font-semibold text-lg text-white'>Password:</label>
        <input  type="password" className="pl-2 rounded-lg h-8 border border-white bg-transparent text-white placeholder:text-white" {...register('password',{required:true})} placeholder="*******"/>
        </div>
        <button className="border-2 border-white rounded-md font-semibold text-white text-xl" type='submit'>Log in</button>
        </form>
      <p className="text-white text-xl">
        Don't have an account?<Link to={"/register"} className="pl-2 text-blue-600 font-bold underline">Sign up</Link>
      </p>
    </div>
  )
}
