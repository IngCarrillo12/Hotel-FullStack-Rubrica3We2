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
            <table className='w-3/4 text-center bg-black/40 border backdrop-blur-[4px]'>
              <button
                onClick={() => setOpenAddRoom(true)}
                className='font-semibold text-lg border-2 bg-black/40 border-white rounded-md w-44 px-2 py-1 absolute top-[-3rem] right-2'
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
                {rooms.length && rooms.map((room) => (
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
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABV0lEQVR4nO3ZrU4DQRSG4U/UgkD2MkjwoAk4gqPQ8lPA1HEdcAnVGC4Ag8AQZO+AGhQYICTtSyYZMZTdzS6m52zmMW22I+bN6Y7YlbKsEWADuAPegA/gEdiXJ0AP+KbYjTwAOsAT1fbkAbAGPFeEPMgq4ASYAls1Yt5lETAE5nGT28n1sphXGY8YFfxeFHMrTxElMeE0W5e3iIWYcJr15DEC2AE24/eOrADOGkSM4rqpLPlnxBw4lRXAMTCLm7tqEHEpK9oSMcgRFuRJtGASF7IiR1jRlkn0c4QF5EkYQZ6EEeRJ+J/EuawgRxhBSyZxlCMsAA6TSdR9eBbWD2QFsAp8uo4IgN3khh2q3o1dum5pgOvkJUrhJs1HBMBk4Y3Qr816iegmT8j/xLiICIADys2Sz74sA8ZU+wpHs6wDXgo2P4kHQHjttSIPgPsYM45/s+6y95TJsR9jsZZU4R8K0AAAAABJRU5ErkJggg=="
                        alt="edit icon"
                      />
                      <img
                        className='w-8 h-8'
                        onClick={() => deleteRoom(room.idhabitaciones)}
                        src="https://img.icons8.com/ios-glyphs/30/FFFFFF/filled-trash.png"
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
