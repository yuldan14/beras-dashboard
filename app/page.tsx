'use client'
import React, { useState } from 'react';
import Sidebar from "@/components/Sidebar";
import Content from "@/components/Content";
import Visualisasi from "@/components/Visualisasi";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = (isOpen: boolean) => {
    setIsMenuOpen(isOpen);
  };

  return (
    <div>
      <div className="h-full fixed w-full">
        <Sidebar onToggle={handleMenuToggle} />
      </div>
      <div className={`relative ${isMenuOpen ? 'ml-[30%] md:ml-[20%] transition-all duration-75' : 'ml-10 transition-all duration-75'}`}>
        <Content />
        <Visualisasi />
      </div>
    </div>
  );
}
