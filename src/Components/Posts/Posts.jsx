import React, { useEffect, useState } from "react";
import PostCards from "./PostCards";
import postServices from "../../Appwrite/Posts";
import Container from "../Container";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    try {
      gettingPost();
    } catch (error) {
      console.log(error);
    }
  }, []);

  async function gettingPost() {
    const AllPosts = await postServices.getAllPost();
    if (AllPosts) {
      setPosts(AllPosts.documents);
    }
  }

  // console.log({...posts});

  return (
    <Container style={"w-full"}>
      <div className="py-3 max-w-[700px] w-full flex sm:flex-row flex-col items-center justify-center gap-5 sm:flex-wrap">
        {posts.map((post) => (
          <div key={post.$id}>
            <PostCards {...post} />
          </div>
        ))}
      </div>
    </Container>
  );
}

export default Posts;


//Todo: add so guest user can also see the post