import React, { useEffect, useState } from "react";
import PostCards from "./PostCards";
import postServices from "../../Appwrite/Posts";
import Container from "../Container";
import SkellyLoad from "../SkeletonLoad";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    try {
      gettingPost();
    } catch (error) {
      throw(error);
    }
  }, []);

  async function gettingPost() {
    const AllPosts = await postServices.getAllPost();
    if (AllPosts) {
      setPosts(AllPosts.documents);
    }
  }

  return (
    <Container>
      <div className="py-3 max-w-[700px] w-full mx-auto px-3 sm:px-0 h-screen">
        <div className="flex flex-col-reverse gap-5">
          {posts.length == 0 ? (
            <SkellyLoad />
          ) : (
            posts.map((post) => (
              <div key={post.$id}>
                <PostCards {...post} />
              </div>
            ))
          )}
        </div>
      </div>
    </Container>
  );
}

export default Posts;

//Todo: add so guest user can also see the post
