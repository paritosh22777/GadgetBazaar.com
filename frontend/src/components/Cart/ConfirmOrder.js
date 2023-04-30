import React, { Fragment } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux";
import Metadata from "../layout/Metadata";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import Payment from "./Payment";

function ConfirmOrder() {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const subTotal = cartItems.reduce(
    (subtotal, item) => (subtotal = subtotal + item.quantity * item.price),
    0
  );
  const tax = subTotal * 0.18;
  let totalPrice = tax + subTotal;
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.pinCode}, ${shippingInfo.state}`;

  const data = {
    subTotal,
    tax,
    totalPrice,
  };

  return (
    <Fragment>
      <Metadata title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirm-order-page">
        <div>
          <div className="confirm-shipping-area">
            <Typography>Shipping Information</Typography>
            <div className="confirm-shipping-area-box">
              <div>
                <p>Name: </p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone number: </p>
                <span>{shippingInfo.phoneNumber}</span>
              </div>
              <div>
                <p>Address: </p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirm-cart-items">
            <Typography>Your Cart Items:</Typography>
            <div className="confirm-cart-items-container">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt={item.name} />
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <span>
                      {item.quantity} x ₹{item.price} =
                      <b> ₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div>
          <div className="order-summary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal: </p>
                <span>₹{subTotal}</span>
              </div>
              <div>
                <p>GST: </p>
                <span>₹{tax.toFixed(2)}</span>
              </div>
            </div>
            <div className="order-summary-total">
              <p>
                <b>Total: </b>
              </p>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <Payment orderInfo={data} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ConfirmOrder;
