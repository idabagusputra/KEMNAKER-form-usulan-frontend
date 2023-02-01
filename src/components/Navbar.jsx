import React from "react";

const Navbar = () => {
  return (
    <div className="align-middle w-full bg-gray-100 top-0 left-0 h-24 flex flex-row border-b-[3px] border-[#495678]">
      <a href="https://kemnaker.go.id/">
        {" "}
        <img
          src="https://kemnaker.go.id/assets/images/logo-color.png"
          alt="Logo Kemnaker"
          className="w-[200px] p-5"
        />
      </a>
    </div>
  );
};

export default Navbar;
