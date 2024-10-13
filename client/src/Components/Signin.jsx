import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
// import Register from './Register'
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const [formData, setFormData] = useState({
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
    const { email, password } = formData;

    if (!email || !password) {
      toast.success("All fields are required");
    }

    try {
      const response = await axios.post(
        "https://ticket-raiser-kp8j.onrender.com/auth/login",
        {
          email,
          password,
        }
      );
      console.log(response.data);
      if (response.data.isAdmin === true) {
        navigate("/adminhome");
        localStorage.setItem("token", response.data.token);
      } else if (response.status === 200) {
        navigate("/home");
        localStorage.setItem("token", response.data.token);
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className="h-screen  flex  justify-center items-center">
        <div className="bg-blue-300 m-1 p-5   flex flex-col h-auto w-96 rounded-lg">
          <p className="text-black text-3xl text-center mb-10">Sign In Page</p>
          <form onSubmit={handleSubmit}>
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
                Login
              </button>
            </div>
            <p className="text-center">
              New User? <Link to={"/register"}> Register here</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signin;
