import React, { useEffect, useState } from "react";
import PostCards from "./PostCards";
import postServices from "../../Appwrite/Posts";
import Container from "../Container";
import SkellyLoad from "../SkeletonLoad";
import { Footer } from "../components";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    try {
      gettingPost();
    } catch (error) {
      throw error;
    }
  }, []);

  async function gettingPost() {
    const AllPosts = await postServices.getAllPost();
    if (AllPosts) {
      setPosts(AllPosts.documents);
    }
  }

  return (
    <Container className={""}>
      
      <div className=" max-w-screen w-full mx-auto max-h-screen">
        <div className="flex flex-col-reverse gap-5 pb-20 max-w-[700px] mx-auto px-3 pt-5">
          {posts.length == 0 ? (
            <div className="grid gap-5">
              <SkellyLoad />
              <SkellyLoad />
              <SkellyLoad />
              <SkellyLoad />
            </div>
          ) : (
            posts.map((post) => (
              <div key={post.$id}>
                <PostCards {...post} userId={post.userId} />
              </div>
            ))
          )}
        </div>
        <div className="">
          <Footer />
        </div>
      </div>
    </Container>
  );
}

export default Posts;
