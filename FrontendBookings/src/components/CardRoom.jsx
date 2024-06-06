import React, { useContext, useEffect, useState } from 'react'
import { HotelContext } from '../context/Hotel/HotelContext'
import { useForm } from 'react-hook-form'
import {Link} from 'react-router-dom'
export const CardRoom = ({idhabitaciones, numero, tipo, valor, user, setOpenBooking, openBooking}) => {
  const {bookingRooms} = useContext(HotelContext)
  const {register, handleSubmit} = useForm()
  const [minDate, setMinDate] = useState('');
  const isAdmin = user ? user.admin : false
  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 16);
    setMinDate(formattedDate);
  }, []);
  
  return (
    <>
    <div className='flex gap-1 md:gap-8 w-[95%] h-auto md:h-40 lg:w-[45%] md:w-[80%] border-2 rounded-lg border-white backdrop-blur-md'>
        <img className=' w-28 h-28 md:w-52 md:h-auto  rounded-lg' src="https://img.freepik.com/vector-gratis/plantilla-fondo-interior-dormitorio-dibujos-animados-acogedora-habitacion-moderna-luz-manana_33099-171.jpg" alt="img habitacion" />
        <div className='flex justify-around w-full h-28 md:h-auto items-center md:pr-12'>
            <div className='flex h-20 justify-center flex-col gap-1'>
                <h1 className='font-bold text-lg  md:text-2xl'>{tipo}</h1>
                <p className='text-sm md:text-base'>Numero: ◉ {numero}</p>
                <p className='font-semibold text-base md:text-lg'>Valor: ${valor}</p>
            </div>
            {
        user?(
           !isAdmin&&(
            <button onClick={()=>setOpenBooking(true)} className="md:border-2 border px-4 border-white rounded-md font-semibold text-white text-lg md:text-xl">Reservar</button>
           )
          ):(
          <Link to={'/login'} className=' no-underline'>Loguarse</Link>
        )
    }
           
        </div>
    </div>
    {
      openBooking&&(
        <div className=' ModalFormEdit fixed md:absolute top-24 bg-red-400'>
           <img onClick={()=>setOpenBooking(false)} className=' w-6 h-4 absolute right-4 cursor-pointer z-50'  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACSElEQVR4nO2Zz0sVURTHb5YhRKZZIoUhLUIhEBTa18KEpy0Ksk22sqWrdKVtsj9CW2UrFxq0aBO0aBEoJUpFm+CVFmlERNEPFfzIwMi8Oe/4ns93Z94dnO9u3pzzPZ9hzrw5944xqVKl2j8CMsASsAx0W/a+7Ht/BnpseucW8Qps6xfQYsm3xffb1pINX63QCmE9B6rK9KzyfXKVtUcdLnabfA2W6TmoeA7Yow4XOwA8FcX+AOf26HcW+C38nnl17NMHRU8BP0TRl8DBPbTOC+HzE2iODD6neL9y24dK9BhWPG5GR50PMC2K/wfO7zK3Dfgn8p9ETx2GOAmsCoh5oLpI3iFgTuR9B5riow9g+pQ2GC2Sc1fJuR4fdT7QlIDZADp3iG0H1kT8TPzUYagG4KuAegfUiLjDwKKI+wY0Vo4+gOtV2mJMxNxXYq4aVwRMKq10wT/XAayL8w+NSwKOiWHP03ugDngrfv8C1BvX5I3YwKaAzYrjTdujuFUBExTWuHFZwBHgww7w3t04alwXcFFpJe+4yyRBwKXEXgCFW+gjUGtcFvCgyEM8YVwVSf4bpfCL7I3yIjtuXBLwqMRRYtK4IuCK0uv3RMyYEnOtctQB2AllnF7wxmcRVw28cm6cpvwFzeP4qQOgG0pbjBTJGVVy+uKjLryof73LRf1sxRf1lLet0gr8rdi2CnBLaYM7JXoMKR790VEHhU9HvLV4Jkr4ZG/uAgNJ317PJv0Dx3LSPzFl/Iv4ZHt1BXTlfEDM2PROlSqVcVdbwiJreK7w6qEAAAAASUVORK5CYII="/>
        <form action="POST" onSubmit={handleSubmit((values)=>{
            const fecha_reservacion = new Date()

            bookingRooms({idhabitaciones, id_cliente:user.idusers, nombre_cliente:`${user.name} ${user.lastname}`,telefono_cliente:user.telefono, fecha_reservacion, ...values})
            setOpenBooking(false)
          })} className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
            <label htmlFor="fecha_entrada" className='font-semibold text-lg text-white '>Fecha entrada:</label>
            <input type="datetime-local" min={minDate} className="pl-2 rounded-lg h-8 border border-white bg-transparent text-white placeholder:text-white" {...register('fecha_entrada',{required:true})} />
            </div>
            <div className='flex flex-col'>
            <label htmlFor="fecha_salida"  className='font-semibold text-lg text-white'>Fecha salida:</label>
            <input  type='datetime-local' min={minDate} className="pl-2 rounded-lg h-8 border border-white bg-transparent text-white placeholder:text-white" {...register('fecha_salida',{required:true})} />
            </div>
              <button className="border-2 border-white rounded-md font-semibold text-white text-xl" >Confirmar reservacion</button>
            
            </form>
        </div>
      )
    }
    </>
  )
}
