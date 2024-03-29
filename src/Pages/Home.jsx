import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import BaseComponent from "../components/BaseComponent";
import Navbar from "../components/Navbar";
import MenuItems from "../utils/MenuItems";
import Login from "./Login";

export default function Home({ isAuthenticated, logIn, logOut }) {

  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} logIn={logIn} logOut={logOut} />
      <BaseComponent />
      {/* <Routes>
        {MenuItems.map((i,k) => (
          <Route path={i.path} element={i.page} key={k}/>
          ))}
          <Route path={"/Profile"} element={<Login/>} />
      </Routes> */}
    </div>
  );
}
