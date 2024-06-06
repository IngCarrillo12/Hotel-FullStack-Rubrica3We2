import React, { useContext, useEffect } from 'react'
import {useForm} from 'react-hook-form'
import { HotelContext } from '../context/Hotel/HotelContext'
export const ModalFormEdit = ({setOpenEdit, room}) => {
  const {idhabitaciones, numero, tipo, valor} = room
  const {updateRoom} = useContext(HotelContext)
  const { register, handleSubmit, setValue } = useForm();
  useEffect(() => {
    setValue('numero', numero);
    setValue('tipo', tipo);
    setValue('valor', valor);
  }, [numero, tipo, valor, setValue]);
  return (
    <div className='ModalFormEdit backdrop-blur-[2px] '>
      <img className=' w-6 h-4 absolute right-4 cursor-pointer z-50' onClick={()=>setOpenEdit(false)} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACSElEQVR4nO2Zz0sVURTHb5YhRKZZIoUhLUIhEBTa18KEpy0Ksk22sqWrdKVtsj9CW2UrFxq0aBO0aBEoJUpFm+CVFmlERNEPFfzIwMi8Oe/4ns93Z94dnO9u3pzzPZ9hzrw5944xqVKl2j8CMsASsAx0W/a+7Ht/BnpseucW8Qps6xfQYsm3xffb1pINX63QCmE9B6rK9KzyfXKVtUcdLnabfA2W6TmoeA7Yow4XOwA8FcX+AOf26HcW+C38nnl17NMHRU8BP0TRl8DBPbTOC+HzE2iODD6neL9y24dK9BhWPG5GR50PMC2K/wfO7zK3Dfgn8p9ETx2GOAmsCoh5oLpI3iFgTuR9B5riow9g+pQ2GC2Sc1fJuR4fdT7QlIDZADp3iG0H1kT8TPzUYagG4KuAegfUiLjDwKKI+wY0Vo4+gOtV2mJMxNxXYq4aVwRMKq10wT/XAayL8w+NSwKOiWHP03ugDngrfv8C1BvX5I3YwKaAzYrjTdujuFUBExTWuHFZwBHgww7w3t04alwXcFFpJe+4yyRBwKXEXgCFW+gjUGtcFvCgyEM8YVwVSf4bpfCL7I3yIjtuXBLwqMRRYtK4IuCK0uv3RMyYEnOtctQB2AllnF7wxmcRVw28cm6cpvwFzeP4qQOgG0pbjBTJGVVy+uKjLryof73LRf1sxRf1lLet0gr8rdi2CnBLaYM7JXoMKR790VEHhU9HvLV4Jkr4ZG/uAgNJ317PJv0Dx3LSPzFl/Iv4ZHt1BXTlfEDM2PROlSqVcVdbwiJreK7w6qEAAAAASUVORK5CYII="/>
      <h1 className=" pt-4 font-bold text-2xl text-center text-white shadow-md drop-shadow-md">Editar Room</h1>
    <form className='flex flex-col justify-center items-center gap-2' onSubmit={handleSubmit(values=>{
      updateRoom({id:idhabitaciones,...values})
      setOpenEdit(false)
})} >
        <div className='flex flex-col w-4/5'>
          <label htmlFor="numero"  className='font-semibold text-lg text-white '>Numero:</label>
          <input type="text" {...register('numero',{required:true})} className="pl-2 rounded-lg h-8 border border-white bg-transparent text-white placeholder:text-white"/>
        </div>
        <div className='flex flex-col w-4/5'> 
          <label htmlFor="tipo"  className='font-semibold text-lg text-white '>Tipo:</label>
          <input type="text"  {...register('tipo',{required:true})}className="pl-2 rounded-lg h-8 border border-white bg-transparent text-white placeholder:text-white" />
        </div>
        <div className='flex flex-col w-4/5'>
          <label htmlFor="valor"  className='font-semibold text-lg text-white '>Valor:</label>
          <input type="number" {...register('valor',{required:true})} className="pl-2 rounded-lg h-8 border border-white bg-transparent text-white placeholder:text-white"/>
        </div>
        <button className='border-2 w-4/5 border-white rounded-md font-semibold text-white text-xl'>Guardar</button>
    </form>
    </div>
  )
}
