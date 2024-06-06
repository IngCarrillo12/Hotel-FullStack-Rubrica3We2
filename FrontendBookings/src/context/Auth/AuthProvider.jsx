import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";



export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const urlApi = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const signUp = async (values) => {
    try {
      const { name, lastname, telefono, email, birthday, password } = values;
      const { data } = await axios.post(`${urlApi}/users/register`, { name, lastname, telefono, email, birthday, password }, { withCredentials: true });
      setUser(data);
      Swal.fire({
        title: 'success',
        text: 'Logueado correctamente',
        icon: 'success'
      })
      navigate('/');
    } catch ({ response }) {
      Swal.fire({
        title: 'Error',
        text: response.data.message,
        icon: 'error'
      });
    }
  };

  const signIn = async (values) => {
    try {
      const { email, password } = values;
      const { data } = await axios.post(`${urlApi}/users/login`, { email, password }, { withCredentials: true });
      setUser(data);
      navigate('/');
      Swal.fire({
        title: 'success',
        text: 'Logueado correctamente',
        icon: 'success'
      })
    } catch ({ response }) {
      Swal.fire({
        title: 'Error',
        text: response.data.message,
        icon: 'error'
      });
    }
  };

  const logout = async () => {
    const { data } = await axios.post(`${urlApi}/users/logout`, {}, { withCredentials: true });
    if (data) setUser(null);
  };
  const editProfile = async(values)=>{
    try {
      const {name, lastname, password, birthday} = values
      const { data } = await axios.put(
        `${urlApi}/users/profile`,
        { name, lastname, password, birthday, email: user.email, idusers: user.idusers, token:Cookies.get('token') },
        { withCredentials: true }
      );
      setUser({...user,name: name, lastname: lastname, birthday:birthday})
      Swal.fire({
        title: 'success',
        text: data.message,
        icon: 'success'
      })
      navigate('/')
    } catch ({response}) {
      Swal.fire({
        title: 'Error',
        text: response.data.message,
        icon: 'error'
        
      })
    }
}
useEffect(() => {
  const token = Cookies.get('token');
  if (token) {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; 
      if (decoded.exp < currentTime) {
        console.error('Token Expirado');
        logout()
      } else {
        setUser({ ...decoded.user});
      }
    } catch (error) {
      console.error('Error al decodificar', error);
    }
  }
}, []);
  return (
    <AuthContext.Provider value={{ signUp, signIn, logout, editProfile , user }}>
      {children}
    </AuthContext.Provider>
  );
};
