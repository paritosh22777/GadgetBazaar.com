import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./OrderSuccess.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div className="order-success">
      <CheckCircleIcon />
      <Typography>Your order has been placed successfully!</Typography>
      <Link to="/orders">VIEW ORDERS</Link>
    </div>
  );
}

export default OrderSuccess;
