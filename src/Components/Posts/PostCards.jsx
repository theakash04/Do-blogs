import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import authService from "../../Appwrite/Auth";
import { Avatar } from "@mui/material";
import userService from "../../Appwrite/Users";
import SkellyLoad from "../SkeletonLoad";

function PostCards({ title, description, $id, $createdAt, tag, userId }) {
  const date = new Date($createdAt);
  const [tags, setTags] = useState([]);
  const [author, setAuthor] = useState("");
  const [loaded, setloaded] = useState(true);

  useEffect(() => {
    if (tag) {
      const arr = tag.split(",");
      setTags(arr);
      if (userId) getUser();
    } else {
      setTags(["#Unknow"]);
    }
  }, []);



  async function getUser() {
    const arr = [userId];
    const authorName = await userService.getUserDetails(arr[0]);
    if (authorName) setAuthor(authorName.name);
    setloaded(false);
  }

  function formatRelative(date) {
    const now = new Date();
    const diff = now - date;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 1) {
      return `${days} days ago`;
    } else if (hours >= 24 && days <= 1) {
      return `Yesterday`;
    } else if (hours > 1 && hours < 24) {
      return `${hours} hours ago`;
    } else if (minutes > 1) {
      return `${minutes} minutes ago`;
    } else {
      return "Just now";
    }
  }

  const localDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const Time = formatRelative(date);

  const titleCapitalize = title.charAt(0).toUpperCase() + title.slice(1);

  return (
    <>
      {loaded ? (
        <div className="pb-10">
          <SkellyLoad />
        </div>
      ) : (
        <Link to={`/post/${$id}`}>
          <div className="bg-white grid rounded-md justify-between overflow-hidden transition-all">
            <div className="grid gap-1 px-4 py-4">
              <div className="flex gap-2 items-center justify-start pb-1">
                <Avatar
                  src="asd"
                  alt={author ? author : "unknow"}
                  sx={{ width: 34, height: 34 }}
                />
                <div className="text-sm text-gray-700 flex flex-col">
                  <div className="font-semibold hover:text-gray-900 transition-all">
                    {author ? author : "Unknow"}
                  </div>
                  <span className="text-xs hover:text-black transition-all flex gap-1">
                    <p>{localDate}</p>
                    <p>{`(${Time})`}</p>
                  </span>
                </div>
              </div>
              <p className="font-bold text-xl pt-3 hover:text-[#485df9]">
                {titleCapitalize}
              </p>
              <div className="flex text-xs text-gray-500 pb-3 h-10 gap-2 items-center w-full">
                {tags.map((Ptag, index) => (
                  <p
                    className="hover:bg-gray-100 px-2 py-1 rounded-md border hover:border-gray-200 border-white"
                    key={index}
                  >
                    {Ptag}
                  </p>
                ))}
              </div>
              <p className="text-gray-700 text-sm font-semibold">
                {description}
              </p>
            </div>
          </div>
        </Link>
      )}
    </>
  );
}

export default PostCards;
