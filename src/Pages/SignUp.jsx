import React, { useState } from "react";
import { useForm } from "react-hook-form";
import authService from "../Appwrite/Auth";
import "./loginBg.css";
import { ButtonJS, Input } from "../Components/components.js";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../Store/authSlice.js";
import NavLog from "../Components/NavLog.jsx";
import userService from "../Appwrite/Users.js";
import LoadingPage from "../Components/Loadings/LoadingPage.jsx";



function SignUp() {
  const { register, handleSubmit } = useForm();
  const [passwordVisible, setPasswordVisible] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  const Create = async (data) => {
    setError("");
    try {
      const userData = await authService.CreateAccount(data);
      if (userData) {
        setLoad(true);
        const userData = await authService.getCurrentuser();
        const StoreUser = await userService.CreateUserDetails(userData);
        if (userData && StoreUser) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
      setLoad(false);
    }
  };

  function TogglePassInvisibility() {
    setPasswordVisible((prev) => !prev);
  }

  return load ? (
    <div className="w-full h-screen flex items-center justify-center">
      <LoadingPage />
    </div>
  ) : (
    <div className="bg relative">
      <div className="w-full h-full flex items-center justify-center bg-black/40 backdrop-blur-sm relative">
        <div className="absolute top-0 left-0">
          <NavLog />
        </div>
        <div className="bg-[#fafafa] max-w-[450px] sm:w-full w-[350px] rounded-md shadow-lg">
          <div className="flex  flex-col items-center h-full w-full py-10">
            <div className="text-black font-bold text-4xl">Sign up</div>
            {error && (
              <span className="text-red-400 px-2 py-3 text-start w-full">
                {error}
              </span>
            )}
            <form onSubmit={handleSubmit(Create)}>
              <div className="flex flex-col gap-5 pt-4">
                <Input
                  label="Enter your name?"
                  {...register("name")}
                  placeholder={"Enter your Name"}
                  type="text"
                  required={true}
                />
                <Input
                  label="Email"
                  {...register("email")}
                  placeholder="Enter email"
                  type="email"
                  required={true}
                />
                <Input
                  type={passwordVisible ? "password" : "text"}
                  label="Password"
                  password={passwordVisible ? "show" : "hide"}
                  onClick={TogglePassInvisibility}
                  {...register("password")}
                  placeholder="create a new password"
                  required={true}
                />
                <ButtonJS children={"Sign up"} type="submit" />
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
      </div>
    </div>
  );
}

export default SignUp;
