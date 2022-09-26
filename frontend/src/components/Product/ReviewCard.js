import React from "react";
import profilePic from "../../images/profile-icon.jpeg";
import { Rating } from "@mui/material";

function ReviewCard({ review }) {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="reviews-card">
      <img src={profilePic} alt="User" />
      <p>{review.name}</p>
      <Rating {...options} />
      <span className="reviews-card-comment">{review.comment}</span>
    </div>
  );
}

export default ReviewCard;
