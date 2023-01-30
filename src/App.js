import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import LoadingComponent from "./components/LoadingComponent";
import { setUser } from "./config/Slices/mainSlice";
import useAuth from "./hooks/useAuth";
import Home from "./Pages/Home";
import Login from "./Pages/Login";

// function App() {
//   return (
//     <div>
//       {false ? <LoadingComponent /> : true ? <Home /> : <Login />}
//     </div>
//   );
// }

const App = () => {
  const { isAuthenticated, logIn, logOut, loading } = useAuth();
  return (
    <div>
      {loading ? (
        <LoadingComponent />
      ) : isAuthenticated ? (
        <Home isAuthenticated={isAuthenticated} logIn={logIn} logOut={logOut} />
      ) : (
        <Login
          isAuthenticated={isAuthenticated}
          logIn={logIn}
          logOut={logOut}
        />
      )}
    </div>
  );
};

export default App;
