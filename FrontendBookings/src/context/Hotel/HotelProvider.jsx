import React, { useContext, useEffect, useState } from 'react'
import { HotelContext } from './HotelContext'
import Swal from 'sweetalert2'
import axios from 'axios'
import { AuthContext } from '../Auth/AuthContext'
import {useNavigate} from 'react-router-dom'


export const HotelProvider = ({children}) => {
    const [bookings, setBookings] = useState([])
    const [rooms, setRooms] = useState([])
    const {user} = useContext(AuthContext)
    const urlApi = import.meta.env.VITE_API_URL;
    const navigate = useNavigate()
    const loadRoom = async()=>{
        try {
            const { data } = await axios.get(`${urlApi}/rooms`, { withCredentials: true });
            setRooms(data);
        } catch (error) {
            console.error('Error loading rooms:', error);
        }
    }
    const loadBookings = async(id)=>{
      try {
        const {data} = await axios.get(`${urlApi}/bookings/getBookingByUser/${id}`, {withCredentials:true})
        setBookings(data)
      } catch (error) {
        console.log(error)
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
       loadRoom()
      } catch ({response}) {
        Swal.fire({
          title: 'Error!!',
          text: response.data.message,
          icon:'error'
         })
      }
    }
    const addRoom = async(values)=>{
      try {
        const {data} = await axios.post(`${urlApi}/rooms`, values, {withCredentials:true})
        console.log(data)
        Swal.fire({
          title:'Success',
          text: data.message,
          icon:'success'
        })
        loadRoom()
      } catch ({response}) {
        Swal.fire({
          title:'Error!!',
          text: response.data.message,
          icon:'error'
        })
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

        } catch ({response}) {
          Swal.fire({
            title:'Error!!',
            text: response.data.message,
            icon:'error'
          })
        }
    }
    const deleteBooking = async(id)=>{    
      try {
        const {data} = await axios.delete(`${urlApi}/bookings/${id}`,{withCredentials:true})
        Swal.fire({
          title:'Success',
          text: data.message,
          icon:'success'
        })
        loadBookings(user.idusers)
        navigate('/')
      } catch (error) {
        Swal.fire({
          title:'Error!!',
          text: error,
          icon:'error'
        })
      }
    }
    const editBooking = async(values)=>{
      try {
          const {data} = await axios.put(`${urlApi}/bookings/${values.idreservas}`, values, {withCredentials:true})
         Swal.fire({
          title: 'Success',
          text:'Actualizado',
          icon:'success'        
         })
          loadBookings(user.idusers)
      } catch ({response}) {
          console.log(response.data.message)
          Swal.fire({
            title: 'Error!',
            text: response.data.message,
            icon:'error'        
           })
         
      }
  }
    useEffect(() => {
      loadRoom()
    }, [])
    
  return (
    <HotelContext.Provider value={{rooms, bookings ,loadRoom, loadBookings, updateRoom, deleteRoom, addRoom, bookingRooms, deleteBooking, editBooking}}>
        {children}
    </HotelContext.Provider>
  )
}
