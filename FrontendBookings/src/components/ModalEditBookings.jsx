import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { HotelContext } from '../context/Hotel/HotelContext'

export const ModalEditBookings = ({info, setOpenEdit}) => {
    const {fecha_entrada, fecha_salida, telefono_cliente, idreservas} = info
   const {editBooking} = useContext(HotelContext)
    const {register, handleSubmit} = useForm({ defaultValues: {
        telefono_cliente,
        fecha_entrada,
        fecha_salida      
    }})
    useEffect(() => {
      
    }, [info])
    
  return (
    <div className='ModalFormEdit backdrop-blur-[2px]'>
    <img className=' w-6 h-4 absolute right-4 cursor-pointer z-50' onClick={()=>setOpenEdit(false)} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACSElEQVR4nO2Zz0sVURTHb5YhRKZZIoUhLUIhEBTa18KEpy0Ksk22sqWrdKVtsj9CW2UrFxq0aBO0aBEoJUpFm+CVFmlERNEPFfzIwMi8Oe/4ns93Z94dnO9u3pzzPZ9hzrw5944xqVKl2j8CMsASsAx0W/a+7Ht/BnpseucW8Qps6xfQYsm3xffb1pINX63QCmE9B6rK9KzyfXKVtUcdLnabfA2W6TmoeA7Yow4XOwA8FcX+AOf26HcW+C38nnl17NMHRU8BP0TRl8DBPbTOC+HzE2iODD6neL9y24dK9BhWPG5GR50PMC2K/wfO7zK3Dfgn8p9ETx2GOAmsCoh5oLpI3iFgTuR9B5riow9g+pQ2GC2Sc1fJuR4fdT7QlIDZADp3iG0H1kT8TPzUYagG4KuAegfUiLjDwKKI+wY0Vo4+gOtV2mJMxNxXYq4aVwRMKq10wT/XAayL8w+NSwKOiWHP03ugDngrfv8C1BvX5I3YwKaAzYrjTdujuFUBExTWuHFZwBHgww7w3t04alwXcFFpJe+4yyRBwKXEXgCFW+gjUGtcFvCgyEM8YVwVSf4bpfCL7I3yIjtuXBLwqMRRYtK4IuCK0uv3RMyYEnOtctQB2AllnF7wxmcRVw28cm6cpvwFzeP4qQOgG0pbjBTJGVVy+uKjLryof73LRf1sxRf1lLet0gr8rdi2CnBLaYM7JXoMKR790VEHhU9HvLV4Jkr4ZG/uAgNJ317PJv0Dx3LSPzFl/Iv4ZHt1BXTlfEDM2PROlSqVcVdbwiJreK7w6qEAAAAASUVORK5CYII="/>
    <h1 className='pt-4 font-bold text-2xl text-center text-white shadow-md drop-shadow-md'>Editar Reserva</h1>
    <form action="POST" onSubmit={handleSubmit((values)=>{
        editBooking({...values,idreservas})
        setOpenEdit(false)
      })} className='flex flex-col gap-4'>
        
        <div className='flex flex-col'>
        <label htmlFor="telefono"  className='font-semibold text-lg text-white'>Telefono Cliente:</label>
        <input  type='number'  className="pl-2 rounded-lg h-8 border border-white bg-transparent text-white placeholder:text-white" {...register('telefono_cliente',{required:true})} />
        </div>
        <div className='flex flex-col gap-1'>
        <label htmlFor="fecha_entrada" className='font-semibold text-lg text-white '>Fecha entrada:</label>
        <input type="datetime-local" className="pl-2 rounded-lg h-8 border border-white bg-transparent text-white placeholder:text-white" {...register('fecha_entrada',{required:true})} />
        </div>
        <div className='flex flex-col'>
        <label htmlFor="fecha_salida"  className='font-semibold text-lg text-white'>Fecha salida:</label>
        <input  type='datetime-local'className="pl-2 rounded-lg h-8 border border-white bg-transparent text-white placeholder:text-white" {...register('fecha_salida',{required:true})} />
        </div>
          <button className="border-2 border-white rounded-md font-semibold text-white text-xl" >Editar</button>
        
        </form>
        </div>
  )
}
