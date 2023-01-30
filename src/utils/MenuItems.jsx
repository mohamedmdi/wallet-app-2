// import { BsWallet2, BsFillInfoCircleFill } from "react-icons/bs";
// import {GiReceiveMoney } from "react-icons/gi";
import About from "../Pages/About";
import Expenses from "../Pages/Expenses";
import Dashboard from "../Pages/Dashboard";
import { current } from "@reduxjs/toolkit";

const MenuItems = [
{
    name: "Dashboard",
    path: "/",
    page: <Dashboard/>,
},
{
    name: "Expenses",
    path: "/Expenses",
    page: <Expenses/>,
},
{
    name: "About",
    path: "/About",
    page: <About/>,
},
];
export default MenuItems;
