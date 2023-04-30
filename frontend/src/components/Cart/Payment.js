import React, { Fragment, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import axios from "axios";
import "./Payment.css";
import { createOrder, clearErrors } from "../../actions/orderAction";
import GadgetBazaarLogo from "../../images/logo.png";

function Payment(props) {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(props.orderInfo.totalPrice * 100),
  };

  const userOrder = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: props.orderInfo.subTotal,
    taxPrice: props.orderInfo.tax,
    totalPrice: props.orderInfo.totalPrice,
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
        image: GadgetBazaarLogo,
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
    <form className="payment-form" onSubmit={(event) => submitHandler(event)}>
      <input
        type="submit"
        value={`PAY ₹${
          props.orderInfo && props.orderInfo.totalPrice.toFixed(2)
        }`}
        className="payment-form-button"
      />
    </form>
  );
}

export default Payment;
