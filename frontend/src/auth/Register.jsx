import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Phone, Lock } from "lucide-react";
import "./Register.css";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (message) {
      setMessage("");
      setMessageType("");
    }
  };

  const validateForm = () => {
    const { username, email, phoneNumber, password } = formData;

    if (!username.trim()) {
      setMessage("Username is required.");
      setMessageType("error");
      return false;
    }

    if (username.trim().length < 3) {
      setMessage("Username must be at least 3 characters.");
      setMessageType("error");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setMessage("Enter a valid email address.");
      setMessageType("error");
      return false;
    }

    if (phoneNumber && !/^\d{10}$/.test(phoneNumber)) {
      setMessage("Phone number must be 10 digits.");
      setMessageType("error");
      return false;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      setMessageType("error");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const response = await api.post("/auth/register", formData);

      setMessage(response.data.message || "Registration successful!");
      setMessageType("success");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rg-page">
      <div className="rg-card">
        <div className="rg-header">
          <h1>Create Account</h1>
          <p>
            Join Accountra and manage your accounting calculations smarter.
          </p>
        </div>

        {message && (
          <div className={`rg-alert ${messageType}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="rg-form">
          <div className="rg-input-box">
            <User size={18} className="rg-icon" />
            <input
              type="text"
              name="username"
              className="rg-input"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="rg-input-box">
            <Mail size={18} className="rg-icon" />
            <input
              type="email"
              name="email"
              className="rg-input"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="rg-input-box">
            <Phone size={18} className="rg-icon" />
            <input
              type="text"
              name="phoneNumber"
              className="rg-input"
              placeholder="Phone Number (Optional)"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>

          <div className="rg-input-box">
            <Lock size={18} className="rg-icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="rg-input password-input"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="rg-eye-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          <p className="rg-password-hint">
            Password should be at least 6 characters long.
          </p>

          <button
            type="submit"
            className="rg-submit-btn"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="rg-footer">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;