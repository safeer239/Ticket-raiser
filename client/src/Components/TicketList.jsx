import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import axios from 'axios'
import toast from 'react-hot-toast'

const TicketList = () => {
  const [tickets,setTickets]=useState([])

  useEffect(() =>{
    const getTickets = async() =>{
      try {
        const token = localStorage.getItem("token"); // Assuming you store the token in localStorage
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

      const response = await axios.get("http://localhost:8080/ticket/viewTicket",config)
      setTickets(response.data)
      } catch (error) {
        toast.error("Failed to get tickets")
        console.log(error.message)
      }
    }
    getTickets()
  },[])
  return (
    <>
    <div className='max-h-dvh'>
      <NavBar/>
      <div className='flex justify-center items-center'>
        <p className='text-white text-4xl text-center m-3'>Tickets</p>
      </div>
      <div className='flex justify-center pb-6 mb-5 items-center bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]'>
        <table className='w-5/6 rounded-xl'>
        <thead className='rounded-xl '>          
        <tr className=' bg-purple-800 text-white rounded-xl'>
          <th className='p-4'>SN.</th>
          <th className='p-4'>Created By</th>
          <th className='p-4'>Assigned To</th>
          <th className='p-4'>Bug Area</th>
          <th className='p-4'>Description</th>
        </tr>
        </thead>
        <tbody className='bg-purple-200'>
        {
          tickets.length>0 ? (
            tickets.map((ticket,index)=>(
              <tr key={ticket.id} className="text-center">
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">{ticket.user}</td>
                  <td className="p-4">{ticket.assignedTo}</td>
                  <td className="p-4">{ticket.bugArea}</td>
                  <td className="p-4">{ticket.description}</td>
                </tr>
            ))
          ):(
            <div>No ticket</div>
          )
        }
        </tbody>
        </table>
      </div>
    </div>
    </>
  )
}

export default TicketList