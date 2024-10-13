import React, { useState } from "react";
import NavBar from "./NavBar";
import toast from "react-hot-toast";
import axios from "axios";

const CreateTicket = () => {
  const [formData, setFormData] = useState({

    assignedTo: "",
    bugArea: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const {  assignedTo, bugArea, description } = formData;

    if (!assignedTo || !bugArea || !description) {
      toast.error('All fields are required');
      return;
    }

    try {
        const token = localStorage.getItem("token"); 
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

        const response = await axios.post('http://localhost:8080/ticket/addTicket', {
            assignedTo,
            bugArea,
            description,
          },config);
          console.log(response)
    
          if (response.status === 201) {
            toast.success('Ticket created successfully');
            setFormData({
              createdBy: '',
              assignedTo: '',
              bugArea: '',
              description: '',
            });
          } else {
            toast.error('Failed to create ticket');
          }
    } catch (error) {
      console.error(error.message);
      toast.error('An error occurred while creating the ticket');
    }
  }

  return (
    <>
      <div className="h-screen flex-col justify-center items-center">
        <NavBar />
        <p className="text-white text-4xl text-center p-5 m-2">Create Ticket</p>
        <div className="flex justify-center items-center">
          <section className="bg-blue-100 w-2/3 flex flex-col m-1 p-5 rounded-lg">
            <form onSubmit={handleSubmit}>
            <div className="mb-3 flex flex-col">
              <label htmlFor="name">Created By</label>
              <input
                type="text"
                name="createdBy"
                value={formData.createdBy}
                onChange={handleChange}
                className="py-2 rounded-md"
              />
            </div>
            <div className="mb-3 flex flex-col">
              <label htmlFor="email">Assigned To</label>
              <input
                type="text"
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                className="py-2 rounded-md"
              />
            </div>
              <div className="mb-3 flex flex-col">
                <label htmlFor="product">Bug Area</label>
                <input
                  name="bugArea"
                  value={formData.bugArea}
                  onChange={handleChange}
                  className="py-2 rounded-md"
                  type="text"
                />
              </div>
              <div className="mb-4 flex flex-col">
                <label htmlFor="description">Description of the issue</label>
                <textarea
                  name="description"
                  id="description"
                  className="py-2 rounded-md"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className=" flex justify-center items-center  ">
                <button className="text-center text-xl rounded-md  bg-blue-700 px-4 py-2">Submit</button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </>
  );
};

export default CreateTicket;
