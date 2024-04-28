import React from "react";
import { Link } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";

function GitStar() {
  return (
    <div className="bg-gradient-to-r from-[#7dffd0] to-[#f2ffd3] text-black w-[80%] absolute -top-14 left-1/2 transform -translate-x-1/2 rounded-xl shadow-lg">
      <div className="flex sm:flex-row flex-col items-center  sm:px-24 px-4 sm:py-7 py-5 w-full justify-between">
        <p className="font-bold text-xl text-center">
          Love this project? Star it on GitHub!
        </p>
        <div className="sm:flex-row flex flex-col items-center sm:justify-between justify-center pt-3 gap-4">
          <p className="font-semibold w-full sm:text-start text-center ">Let's do it! -</p>
          <div className="flex w-full items-center justify-center ">
            <Link to={"https://github.com/theakash04/"} target="_blank">
              <button className="bg-gradient-to-r from-[#d40022] to-[#ebbe3a] rounded-md text-white px-3 py-2 flex items-center gap-2 font-semibold hover:from-[#d21e3c] hover:to-[#f7c940] transition-all shadow-md">
                <GitHubIcon />
                theaksh04
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GitStar;
