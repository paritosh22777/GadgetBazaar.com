import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "./CheckoutSteps";
import Metadata from "../layout/Metadata";
// import { Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import axios from "axios";
import "./Payment.css";
import { useNavigate } from "react-router-dom";
import { createOrder, clearErrors } from "../../actions/orderAction";

function Payment() {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const dispatch = useDispatch();
  const alert = useAlert();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100), //in paise
  };

  const userOrder = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subTotal,
    taxPrice: orderInfo.tax,
    deliveryCharges: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };
      const {
        data: { key },
      } = await axios.get("/api/v1/getkey");
      const {
        data: { order },
      } = await axios.post(
        "/api/v1/checkout",
        paymentData
        // config
      );

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "GadgetBazaar.com",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order.id,
        callback_url: "/api/v1/paymentverification",
        prefill: {
          name: user.name,
          email: user.email,
          contact: shippingInfo.phoneNumber,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#ff6347",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
      userOrder.paymentInfo = {
        id: order.id,
        status: order.status === "created" ? "succeeded" : "failed",
      };

      dispatch(createOrder(userOrder));
    } catch (error) {
      alert.error(error.response.data.message);
    }
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      <Metadata title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="payment-container">
        <form
          className="payment-form"
          onSubmit={(event) => submitHandler(event)}
        >
          <input
            type="submit"
            value={`PAY ₹${orderInfo && orderInfo.totalPrice.toFixed(2)}`}
            className="payment-form-button"
          />
        </form>
      </div>
    </Fragment>
  );
}

export default Payment;
