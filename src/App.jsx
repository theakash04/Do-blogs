import { useEffect, useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import { Loading, Navbar } from "./Components/components";
import { useDispatch } from "react-redux";
import authService from "./Appwrite/Auth";
import { login } from "./Store/authSlice";

function App() {
  const [load, setLoad] = useState(true);
  const dispatch = useDispatch();

  useEffect(() =>{
    authService.getCurrentuser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(() => setLoad(false));
  }, []);


  return (
    <>
      {load ? (
        <Loading />
      ) : (
        <>
          {/* <div className="w-full h-full justify-center flex">
            <Navbar />
          </div> */}
          <Outlet />
        </>
      )}
    </>
  );
}

export default App;
