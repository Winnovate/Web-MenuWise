import React from "react";
import { Redirect } from "react-router-dom";

import Pageslogin from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Pagesregister from "../pages/Authentication/Register";
import ForgetPassword from "../pages/Authentication/ForgetPassword";
// import LockScreen from "../pages/Authentication/pages-lock-screen";

//My Pages
//Menus
import AddCategory from "../pages/Menus/addcategory";
import QrGenereate from "../pages/QR/qr";
import AddUpdateMenu from "../pages/Menus/addupdatemenu";

import OrderHistory from "../pages/Orders/orderhistory";
import TodaysOrder from "../pages/Orders/todaysorder";
import RestaurantRegister from "../pages/Authentication/registerRes";
import Home from "../pages/home/home";

const authProtectedRoutes = [
  //My Pages

  //Menus
  { path: "/addcategory", component: AddCategory },
  { path: "/add-updatemenu", component: AddUpdateMenu },

  //QR
  { path: "/qrgenerate", component: QrGenereate },

  //Order
  { path: "/orderhistory", component: OrderHistory },
  { path: "/todaysorder", component: TodaysOrder },

  //Register
  { path: "/restaurantregister", component: RestaurantRegister },

  { path: "/", exact: true, component: () => <Redirect to="/addcategory" /> },
];

const publicRoutes = [
  { path: "/home", component: Home },
  { path: "/logout", component: Logout },
  { path: "/login", component: Pageslogin },
  { path: "/register", component: Pagesregister },
  { path: "/forget-password", component: ForgetPassword },
  // { path: '/pages-lock-screen', component: LockScreen },
];

export { authProtectedRoutes, publicRoutes };
