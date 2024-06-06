import React from 'react'
import { useNavigate } from 'react-router-dom'

export const HomePage = () => {
  const navigate = useNavigate()
  return (
    <section className='w-full h-screen justify-center text-center flex  '>
        <div className='flex flex-col items-center gap-4 m-12 mt-48  w-full md:w-1/2 '>
            <h1 className='text-6xl font-extrabold text-white'>Bienvenidos a Hotel Transilvania</h1>
            <p className='text-xl font-normal text-white'>Experimenta el confort y la elegancia en el corazón de Barranquilla, donde cada detalle está pensado para ofrecerte una estancia inolvidable. En Transilvania, combinamos lujo moderno con hospitalidad tradicional, creando un ambiente perfecto tanto para viajeros de negocios como de placer.</p>
            <button onClick={()=>navigate('/rooms')} className='border-2 flex items-center justify-center p-8 w-1/2 text-white font-bold h-8 rounded-md text-2xl'>Ver habitaciones</button>
        </div>
    </section>
  )
}
