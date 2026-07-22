import { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm.trim());
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <section className="sb-section">
      <div className="sb-container">
        <h2>Find the Right Calculator</h2>

        <p>
          Search from dozens of accounting, tax, finance, and business
          calculators.
        </p>

        <form className="sb-box" onSubmit={handleSearch}>
          <FaSearch className="sb-icon" />

          <input
            type="text"
            className="sb-input"
            placeholder="Search calculators (e.g. GST, EMI, TDS)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {searchTerm && (
            <button
              type="button"
              className="sb-clear-btn"
              onClick={handleClear}
              aria-label="Clear search"
            >
              <FaTimes />
            </button>
          )}

          <button type="submit" className="sb-btn">
            Search
          </button>
        </form>
      </div>
    </section>
  );
}

export default SearchBar;