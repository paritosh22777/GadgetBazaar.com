import React from "react";
import "./NotFound.css";
import { Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="page-not-found">
      <ErrorIcon />
      <Typography>Page Not Found</Typography>
      <Link to="/">GO TO HOME</Link>
    </div>
  );
};

export default NotFound;
