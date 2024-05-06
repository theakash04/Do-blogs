import React from "react";
import "../Components/Loadings/Error.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <>
      <div className="flex w-full h-screen items-center justify-center flex-col">
        <div className="grid place-items-center gap-2">
          <div className="text-6xl font-bold">Error 404!</div>
          <div className="text-gray-600 text-xl font-semibold pb-3">
            Page Not found
          </div>

          <Link to={"/"}>
            <Button variant="text" sx={{fontWeight: 600}} >Go to Home Page</Button>
          </Link>
        </div>
        <div className="loader1 mt-10" />
      </div>
    </>
  );
}
