import React, { useEffect, useState } from 'react'
import { HotelContext } from './HotelContext'
import Swal from 'sweetalert2'
import axios from 'axios'
export const HotelProvider = ({children}) => {
    const [bookings, setBookings] = useState(null)
    const [rooms, setRooms] = useState(null)
    const urlApi = 'http://localhost:3001'
    const loadRoom = async()=>{
        try {
            const { data } = await axios.get(`${urlApi}/rooms`, { withCredentials: true });
            setRooms(data);
        } catch (error) {
            console.error('Error loading rooms:', error);
        }
    }
    const deleteRoom = async(id)=>{
      try {
        const {data} = await axios.delete(`${urlApi}/rooms/${id}`, {withCredentials:true})
        Swal.fire({
          title:'Success',
          text: data.message,
          icon: 'success'
        })
        loadRoom()
      } catch (error) {
        Swal.fire({
          title:'Error!!',
          text: error,
          icon: 'error'
        })
      }
    }
    const updateRoom = async(info)=>{
      try {
       const {data} = await axios.put(`${urlApi}/rooms/${info.id}`,[info], {withCredentials:true})
       Swal.fire({
        title: 'Success!!',
        text: data.message,
        icon:'success'
       })
      } catch (error) {
        Swal.fire({
          title: 'Error!!',
          text: error,
          icon:'error'
         })
      }
    }
    const addRoom = async(values)=>{
      try {
        const {data} = await axios.post(`${urlApi}/rooms`, values, {withCredentials:true})
        Swal.fire({
          title:'Success',
          text: data.message,
          icon:'success'
        })
        loadRoom()
      } catch (error) {
        Swal.fire({
          title:'Error!!',
          text: error,
          icon:'error'
        })
        console.log(error)
      }
    }
    const bookingRooms = async(info)=>{
        try {
          const {data} = await axios.post(`${urlApi}/bookings`,info, {withCredentials:true} )
          Swal.fire({
            title:'Success',
            text: data.message,
            icon:'success'
          })

        } catch (error) {
          Swal.fire({
            title:'Error!!',
            text: error,
            icon:'error'
          })
        }
    }
    const deleteBooking = async(id)=>{    
      try {
        const {data} = await axios.delete(`${urlApi}/bookings/${id}`)
        Swal.fire({
          title:'Success',
          text: data.message,
          icon:'success'
        })
      } catch (error) {
        Swal.fire({
          title:'Error!!',
          text: error,
          icon:'error'
        })
      }
    }
    const loadBookings = async(id)=>{
      try {
        const {data} = await axios.get(`${urlApi}/bookings/getBookingByUser/${id}`)
        setBookings(data)
      } catch (error) {
        Swal.fire({
          title:'Error!!',
          text: error,
          icon:'error'
        })
      }
    }
    useEffect(() => {
      loadRoom()
    }, [])
    
  return (
    <HotelContext.Provider value={{rooms, bookings ,loadRoom, loadBookings, updateRoom, deleteRoom, addRoom, bookingRooms, deleteBooking}}>
        {children}
    </HotelContext.Provider>
  )
}
