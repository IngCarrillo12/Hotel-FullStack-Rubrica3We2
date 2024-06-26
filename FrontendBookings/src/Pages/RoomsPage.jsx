import React, { useContext, useState } from 'react'
import { HotelContext } from '../context/Hotel/HotelContext'
import { CardRoom } from '../components/CardRoom'
import { AuthContext } from '../context/Auth/AuthContext'

export const RoomsPage = () => {
  const [openBooking, setOpenBooking] = useState(false)
  const {rooms} = useContext(HotelContext)
  const { user } = useContext(AuthContext)
  return (
    <div className='w-full h-screen mt-4 flex flex-col  items-center bg-transparent'>
        <h1 className=' font-bold text-3xl border-b-2 text-white '>Rooms</h1>
      <div className='flex gap-4 my-8 justify-center items-center w-full flex-wrap'>
       {
            rooms.length?(
                rooms.map(room=><CardRoom key={room.idhabitaciones} idhabitaciones={room.idhabitaciones} numero={room.numero} tipo={room.tipo} valor={room.valor} user={user} setOpenBooking={setOpenBooking} openBooking={openBooking} />)
            ):(
                <h2>No hay Rooms Disponibles</h2>
            )
        }
          </div>
    </div>
  )
}
