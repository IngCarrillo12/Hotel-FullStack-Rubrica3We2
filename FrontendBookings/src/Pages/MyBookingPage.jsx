import React, { useContext, useEffect } from 'react'
import { HotelContext } from '../context/Hotel/HotelContext'
import { AuthContext } from '../context/Auth/AuthContext'
export const MyBookingPage = () => {
    const {bookings, loadBookings, deleteBooking} = useContext(HotelContext)
    const {user} = useContext(AuthContext)
    useEffect(() => {
      loadBookings(user.idusers)
    }, [loadBookings, user.idusers])
  return (
    <div className='w-full h-screen flex flex-col  items-center bg-transparent gap-4 mt-8'>
        {
             bookings?(
            bookings.map(booking=>(
                <div key={booking.idreservas} className='flex gap-8 flex-col md:flex-row md:h-[auto] w-11/12 border-2 rounded-lg border-white backdrop-blur-md'>
                     <img className=' w-full md:w-52  rounded-lg' src="https://img.freepik.com/vector-gratis/plantilla-fondo-interior-dormitorio-dibujos-animados-acogedora-habitacion-moderna-luz-manana_33099-171.jpg" alt="img habitacion" />
                    <div className='flex justify-around w-full items-center md:pr-12 py-4 '>
                        <div className='flex w-[40%] md:w-full flex-col gap-2'>
                            <h1 className='font-bold text-2xl'>Info Room</h1>
                            <p className=' text-md'>Id: {booking.idreservas}</p>
                            <p className='font-bold text-md'>Tipo: {booking.tipo}</p>
                            <p className=' text-md'>Numero habitacion: {booking.numero}</p>
                            <p className='font-bold text-md'>Valor: $ {booking.valor}</p>
                            </div>
                            <div className='flex w-[40%] md:w-full flex-col gap-2'>
                            <h1 className='font-bold text-2xl'>Info Reservation</h1> 
                                <p className=' text-md'>◉ Fecha de reservacion: {booking.fecha_reservacion}</p>
                                <p className=' text-md'>◉Fecha de entrada: {booking.fecha_entrada}</p>
                                <p className=' text-md'>◉Fecha de salida: {booking.fecha_salida}</p>
                            </div>
                            
                            <img  onClick={()=>deleteBooking(booking.idreservas)} className='w-12 absolute top-2 right-2' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADnElEQVR4nO2ZTUgVURTHp0SolFyEXxERFIRG5KLAioqCFtXSRYnRolXWImhXkUiQ2DKK0GrTziKyVtaioIK+qXiarw9yERSERVEIYeovrp3R230z82beuzO+4v3hMXPv+88953/n3I9zx3GK+E8BLAWeAS+AZc6/CGAL8JlpfAG2ZnlmA3AJOAPMT85bHwD7gV8ioBe4KvdjwCGDOwfYCzwXzrhc3wFrnZkAUAp0iSMTwAlgNjALaJM6hYsq1IAOYFh7YyeBJUAL8E06ow0oSVLEAuCWOPUT2OPB2S4O6ngFHATKDO5i4I5wHiYyxoCVwJAY/QCsCeDWA2+F+wNYH8AtAY7Jm1Ed0GLT6dsUDu7lI6Sg4OQrxJlhUBQioMDg5Ao1wCgc3M1ZiIjpk4ZG5ZoGauSX1uuEn1GfB3dUrn15iRBjndLYacNohmPaMzWWuKfkvtOGkGZp7ApQBQwYK/VCn+fy5gI9Ut5pQ0idtrGrNAy+DnCuOk9urfZ2ltsQorYOI7IJHJSGU/ILGy6DIbmDGndAtisj1jaSwCOttwbFeKUmZqq3jd51Q0SFTn8Ebkqz98CKCDHYLY0qZyq1el2M6tUGv4FtOG1yVX21z5jpsp08KVzw+E8XM+EXQpqD/QZXlas8uOfl/1abQtZJo08DtutjmoMNAW3pXHWt9+E9Fo69zBEol7RUJVGlAW9kXBtHU6GShZvSw9WYYBSn3LEJ4I0YbvBxLCW97ZZfGnEfxP1LDLDCnRisipDGL+vxbzg2OZN5OJwvtycOIUelcbcHPXvTw8FcuQpH4hCyg0xM9a4HX3cwKtfFtjiELCIT6QjOReG6qLUuRAwOJxhan2IRIUZviJEmDwcmHfSqj8htkvLNOIW4uUm7hyNpOfPKmJ2icIF2azlIgJBdYqQ36iIXlsuf82OF5jiFuLnJUC7bjjBcpk8x6+IUoucmFbbfCFAhbdvLQQLEqENmhY0eK7Ye9+Y2PisX2GQ9BwkQ4n5KOB7DFqVD7s8mIaTVyCdsriMTct2XhJBGMRY4sD1Wa89x4zEBKDQmIaRMG6hB2WCoLYoHbwyYF7sQMa4OCtC+SJlrQajQMnhuW+lERIgD6msssrXPuh0JWXc4thwkQMhuMfpEjnCi9r7JU4dx96V8IEkhc4H3Yvi6zP/6SWGYBdFNhzcD16T80V1okxSzCviKPXwHVicqwjh065aezBXq2XN+58JFFFGEYwW/AfJZ97BmyG6nAAAAAElFTkSuQmCC"/>
                            
                           
                    </div>
                </div>
            ))
       
    ):(
        <h1>No tienes reservas!!</h1>
    )
}
    </div>

  )
}
