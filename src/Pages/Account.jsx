import React, { useEffect, useState } from "react";
import authService from "../Appwrite/Auth";

function Account() {
  const [user, setuser] = useState("")

  useEffect(() => {
    getUser();
  }, [])

  async function getUser(){
    const data = await authService.getCurrentuser();
    setuser(data.name);
  }

  return (
    <div className="w-full h-screen font-bold grid place-items-center text-2xl">
      <div className="grid place-items-center gap-7">
        <div className="loader3" />
        <p className="flex gap-4">
          Not Available Now!
          <span className="text-blue-600">{user}</span>
        </p>
      </div>
    </div>
  );
}

export default Account;
