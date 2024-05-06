import { useEffect, useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "./Appwrite/Auth";
import { login, logout } from "./Store/authSlice";
import LoadingPage from "./Components/Loadings/LoadingPage";

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
        <LoadingPage text="Just Do Blogs! 🗣"/>
      ) : (
        <>         
          <Outlet />
        </>
      )}
    </>
  );
}

export default App;
