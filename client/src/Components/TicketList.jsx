import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import toast from "react-hot-toast";

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    const getTickets = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        // const BASE_URL=process.env.REACT_APP_BASE_URL
        const response = await axios.get(
          `https://ticket-raiser-kp8j.onrender.com/ticket/viewTicket`,
          config
        );
        setTickets(response.data);
      } catch (error) {
        toast.error("Failed to get tickets");
        console.log(error.message);
      }
    };
    getTickets();
  }, []);

  const openModal = (ticket) => {
    setSelectedTicket(ticket);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedTicket(null);
    setNewStatus("");
  };

  const handleStatusChange = async () => {
    if (!newStatus) {
      toast.error("Please select a status");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      const res = await axios.patch(
        `https://ticket-raiser-kp8j.onrender.com/ticket/updateTicket/${selectedTicket._id}`,
        { status: newStatus },
        config
      );
      console.log(res);

      toast.success("Ticket status updated successfully");
      closeModal();
      // const BASE_URL=process.env.REACT_APP_BASE_URL
      const response = await axios.get(
        `https://ticket-raiser-kp8j.onrender.com/ticket/viewTicket`,
        config
      );
      setTickets(response.data);
    } catch (error) {
      toast.error("Failed to update ticket status");
      console.log(error);
    }
  };

  return (
    <>
      <div className="max-h-dvh">
        <NavBar />
        <div className="flex justify-center items-center">
          <p className="text-white text-4xl text-center m-3">Tickets</p>
        </div>
        <div className="flex justify-center pb-6 mb-5 items-center bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
          <div className="w-full sm:w-5/6 overflow-x-auto">
            <table className="min-w-full rounded-xl">
              <thead className="rounded-xl">
                <tr className="bg-purple-800 text-white rounded-xl">
                  <th className="p-4">SN.</th>
                  <th className="p-4">Assigned To</th>
                  <th className="p-4">Bug Area</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Update</th>
                </tr>
              </thead>
              <tbody className="bg-purple-200">
                {tickets.length > 0 ? (
                  tickets.map((ticket, index) => (
                    <tr key={ticket._id} className="text-center">
                      <td className="p-4">{index + 1}</td>
                      <td className="p-4">{ticket.assignedTo}</td>
                      <td className="p-4">{ticket.bugArea}</td>
                      <td className="p-4">{ticket.description}</td>
                      <td className="p-4">{ticket.status}</td>
                      <td className="p- ">
                        <button
                          className="bg-slate-100 px-3 rounded-lg py-2"
                          onClick={() => openModal(ticket)}
                        >
                          Close Ticket
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center p-4">
                      No tickets found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-11/12 md:w-96 h-auto">
            <h2 className="text-lg font-semibold mb-4">Update Ticket Status</h2>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="border rounded p-2 mb-4 w-full"
            >
              <option value="">Select new status</option>
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
            <div className="flex justify-between mt-5">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleStatusChange}
              >
                Update
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TicketList;
