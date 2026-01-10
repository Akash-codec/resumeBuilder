import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Input from "../../Component/Input/Input";
import axiosInstance from "../../Utils/axiosInstance";
import { API_PATHS } from "../../Utils/apiPaths";

const CreateResumeform = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Handle Create Resume
  const handleCreateResume = async (e) => {
    e.preventDefault();

    if (!title) {
      setError("Please enter Resume title");
      return;
    }

    setError("");

    // Create Resume API Call
    try {
      const response = await axiosInstance.post(API_PATHS.RESUME.CREATE, {
        title,
      });

      if(response.data?._id){
        navigate(`/resume/${response.data?._id}`)
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Somthing went wrong");
      }
    }
  };
  return (
    <div className="w-[90vw] md:w-[70vw] p-7 flex flex-col justify-center ">
      <h3 className="text-lg font-semibold text-black ">Create New Resume</h3>
      <p className="text-xs text-primary-black mt-[5px] mb-3">
        Give your Resume a title to get started. You can edit all details later.
      </p>

      <form onSubmit={handleCreateResume}>
        <Input
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          lable="Resume Title"
          placeholder="Eg: Mike's Resume"
          type="text"
        />
        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button type="submit" className="btn-primary">
          Create Resume
        </button>
      </form>
    </div>
  );
};

export default CreateResumeform;
