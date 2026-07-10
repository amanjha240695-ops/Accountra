import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";

function SearchBar() {
  return (
    <section className="search-section">
      <div className="search-container">
        <h2>Find the Right Calculator</h2>

        <p>
          Search from dozens of accounting, tax, finance, and business
          calculators.
        </p>

        <div className="search-box">
          <FaSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search calculators..."
          />

          <button>Search</button>
        </div>
      </div>
    </section>
  );
}

export default SearchBar;