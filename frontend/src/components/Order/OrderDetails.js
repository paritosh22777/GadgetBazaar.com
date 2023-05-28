import React, { Fragment, useEffect } from "react";
import "./OrderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import { useAlert } from "react-alert";
import Metadata from "../layout/Metadata";
import { Typography } from "@mui/material";
import Loader from "../layout/Loader/Loader";

function OrderDetails() {
  let { id } = useParams();
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const dispatch = useDispatch();
  const alert = useAlert();
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title="Order Details" />
          <div className="order-details-page">
            <div className="order-details-container">
              <Typography component="h1">
                Order #{order && order._id}
              </Typography>
              <Typography>Shipping Information</Typography>
              <div className="order-details-container-box">
                <div>
                  <p>Name: </p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Phone Number: </p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNumber}
                  </span>
                </div>
                <div>
                  <p>Address: </p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}`}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="order-details-container-box">
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "green-color"
                        : "red-color"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>
                <div>
                  <p>Amount: </p>
                  <span>
                    ₹{order.totalPrice && order.totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
              <Typography>Order Status</Typography>
              <div className="order-details-container-box">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "green-color"
                        : "red-color"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>
            <div className="order-details-cart-items">
              <Typography>Order Items:</Typography>
              <div className="order-details-cart-items-container">
                {order.orderItems &&
                  order.orderItems.map((item) => (
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
        </Fragment>
      )}
    </Fragment>
  );
}

export default OrderDetails;
