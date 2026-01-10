import React, { useContext, useState } from "react";
import HERO_IMG from "../assets/Hero-section.png";
import { useNavigate } from "react-router-dom";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Modal from "../Component/Modal";
import { UserContext } from "../Context/userContext";
import ProfileInfoCard from "../Component/Cards/ProfileInfoCard";

const Landingpage = () => {
  const {user} = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentpage, setCurrentPage] = useState("Login");
  const handleCTA = () => {
    if(!user){
      setOpenAuthModal(true);
    }else{
      navigate("/dashboard");
    }
  };
  return (
    <div className="w-full min-h-full bg-primary-white">
      <div className="container mx-auto px-4 py-6">
        <header className="flex justify-between items-center mb-16">
          <div className="text-xl font-bold text-primary-black">
            <img src="/Logo.svg" alt="Resume." />
          </div>
          {user ? <ProfileInfoCard/> :<button
            className="bg-accent/50 text-sm font-semibold text-primary-black px-7 py-2.5 rounded-lg hover:bg-gray-800 hover:text-primary-white transition-colors cursor-pointer"
            onClick={() => {
              setOpenAuthModal(true);
            }}
          >
            Login / Sign Up
          </button>}
        </header>

        {/* Hero Content  */}
        <div className="flex flex-col md:flex-row items-center mb-10">
          <div className="w-full md-w-1/2 pr-4 mb-8 md:mb-0">
            <h1 className="text-5xl text-primary-black font-bold mb-6 leading-tight">
              Build Your{" "}
              <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,#9A68FF_0%,#7182ff_100%)] bg-size-[200%_200%] animate-text-shine">
                Resume Effortlessly
              </span>
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Build a standout resume in minutes with our smart, AI-powered
              resume builder.
            </p>
            <button
              className="text-sm bg-primary-black font-semibold text-primary-white px-8 py-3 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
              onClick={handleCTA}
            >
              Get Started
            </button>
          </div>
          <div className="w-full md-1/2">
            <img
              src={HERO_IMG}
              alt="Hero Image"
              className="w-full rounded-lg"
            />
          </div>
        </div>

        {/* Feature Content  */}
        <section className="mt-5 text-primary-black">
          <h2 className="text-2xl font-bold text-center mb-12">
            Features That Make You Shine
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-semibold mb-3">Easy Editing</h3>
              <p className="text-gray-600">
                Update your resume sections with live preview and instant
                formatting.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-semibold mb-3">
                Beautifull Templates
              </h3>
              <p className="text-gray-600">
                Choose fro mordern, professional template that are easy to
                customize.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-semibold mb-3">One-Click Export</h3>
              <p className="text-gray-600">
                Download your resume instantly as a high-quality PDF with one
                click.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-semibold mb-3">
                AI-Powered Resume Generation
              </h3>
              <p className="text-gray-600">
                Smart suggestions for wording, structure, and formatting.
              </p>
            </div>
          </div>
        </section>
      </div>
      {/* footer section  */}
      <div className="text-sm py-1 text-primary-black text-center mt-5">
        Made By Akash Kumar with ❤️...
      </div>

      {/* Login/Signup modal  */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("Login");
        }}
        hideHeader
      >
        <div>
          {currentpage == "Login" && <Login setCurrentPage={setCurrentPage} />}
          {currentpage == "signup" && (
            <Signup setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Landingpage;
