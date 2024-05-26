import React from 'react'
import { EditProfile } from '../components/EditProfile'

export const EditProfilePage = () => {
  return (
    <div className='w-full h-[550px] flex justify-center bg-transparent'>
    <div className=' w-full md:w-1/2 flex items-center justify-center md:pl-4 '>
        <EditProfile/>
    </div>
    </div>
  )
}
