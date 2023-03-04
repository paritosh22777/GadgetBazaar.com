import React, { Fragment } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard.js";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Typography } from "@mui/material";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.user);
  const quantityHandler = (id, quantity, stock, type) => {
    let newQty;
    if (type === "add") {
      newQty = quantity + 1;
      if (stock <= quantity) {
        return;
      }
    } else {
      newQty = quantity - 1;
      if (quantity <= 1) {
        return;
      }
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkOutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  if (isAuthenticated === true) {
    return (
      <Fragment>
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <RemoveShoppingCartIcon />
            <Typography>No product in your cart</Typography>
            <Link to="/products">VIEW PRODUCTS</Link>
          </div>
        ) : (
          <Fragment>
            <div className="cart-page">
              <div className="cart-header">
                <p className="product-heading">Product</p>
                <p className="quantity-heading">Quantity</p>
                <p className="subtotal-heading">Subtotal</p>
              </div>
              {cartItems &&
                cartItems.map((item, id) => (
                  <div className="cart-container" key={item.product}>
                    <CartItemCard
                      item={item}
                      deleteCartItems={deleteCartItems}
                    />
                    <div className="cart-input">
                      <button
                        className="remove"
                        onClick={() =>
                          quantityHandler(
                            item.product,
                            item.quantity,
                            item.stock,
                            "remove"
                          )
                        }
                      >
                        -
                      </button>
                      <input type="number" value={item.quantity} readOnly />
                      <button
                        className="add"
                        onClick={() =>
                          quantityHandler(
                            item.product,
                            item.quantity,
                            item.stock,
                            "add"
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                    <p className="cart-subtotal">{`₹${
                      item.price * item.quantity
                    }`}</p>
                  </div>
                ))}
              <div className="cart-gross-total">
                <div></div>
                <div className="cart-gross-profit-box">
                  <p>Gross Total</p>
                  <p>{`₹${cartItems.reduce(
                    (grossTotal, item) =>
                      grossTotal + item.price * item.quantity,
                    0
                  )}`}</p>
                </div>
                <div></div>
                <div className="checkout-button">
                  <button onClick={checkOutHandler}>CHECKOUT</button>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <div className="unauthenticated-cart">
          <RemoveShoppingCartIcon />
          <Typography>Please login to add items to the cart</Typography>
          <Link to="/login">Sign in to your account</Link>
        </div>
      </Fragment>
    );
  }
}

export default Cart;
