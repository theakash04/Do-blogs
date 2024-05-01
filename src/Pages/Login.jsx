import React, { useRef, useState } from "react";
import { set, useForm } from "react-hook-form";
import authService from "../Appwrite/Auth";
import "./loginBg.css";
import { ButtonJS, Input, Loading } from "../Components/components.js";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../Store/authSlice.js";


function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setErrors] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginClicked, setLoginClicked] = useState(false);

  const loading = () => setLoginClicked((prev) => !prev);

  const Login = async (data) => {
    loading();
    try {
      setErrors("");
      const userData = await authService.login(data);
      if (userData) {
        const userData = await authService.getCurrentuser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      loading();
      setErrors(error.message);
    }
  };

  function TogglePassInvisibility() {
    setPasswordVisible((prev) => !prev);
  }

  return (
    <div className="bg">
      <div className="w-full h-full flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="bg-[#fafafa] sm:w-[450px] w-[90%] rounded-md shadow-lg">
          <div className="flex  flex-col items-center h-full w-full py-10">
            <div className="text-black font-bold text-4xl">Log in</div>
            {error && (
              <div className="text-red-400 pt-5 text-center">{error}</div>
            )}
            <form onSubmit={handleSubmit(Login)}>
              <div className="flex flex-col gap-5 pt-4">
                <div className="w-full">
                  <Input
                    type ="email"
                    label="Email"
                    {...register("email", {
                      required: true,
                      pattern: {
                        value:
                          /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                        message: "Email address must be a valid address",
                      },
                    })}
                    placeholder="Email?"
                    required={true}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="w-full">
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
                    placeholder="password?"
                    required={true}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <ButtonJS
                  children={"Log in"}
                  type="submit"
                />
              </div>
            </form>
            <span className="text-black pt-10">
              Don't have an account?{" "}
              <Link
                to={"/signUp"}
                className="text-blue-700 underline cursor-pointer "
              >
                Sign up
              </Link>
            </span>
          </div>
        </div>
        {loginClicked && <Loading />}
      </div>
    </div>
  );
}

export default Login;
