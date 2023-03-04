import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import Metadata from "../Metadata";
import "./Search.css";

function Search() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (event) => {
    event.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  const [focus, setFocus] = useState(false);
  const handleOnFocus = () => {
    setFocus(true);
  };

  const handleOnBlur = () => {
    setFocus(false);
  };

  return (
    <Fragment>
      <Metadata title="Search a Product -- GadgetBazaar.com" />
      <form
        className="search-box"
        onSubmit={searchSubmitHandler}
        style={{
          boxShadow: focus
            ? "0 0 6px rgb(255, 9, 245), 0 0 11px rgb(255, 9, 245)"
            : "none",
          border: focus ? "1px solid rgb(255, 9, 245)" : "none",
        }}
      >
        <input
          type="text"
          placeholder="Search for Products, Brands and More..."
          onChange={(event) => setKeyword(event.target.value)}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
        />
        <input type="submit" value="SEARCH" />
      </form>
    </Fragment>
  );
}

export default Search;
