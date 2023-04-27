import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./OrderSuccess.css";
import { Typography } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";

function OrderSuccess() {
  const searchQuery = useSearchParams()[0];
  const referenceNumber = searchQuery.get("reference");
  return (
    <div className="order-success">
      <CheckCircleIcon />
      <Typography>Your order has been placed successfully!</Typography>
      <h5>Reference number: {referenceNumber}</h5>
      <Link to="/orders">VIEW ORDERS</Link>
    </div>
  );
}

export default OrderSuccess;
