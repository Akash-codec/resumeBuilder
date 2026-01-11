import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../Component/Input/Input";
import { validateEmail } from "../../Utils/helper.js";
import ProfilePhotoSelector from "../../Component/Input/ProfilePhotoSelector.jsx";
import axiosInstance from "../../Utils/axiosInstance.js";
import { API_PATHS } from "../../Utils/apiPaths.js";
import { UserContext } from "../../Context/userContext.jsx";
import uploadImage from "../../Utils/uploadimage.js";

const Signup = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(null);

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);
  const handleSignup = async (e) => {
    e.preventDefault();
    let profileImageURL = "";

    if (!fullName) {
      setError("Please enter full name.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    //Signup API Call
    try {
      //Upload image if present
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageURL = imgUploadRes.imageUrl;
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageURL,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong try agian.",error.response);
      }
    }
  };
  return (
    <div className="w-[90vw] md:w-[45vw] lg:w-[25vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-primary-black">
        Create an Account
      </h3>
      <p className="text-sm text-slate-700 mt-[5px] mb-6">
        Join us todday by entering your details below.
      </p>
      <form onSubmit={handleSignup}>
        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
        <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
          <Input
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label="Full Name"
            placeholder="John Doe"
            type="text"
          />
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="John@example.com"
            type="text"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
          />
        </div>

        {error && <p className="text-red-500 text-sm pb-2.5">{error}</p>}

        <button type="submit" className="btn-primary">
          SIGN UP
        </button>

        <p className="text-[13px] text-slate-800 mt-3 ">
          Already have an account.{" "}
          <button
            className="font-medium text-accent underline cursor-pointer"
            onClick={() => {
              setCurrentPage("Login");
            }}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default Signup;
