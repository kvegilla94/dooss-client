import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="container flex flex-col min-h-screen justify-center items-center font-yeseva text-[#313131]">
      <p className="text-9xl text-center mb-16">
        We're making dental care even cooler
      </p>
      <span
        className="text-2xl rounded-md px-6 py-3 bg-slate-300 hover:bg-[#313131] hover:text-white cursor-pointer"
        onClick={() => navigate("/booking")}
      >
        Book Now
      </span>
    </div>
  );
};

export default Home;
