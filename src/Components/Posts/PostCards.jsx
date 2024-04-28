import React from "react";
import { Link } from "react-router-dom";

function PostCards({label = "unknow", title, description, imageLink}) {
  return (
    <div className="bg-white w-full h-auto rounded-lg flex flex-col items-center justify-center p-1 shadow-sm">
      <Link to={""}>
        <div className="relative w-full h-40 overflow-hidden">
          <img src={imageLink} alt="" className="rounded-md w-full" />
          <div className="bg-white/30 absolute right-2 top-2 rounded-md font-bold px-2 text-sm backdrop-blur-md text-white">
            {label}
          </div>
        </div>
      </Link>
      <div className="w-full font-bold text-xl px-2 pt-3">{title}</div>
      <div className="w-full text-gray-700 pl-2 text-md pb-3 pt-1">
        {description}
      </div>
    </div>
  );
}

export default PostCards;
