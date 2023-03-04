import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "./ProductCard";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { useAlert } from "react-alert";
import Metadata from "../layout/Metadata";
import ErrorIcon from "@mui/icons-material/Error";

const categories = [
  "Computers",
  "Laptops",
  "Tablets",
  "Mobile Phones",
  "Keyboards",
  "Computer Mice",
  "Headsets",
  "Gaming Controllers",
];

function Products() {
  let { keyword } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 500000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const setCurrentPageNo = (event) => {
    setCurrentPage(event);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  const ratingsHandler = (event, newRating) => {
    setRatings(newRating);
  };

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

  let count = filteredProductsCount;

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {filteredProductsCount === 0 ? (
            <div className="products-not-found">
              <ErrorIcon />
              <Typography>Sorry, no products found</Typography>
            </div>
          ) : (
            <Fragment>
              <Metadata title="PRODUCTS -- GadgetBazaar.com" />
              <h2 className="proudcts-heading">Products</h2>
              <div className="products">
                {products &&
                  products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
              </div>
              <div className="filter-box">
                <Typography className="price-heading">Price</Typography>
                <Slider
                  value={price}
                  onChange={priceHandler}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  min={0}
                  max={500000}
                />
                <Typography className="categories-heading">
                  Categories
                </Typography>
                <ul className="category-box">
                  {categories.map((category) => (
                    <li
                      className="category-link"
                      key={category}
                      onClick={() => setCategory(category)}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
                <fieldset>
                  <Typography component="legend">Ratings Above</Typography>
                  <Slider
                    value={ratings}
                    onChange={ratingsHandler}
                    aria-labelledby="continuous-slider"
                    valueLabelDisplay="auto"
                    min={0}
                    max={5}
                  />
                </fieldset>
              </div>
              {resultPerPage < count && (
                <div className="pagination-box">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={productsCount}
                    onChange={setCurrentPageNo}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="First"
                    lastPageText="Last"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="page-item-active"
                    activeLinkClass="page-link-active"
                  />
                </div>
              )}
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default Products;
