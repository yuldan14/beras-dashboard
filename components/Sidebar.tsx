import React from "react";

const Sidebar = () => {
  return (
    <div className="bg-primary h-screen w-2/5 md:w-1/5">
      <div className=" w-full h-20 flex justify-center flex-col">
        <h2 className="font-sans font-bold  w-full text-center  h-min">
          PredRice
        </h2>
        <p className="text-sm  h-min w-full text-center">Dashboard</p>
      </div>

      {/* Menu */}
      <div className="w-full h-8/10  flex mt-10 flex-col items-center gap-y-5">
        <div className="w-8/10 h-10 hover:bg-white hover:text-[#0D0B41] transition-all rounded-xl  ">
          <p className="font-semibold font-sans  w-full h-full items-center flex pl-5 cursor-default">Home</p>
        </div>
        <div className="w-8/10 h-10 hover:bg-white hover:text-[#0D0B41] transition-all rounded-xl  ">
          <p className="font-semibold font-sans  w-full h-full items-center flex pl-5 cursor-default">Prediksi</p>
        </div>
        <div className="w-8/10 h-10 hover:bg-white hover:text-[#0D0B41] transition-all rounded-xl  ">
          <p className="font-semibold font-sans  w-full h-full items-center flex pl-5 cursor-default">Histori Harga</p>
        </div>
        <div className="w-8/10 h-10 hover:bg-white hover:text-[#0D0B41] transition-all rounded-xl  ">
          <p className="font-semibold font-sans  w-full h-full items-center flex pl-5 cursor-default">Histori Periode</p>
        </div>
        <div className="w-8/10 h-10 hover:bg-white hover:text-[#0D0B41] transition-all rounded-xl  ">
          <p className="font-semibold font-sans  w-full h-full items-center flex pl-5 cursor-default">Chatbot</p>
        </div>
        
        
      </div>
    </div>
  );
};

export default Sidebar;
