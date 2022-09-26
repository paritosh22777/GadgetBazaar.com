import React, { Fragment } from "react";
import logo from "../../../images/logo-light-black.jpg";
import Search from "./Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import Badge from "@mui/material/Badge";
import Loader from "../Loader/Loader";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  function logoutUser() {
    alert.success("Logout successfully");
    dispatch(logout());
  }

  function loginUser() {
    navigate("/login");
  }

  const { pathname } = useLocation();
  let id = pathname.substring(9, pathname.length);
  let keyword = pathname.substring(10, pathname.length);
  if (
    pathname === "/" ||
    pathname === "/products" ||
    pathname === `/product/${id}` ||
    pathname === `/products/${keyword}` ||
    pathname === "/cart"
  ) {
    return (
      <Fragment>
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <header className="header">
              <Link className="left-header" to="/">
                <img src={logo} alt="logo" />
              </Link>
              <div className="center-header-one">
                <Search />
              </div>
              <div className="center-header-two">
                <span
                  onClick={isAuthenticated === true ? logoutUser : loginUser}
                >
                  <h2>{isAuthenticated === true ? "SIGN OUT" : "LOGIN"}</h2>
                  {isAuthenticated === true ? <LogoutIcon /> : <LoginIcon />}
                </span>
              </div>
              <Link className="right-header" to="/cart">
                <span>
                  <Badge
                    badgeContent={
                      isAuthenticated === true ? cartItems.length : 0
                    }
                    color="secondary"
                  >
                    <ShoppingCartIcon />
                  </Badge>
                  <h2>CART</h2>
                </span>
              </Link>
            </header>
          </Fragment>
        )}
      </Fragment>
    );
  }
  return null;
}

export default Header;
