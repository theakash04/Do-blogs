import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import postServices from "../Appwrite/Posts";
import Container from "../Components/Container";
import { Alert, Avatar, IconButton } from "@mui/material";
import { ArrowBackIosNew, Delete, Edit, IosShare } from "@mui/icons-material";
import parse from "html-react-parser";

function ViewPost() {
  const [post, setPost] = useState(null);
  const [time, settime] = useState("unknown");
  const [auther, isAuther] = useState(false);
  const [tags, setTags] = useState([]);
  const [alert, setAlert] = useState(false);

  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (slug) {
      postServices.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
          getTags(post.tag);
          GettingTime(post.$createdAt);
          console.log(post);

          const checkAuther =
            post && userData ? post.userId === userData.$id : false;
          isAuther(checkAuther);
        } else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  function DeltePost() {
    postServices.deletePost(post.$id).then((status) => {
      if (status) {
        postServices.deleteImage(post.featuredImage);
        navigate("/");
      }
    });
  }

  function GettingTime(time) {
    let date = new Date(time);
    date = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    settime(date);
  }

  function getTags(tag) {
    if (tag) {
      const arr = tag.split(",");
      setTags(arr);
      //try to add this in Edit post which is post form
    } else {
      setTags(["#Unknow"]);
    }
  }

  const Toggle = () => setAlert((prev) => !prev);

  function sharePost() {
    Toggle();
    console.log(alert);
    navigator.clipboard.writeText(window.location.href);

    const Timeout = setTimeout(() => {
      Toggle();
      console.log(alert);
    }, 1000);

    return () => clearTimeout(Timeout);
  }

  return post ? (
    <>
      <div id="navbar" className="px-3 py-4 relative">
        <div className="w-full flex items-center justify-between">
          <Link to={"/"}>
            <IconButton>
              <ArrowBackIosNew color="error" />
            </IconButton>
          </Link>

          <IconButton onClick={sharePost}>
            <IosShare />
          </IconButton>
        </div>
      </div>
      <div className="p-1 pb-10">
        <Container>
          <div className="relative grid gap-6 max-w-[1000px] bg-white pt-1 px-1 pb-10 rounded-md">
            <div>
              <img
                src={postServices.getFilePreview(post.featuredImage)}
                alt="CoverImage"
                className="w-[1000px] max-h-[400px] rounded-t-sm"
              />
            </div>

            <div className="grid px-3 gap-5 w-full">
              {/* Post Author Name */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar />
                  <div className="block">
                    <p className="text-md font-semibold">Akash Kumar</p>
                    <p className="text-gray-600 text-xs">Posted on {time}</p>
                  </div>
                </div>

                <div>
                  {auther ? (
                    <div className="flex">
                      <Link to={`/editPost/${post.$id}`}>
                        <IconButton variant="text" color="success">
                          <Edit />
                        </IconButton>
                      </Link>

                      <IconButton
                        variant="text"
                        color="error"
                        onClick={DeltePost}
                      >
                        <Delete />
                      </IconButton>
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Title & tags & description*/}
              <div>
                {/* title */}
                <div className="w-full px-2 py-2">
                  <p className="font-bold text-4xl">
                    {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
                  </p>
                </div>

                {/* Tags */}
                <div>
                  <ul className="flex gap-3 py-1">
                    {tags.map((item, index) => (
                      <li
                        className="hover:bg-violet-400/10 px-2 py-1 rounded-md border hover:border-violet-300/10 border-white"
                        key={index}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* description */}
                {/* <div className="px-2 py-2 border-2 text-center">
                  <p className="text-md text-gray-700 ">
                    <span className="text-gray-800 font-semibold">
                    Description:
                    </span>
                    {post.description}
                  </p>
                </div> */}
              </div>
              <div
                id="content"
                className="px-4 py-3 slave text-black slave-headings:text-black slave-p:py-1 slave-p:my-0 slave-headings:my-5 slave-img:my-4 slave-strong:text-black max-w-none slave-a:text-blue-500 slave-ul:text-black slave-li:text-black slave-ol:text-black"
              >
                {parse(post.content)}
              </div>
            </div>
          </div>
        </Container>

        {alert && (
          <div className="flex absolute right-2 bottom-10 transition-all ease-in-out">
            <Alert severity="success" icon={false}>
              Page link copied to clipboard!
            </Alert>
          </div>
        )}
      </div>
    </>
  ) : null;
}

export default ViewPost;
