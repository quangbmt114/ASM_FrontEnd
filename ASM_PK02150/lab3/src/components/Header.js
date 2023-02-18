/* eslint-disable jsx-a11y/anchor-is-valid */
import { Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Home_page from "../../src/components/images/home-32px.png"
import Contact from "./images/chat-32px.png"
import {
  faSignIn,
  faSignOut,
  faUserPlus,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Fragment } from "react";
const Header = ({ auth }) => {
  const renderLogout = () => {
    return (
      <div className="buttons">
        <a
          href="/"
          onClick={logOut}
          style={{ margin: 10, textDecoration: "none", color: "#333333" }}
        >
          <FontAwesomeIcon icon={faSignOut} className="me-1" />
          Sign Out
        </a>
      </div>
    );
  };
  const logOut = () => {
    localStorage.removeItem("user");
  };

  const renderAuthorize = () => {
    return (
      <Fragment>
        <Link
          to="/signIn"
          style={{ textDecoration: "none", color: "#333333", margin: 10 }}
        >
          <FontAwesomeIcon icon={faSignIn} className="me-1" />
          Sign In
        </Link>
        <Link
          to="/signUp"
          style={{ textDecoration: "none", color: "#333333", margin: 10 }}
        >
          <FontAwesomeIcon icon={faUserPlus} className="me-1" />
          Sign Up
        </Link>
      </Fragment>
    );
  };

  const renderCart = () => {
    return (
      <div className="buttons">
        <Link
          to="/cart"
          style={{ textDecoration: "none", color: "#333333", margin: 10 }}
        >
          {" "}
          <FontAwesomeIcon icon={faCartShopping} className="me-1" />
          Cart
        </Link>
      </div>
    );
  };

  return (
    <Navbar
      className="navbar navbar-expand-lg navbar-light bg-light py-2 shadow-sm nav"
      sticky="top"
      style={{backgroundColor:"blue" }}
    >
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <a className="navbar-brand mt-2 mt-lg-0 fs-4" href="#">
            
          </a>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link">
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "#333333" }}
                >
                <img src={Home_page}/>
                
                </Link>
                <Link
                  to="/contact"
                  style={{
                    textDecoration: "none",
                    color: "#333333",
                    marginLeft: 10,
                  }}
                ><img src={Contact} style={{marginLeft:10 ,marginRight:5}}/>
                  Contact
                </Link>
              </a>
            </li>
          </ul>
        </div>
        {!auth && renderAuthorize()}
        {auth && renderCart()}
        {auth && renderLogout()}
      </div>
    </Navbar>
  );
};

export default Header;
