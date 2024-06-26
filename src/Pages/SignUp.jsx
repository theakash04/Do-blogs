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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
        <div className="bg-[#fafafa] max-w-[400px] sm:w-full w-[350px] rounded-md shadow-lg">
          <div className="flex  flex-col items-center h-full w-full py-10">
            <div className="text-black font-bold text-4xl">Sign up</div>
            {error && (
              <span className="text-red-400 px-2 py-3 text-center w-[95%]">
                {error}
              </span>
            )}
            <form onSubmit={handleSubmit(Create)}>
              <div className="flex flex-col gap-5 pt-4 px-5">
                <div>
                  <Input
                    label="Enter your name?"
                    {...register("name", {
                      required: true,
                      minLength: 2,
                      pattern: {
                        value: /^^[A-Za-z]+(?:[' -][A-Za-z]+)*$/,
                        message:
                          "Invalid name format. Letters only, no numbers or special characters at the start",
                      },
                    })}
                    placeholder={"Enter your Name"}
                    type="text"
                    required={true}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm text-start w-full">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    label="Email"
                    {...register("email", {
                      required: true,
                      pattern: {
                        value:
                          /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                        message: "Email address must be a valid address",
                      },
                    })}
                    placeholder="Enter email"
                    type="email"
                    required={true}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm text-start w-[90%]">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    type={passwordVisible ? "password" : "text"}
                    label="Password"
                    password={passwordVisible ? "show" : "hide"}
                    onClick={TogglePassInvisibility}
                    {...register("password", {
                      required: true,
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 character long",
                      },
                    })}
                    placeholder="create a new password"
                    required={true}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm text-start w-[90%]">
                      {errors.password.message}
                    </p>
                  )}
                </div>
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
