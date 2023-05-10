import React, { Fragment, useState } from "react";
import "./Header.css";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import profileIconPic from "../../../images/profile-icon.jpeg";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";

function UserOptions({ user }) {
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const alert = useAlert();
  const dispatch = useDispatch();
  const options = [
    {
      icon: <HomeIcon />,
      name: "Home",
      function: homePage,
    },
    {
      icon: <ListAltIcon />,
      name: "My Orders",
      function: orders,
    },
    {
      icon: <PersonIcon />,
      name: "Profile",
      function: account,
    },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart (${cartItems.length})`,
      function: cart,
    },
    {
      icon: <ExitToAppIcon />,
      name: "Logout",
      function: logoutUser,
    },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      function: dashboard,
    });
    options.splice(1, 2);
    options.splice(2, 1);
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }

  function homePage() {
    navigate("/");
  }

  function orders() {
    navigate("/orders");
  }

  function account() {
    navigate("/account");
  }

  function cart() {
    navigate("/cart");
  }

  function logoutUser() {
    dispatch(logout());
    alert.success("Logout successfully");
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        className="speed-dial"
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        icon={
          <img
            className="speed-dial-icon"
            src={user.avatar.url ? user.avatar.url : profileIconPic}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.function}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
}

export default UserOptions;
