import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { RiLogoutCircleRLine } from "react-icons/ri";

const Navbar = () => {
  const navigate = useNavigate();
  const Logout = () => {
    axios
      .delete("https://form-usulan-api.fly.dev/auth/logout", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Pass the token in the Authorization header
        },
      })
      .then(() => {
        localStorage.removeItem("token"); // Remove the token from local storage
        navigate("/"); // Redirect the user to the login page
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="align-middle w-full bg-slate-100 top-0 left-0 h-24 flex flex-row border-b-[3px] justify-between lg:px-16 px-4  items-center border-[#495678]">
      <a href="https://kemnaker.go.id/">
        {" "}
        <img
          src="https://kemnaker.go.id/assets/images/logo-color.png"
          alt="Logo Kemnaker"
          className="lg:w-[40%] w-[40%] "
        />
      </a>
      <button
        type="button"
        onClick={Logout}
        className="inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-slate-600 hover:text-gray-700 transition-all w-fit h-fit"
      >
        <RiLogoutCircleRLine className="w-[40px] h-[40px] hover:scale-110" />
      </button>
    </div>
  );
};

export default Navbar;
