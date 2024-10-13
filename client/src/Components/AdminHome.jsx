import React from "react";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";

const AdminHome = () => {
  return (
    <>
      <NavBar />
      <div className="mt-16 flex justify-center items-center">
        <p className="text-white text-6xl">Welcome Admin</p>
      </div>

      <div className=" p-5 m-5 flex justify-center items-center">
        <div className="flex p-5 gap-5 mt-8">
          <Link to={"/addTicket"}>
            <button className="bg-purple-600 px-4 py-2 rounded text-white text-2xl">
              Create Ticket
            </button>
          </Link>
          <Link to={'/viewTicket'}>
          <button className="bg-purple-600 px-4 py-2 rounded text-white text-2xl">
            View Ticket
          </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
