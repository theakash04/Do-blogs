import React, { useState } from "react";
import { Footer, Navbar, } from "../Components/components";
import Posts from "../Components/Posts/Posts";

function Home() {

  return (
    <div className="flex w-screen h-screen relative flex-col">
      <div className="w-full flex items-center justify-center sticky top-0">
        <Navbar />
      </div>
      <Posts />
      <Footer />
    </div>
  );
}

export default Home;

//saved testing user in appwrite - testing@dex.com || 123456789
