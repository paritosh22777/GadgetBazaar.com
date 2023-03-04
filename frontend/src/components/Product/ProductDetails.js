import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import Metadata from "../layout/Metadata";
import { addItemsToCart } from "../../actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Rating,
} from "@mui/material";
import { NEW_REVIEW_RESET } from "../../constants/productConstant";

function ProductDetails() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const quantityHandler = (type) => {
    if (product.stock <= quantity) {
      return;
    } else if (type === "decrease") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const addItemsToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item added to cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);
    dispatch(newReview(myForm));
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Review submitted successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    // req.params.id (in backend) = id -> useParams() (in frontend / react)
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, reviewError, success]);

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title={`${product.name} -- GadgetBazaar.com`} />
          <div className="product-details">
            <div>
              <Carousel className="carousel">
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="carousel-image"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                      style={{
                        width: "auto",
                        maxWidth: "100%",
                        height: "400px",
                        marginLeft: "50%",
                        transform: "translateX(-50%)",
                      }}
                    />
                  ))}
              </Carousel>
            </div>
            <div>
              <div className="details-block-one">
                <h2>{product.name}</h2>
                <p>Product #{product._id}</p>
              </div>
              <div className="details-block-two">
                <Rating {...options} />
                <span className="reviews-count">
                  ({product.numberOfReviews} Reviews)
                </span>
              </div>
              <div className="details-block-three">
                <h1>{`₹${product.price}`}</h1>
                <div className="details-block-item">
                  <div className="items-count-details">
                    <button
                      className="remove"
                      onClick={() => quantityHandler("decrease")}
                    >
                      -
                    </button>
                    <input
                      className="items-count"
                      type="number"
                      value={quantity}
                      readOnly
                    />
                    <button
                      className="add"
                      onClick={() => quantityHandler("increase")}
                    >
                      +
                    </button>
                  </div>
                  <button
                    disabled={product.stock < 1 ? true : false}
                    className="add-to-cart"
                    onClick={addItemsToCartHandler}
                  >
                    ADD TO CART
                  </button>
                </div>
                <p>
                  Status:
                  <b
                    className={
                      product.stock === 1
                        ? "yellow-color"
                        : product.stock < 1
                        ? "red-color"
                        : "green-color"
                    }
                  >
                    {product.stock === 1
                      ? "Only One Left"
                      : product.stock < 1
                      ? "Out Of Stock"
                      : "In Stock"}
                  </b>
                </p>
              </div>
              <div className="detail-block-four">
                Description:
                <p style={{ whiteSpace: "pre-line" }}>{product.description}</p>
              </div>
              <button className="submit-review" onClick={submitReviewToggle}>
                SUBMIT REVIEW
              </button>
            </div>
          </div>
          <h3 className="reviews-heading">REVIEWS</h3>
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submit-dialog">
              <Rating
                onChange={(event) => setRating(event.target.value)}
                value={rating}
                size="large"
              />
              <textarea
                className="submit-dialog-textarea"
                cols="30"
                rows="5"
                onChange={(event) => setComment(event.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={submitReviewToggle}>
                Cancel
              </Button>
              <Button color="primary" onClick={reviewSubmitHandler}>
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review, index) => (
                  <ReviewCard review={review} key={index} />
                ))}
            </div>
          ) : (
            <p className="no-reviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default ProductDetails;
