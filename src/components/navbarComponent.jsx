import React, { useState } from "react";
import PropTypes from "prop-types";

export default function NavbarComponent({ onSearchSubmit }) {
  const [searchText, setSearchText] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    onSearchSubmit(searchText);
  };

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <nav id="navbar" className="navbar sticky-top">
      <div className="container-fluid d-flex justify-content-center">
        <form
          id="search-submit"
          className="d-flex"
          role="search"
          onSubmit={handleSubmit}
        >
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchText}
            onChange={handleInputChange}
          />
          <button id="button" className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}
