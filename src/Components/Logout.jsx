import React from 'react'
import authService from '../Appwrite/Auth'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../Store/authSlice';

function Logout() {
  const dispatch = useDispatch()

  async function logoutUser(){
    try {
      const userLogOut = await authService.logout();
      if(userLogOut) dispatch(logout());
      location.reload();
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <button className='bg-blue-600 px-4 py-2 rounded-md shadow-md font-bold hover:opacity-90 transition-opacity' onClick={logoutUser}> 
      Logout
    </button>
  )
}

export default Logout
