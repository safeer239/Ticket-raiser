import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!name || !email || !password) {
      toast.success("All fields are required");
    }

    try {
      const response = await axios.post(
        "https://ticket-raiser-kp8j.onrender.com/auth/register",
        {
          name,
          email,
          password,
        }
      );
      console.log(response.data)
      if (response.status === 200){
        navigate("/home");
      } else {
        toast.error("Registration failed");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("An error occurred during registration");
    }
  };

  return (
    <div className="h-screen  flex  justify-center items-center">
      <div className="bg-blue-400 m-1 p-5  flex flex-col h-auto w-96 rounded-lg">
        <p className="text-black text-3xl text-center mb-10">Register Page</p>
        <form onSubmit={handleSubmit}>
          <div className="">
            <input
              className="mb-4 rounded w-full p-2"
              placeholder="Enter your Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="">
            <input
              className="mb-4 rounded w-full p-2"
              placeholder="Enter your Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              className="mb-4 rounded w-full p-2"
              placeholder="Enter your Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-700 text-white px-4 py-1 m-3 rounded"
            >
              Register
            </button>
          </div>
          <p className="text-center">
            Already registered? <Link to={"/"}>Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
