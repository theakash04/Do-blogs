import React from "react";
import GitStar from "./GitStar";
import TollTwoToneIcon from "@mui/icons-material/TollTwoTone";
import { Link } from "react-router-dom";
import { Instagram, LinkedIn, X, GitHub, YouTube } from "@mui/icons-material";

function Footer() {
  return (
    <div className="z-40 w-full flex items-center justify-center mt-24 text-white">
      <div className="w-full pb-7 bg-violet-400 relative">
        <div>
          <GitStar />
        </div>
        <div className="flex-col gap-5 sm:flex-row flex items-center justify-between pt-36 px-24 w-full">
          <div className="w-full flex items-center sm:justify-start justify-center gap-4">
            <TollTwoToneIcon />
            <p className="font-bold text-3xl">Do-Blogs</p>
          </div>

          <div className="py-2">
            <p className="font-bold text-lg text-center">Connect with us!</p>
            <div className="text-center font-semibold pt-1">
              <div className="w-full flex items-center justify-center gap-2">
                  <Link to={"https://github.com/theakash04/"}>
                    <GitHub />
                  </Link>
                  <Link to={"https://instagram.com/theakash04/"}>
                    <Instagram />
                  </Link>
                  <Link to={"https://linkedin.com/theakash04/"}>
                    <LinkedIn />
                  </Link>
                  <Link to={"https://x.com/theakash04/"}>
                    <X />
                  </Link>
                  <Link to={"https://youtube.com/dex_dev"}>
                    <YouTube />
                  </Link>
              </div>
            </div>
          </div>
          <div>
            <div>{/* feedback here */}</div>
          </div>
        </div>
        <div className="w-full border-white border-t sm:flex-row flex flex-col items-center justify-between text-center pt-3 px-5">
          <div>
            <Link to={""}>
              Privacy Policy
            </Link>
            <Link to={""}>
              Source Code
            </Link>
          </div>
          <div>
              &copy; 2024 All Rights Reserved &bull; Akash
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
