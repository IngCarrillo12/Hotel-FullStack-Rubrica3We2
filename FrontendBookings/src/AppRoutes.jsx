import React, { useContext } from 'react'
import {Router, Route, Routes,Navigate} from 'react-router-dom'
import { Header } from './components/Header'
import { LoginPage } from './Pages/LoginPage'
import { RegisterPage } from './Pages/RegisterPage'
import { HomePage } from './Pages/HomePage'
import { AdminRoomsPage } from './Pages/AdminRoomsPage'
import { RoomsPage } from './Pages/RoomsPage'
import { MyBookingPage } from './Pages/MyBookingPage'
import { AuthContext } from './context/Auth/AuthContext'
import { EditProfilePage } from './Pages/EditProfilePage'
export const AppRoutes = () => {

  const { user } = useContext(AuthContext)
  const isAdmin = user ? user.admin : false;
  return (
    <div className={'bg-home'}>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={!user?<LoginPage/> : <Navigate to={'/'}/> } />
        <Route path='/register' element={!user?<RegisterPage/> : <Navigate to={'/'}/>} />
        <Route path='/adminRooms' element={isAdmin?<AdminRoomsPage/> : <Navigate to="/" />}/>
        <Route path="/editprofile"element={user ? <EditProfilePage /> : <Navigate to="/login" />}/>
        <Route path='/rooms' element={<RoomsPage/>}/>
        <Route path='/mybookings' element={user?<MyBookingPage/>: <Navigate to="/login" />}/>
      </Routes>
    </div>
  );
}
