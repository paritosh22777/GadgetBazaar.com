import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import "./Home.css";
import ProductCard from "../Product/ProductCard";
import Metadata from "../layout/Metadata";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

function Home() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title="GadgetBazaar.com" />
          <div className="banner">
            <p>Welcome to GadgetBazaar</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>
          <h2 className="home-heading">Featured Products</h2>
          <div className="container" id="container">
            {products &&
              products.map((product, index) => (
                <ProductCard product={product} key={index} />
              ))}
          </div>
          <div className="products-page-button">
            <button
              onClick={() => {
                navigate("/products");
              }}
            >
              See all Products
              <KeyboardDoubleArrowRightIcon />
            </button>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Home;
