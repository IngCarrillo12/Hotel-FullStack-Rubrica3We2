import React from 'react'
import { useNavigate } from 'react-router-dom'

export const HomePage = () => {
  const navigate = useNavigate()
  return (
    <section className='w-full h-[550px] justify-center text-center flex  '>
        <div className='flex flex-col items-center gap-4 m-12 mt-24 w-full md:w-1/2 '>
            <h1 className='text-4xl font-extrabold text-white'>Bookings OnFire</h1>
            <p className='text-1xl font-normal text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel sunt at error ipsum, sapiente soluta velit rerum dolorum. Eius labore rem ratione magni necessitatibus officia minima fugit veritatis iusto sint.</p>
            <button onClick={()=>navigate('/rooms')} className='border-2 w-1/2 text-white font-bold h-8 rounded-md'>Ver habitaciones</button>
        </div>
    </section>
  )
}
