import React from "react";
import Container from "./Container";
import { Close } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";

function NavLog() {
  return (
    <Container>
      <div className="flex items-center justify-between px-6 py-4 w-full">
        <Link to={"/"}>
          <IconButton color="error">
            <Close sx={{ color: "white", width: "30px", height: "30px" }} />
          </IconButton>
        </Link>
      </div>
    </Container>
  );
}

export default NavLog;
