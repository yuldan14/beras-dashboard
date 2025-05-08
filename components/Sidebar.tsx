'use client'
import React, { useState } from 'react';

const Sidebar = ({ onToggle }: { onToggle: (isOpen: boolean) => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    const newIsMenuOpen = !isMenuOpen;
    setIsMenuOpen(newIsMenuOpen);
    onToggle(newIsMenuOpen); // Kirimkan status ke parent
  };

  const menuItems = [
    "Home",
    "Prediksi",
    "Histori Harga",
    "Histori Periode",
    "Chatbot",
  ];

  return (
    <div className="relative">
      {/* Hamburger Button */}
      <div
        className="w-10 h-10 flex items-center justify-center cursor-pointer absolute top-5 left-5 z-50 rounded-md"
        onClick={toggleMenu}
      >
        <div className="relative w-7 h-7 transition-transform duration-500 ease-in-out">
          {/* Garis Atas */}
          <div
            className={`absolute w-full h-0.5 bg-black top-2 left-0 transform transition-all duration-500 ease-in-out ${
              isMenuOpen ? "rotate-45 translate-y-[7px] bg-white" : ""
            }`}
          ></div>
          {/* Garis Tengah */}
          <div
            className={`absolute w-full h-0.5 bg-black top-3.5 left-0 transform transition-all duration-500 ease-in-out ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          ></div>
          {/* Garis Bawah */}
          <div
            className={`absolute w-full h-0.5 bg-black top-5 left-0 transform transition-all duration-500 ease-in-out ${
              isMenuOpen ? "-rotate-45 -translate-y-[7px] bg-white" : ""
            }`}
          ></div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        id="menu"
        className={`bg-primary h-screen border border-black transition-all duration-300 ${
          isMenuOpen ? "w-2/5 md:w-1/5 translate-x-0" : "-translate-x-full w-2/5 md:w-1/5 transition-all duration-75 overflow-hidden"
        }`}
      >
        <div className="w-full h-20 flex justify-center flex-col">
          <h2 className="font-sans font-bold w-full text-center">PredRice</h2>
          <p className="text-sm w-full text-center">Dashboard</p>
        </div>

        {/* Menu */}
        <div className="w-full flex mt-10 flex-col items-center gap-y-5">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="w-8/10 h-10 hover:bg-white hover:text-[#0D0B41] transition-all rounded-xl"
            >
              <p className="font-semibold font-sans w-full h-full items-center flex pl-5 cursor-pointer">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
