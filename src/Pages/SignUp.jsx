import React, { useState } from "react";
import { useForm } from "react-hook-form";
import authService from "../Appwrite/Auth";
import "./loginBg.css";
import { ButtonJS, Input } from "../Components/components.js";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Alert } from "@mui/material";
import { login } from "../Store/authSlice.js";

function Login() {
  const { register, handleSubmit } = useForm();
  const [passwordVisible, setPasswordVisible] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const Create = async(data) => {
    setError("");
    try {
      const userData = await authService.CreateAccount(data);
      if(userData){
        const userData = await authService.getCurrentuser();
        if(userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  function TogglePassInvisibility() {
    setPasswordVisible((prev) => !prev);
  }

  return (
    <div className="bg relative">
      <div className="w-full h-full flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="bg-[#fafafa] max-w-[450px] sm:w-full w-[350px] rounded-md shadow-lg">
          <div className="flex  flex-col items-center h-full w-full py-10">
            <div className="text-black font-bold text-4xl">Sign up</div>
            {error && <span className="text-red-400 px-2 py-3 text-start w-full">{error}</span>}
            <form onSubmit={handleSubmit(Create)}>
              <div className="flex flex-col gap-5 pt-4">
                <Input
                  label="Enter your name?"
                  {...register("name")}
                  placeholder="Enter your name"
                  type="text"
                />
                <Input
                  label="Email"
                  {...register("email")}
                  placeholder="Enter email"
                  type="email"
                />
                <Input
                  type={passwordVisible ? "password" : "text"}
                  label="Password"
                  password={passwordVisible ? "show" : "hide"}
                  onClick={TogglePassInvisibility}
                  {...register("password")}
                  placeholder="create a new password"
                />
                <ButtonJS
                  children={"Sign up"}
                  type="submit"
                />
              </div>
            </form>
            <span className="text-black pt-10">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="text-blue-700 underline cursor-pointer "
              >
                Log in
              </Link>
            </span>
          </div>
        </div>
      {/* <div className="absolute sm:bottom-5 bottom-10 right-10 w-1/2">
        {error && <Alert variant="filled" severity="error">
          {error}
        </Alert>}
      </div> */}
      </div>
    </div>
  );
}

export default Login;
