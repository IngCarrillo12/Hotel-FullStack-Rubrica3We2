import React, { useContext } from 'react'
import { AuthContext } from '../context/Auth/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
export const UserMenu = ({ name, lastname, email, setUserMenu }) => {
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()
  return (
    <div className='userMenu backdrop-blur-[2px] '>
      <div className='userMenu_group'>
        <img width={"42px"} src={'data:image/png;base64,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'} alt="Avatar" />
        <h3 className='pl-4 text-2xl font-bold'> {name} {lastname}</h3>
      </div>
      <h4 ><b>Email:</b> {email}</h4>
      <Link className='font-semibold text-white text-lg border-b-2' to={"/mybookings"}>Mis Reservas</Link>
      <Link className='font-semibold text-white text-lg border-b-2' to={"/editprofile"}>Editar Perfil</Link>
      <button className='border-2 border-white text-white text-lg font-semibold' onClick={() => { logout(); setUserMenu(false); navigate('/')}}>Logout</button>
    </div>
  )
}
