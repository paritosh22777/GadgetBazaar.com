import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

function ProductCard({ product }) {
  const options = {
    size: "small",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Link className="product-card" to={`/product/${product._id}`}>
      <img
        className="product-image"
        src={product.images[0].url}
        alt={product.name}
        style={{
          maxHeight: "50%",
          maxWidth: "90%",
          margin: "auto",
        }}
      />
      <p className="product-name">{product.name}</p>
      <div className="product-rating">
        <Rating className="rating" {...options} />
        <span className="product-reviews-count">
          ({product.numberOfReviews} reviews)
        </span>
      </div>
      <span className="product-price">{`₹${product.price}`}</span>
    </Link>
  );
}

export default ProductCard;
