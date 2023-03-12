import React from "react";

import { BsFacebook, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="w-full bg-slate-100 bottom-0 left-0 border-[#495678] border-t-[3px] h-fit pt-6 flex flex-col justify-center lg:px-[30%] ">
      <div className="grid grid-cols-3 gap-2 lg:gap-10 w-full h-full">
        <div className="grid-cols-1 flex justify-center items-center">
          <img
            src="/src/assets/Logo.png"
            alt=""
            className="lg:w-[110px] w-[80px] flex"
          />
        </div>
        <div className="grid-cols-1 flex justify-center items-center">
          <p className="text-[12px] md:text-[13px] lg:text-[14px]">
            Jl. Jendral Gatot Subroto Kav. 51, Daerah Khusus Ibukota Jakarta
            12750, Indonesia
          </p>
        </div>
        <div className="grid-cols-1 flex justify-center items-center">
          <div className="flex flex-col lg:flex-row lg:gap-5 gap-3">
            <BsTwitter className="hover:scale-125 text-[#0B3F6B] w-[20px] lg:w-[25px] h-fit" />
            <BsInstagram className="hover:scale-125 text-[#0B3F6B] w-[20px] lg:w-[25px] h-fit" />
            <BsFacebook className="hover:scale-125 text-[#0B3F6B] w-[20px] lg:w-[25px] h-fit" />
            <BsYoutube className="hover:scale-125 text-[#0B3F6B] w-[20px] lg:w-[25px] h-fit" />
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-row lg:gap-5 gap-3 mt-3 text-xs justify-center">
          <div>Telp: 021-5255733</div>
          <div>Call Center: 1500630
</div>
        </div>
        <div className="w-full my-3 text-gray-400 text-xs italic text-center">
          Copyright © 2023 by KEMNAKER
          <br />
          All rights reserved
        </div>
      </div>
    </div>
  );
};

export default Footer;
