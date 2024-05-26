import React, { useContext, useState } from 'react'
import { HotelContext } from '../context/Hotel/HotelContext'
import { ModalFormEdit } from './ModalFormEdit'
import { ModalFormAddRoom } from './ModalFormAddRoom'

export const CrudBookings = () => {
  const { rooms, deleteRoom } = useContext(HotelContext)
  const [openEdit, setOpenEdit] = useState(false)
  const [roomEdit, setRoomEdit] = useState(null)
  const [openAddRoom, setOpenAddRoom] = useState(false)

  const handleEdit = (id) => {
    const infoRoom = rooms.find(room => room.idhabitaciones === id)
    setRoomEdit(infoRoom)
    setOpenEdit(true)
  }

  return (
    <>
      {
        !openEdit && !openAddRoom ? (
          <>
            <table className='w-3/4 text-center border backdrop-blur-[4px]'>
              <button
                onClick={() => setOpenAddRoom(true)}
                className='font-semibold text-lg border-2 border-white rounded-md w-44 px-2 py-1 absolute top-[-3rem] right-2'
              >
                Agregar Room
              </button>
              <thead className='border'>
                <tr>
                  <th className='border'>Código Habitación</th>
                  <th className='border'>Numero</th>
                  <th className='border'>Tipo</th>
                  <th className='border'>Valor</th>
                  <th className='border'>Action</th>
                </tr>
              </thead>
              <tbody>
                {rooms && rooms.map((room) => (
                  <tr key={room.idhabitaciones} className='border'>
                    <td className='border'>{room.idhabitaciones}</td>
                    <td className='border'>{room.numero}</td>
                    <td className='border'>{room.tipo}</td>
                    <td className='border'>{room.valor}</td>
                    <td className='border flex gap-2 items-center justify-center'>
                      <img
                        className='w-8 h-8'
                        onClick={() => handleEdit(room.idhabitaciones)}
                        height="30"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABTUlEQVR4nO2ZvUrEQBRGT2GrhaWPIdhrLdqJnT/jvzbb+RzrI2xt4wPYWNgslvsG2lhpoyJklYERhmUSExu/G+6BEEhS3MOXuQlzwXG6sgLcAC/AG3APbGOMXeAT+CocVxhhDhjXSPwcWxhhEXhoELlDmCPgCVhrIfOKKKfANBW5nl2vk3lGXGJQuF+SucaYREkmdrNlDErkMuPUmk1KbACrWWuW4aSDxCA9F7sZ1iWmwDFCHAJVKu6yg8QFQvRC4sAlRPAkrCdxjhAuoUIvkgguIULwJEQInoQIwZMwnsQZQgSXECH0IYl9lxBhL0ui7eZZlX7hZVgA3q1LRDazBRs3mNss7Kbn/o1hNkSpK1JeIjKZmQjNFmtCYinbIS/JmJCI7DSMgavsHD+S0ox+Gc5/pNYsz2Oh+ElqAHHsNY8RbpPMKL1mcc04Dn/jG2ZuF5tGhdokAAAAAElFTkSuQmCC"
                        alt="edit icon"
                      />
                      <img
                        className='w-8 h-8'
                        onClick={() => deleteRoom(room.idhabitaciones)}
                        src="https://img.icons8.com/ios-glyphs/30/filled-trash.png"
                        alt="filled-trash"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <>
            {openEdit && (
              <ModalFormEdit setOpenEdit={setOpenEdit} room={roomEdit} />
            )}
            {openAddRoom && (
              <ModalFormAddRoom setOpenAddRoom={setOpenAddRoom} />
            )}
          </>
        )
      }
    </>
  )
}
