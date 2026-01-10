import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../Component/Input/Input";
import { validateEmail } from "../../Utils/helper.js";
import { UserContext } from "../../Context/userContext.jsx";
import axiosInstance from "../../Utils/axiosInstance.js";
import { API_PATHS } from "../../Utils/apiPaths.js";

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the passsword");
      return;
    }
    setError("");

    // Login API Call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
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
        setError("Somthing went wrong. Please try again");
      }
    }
  };

  return (
    <div className="w-[90vw] md:w-[45vw] lg:w-[25vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-primary-black">Welcome Back</h3>
      <p className="text-sm text-slate-700 mt-[5px] mb-6">
        Please enter your details to log in
      </p>
      <form
        onSubmit={(e) => {
          handleLogin(e);
        }}
      >
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

        {error && <p className="text-red-500 text-sm pb-2.5">{error}</p>}

        <button type="submit" className="btn-primary">
          Login
        </button>

        <p className="text-[13px] text-slate-800 mt-3 ">
          Don't have and account?{" "}
          <button
            type="button"
            className="font-medium text-accent underline cursor-pointer"
            onClick={() => {
              setCurrentPage("signup");
            }}
          >
            Signup
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
