import React from "react";
import { Link } from "react-router-dom";
import { Logout } from "../components";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { TollTwoTone} from "@mui/icons-material";

function Navbar() {
  const authStatus = useSelector((state) => state.auth.status);



  return (
    <div className="bg-black/25 max-w-lappy w-[98%] mt-1 backdrop-blur-md rounded-lg flex items-center justify-between px-4 py-4 z-20 select-none top-0 text-white">
      <div>
        <Link to={"/"}>
          <div className="font-bold text-xl text-green-500 hover:text-green-400 hover:scale-105 filter drop-shadow-md">
            <TollTwoTone sx={{ fontSize: "36px" }} />
          </div>
        </Link>
      </div>
      {authStatus ? (
        <div className="flex gap-3 items-center">
          <Link to={"/addPost"}>
            <Button variant="contained" color="success" >
              Add Post
            </Button>
          </Link>
          <div>
            <Logout />
          </div>
        </div>
      ) : (
        <div className="flex gap-3">
          <Link to={"/login"}>
            <Button className="font-bold shadow-md" variant="contained">
              Login
            </Button>
          </Link>
          <Link to={"/signup"}>
            <Button className="font-bold shadow-sm" variant="contained">
              Sign Up
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
