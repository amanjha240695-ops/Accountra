import { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email);

    // Backend Integration Later
  };

  return (
    <div className="forgot-page">

      <div className="forgot-card">

        <h1>Forgot Password?</h1>

        <p className="subtitle">
          Enter your registered email address.
          <br />
          We'll send you a password reset link.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">

            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>

          <button className="forgot-btn">
            Send Reset Link
          </button>

        </form>

        <p className="back-login">

          Remember your password?

          <Link to="/login">
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default ForgotPassword;