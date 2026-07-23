import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaArrowRight } from "react-icons/fa";

import "./Hero.css";

const Hero = () => {
  const navigate = useNavigate();

const token = localStorage.getItem("token");

const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/");
};
  return (
    <section className="hero">

      <div className="hero-container">

        <p className="hero-tag">
          Smart Accounting Calculator Suite
        </p>

        <h1>
          Calculate Smarter with
          <span> Accountra</span>
        </h1>

        <p className="hero-description">
          Save time with professional accounting calculators for GST,
          Income Tax, EMI, Loan, TDS, Salary and much more.
          Built for Students, Accountants and CAs.
        </p>
      <div className="hero-buttons">

  <Link to="/calculators" className="primary-btn">
    Explore Calculators
    <FaArrowRight />
  </Link>

  <Link to="/about" className="secondary-btn">
    Learn More
  </Link>

</div>

<div className="auth-buttons">
  {!token ? (
    <>
      <Link to="/login" className="login-btn-home">
        Login
      </Link>

      <Link to="/register" className="register-btn-home">
        Create Account
      </Link>
    </>
  ) : (
    <button
      className="login-btn-home"
      onClick={handleLogout}
    >
      Logout
    </button>
  )}
</div>

      </div>

    </section>
  );
};

export default Hero;