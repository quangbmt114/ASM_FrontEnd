import { BrowserRouter as Router, Routes, useRoutes } from "react-router-dom";
import App from "./App.js";
import SignIn from "./components/SignIn";
import LayoutDefault from "./Layout";
import LayoutAdmin from "./LayoutAdmin.js";
import PostDetail from "./components/DetailPost";
import AdminApp from "./components/AdminApp";
import Signup from "./components/Signup.js";
import Cart from "./components/Cart.js";
import UserApp from "./components/UserApp";
import PostDetailAd from "./components/DetailPostAd.js";
import Checkout from "./components/CheckOut";
import ResetPassword from "./components/ResetPassword.js";
import ChangePassword from "./components/ChangePassword.js";
import { Navigate } from "react-router-dom";

const RouteList = () => {
  const isAuth = localStorage.getItem("user");
  const check = false;
  const routes = useRoutes([
    { path: "/", 
      element: isAuth ? <LayoutDefault><UserApp /></LayoutDefault> : <LayoutDefault><App /></LayoutDefault>, },
    { path: "/contact", element: <LayoutDefault><h1>Liên hệ</h1></LayoutDefault> },
    { path: "/signIn", element:<LayoutDefault><SignIn /></LayoutDefault> },
    { path: "/signUp", element: <LayoutDefault><Signup /></LayoutDefault> },
    { path: "/resetpassword", element: <LayoutDefault><ResetPassword /></LayoutDefault> },
    { path: "/changepassword", element: <LayoutDefault><ChangePassword /></LayoutDefault> },
    { path: "/post/:id", element: <LayoutDefault><PostDetail /></LayoutDefault> },
    {
      path: "/posts/:id",
      element: isAuth ? <LayoutAdmin><PostDetailAd /></LayoutAdmin> : <Navigate to="/signIn" />,
    },
    { path: "/adminApp", element: 
    isAuth ? <LayoutAdmin><AdminApp /> </LayoutAdmin>: <Navigate to="/signIn" />},
    {
      path: "/checkout",
      element: isAuth ? <LayoutDefault><Checkout /></LayoutDefault>  : <Navigate to="/signIn" />,
    },
    { path: "/cart", element: isAuth ? <LayoutDefault><Cart /></LayoutDefault> : <Navigate to="/signIn" /> },
    {
      path: "/userApp",
      element: isAuth ? <LayoutDefault><UserApp /></LayoutDefault> : <Navigate to="/signIn" />,
    },
  ]);
  return routes;
};

const RouterView = () => { 
  return (
    <Router>
    <RouteList/>
    </Router>
  );
};
export default RouterView;
