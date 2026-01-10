import React from "react";
import { Link } from "react-router-dom";
import ProfileInfoCard from "../Cards/ProfileInfoCard";

const Navbar = () => {
  return (
    <div className="h-16 bg-primary-white border border-gray-200/20 backdrop-blur-[2px] py-2.5 px-4 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between gap-5">
        <Link to="/dashboard">
          <img src="/Logo.svg" alt="" />
        </Link>

        <ProfileInfoCard />
      </div>
    </div>
  );
};

export default Navbar;
