import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Metadata from "../layout/Metadata";
import { Link, useParams } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import Sidebar from "./Sidebar";
import {
  clearErrors,
  getOrderDetails,
  updateOrder,
} from "../../actions/orderAction";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/Loader";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstant";
import "./ProcessOrder.css";

function ProcessOrder() {
  let { id } = useParams();
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const alert = useAlert();
  const [status, setStatus] = useState("");
  const updateOrderSubmitHandler = (event) => {
    event.preventDefault();
    const myForm = new FormData();
    myForm.set("status", status);
    dispatch(updateOrder(id, myForm));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order updated successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id, isUpdated, updateError]);
  return (
    <Fragment>
      <Metadata title="Process Order" />
      <div className="dashboard">
        <Sidebar />
        <div className="new-product-container">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirm-order-page"
              style={{
                display: order.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirm-shipping-area">
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
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
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
                <div className="confirm-cart-items">
                  <Typography>Your Cart Items:</Typography>
                  <div className="confirm-cart-items-container">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt={item.name} />
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                          <span>
                            {item.quantity} x ₹{item.price} =
                            <b> ₹{item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: order.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
                <form
                  className="update-order-form"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>
                  <div>
                    <AccountTreeIcon />
                    <select onChange={(event) => setStatus(event.target.value)}>
                      <option value="">Choose Category</option>
                      {order.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}
                      {order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>
                  <Button
                    id="create-product-button"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    PROCESS
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default ProcessOrder;
