import React from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
  const navigate=useNavigate()

  const logout=()=>{
    localStorage.removeItem('token')
    toast.success("Successfully logged out")
    navigate('/')
  }
  return (
    <>
       <div className='m-3 p-5 flex justify-between border-b border-neutral-600' >
        <div> <p className='text-white text-3xl font-bold'>TicketRaiser</p></div>
       <div className='flex gap-5'>
        <button  onClick={logout} className='px-5 py-3 text-white text-xl bg-purple-600 rounded'>Logout</button>
       </div>
        </div> 
    </>
  )
}

export default NavBar