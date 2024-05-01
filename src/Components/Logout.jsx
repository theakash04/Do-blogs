import React from "react";
import authService from "../Appwrite/Auth";
import { useDispatch } from "react-redux";
import { logout } from "../Store/authSlice";
import { Button } from "@mui/material";

function Logout() {
  const dispatch = useDispatch();

  async function logoutUser() {
    try {
      const userLogOut = await authService.logout();
      const Interval = setInterval(() => {
        if (userLogOut) dispatch(logout());
      },0);
      location.reload();

      return clearInterval(Interval);
    } catch (error) {
      throw error.message;
    }
  }

  return (
    <Button onClick={logoutUser} variant="contained">
      Logout
    </Button>
  );
}

export default Logout;
